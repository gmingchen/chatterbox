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


/**
 * 分组选择列表
 * @param {*} params
 * @returns
 */
export function selectListApi() {
  return service({
    url: '/grouping/select',
    method: 'get',
  })
}