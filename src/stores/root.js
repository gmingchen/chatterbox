import { useApplyStore } from "./modules/apply"

export const useRootStore = defineStore('root', {
  state: () => ({}),
  getters: {},
  actions: {
    /**
     * 新增消息
     * @param {*} conversation 
     */
    addMessage(conversation) {
      const { roomId, message } = conversation
      useConversationStore().addConversation(conversation)
      useRoomStore().addRoom(roomId, message)
    },
    /**
     * 新增未读消息
     * @param {*} conversation 
     */
    addUnreadMessage(conversation) {
      this.addMessage(conversation)
      useConversationStore().setUnread(conversation.id)
    },
    /**
     * 更新消息状态
     */
    updateMessage(id, conversation, sendStatus){
      conversation.message.sendStatus = sendStatus
      useConversationStore().updateMessage(id, conversation)
      useRoomStore().updateMessage(id, conversation)
    },
    /**
     * 更新好友，群用户在线状态
     * @param {*} userId 用户ID
     * @param {*} online 在线状态
     */
    updateUserOnline(userId, online) {
      useConversationStore().updateUserOnline(userId, online)
      useGroupingStore().updateUserOnline(userId, online)
      useRoomStore().updateUserOnline(userId, online)
      useApplyStore().updateUserOnline(userId, online)
    },
    /**
     * 清除用户数据 用户信息
     * @param {*}
     */
    clearUserData() {
      useUserStore().clear()
    },
    /**
     * 清除所有数据
     * @param {*} param0
     */
    clearData() {
      this.clearUserData()
      useAuthStore().clear()
    }
  }
})
