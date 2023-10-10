import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import modal from '@/utils/modal'
import pinia from '@/store'

// 导入进度条样式
import 'nprogress/nprogress.css'

const app = createApp(App)

app.config.globalProperties.$modal = modal

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
  // 支持 large default small
  size: 'default',
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')

window.localStorage.clear()
