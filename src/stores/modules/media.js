import { clearJson } from '@utils'
import { offerHandler } from '@utils/connection'
import { MEDIA_TYPE, MEDIA_STATUS } from '@enums/media'

import { voiceCallApi, voiceCancelApi, videoCallApi } from '@/api/media'

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
     * @param {*} id 用户ID
     * @param {*} avatar 头像
     * @param {*} name 名称
     * @param {*} type 类型
     * @param {*} status 类型
     * @param {*} description 描述
     */
    async call(user) {
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
     * @param {*} id 
     */
    async cancel() {
      const { id, type } = this.active
      const params = { userId: id }
      const r = type === MEDIA_TYPE.VOICE ? await voiceCancelApi(params) : await voiceCancelApi(params)
      if (r) {
        this.close()
      }
    },

    async accept() {},
    async reject() {},


    /**
     * 打开窗口
     * @param {*} user 
     * @param {*} id 用户ID
     * @param {*} avatar 头像
     * @param {*} name 名称
     * @param {*} type 类型
     * @param {*} status 类型
     * @param {*} description 描述
     */
    open(user) {
      this.visible = true
      this.active = user
      this.addUser(user)
    },

    /**
     * 添加用户到队列
     */
    addUser(user) {
      this.queue = this.queue.filter(item => item.id !== user.id)
      this.queue.push(user)
    },

    /**
     * 关闭窗口
     */
    close() {
      this.visible = false
      this.remove(this.active.id)
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
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
