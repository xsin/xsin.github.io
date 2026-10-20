import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: null,
      includeAssets: ['icons/*.png', 'fonts/*.woff2'],
      manifest: {
        name: 'XSin Studio — Local-first software',
        short_name: 'XSin',
        description:
          'Local-first macOS tools by XSin Studio: AI Bobby, a local AI gateway, and O Muse, the musician’s toolbox.',
        id: './',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#06070a',
        theme_color: '#06070a',
        lang: 'en',
        dir: 'ltr',
        categories: ['design', 'productivity', 'developer'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        shortcuts: [
          { name: 'AI Bobby', short_name: 'AI Bobby', url: './#/work/ai-bobby' },
          { name: 'O Muse', short_name: 'O Muse', url: './#/work/o-muse' }
        ]
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,woff2,png,svg,webmanifest}'],
        cleanupOutdatedCaches: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2022'
  }
});
