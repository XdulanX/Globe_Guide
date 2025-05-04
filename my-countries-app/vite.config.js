import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // Import the Tailwind Vite plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),        // Keep the React plugin
    tailwindcss(),  // Add the Tailwind Vite plugin
  ],
})
