import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_GLOB_APP_TITLE
          }
        }
      }),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      watch: {
        usePolling: true // 启用轮询
      },
      port: Number(env.VITE_PORT),
      host: '0.0.0.0',
      fs: {
        // Allow serving files from one level up to the project rootW
        allow: ['..']
      }
    },
    base: './',
    build: {
      outDir: 'docs',
      assetsDir: 'static'
    }
  }
})
