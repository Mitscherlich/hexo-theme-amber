import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const r = (...paths: string[]) => resolve(__dirname, ...paths)

export default defineConfig({
  root: r('./src'),
  publicDir: r('./public'),
  plugins: [vue(), vueJsx(), legacy()],
  build: {
    outDir: r('./source'),
  },
})
