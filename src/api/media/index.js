import service from '..'

/**
 * 语音请求
 * @param {*} params
 * @returns
 */
export function voiceApi(data) {
  return service({
    url: '/media/voice',
    method: 'post',
    data
  })
}

/**
 * 视频请求
 * @param {*} params
 * @returns
 */
export function videoApi(data) {
  return service({
    url: '/media/video',
    method: 'post',
    data
  })
}
