import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import '@/assets/sass/index.scss' // 全局样式

const app = createApp(App)

app.use(router)
  .use(pinia)
  .mount('#app')
