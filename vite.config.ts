import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  build: {
    target: 'esnext', // Support top-level await
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-scroll-area', '@radix-ui/react-collapsible'],
        }
      }
    }
  },
  css: {
    // Suppress esbuild CSS warnings for Tailwind arbitrary classes
    // that get picked up from markdown content strings
    devSourcemap: true,
  },
  esbuild: {
    logOverride: {
      'unsupported-css-property': 'silent',
    },
  },
});
