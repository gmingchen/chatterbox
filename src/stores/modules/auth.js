import { dayjs } from 'element-plus'
import { clearJson } from '@utils'
import { getAuth, setAuth, clearAuth } from '@utils/storage'

import { loginApi, registerApi, logoutApi } from '@/api/auth'

const auth = getAuth()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: '',
    token: '',
    expiredAt: '',
    ...auth
  }),
  actions: {
    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async login(params) {
      const r = await loginApi(params)
      if (r) {
        setAuth(r.data)
        this.$state = r.data
      }
      return r
    },
    /**
     * 注册
     * @param {*} params
     * @returns
     */
    async register(params) {
      const r = await registerApi(params)
      if (r) {
        setAuth(r.data)
        this.$state = r.data
      }
      return r
    },
    /**
     * 退出登录
     */
    async logout() {
      const r = await logoutApi()
      return r
    },
    /**
     * 校验token 是否过期
     */
    validateToken() {
      const { token, expiredAt } = this.$state
      if (!token.trim() || dayjs(expiredAt).valueOf() < +new Date()) {
        return false
      }
      return true
    },
    /**
     * 清除数据
     */
    clear() {
      clearAuth()
      clearJson(this.$state)
    }
  }
})
