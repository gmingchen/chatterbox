import { clearJson } from '@utils'
import { connection, channel, createChannel, offerHandler, answerHandler, remoteHandler } from '@utils/connection'
import { MEDIA_TYPE, MEDIA_STATUS } from '@enums/media'

import { voiceCallApi, voiceCancelApi, voiceRejectApi, voiceAcceptApi, videoCallApi } from '@/api/media'

/**
 * user 对象 属性
 * @param {*} id 用户ID
 * @param {*} avatar 头像
 * @param {*} name 名称
 * @param {*} type 类型
 * @param {*} status 类型
 * @param {*} description 描述
 * @param {*} notification 提醒
 */


export const useMediaStore = defineStore('media', {
  state: () => ({
    visible: false,
    // 当前窗口呼叫的用户
    active: null,
    // 呼叫队列
    queue: [],
  }),
  actions: {
    /**
     * 呼叫
     * @param {*} user 用户
     */
    async call(user) {
      createChannel()

      const { id, type } = user

      const offer = await offerHandler()
      const params = {
        description: JSON.stringify(offer),
        userId: id
      }
      const r = type === MEDIA_TYPE.VOICE ? await voiceCallApi(params) : await videoCallApi(params)
      if (r) {
        this.visible = true
        user = { ...user, status: MEDIA_STATUS.INVITING }
        this.open(user)
      }    

    },
    /**
     * 取消呼叫
     */
    async cancel() {
      const { id, type } = this.active
      const params = { userId: id }
      const r = type === MEDIA_TYPE.VOICE ? await voiceCancelApi(params) : await voiceCancelApi(params)
      if (r) {
        this.close()
      }
    },
    /**
     * 拒绝
     * @param {*} id 用户ID
     */
    async reject(id) {
      const params = { userId: id }
      const r = await voiceRejectApi(params)
      if (r) {
        this.remove(id)
      }
    },
    /**
     * 接受
     * @param {*} id 
     */
    async accept(id) {
      const { description } = this.getUser(id)
      remoteHandler(description)
      const answer = await answerHandler()
      const params = {
        description: JSON.stringify(answer),
        userId: id
      }
      const r = await voiceAcceptApi(params)
      if (r) {
        this.updateStatus(id, MEDIA_STATUS.ING)
      }
      
      console.log(connection);
    },
    

    /**
     * 打开窗口
     * @param {*} user 用户
     */
    open(user) {
      this.visible = true
      this.active = user
      this.addUser(user)
    },
    /**
     * 关闭窗口
     */
    close() {
      this.visible = false
      this.remove(this.active.id)
    },
    /**
     * 添加用户到队列
     * @param {*} user 用户
     */
    addUser(user) {
      this.queue = this.queue.filter(item => item.id !== user.id)
      this.queue.push(user)
    },
    /**
     * 移除队列
     * @param {*} id 用户ID
     */
    remove(id) {
      if (this.active && this.active.id === id) {
        this.active = null
      }
      this.queue = this.queue.filter(item => item.id !== id)
    },
    /**
     * 获取队列用户
     * @param {*} id 用户ID
     * @returns 
     */
    getUser(id) {
      return this.queue.find(item => item.id === id)
    },
    /**
     * 更新用户状态
     * @param {*} id 
     * @param {*} status 
     */
    updateStatus(id, status) {
      const user = this.getUser(id)
      if (user) {
        user.status = status
      }
    },
    /**
     * 更新用户描述
     * @param {*} id 
     * @param {*} description 
     */
    updateDescription(id, description) {
      const user = this.getUser(id)
      if (user) {
        user.description = description
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
