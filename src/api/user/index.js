import service from '@/utils/request'
import { getApiBaseUrl } from '@/utils'

/**
 * @description: 获取用户信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selfInfoApi() {
  return service({
    url: '/im/user/self/info',
    method: 'get'
  })
}

/**
 * @description: 编辑基础信息
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function editBasicApi(params) {
  return service({
    url: '/im/user/update/basic',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑登录密码
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function editPasswordApi(params) {
  return service({
    url: '/im/user/update/password',
    method: 'post',
    data: params
  })
}

/**
 * @description: 上传
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function uploadApi() {
  let result = ''
  const url = '/im/file/upload'
  result = `${ getApiBaseUrl() + url }`
  return result
}

