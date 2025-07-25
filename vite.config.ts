import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env files
  const env = loadEnv(mode, process.cwd(), ['VITE_']);
  
  return {
    plugins: [
      tailwindcss(),
    ],
    define: {
      // Make env variables available at runtime
      'process.env': {
        VITE_GEMINI_API_KEY: JSON.stringify(process.env.VITE_GEMINI_API_KEY || env.VITE_GEMINI_API_KEY),
        NODE_ENV: JSON.stringify(mode)
      }
    },
    envPrefix: ['VITE_'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
