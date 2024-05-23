import service from '..'

/**
 * 分组好友列表
 * @param {*} params
 * @returns
 */
export function listApi() {
  return service({
    url: '/grouping/friend',
    method: 'get',
  })
}
