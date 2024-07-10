import service from '..'

/**
 * 群房间用户分页列表
 * @param {*} params
 * @returns
 */
export function roomGroupUserPageApi(params) {
  return service({
    url: '/roomGroupUser/page',
    method: 'get',
    params
  })
}

/**
 * 群房间用户数量
 * @param {*} params
 * @returns
 */
export function roomGroupUserCountApi(params) {
  return service({
    url: '/roomGroupUser/count',
    method: 'get',
    params
  })
}
