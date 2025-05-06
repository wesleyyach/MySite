// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
//root: './public', // Se seu index.html estiver em public
  // base: '/', // Se você quiser especificar o caminho base (geralmente não necessário para dev)
  server: {
    open: true, // Abre o navegador automaticamente
  }
});