import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import './registerServiceWorker'
import '@/assets/sass/index.scss'
import * as ElIconModules from '@element-plus/icons'
import { ElIcon } from 'element-plus'

const app = createApp(App)

// todo: 使用element icon
for (const iconName in ElIconModules) {
  app.component(`${ iconName }`, ElIconModules[iconName])
}

app.use(Router)
  .use(Store)
  .component('ElIcon', ElIcon) // todo: 全局注册一下组件 规避 Failed to resolve component
  .mount('#app')

app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
