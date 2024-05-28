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
 * 获取语音
 * @param {*} callback 回调
 */
export function getVoice(start = () => {}, stop = () => {}) {
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
        const blob = new Blob(chunks, { 'type' : 'audio/wav' });
        stop(blob)
      });
    }).catch(() => {
      ElMessage({
        message: '无法访问到麦克风，请检查您的设备~',
        type: 'warning'
      })
    });
  } else {
    ElMessage({
      message: '您的环境暂时不支持语音哦~',
      type: 'warning'
    })
  }
}
