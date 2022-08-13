import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
        "@": resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: '../deploy/web'
  },
  
  server: {
    host: 'auth.hyong1232.com',
    port: 8083,
    proxy: {
        '/auth': {
            target: 'http://auth.hyong1232.com:8082/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/auth/, '')
        }
    }
  },
  plugins: [vue()]
})
