import service from '../'

/**
 * 注册验证码
 * @param {*} params
 * @returns
 */
export function registerCaptchaApi(params) {
  return service({
    url: '/auth/captcha/register',
    method: 'get',
    params
  })
}

/**
 * 注册
 * @param {*} params
 * @returns
 */
export function registerApi(data) {
  return service({
    url: '/auth/register',
    method: 'post',
    data
  })
}

/**
 * 登录验证码
 * @param {*} params
 * @returns
 */
export function loginCaptchaApi(params) {
  return service({
    url: '/auth/captcha/login',
    method: 'get',
    params
  })
}

/**
 * 登录
 * @param {*} params
 * @returns
 */
export function loginApi(data) {
  return service({
    url: '/auth/login',
    method: 'post',
    data
  })
}


/**
 * 获取当前用户信息
 * @param {*} params
 * @returns
 */
export function userInfoApi() {
  return service({
    url: '/auth/user/info',
    method: 'get',
  })
}

/**
 * 退出登录
 * @param {*} params
 * @returns
 */
export function logoutApi(data) {
  return service({
    url: '/auth/logoff',
    method: 'post',
    data
  })
}
