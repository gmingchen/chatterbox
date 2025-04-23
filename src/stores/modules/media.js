import { clearJson, getUserMedia } from '@utils'

import { MEDIA_TYPE, MEDIA_STATUS } from '@enums/media'

import { 
  voiceCallApi, voiceCancelApi, voiceRejectApi, voiceAcceptApi, voiceCloseApi, 
  videoCallApi, videoCancelApi, videoRejectApi, videoAcceptApi, videoCloseApi, 
} from '@/api/media'

/**
 * 通道处理器
 * @param {*} channel 管道
 */
const channelHandler = (store) => {
  const { channel } = store
  channel.onopen = async () => {
    console.log('open');
  }
  channel.onclose = () =>{
    if (store.active) {
      store.updateStatus(store.active.id, MEDIA_STATUS.CLOSED)
    }
    console.log('close');
  }
  channel.onmessage = (e) => {
    console.log('message', e);
  }
}
/**
 * 候选者处理器
 * @param {*} connection 连接
 */
const candidateHandler = (connection) => {
  return new Promise((resolve) => {
    if (connection.localDescription) {
      return resolve(connection.localDescription)
    }
    let localDescription = null
    connection.onicecandidate = ({ candidate }) => {
      if (!localDescription) {
        localDescription = connection.localDescription
        resolve(connection.localDescription)
      }
    }
  })
}

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

    // 连接
    connection: null,
    // 通道
    channel: null,
    // 媒体流
    mediaStream: null,
    // ontrack 事件
    ontrack: (event) => {
      const video = document.getElementById('video')
      video.srcObject = event.streams[0];
      video.play()
      console.log('ontrack', event);
    },
  }),
  actions: {
    /**
     * 初始化
     */
    async createConnection(type) {
      this.connection = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:206.237.13.237:3478',
            username: 'lys',
            credential: '123',
          }
        ]
      })
      // 要先获取 stream 才能 触发 ontrack 事件
      this.mediaStream = await getUserMedia(true, type === MEDIA_TYPE.VIDEO)
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(track => {
          this.connection.addTrack(track, this.mediaStream)
        });
      }

      this.channel = this.connection.createDataChannel('channel')
      channelHandler(this)

      this.connection.ontrack = this.ontrack
    },
    /**
     * 销毁
     */
    destroyConnection() {
      // 关闭所有的媒体流
      const streams = this.connection.getSenders()
      streams.forEach(stream => {
        if ('stop' in stream) {
          stream.stop();
        }
      })
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
      // 关闭所有的数据通道
      const dataChannels = this.connection.getTransceivers().filter(transceiver => transceiver.receiver && transceiver.receiver.track);
      dataChannels.forEach(channel => {
        channel.receiver.track.stop();
      });
      // 关闭信令通道
      const rtcChannels = this.connection.getTransceivers().filter(transceiver => transceiver.receiver && transceiver.receiver.rtpReceiver);
      rtcChannels.forEach(channel => {
        if (channel.receiver && channel.receiver.rtpReceiver) {
          channel.receiver.rtpReceiver.stop();
        }
      });
      // 关闭 RTCPeerConnection 实例
      this.connection.close()
    },

    /**
     * 呼叫
     * @param {*} user 用户
     */
    async call(user) {
      const { id, type } = user

      await this.createConnection(type)

      const offer = await this.connection.createOffer()
      this.connection.setLocalDescription(offer);

      const localDescription = await candidateHandler(this.connection) 
      
      const params = {
        description: JSON.stringify(localDescription),
        userId: id
      }
      const r = type === MEDIA_TYPE.VOICE ? await voiceCallApi(params) : await videoCallApi(params)
      if (r) {
        this.visible = true
        user = { ...user, status: MEDIA_STATUS.INVITING }
        this.open(user)
      } else {
        this.destroyConnection()
      }
    },
    /**
     * 取消呼叫
     */
    async cancel() {
      const { id, type } = this.active
      const params = { userId: id }
      const r = type === MEDIA_TYPE.VOICE ? await voiceCancelApi(params) : await videoCancelApi(params)
      if (r) {
        this.destroyConnection()
        this.close()
      }
    },
    /**
     * 拒绝
     * @param {*} id 用户ID
     */
    async reject(id) {
      const { type } = this.getUser(id)
      const params = { userId: id }
      const r = type === MEDIA_TYPE.VOICE ? await voiceRejectApi(params) : await videoRejectApi(params)
      if (r) {
        this.remove(id)
      }
    },
    /**
     * 接受
     * @param {*} id 
     */
    async accept(id) {
      const { description, type } = this.getUser(id)

      await this.createConnection(type)
      this.connection.ondatachannel = (e) => {
        this.channel = e.channel 
        channelHandler(this)
      }

      this.connection.setRemoteDescription(description)

      const answer = await this.connection.createAnswer()
      this.connection.setLocalDescription(answer);

      const localDescription = await candidateHandler(this.connection) 
      const params = {
        description: JSON.stringify(localDescription),
        userId: id
      }
      const r = type === MEDIA_TYPE.VOICE ? await voiceAcceptApi(params) : await videoAcceptApi(params)
      if (r) {
        this.updateStatus(id, MEDIA_STATUS.ING)
      }
    },
    /**
     * 挂断
     * @param {*} id 
     */
    async finish(id) {
      const { type } = this.getUser(id)
      const params = { userId: id }
      const r = type === MEDIA_TYPE.VOICE ? await voiceCloseApi(params) : await videoCloseApi(params)
      if (r) {
        this.destroyConnection()
        this.close()
      }
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
