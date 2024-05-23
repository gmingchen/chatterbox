import { clearJson } from '@utils'

import { listApi } from '@/api/grouping'

export const useGroupingStore = defineStore('grouping', {
  state: () => ({
    list: [],
  }),
  actions: {
    /**
     * 获取分组好友列表
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
