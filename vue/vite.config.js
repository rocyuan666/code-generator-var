/*
 * @作者：rocyuan（袁鹏）
 * @邮箱：rocyuan666@163.com
 * @微信：rocyuan666
 * @github：https://github.com/rocyuan666
 */
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { createVitePlugins } from './vite/plugins'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('./', import.meta.url)))
  const { VITE_APP_ENV, VITE_APP_PROXY, VITE_APP_BASE_API, VITE_APP_PORT } = env

  const viteConfig = {
    base: VITE_APP_ENV === 'production' ? './' : './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            elementPlusIcon: ['@element-plus/icons-vue'],
            elementPlus: ['element-plus'],
          },
        },
      },
    },
    // 生产环境移除 console 与 debugger
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    server: {
      port: VITE_APP_PORT,
      host: true,
      open: false,
      proxy: {
        '/api': {
          target: VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: createVitePlugins(env, command === 'build'),
  }

  if (mode === 'development') {
    if (VITE_APP_PROXY === 'false') {
      delete viteConfig.server.proxy
    }
  }

  return viteConfig
})
