import service from '..'

/**
 * 更新基本信息
 * @param {*} params
 * @returns
 */
export function updateApi(data) {
  return service({
    url: '/user/update',
    method: 'post',
    data
  })
}

/**
 * 更新邮箱验证码
 * @param {*} params
 * @returns
 */
export function updateEmailCaptchaApi(params) {
  return service({
    url: '/user/update/email/captcha',
    method: 'get',
    params
  })
}

/**
 * 更新邮箱
 * @param {*} params
 * @returns
 */
export function updateEmailApi(data) {
  return service({
    url: '/user/update/email',
    method: 'post',
    data
  })
}
