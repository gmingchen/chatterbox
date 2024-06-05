import { clearJson } from '@utils'

import { listApi } from '@/api/conversation'

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    active: null,
    list: [],
  }),
  getters: {
    hasUnread: ({ list }) => {
      return list.some(item => item.unread > 0)
    }
  },
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
      const { id, roomId, message } = conversation
      const exist = this.list.find(item => item.roomId === roomId) 
      if (exist) {
        exist.message = message
        if (!this.active || this.active.id !== id) {
          exist.unread = exist.unread ? exist.unread + 1 : 1
        }
      } else {
        this.list.unshift({ ...conversation, unread: message ? 1 : 0 })
      }
    },
    /**
     * 设置选中
     * @param {*} conversation 
     */
    setActive({ id }) {
      const conversation = this.list.find(item => item.id === id)
      conversation.unread = 0
      this.active = conversation
    },
    /**
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
