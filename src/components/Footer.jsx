import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      className="footer-container"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <p className="footer-copyright">© 2026 Eber Designer</p>
    </motion.footer>
  );
}
