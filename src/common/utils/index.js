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
    { compare: 'YYYY-MM', result: 'MM-DD' },
    { compare: 'YYYY', result: 'YYYY-MM' },
  ]

  for (let i = 0; i < formats.length; i++) {
    const { compare, result } = formats[i];
    if (currentDate.format(compare) === targetDate.format(compare)) {
      return targetDate.format(result)
    }
  }

  return currentDate.format('YYYY-MM')
}

/**
 * 录制语音
 * @param {*} callback 回调
 */
export function recordAudio(start = () => {}, stop = () => {}, fail = () => {}) {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      start(mediaRecorder)

      let chunks = [];
      mediaRecorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const blob = new Blob(chunks, { 'type' : 'audio/mp3' });
        stop(blob)
      });
    }).catch((error) => {
      ElMessage({
        message: '无法访问到麦克风，请检查您的设备~',
        type: 'warning'
      })
      fail(error)
    });
  } else {
    ElMessage({
      message: '您的环境暂时不支持语音哦~',
      type: 'warning'
    })
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


export function notification(title = '', content = '', icon = '', data = null, onclick = () => {}) {
  const notification = new Notification(title, { body: content, data, icon });
  notification.onclick = (e) => {
    // console.log(e);
    if (typeof onclick === 'function') {
      onclick(e)
    }
  }
  return notification
}


export function notificationPermission(title, content, icon, data, onclick = () => {}) {
  console.log(title, content, icon, data, onclick);
  if (window.Notification) {
    if (Notification.permission === 'granted') {
      notification(title, content, icon, data, onclick)
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          notification(title, content, icon, data, onclick)
        }
      });
    }
  }
}