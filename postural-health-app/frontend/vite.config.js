import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- ADDED: Development Server Configuration with Proxy ---
  server: {
    proxy: {
      // All requests starting with '/api' (e.g., /api/users/login) 
      // will be forwarded to the backend running on http://localhost:5000
      '/api': {
        target: 'http://localhost:3000', // <-- CHANGE THIS PORT if your backend is different
        changeOrigin: true, // Necessary for cross-origin requests
        secure: false, // Set to true if your backend uses HTTPS
      },
    },
  },
  // -----------------------------------------------------------
});