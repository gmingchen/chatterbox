import { dayjs, ElMessage } from 'element-plus'
import { MESSAGE_TYPE, messageTypeList } from '@enums/message'

/**
 * @description: 置空json数据
 * @param {*} data json数据
 * @return {*}
 * @author: gumingchen
 */
export function clearJson(data) {
  const json = data
  let key
  for (key in json) {
    if (json[key] instanceof Array) {
      json[key] = []
    } else if (typeof json[key] === 'object' && Object.prototype.toString.call(json[key]).toLowerCase() === '[object object]' && !json[key].length) {
      json[key] = {}
    } else {
      json[key] = ''
    }
  }
}

/**
 * blob 转 json
 * @param {*} blob
 */
export function blob2Json(blob) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.readAsText(blob, 'utf-8')
      reader.addEventListener('loadend', () => {
        try {
          const result = JSON.parse(reader.result)
          resolve(result)
        } catch (error) {
          reject({})
        }
      })
    } catch (error) {
      reject({})
    }
  })
}

/**
 * 消息格式化
 * @param {*} name 名称
 * @param {*} type 消息类型
 * @param {*} text 消息内容
 * @returns 
 */
export function messageFormat(name, type, text) {
  let message = name ? `${ name }：` : ''
  if (type !== MESSAGE_TYPE.TEXT) {
    const row = messageTypeList.find(item => item.value === type)
    if (row) {
      message += `[${ row.label }]`
    }
  } else {
    message += text
  }
  return message
}

/**
 * 日期格式化
 * @param {*} date 日期
 */
export function dateFormat(date) {
  const currentDate = dayjs()
  const targetDate = dayjs(date)

  const formats = [
    { compare: 'YYYY-MM-DD', result: 'HH:mm' },
    { compare: 'YYYY-MM', result: 'MM/DD' },
    { compare: 'YYYY', result: 'MM/DD' },
  ]

  for (let i = 0; i < formats.length; i++) {
    const { compare, result } = formats[i];
    if (currentDate.format(compare) === targetDate.format(compare)) {
      return targetDate.format(result)
    }
  }

  return currentDate.format('YY/MM')
}

/**
 * @param {*} time
 * @returns {string}
 */
export function timeFormat(time) {
  const currentTime = dayjs()
  const targetTime = dayjs(time)

  const formats = [
    { compare: 'YYYY-MM-DD', result: 'HH:mm:ss' },
    { compare: 'YYYY-MM', result: 'MM/DD HH:mm' },
    { compare: 'YYYY', result: 'MM/DD HH:mm' },
  ]

  for (let i = 0; i < formats.length; i++) {
    const { compare, result } = formats[i];
    if (currentTime.format(compare) === targetTime.format(compare)) {
      return targetTime.format(result)
    }
  }

  return currentTime.format('YY/MM HH:mm')
}

/**
 * @description: json 转 param
 * @param {Object} json json数据
 * @return {*}
 * @author: gumingchen
 */
export function parseJson2Param(json) {
  let result = ''
  result = Object.keys(json)
    .map(key => {
      if (!json[key]) return ''
      const temp = encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      return temp
    })
    .join('&')
  return result
}

/**
 * @description: param 转 json
 * @param {String} url 链接
 * @return {*}
 * @author: gumingchen
 */
export function parseParam2Json(url) {
  const result = {}
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/gu, ' ')
  if (search) {
    const searchArr = search.split('&')
    searchArr.forEach(r => {
      const index = r.indexOf('=')
      if (index !== -1) {
        const key = r.substring(0, index)
        const val = r.substring(index + 1, r.length)
        result[key] = val
      }
    })
  }
  return result
}

/**
 * @description: 生成UUID
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function generateUUID() {
  let result = ''
  const code = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  result = code.replace(/[xy]/gu, item => {
    const random = (Math.random() * 16) | 0
    const value = item === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
  return result
}

/**
 * 请求文件
 * @param {*} url 文件资源路径 
 * @returns 
 */
export async function fetchFile(url) {
  const r = await fetch(url)
  console.log(r);
  if (r.ok) {
    return r.blob()
  }
}
/**
 * @description: 文件下载
 * @param {*} blob
 * @param {*} name 文件名称
 * @return {*}
 * @author: gumingchen
 */
export function downloadFile(blob, name) {
  if (blob) {
    const href = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = href
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(href)
  }
}

/**
 * 获取用户媒体
 * @param {*} audio 音频 
 * @param {*} video 视频
 * @returns 
 */
export async function getUserMedia(audio = false, video = false) {
  if (navigator.mediaDevices.getUserMedia) {
    try {
      return await navigator.mediaDevices.getUserMedia({ audio, video })
    } catch (error) {
      ElMessage({
        message: '未检测到您的设备，请检查您的设备哦~',
        type: 'warning'
      })
    }
  } else {
    ElMessage({
      message: '您的环境暂时不支持哦~',
      type: 'warning'
    })
  }
}
/**
 * 录制语音
 * @param {*} callback 回调
 */
export async function recordAudio(start = () => {}, stop = () => {}, fail = () => {}) {
  const stream = await getUserMedia(true)
  if (stream) {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    start(mediaRecorder)

    let chunks = [];
    mediaRecorder.addEventListener('dataavailable', (e) => {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const blob = new Blob(chunks, { 'type' : 'audio/mp3' });
      // 关闭
      stream.getTracks().forEach(track => {
        track.stop();
      });
      stop(blob)
    });
  } else {
    fail()
  }
}

/**
 * 获取websock链接地址
 */
export function getWebsocketOrigin() {
  let { protocol, host } = window.location
  if (protocol === 'http:') {
    protocol = `ws:`
  } else if (protocol === 'https:') {
    protocol = 'wss:'
  }
  return `${protocol}//${ host }`
}

/**
 * 构建提示
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} icon 图标
 * @param {*} data 数据
 * @param {*} onclick 点击事件
 * @returns 
 */
function notificationHandler(title = '', content = '', icon = '', data = null, onclick = () => {}) {
  const notification = new Notification(title, { body: content, data, icon });
  if (typeof onclick === 'function') {
    notification.onclick = onclick
  }
  return notification
}

/**
 * 授权提示 并 提示
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} icon 图标
 * @param {*} data 数据
 * @param {*} onclick 点击事件
 */
export function notification(title, content, icon, data, onclick = () => {}) {
  if (window.Notification) {
    if (Notification.permission === 'granted') {
      notificationHandler(title, content, icon, data, onclick)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          notificationHandler(title, content, icon, data, onclick)
        }
      })
    }
  }
}