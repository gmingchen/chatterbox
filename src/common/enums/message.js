export const MESSAGE_TYPE = {
  TEXT: 0,
  IMAGE: 1,
  AUDIO: 2,
  FILE: 3,
}

export const messageTypeList = [
  { label: '文本', value: MESSAGE_TYPE.TEXT },
  { label: '图片', value: MESSAGE_TYPE.IMAGE },
  { label: '语音', value: MESSAGE_TYPE.AUDIO },
  { label: '文件', value: MESSAGE_TYPE.FILE },
]

export const MESSAGE_SEND_STATUS = {
  PENDING: 1, // 发送中
  SUCCESS: 2, // 发送成功
  FAIL: 3, // 发送失败
}
