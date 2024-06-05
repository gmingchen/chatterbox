import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'login' }, meta: { name: '重定向' } },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/layout/index.vue'),
      children: [
        {
          path: '/conversation',
          name: 'conversation',
          component: () => import('../views/conversation/index.vue')
        },
        {
          path: '/friend',
          name: 'friend',
          component: () => import('../views/friend/index.vue')
        },
        {
          path: '/group',
          name: 'group',
          component: () => import('../views/group/index.vue')
        },
        {
          path: '/apply',
          name: 'apply',
          component: () => import('../views/apply/index.vue')
        },
      ],
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.validateToken()) {
          await useUserStore().getUserInfo()
          next()
        } else {
          const rootStore = useRootStore()
          rootStore.clearData()
          next({ name: 'login', replace: true })
        }
      }
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  const authStore = useAuthStore()
  if (to.name === 'login' && authStore.validateToken()) {
    next({ name: 'conversation', replace: true })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
