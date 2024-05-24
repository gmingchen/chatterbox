import { clearJson } from '@utils'

import { pageApi } from '@/api/message'

export const useRoomStore = defineStore('room', {
  state: () => ({
    list: [],
  }),
  actions: {
    /**
     * 获取会话列表
     * @param {*} params
     * @returns
     */
    async getList(roomId, lastId, size = 10) {
      const r = await pageApi({ roomId, lastId, size })
      if (r) {
        const messageList = r.data.reverse()
        const room = this.list.find(room => room.id === roomId)
        if (room) {
          const { messages } = room
          messages.unshift(...messageList)
        } else {
          this.list.push({
            id: roomId,
            messages: messageList,
            users: []
          })
        }
        return messageList
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
