/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-11 10:06:05
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 20:05:28
 */
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'

const routes = [
  { path: '/', redirect: { name: 'login' }, meta: { title: '重定向' } },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/index.vue'),
    meta: { title: '聊天' },
    async beforeEnter(_to, _from, next) {
      // 获取用户信息
      const userResponse = await store.dispatch('user/getUser')
      if (!userResponse) {
        next()
        return
      }
      // 获取聊天会话
      const conversationResponse = await store.dispatch('conversation/getConversations')
      if (!conversationResponse) {
        next()
        return
      }
      // 获取好友分组列表及分组内好友
      const groupResponse = await store.dispatch('friend/getGroups')
      if (!groupResponse) {
        next()
        return
      }
      // 获取好友申请列表
      const friendApplysResponse = await store.dispatch('friend/getApplys')
      if (!friendApplysResponse) {
        next()
        return
      }
      // 初始化websocket
      store.dispatch('websocket/init')

      next()
    }
  },
  { path: '/:pathMatch(.*)', redirect: { name: 'login' } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  NProgress.start()
  // 跳转到登录页清除所有信息
  if (to.name === 'login') {
    store.dispatch('clear')
    next()
  } else {
    const token = store.getters['user/tokenVal']
    if (!token || !/\S/u.test(token)) {
      next({ name: 'login', replace: true })
    } else {
      next()
    }
  }
})

router.afterEach((_to, _from) => {
  NProgress.done()
})

export default router
