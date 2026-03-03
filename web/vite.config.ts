import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // BASE_PATH: use for deployment to a subpath (e.g. GitHub Pages: /hyphai_web/)
    const basePath = env.BASE_PATH || process.env.BASE_PATH || '';
    const base = basePath ? (basePath.endsWith('/') ? basePath : `${basePath}/`) : '/';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      base,
      plugins: [react(), tailwindcss()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
