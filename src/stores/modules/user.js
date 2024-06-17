import { clearJson } from '@utils'

import { userInfoApi } from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    nickname: '',
    avatar: '',
    sex: '',
    online: '',
    email: '',
    lastAt: '',
    status: '',
    createdAt: '',
    token: '',
    expireAt: ''
  }),
  actions: {
    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async getUserInfo() {
      const r = await userInfoApi()
      if (r) {
        this.$state = r.data
      }
      return r ? r.data : null
    },
    
    /**
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
