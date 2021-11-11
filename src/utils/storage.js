/*
 * @Description: 凭证信息存取
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 14:01:54
 */
import cookie from 'js-cookie'
import { TOKEN_KEY, TOKEN_STORAGE, StorageType } from '@/utils/constants'

/**
 * @description: token-存储、获取、清除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getToken() {
  let token
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      token = cookie.get(TOKEN_KEY)
      break
    case StorageType.SESSION:
      token = sessionStorage.getItem(TOKEN_KEY)
      break
    case StorageType.LOCAL:
      token = localStorage.getItem(TOKEN_KEY)
      break
    default:
      token = cookie.get(TOKEN_KEY)
      break
  }
  return token
}
export function setToken(token) {
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      cookie.set(TOKEN_KEY, token)
      break
    case StorageType.SESSION:
      sessionStorage.setItem(TOKEN_KEY, token)
      break
    case StorageType.LOCAL:
      localStorage.setItem(TOKEN_KEY, token)
      break
    default:
      cookie.set(TOKEN_KEY, token)
      break
  }
}
export function clearToken() {
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      cookie.remove(TOKEN_KEY)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(TOKEN_KEY)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(TOKEN_KEY)
      break
    default:
      cookie.remove(TOKEN_KEY)
      break
  }
}
