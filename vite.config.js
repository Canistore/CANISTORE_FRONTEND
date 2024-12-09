import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

const getGitVersion = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch (e) {
    return 'unknown'
  }
}

const now = new Date()
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    BUILD_TIME: JSON.stringify(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    ),
    GIT_VERSION: JSON.stringify(getGitVersion())
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/allApi': {
        target: 'https://aigenus.aijixi.cn/',
        changeOrigin: true
      }
    }
  }
})
