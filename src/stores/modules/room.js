import { ONLINE_STATUS } from '@enums/user'
import { clearJson } from '@utils'

import { pageApi } from '@/api/message'
import { roomGroupUserPageApi, roomGroupUserCountApi } from '@/api/room'

export const useRoomStore = defineStore('room', {
  state: () => ({
    list: [],
  }),
  actions: {
    /**
     * 获取消息列表
     * @param {*} roomId 房间ID
     * @param {*} lastId 最后一个ID
     * @param {*} size 数据量
     * @returns
     */
    async getMessageList(roomId, lastId, size = 10) {
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
            userTotalCount: 0,
            userOnlineCount: 0,
            users: []
          })
        }
        return messageList
      }
    },
    /**
     * 更新消息
     * @param {*} id 消息ID
     * @param {*} conversation 会话
     */
    updateMessage(messageId, conversation){
      const { roomId, message } = conversation
      for (let i = 0; i < this.list.length; i++) {
        const { messages } = this.list[i];
        for (let j = 0; j < messages.length; j++) {
          if (messageId === messages[j].id) {
            messages[j] = message
            return
          }
        }
      }
    },
    /**
     * 获取房间用户
     * @param {*} roomId 房间ID
     * @param {*} lastId 最后一个ID
     * @param {*} size 数据量
     * @returns 
     */
    async getUserList(roomId, lastId, size = 40) {
      const r = await roomGroupUserPageApi({ roomId, lastId, size })
      if (r) {
        const userList = r.data
        const room = this.list.find(room => room.id === roomId)
        if (room) {
          const { users } = room
          users.push(...userList)
        } else {
          this.list.push({
            id: roomId,
            messages: [],
            userTotalCount: 0,
            userOnlineCount: 0,
            users: userList
          })
        }
        return userList
      }
    },
    /**
     * 获取房间用户数量
     * @param {*} roomId 房间ID
     * @returns 
     */
    async getUserCount(roomId) {
      const r = await roomGroupUserCountApi({ roomId })
      if (r) {
        const { totalCount, onlineCount } = r.data
        const room = this.list.find(room => room.id === roomId)
        if (room) {
          room.userTotalCount = totalCount
          room.userOnlineCount = onlineCount
        } else {
          this.list.push({
            id: roomId,
            messages: [],
            userTotalCount: totalCount,
            userOnlineCount: onlineCount,
            users: [],
          })
        }
        return r.data
      }
    },
    
    /**
     * 新增房间 存在则新增消息 不存在则获取消息列表
     * @param {*} roomId 房间ID
     * @param {*} message 消息
     */
    addRoom(roomId, message) {
      const room = this.list.find(item => item.id === roomId)
      if (room) {
        room.messages.push(message)
      } else {
        this.getMessageList(roomId)
      }
    },
    /**
     * 添加用户
     */
    addUser(user) {
      const room = this.list.find(room => room.id === user.roomId)
      if (room) {
        const { users } = room
        const { roomUserId } = users[users.length - 1]
        if (user.roomUserId === roomUserId + 1) {
          users.push(user)
        }
        room.userTotalCount += 1
        room.userOnlineCount += 1
      }
    },
    /**
     * 更新用户信息
     * @param {*} id 房间ID
     * @param {*} nickname 消息
     */
    updateUser(user){
      this.list.forEach(room => {
        const { users } = room
        for (let i = 0; i < users.length; i++) {
          const item = users[i];
          if (item.id === user.id) {
            item.nickname = user.nickname,
            item.avatar = user.avatar,
            item.sex = user.sex
            break
          }
        }
      });
    },
    /**
     * 更新用户在线状态
     * @param {*} userId 用户ID
     * @param {*} online 在线状态
     */
    updateUserOnline(userId, online) {
      for (let i = 0; i < this.list.length; i++) {
        const room = this.list[i];
        const { users } = room
        inner:for (let j = 0; j < users.length; j++) {
          const user = users[j];
          if (user.id === userId) {
            user.online = online
            if (online === ONLINE_STATUS.ONLINE) {
              room.userOnlineCount += 1
            } else if (online === ONLINE_STATUS.OFFLINE) {
              room.userOnlineCount -= 1
            }
            break inner;
          }
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
