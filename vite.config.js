const { resolve } = require('node:path')

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        writing: resolve(__dirname, 'writing/index.html'),
      },
    },
  },
}
