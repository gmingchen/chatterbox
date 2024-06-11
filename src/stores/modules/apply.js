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
     * @param {*} size 数据量
     * @returns
     */
    async getList(size = 10) {
      let lastId = ''
      const length = this.list.length
      if (length) {
        lastId = this.list[length - 1].id
      }
      const r = await pageApi({ lastId, size })
      if (r) {
        this.list.push(...r.data)
        return r.data
      }
    },
    /**
     * 新增需求
     * @param {*} apply 
     */
    addApply(apply) {
      this.list.unshift(apply)
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
     * 设置状态
     * @param {*} id 
     * @param {*} status 
     */
    setStatus(id, status) {
      const apply = this.list.find(item => item.id === id)
      apply.status = status
    },
    /**
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
