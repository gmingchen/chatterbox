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
     * 新增会话 存在则更新消息
     * @param {*} conversation 
     */
    addConversation(conversation) {
      const { roomId, message } = conversation
      const exist = this.list.find(item => item.roomId === roomId) 
      if (exist) {
        exist.message = message
      } else {
        this.list.unshift(conversation)
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
