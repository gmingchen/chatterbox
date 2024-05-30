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

const uploadImage = '/file/upload/image'
/**
 * 上传图片消息
 * @param {*} params
 * @returns
 */
export function uploadImageApi(params) {
  return serviceHandle(uploadImage, params)
}
/**
 * 上传图片消息
 */
export function uploadImageUrl() {
  return `${ service.defaults.baseURL }/${ uploadImage }`
}

const uploadFile = '/file/upload/file'
/**
 * 上传图片消息
 * @param {*} params
 * @returns
 */
export function uploadFileApi(params) {
  return serviceHandle(uploadFile, params)
}
/**
 * 上传图片消息
 */
export function uploadFileUrl() {
  return `${ service.defaults.baseURL }/${ uploadFile }`
}

const uploadAudio = '/file/upload/audio'
/**
 * 上传音频消息
 * @param {*} params
 * @returns
 */
export function uploadAudioApi(blob) {
  const formData = new FormData()
  formData.append('file', blob,'.mp3');
  return serviceHandle(uploadAudio, formData)
}
/**
 * 上传音频消息
 */
export function uploadAudioUrl() {
  return `${ service.defaults.baseURL }/${ uploadAudio }`
}