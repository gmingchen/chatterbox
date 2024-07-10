export const WEBSOCKET_TYPE = {
  HEARTBEAT: 0, // 心跳
  PRIVATE_CHAT_MESSAGE: 1, // 私聊消息
  GROUP_CHAT_MESSAGE: 2, // 群聊消息

  FRIEND_APPLY: 3, // 好友申请
  PASS_FRIEND_APPLY: 4, // 通过好友申请
  REJECT_FRIEND_APPLY: 5, // 拒绝好友申请
  DELETE_FRIEND: 6, // 删除好友

  JOIN_GROUP: 11, // 加入群聊
  EXIT_GROUP: 12, // 退出群聊

  VOICE_APPLY: 13, // 语音请求
  VOICE_CANCEL: 14, // 取消语音请求
  VOICE_ACCEPT: 15, // 接听语音
  VOICE_REJECT: 16, // 拒绝语音
  VOICE_CLOSE: 17, // 关闭语音

  VIDEO_APPLY: 18, // 视频请求
  VIDEO_CANCEL: 19, // 取消视频请求
  VIDEO_ACCEPT: 20, // 接听视频
  VIDEO_REJECT: 21, // 拒绝视频
  VIDEO_CLOSE: 22, // 关闭视频

  USER_ONLINE: 23, // 用户上线
  USER_OFFLINE: 24, // 用户下线
}
