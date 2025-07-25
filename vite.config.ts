import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env file and process.env
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), 'VITE_')
  };
  
  return {
    plugins: [
      tailwindcss(),
    ],
    define: {
      // Expose environment variables
      'import.meta.env': JSON.stringify({
        ...env,
        VITE_GEMINI_API_KEY: env.VITE_GEMINI_API_KEY,
        MODE: mode,
        DEV: mode === 'development',
        PROD: mode === 'production',
        SSR: false
      })
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    }
  };
});
