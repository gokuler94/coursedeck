import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode, command }) => {
  // Load environment variables from multiple sources
  const loadedEnv = loadEnv(mode, process.cwd(), 'VITE_');
  const vercelEnv = process.env.VERCEL === '1';
  
  // Determine the API key from various sources
  const geminiApiKey = process.env.VITE_GEMINI_API_KEY || 
                      loadedEnv.VITE_GEMINI_API_KEY || 
                      'AIzaSyC2_BajQ89X1Ui2N8jafBQO4-m4Wt9VQ_c';
  
  console.log('Vite Build Config:', {
    mode,
    command,
    isVercel: vercelEnv,
    hasGeminiKey: !!geminiApiKey
  });

  return {
    plugins: [
      tailwindcss(),
    ],
    define: {
      // Define environment variables that will be replaced at build time
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiApiKey),
      'import.meta.env.MODE': JSON.stringify(mode),
      'import.meta.env.DEV': mode === 'development',
      'import.meta.env.PROD': mode === 'production',
      'import.meta.env.VERCEL': vercelEnv
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    }
  };
});
