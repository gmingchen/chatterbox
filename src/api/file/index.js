import service from '../'
import { ContentType } from '@enums'

/**
 * 参数处理
 * @param {*} params 参数
 * @returns 
 */
const paramsHandle = (params) => {
  const formData = new FormData()
  for (const key in params) {
    formData.append(key, params[key])
  }
  return formData
}
/**
 * service统一处理
 * @param {*} url api
 * @param {*} params 参数
 * @returns 
 */
const serviceHandle = (url, params) => {
  const data = paramsHandle(params)
  return service({
    url,
    method: 'post',
    data,
    headers: {
      'Content-Type': ContentType.UPLOAD
    }
  })
}

const uploadAvatar = '/file/upload/avatar'
/**
 * 上传头像
 * @param {*} params
 * @returns
 */
export function uploadAvatarApi(params) {
  return serviceHandle(uploadAvatar, params)
}
/**
 * 上传头像
 */
export function uploadAvatarUrl() {
  return `${ service.defaults.baseURL }/${ uploadAvatar }`
}
