import { clearJson } from '@utils'

import { listApi } from '@/api/conversation'

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    active: null,
    list: [],
  }),
  actions: {
    /**
     * 获取会话列表
     * @param {*} params
     * @returns
     */
    async getList() {
      const r = await listApi()
      if (r) {
        this.$state.list = r.data
      }
    },
    /**
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
