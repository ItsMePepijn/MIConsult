// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

module.exports = defineConfig({
  root,
  build: {
    outDir,
    trailingSlash: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        expertise: resolve(root, 'expertise', 'index.html'),
        over: resolve(root, 'over', 'index.html'),
        contact: resolve(root, 'contact', 'index.html'),
      }
    }
  }
})