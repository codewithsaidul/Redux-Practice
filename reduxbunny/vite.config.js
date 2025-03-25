import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // test: {
  //   environment: 'jsdom', // jsdom ব্যবহার করবো যাতে document অবজেক্ট পাওয়া যায়
  //   setupFiles: './src/setupTests.js',
  // },
})
