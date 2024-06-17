import { clearJson } from '@utils'

import { listApi } from '@/api/expression'

export const useExpressionStore = defineStore('expression', {
  state: () => ({
    list: [],
  }),
  actions: {
    /**
     * 获取表情列表
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
