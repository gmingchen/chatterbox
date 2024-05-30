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

/**
 * 新增会话
 * @param {*} params
 * @returns
 */
export function createApi(data) {
  return service({
    url: '/conversation/create',
    method: 'post',
    data
  })
}
