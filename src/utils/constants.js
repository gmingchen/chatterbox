export const ContentType = {
  JSON: 'application/json;charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD: 'multipart/form-data'
}
export const StorageType = {
  COOKIE: 'cookie',
  SESSION: 'sessionStorage',
  LOCAL: 'localStorage'
}
const SuccessCode = {
  ZERO: 0,
  TWO_HUNDRED: 200
}
// oss 对象存储更路径
export const OSS_BASE_URL = 'http://139.196.182.46:8800'
// request Mapping
export const MAPPING = '/slipper'
// 请求数据类型
export const CONTENT_TYPE = ContentType.JSON
// 请求超时时长
export const TIME_OUT = 10000
// 访问秘钥 存储
export const TOKEN_KEY = 'im-token'
export const TOKEN_STORAGE = StorageType.COOKIE
// 请求成功响应code
export const SUCCESS_CODE = [SuccessCode.ZERO, SuccessCode.TWO_HUNDRED]
// 双向绑定方法名
export const UPDATE_MODEL_EVENT = 'update:modelValue'
