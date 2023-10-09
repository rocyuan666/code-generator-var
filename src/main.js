import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入进度条样式
import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
