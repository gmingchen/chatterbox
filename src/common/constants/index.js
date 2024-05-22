import { ContentType, AuthKey, StorageType, SuccessCode, RequestMapping, ModelBinding } from '@enums'

// request Mapping
export const MAPPING = RequestMapping.CHATTERBOX
// 请求数据类型
export const CONTENT_TYPE = ContentType.JSON
// 请求超时时长
export const TIME_OUT = 50000
// 访问秘钥 存储
export const AUTH_KEY = AuthKey.TOKEN
// 秘钥本地存储类型
export const AUTH_STORAGE = StorageType.COOKIE
// 请求成功响应code
export const SUCCESS_CODE = [SuccessCode.ZERO, SuccessCode.TWO_HUNDRED]
// 双向绑定方法名
export const MODEL_NAME = 'modelValue'
export const UPDATE_MODEL_EVENT = ModelBinding.MODEL_VALUE
