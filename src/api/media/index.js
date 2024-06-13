import service from '..'

/**
 * 语音请求
 * @param {*} params
 * @returns
 */
export function voiceCallApi(data) {
  return service({
    url: '/media/voice/call',
    method: 'post',
    data
  })
}
/**
 * 取消语音请求
 * @param {*} params
 * @returns
 */
export function voiceCancelApi(data) {
  return service({
    url: '/media/voice/cancel',
    method: 'post',
    data
  })
}
/**
 * 接受语音请求
 * @param {*} params
 * @returns
 */
export function voiceAcceptApi(data) {
  return service({
    url: '/media/voice/accept',
    method: 'post',
    data
  })
}

/**
 * 拒绝语音请求
 * @param {*} params
 * @returns
 */
export function voiceRejectApi(data) {
  return service({
    url: '/media/voice/reject',
    method: 'post',
    data
  })
}

/**
 * 挂断语音通话
 * @param {*} params
 * @returns
 */
export function voiceCloseApi(data) {
  return service({
    url: '/media/voice/close',
    method: 'post',
    data
  })
}

/**
 * 视频请求
 * @param {*} params
 * @returns
 */
export function videoCallApi(data) {
  return service({
    url: '/media/video/call',
    method: 'post',
    data
  })
}
