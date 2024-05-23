import service from '..'

/**
 * 会话列表
 * @param {*} params
 * @returns
 */
export function listApi() {
  return service({
    url: '/conversation/list',
    method: 'get',
  })
}
