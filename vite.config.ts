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
      // Ensure environment variables are properly stringified
      __VITE_GEMINI_API_KEY__: JSON.stringify(env.VITE_GEMINI_API_KEY || ''),
    },
    envPrefix: ['VITE_'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
