import { dayjs } from 'element-plus'
import { clearJson } from '@utils'
import { getAuth, setAuth, clearAuth } from '@utils/storage'

import { loginApi, registerApi, loginQQApi, logoutApi } from '@/api/auth'

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
     * 登入系统
     * @param {*} api 接口
     * @param {*} params 参数
     * @returns 
     */
    async sign(api, params) {
      const r = await api(params)
      if (r) {
        setAuth(r.data)
        this.$state = r.data
      }
      return r
    },
    /**
     * 登录
     * @param {*} params
     * @returns
     */
    login(params) {
      return this.sign(loginApi, params)
    },
    /**
     * 注册
     * @param {*} params
     * @returns
     */
    async register(params) {
      return this.sign(registerApi, params)
    },
    /**
     * QQ登录
     * @param {*} params
     * @returns
     */
    async qqLogin(params) {
      return this.sign(loginQQApi, params)
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
