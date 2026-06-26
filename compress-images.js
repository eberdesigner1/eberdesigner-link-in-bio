import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src', 'assets');

// Recursively find files
function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, files);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.webp', '.png', '.jpg', '.jpeg'].includes(ext)) {
        files.push(filePath);
      }
    }
  }
  return files;
}

async function compressAll() {
  const files = getFiles(assetsDir);
  console.log(`Encontrados ${files.length} arquivos de imagem para processamento.`);

  for (const file of files) {
    const relativePath = path.relative(process.cwd(), file);
    const fileName = path.basename(file).toLowerCase();
    
    // Skip already generated mobile versions
    const isMobileCover = fileName.includes('capa') && fileName.includes('-mobile');
    if (isMobileCover) {
      console.log(`Pulando capa mobile já existente: ${relativePath}`);
      continue;
    }

    const statsBefore = fs.statSync(file);
    const sizeBefore = statsBefore.size;

    // Skip small files (under 100KB) to avoid degradation unless it's one of the covers
    const isCover = fileName.includes('capa');
    if (sizeBefore < 100 * 1024 && !isCover) {
      console.log(`Pulando arquivo pequeno: ${relativePath} (${(sizeBefore / 1024).toFixed(1)} KB)`);
      continue;
    }

    try {
      const inputBuffer = fs.readFileSync(file);
      const image = sharp(inputBuffer);
      const metadata = await image.metadata();

      let pipeline = image;
      let resized = false;

      // Resize if dimensions are too large (e.g. wider than 1200px for covers, or 1000px for grid arts)
      const maxWidth = isCover ? 1200 : 1000;
      if (metadata.width && metadata.width > maxWidth) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
        resized = true;
      }

      // Apply format-specific compression
      const ext = path.extname(file).toLowerCase();
      let buffer;
      if (ext === '.webp') {
        buffer = await pipeline.webp({ quality: 75, effort: 5 }).toBuffer();
      } else if (ext === '.png') {
        buffer = await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer();
      } else if (['.jpg', '.jpeg'].includes(ext)) {
        buffer = await pipeline.jpeg({ quality: 75, mozjpeg: true }).toBuffer();
      }

      if (buffer) {
        // Write the optimized image back to disk
        fs.writeFileSync(file, buffer);
        const statsAfter = fs.statSync(file);
        const sizeAfter = statsAfter.size;
        const savings = sizeBefore - sizeAfter;
        
        if (savings > 0) {
          const savingsPercent = ((savings / sizeBefore) * 100).toFixed(1);
          console.log(`Otimizado: ${relativePath} | ${(sizeBefore / 1024 / 1024).toFixed(2)} MB -> ${(sizeAfter / 1024 / 1024).toFixed(2)} MB (${savingsPercent}% de redução) ${resized ? '[Redimensionado]' : ''}`);
        } else {
          console.log(`Mantido original (compressão não reduziu tamanho): ${relativePath}`);
        }
      }

      // If it is a cover image, generate the mobile version (width: 600px)
      if (isCover) {
        try {
          const mobilePath = file.replace(/\.webp$/i, '-mobile.webp');
          const mobilePipeline = sharp(inputBuffer).resize({ width: 600, withoutEnlargement: true });
          const mobileBuffer = await mobilePipeline.webp({ quality: 75, effort: 5 }).toBuffer();
          fs.writeFileSync(mobilePath, mobileBuffer);
          const mobileStats = fs.statSync(mobilePath);
          console.log(`Gerada capa mobile: ${path.relative(process.cwd(), mobilePath)} (${(mobileStats.size / 1024).toFixed(1)} KB)`);

          // Copy Petshop LCP covers to public directory for immediate index.html preload
          if (fileName.includes('petshop')) {
            const publicDestDesk = path.join(process.cwd(), 'public', 'capa-projeto-petshop.webp');
            const publicDestMobile = path.join(process.cwd(), 'public', 'capa-projeto-petshop-mobile.webp');
            fs.writeFileSync(publicDestDesk, buffer || inputBuffer);
            fs.writeFileSync(publicDestMobile, mobileBuffer);
            console.log(`Copiadas capas LCP petshop para a pasta public/ para preload no index.html`);
          }
        } catch (mErr) {
          console.error(`Erro ao gerar versão mobile para ${relativePath}:`, mErr.message);
        }
      }
    } catch (err) {
      console.error(`Erro ao processar ${relativePath}:`, err.message);
    }
  }
}

compressAll().then(() => {
  console.log('Otimização concluída!');
}).catch(console.error);
