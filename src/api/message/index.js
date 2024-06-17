import service from '..'

/**
 * 消息分页列表
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/message/page/id',
    method: 'get',
    params
  })
}

/**
 * 发送消息
 * @param {*} data
 * @returns
 */
export function sendApi(data) {
  return service({
    url: '/message/create',
    method: 'post',
    data
  })
}