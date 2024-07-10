import { clearJson } from '@utils'

import { auditCountApi, pageApi } from '@/api/apply'

export const useApplyStore = defineStore('apply', {
  state: () => ({
    auditCount: 0,
    active: null,
    list: [],
  }),
  actions: {
    /**
     * 获取待审核数量
     */
    async getAuditCount() {
      const r = await auditCountApi()
      if (r) {
        this.auditCount = r.data
      }
    },
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
      this.auditCount += 1
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
      this.auditCount = this.auditCount > 0 ? this.auditCount - 1 : 0
    },
    /**
     * 更新用户在线状态
     * @param {*} userId 用户ID
     * @param {*} online 在线状态
     */
    updateUserOnline(userId, online) {
      for (let i = 0; i < this.list.length; i++) {
        const { user } = this.list[i];
        if (user.id === userId) {
          user.online = online
        }
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
