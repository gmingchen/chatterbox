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
}
