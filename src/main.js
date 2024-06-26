import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import '@/assets/sass/index.scss' // 全局样式
import Directive from '@/directive' // 自定义指令

const app = createApp(App)

app.use(router)
  .use(pinia)
  .use(Directive)
  .mount('#app')
