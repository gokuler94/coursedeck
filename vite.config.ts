import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode, command }) => {
  // Load env files (.env, .env.production)
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  
  // Log environment info during build
  if (command === 'build') {
    console.log('Build Environment:', {
      mode,
      command,
      hasGeminiKey: !!env.VITE_GEMINI_API_KEY,
      envVars: Object.keys(env).filter(key => key.startsWith('VITE_'))
    });
  }
  
  return {
    plugins: [
      tailwindcss(),
    ],
    define: {
      // Make sure environment variables are available at runtime
      __GEMINI_API_KEY__: JSON.stringify(env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
      'process.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
      'import.meta.env.MODE': JSON.stringify(mode),
      'import.meta.env.DEV': mode === 'development',
      'import.meta.env.PROD': mode === 'production'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    }
  };
});
