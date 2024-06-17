import WebsocketClass from '@utils/websocket'
import { getWebsocketOrigin } from '@utils'
import { WEBSOCKET_MAPPING } from '@constants'
import { WEBSOCKET_TYPE } from '@enums/websocket'

export const useWebsocketStore = defineStore('websocket', {
  state: () => ({
    response: null,
    socket: null
  }),
  getters: {},
  actions: {
    /**
     * 初始化websocket
     */
    init() {
      if (!this.socket) {
        const url = `${ getWebsocketOrigin() }${ WEBSOCKET_MAPPING }/${ useAuthStore().token }`
        this.socket = new WebsocketClass(url, data => {
          if (data && data.type === WEBSOCKET_TYPE.HEARTBEAT) {
            return
          }
          this.response = data
          console.log('🚲~~:', data)
        })
        this.socket.connect()
      }
    },
    /**
     * 发送信息
     * @param {*} data
     */
    send(params) {
      this.socket.send(params)
    },
    /**
     * 手动断开websocket
     */
    close() {
      if (this.socket) {
        this.socket.close()
      }
      this.response = null
      this.socket = null
    }
  }
})
