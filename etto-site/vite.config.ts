import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        // Separate HTML entry so the NYFW route gets its own share-link
        // title/OG tags without needing a server-rendered app.
        nyfw: path.resolve(__dirname, 'nyfw.html'),
      },
    },
  },
});
