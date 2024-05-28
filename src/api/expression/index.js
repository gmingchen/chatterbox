import service from '..'

/**
 * 表情选择列表
 * @param {*} params
 * @returns
 */
export function listApi() {
  return service({
    url: '/expression/select',
    method: 'get',
  })
}
