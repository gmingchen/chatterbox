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
