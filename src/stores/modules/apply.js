import { clearJson } from '@utils'

import { pageApi } from '@/api/apply'

export const useApplyStore = defineStore('apply', {
  state: () => ({
    active: null,
    list: [],
  }),
  actions: {
    /**
     * 获取消息列表
     * @param {*} lastId 最后一个ID
     * @param {*} size 数据量
     * @returns
     */
    async getList(lastId, size = 10) {
      const r = await pageApi({ lastId, size })
      if (r) {
        this.list.push(...r.data)
        return this.list
      }
    },
    /**
     * 设置选中
     * @param {*} apply 
     */
    setActive({ id }) {
      const apply = this.list.find(item => item.id === id)
      this.active = apply
    },
    /**
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
