import { clearJson } from '@utils'

import { pageApi } from '@/api/message'
import { roomGroupUserPageApi } from '@/api/room'

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
            users: []
          })
        }
        return messageList
      }
    },
    /**
     * 获取房间用户
     * @param {*} roomId 房间ID
     * @param {*} lastId 最后一个ID
     * @param {*} size 数据量
     * @returns 
     */
    async getUserList(roomId, lastId, size = 20) {
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
            users: userList
          })
        }
        return userList
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
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
