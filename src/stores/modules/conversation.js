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
      const { roomId, message } = conversation
      const exist = this.list.find(item => item.roomId === roomId) 
      if (exist) {
        exist.message = message
      } else {
        this.list.unshift(conversation)
      }
    },
    /**
     * 更新消息
     * @param {*} id 消息ID
     * @param {*} conversation 会话
     */
    updateMessage(messageId, conversation){
      for (let i = 0; i < this.list.length; i++) {
        const row = this.list[i];
        if (messageId === row.message.id){
          row.message = conversation.message
          return
        }
      }
    },
    /**
     * 设置未读
     * @param {*} id 
     */
    setUnread(id) {
      const conversation = this.list.find(item => item.id === id)
      if (conversation.unread) {
        conversation.unread += 1
      } else {
        conversation.unread = 1
      }
    },
    /**
     * 设置已读
     * @param {*} id 
     * @returns 
     */
    setRead(id) {
      const conversation = this.list.find(item => item.id === id)
      conversation.unread = 0
      return conversation
    },
    /**
     * 设置选中
     * @param {*} conversation 
     */
    setActive({ id }) {
      const conversation = this.setRead(id)
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
