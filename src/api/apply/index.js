import service from '..'

/**
 * 好友申请
 * @param {*} params
 * @returns
 */
export function applyFriendApi(data) {
  return service({
    url: '/apply/friend',
    method: 'post',
    data
  })
}

/**
 * 审核好友
 * @param {*} params
 * @returns
 */
export function reviewFriendApi(data) {
  return service({
    url: '/apply/friend/review',
    method: 'post',
    data
  })
}


/**
 * 审核列表
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/apply/page',
    method: 'get',
    params
  })
}