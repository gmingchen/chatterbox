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