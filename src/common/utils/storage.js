/*
 * @Description: 本地存储
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 14:01:54
 */
import cookie from 'js-cookie'
import { AUTH_KEY, AUTH_STORAGE } from '@constants'
import { StorageType } from '@enums'

/**
 * @description: 本地存储、获取、清除
 * @param {String} key 存储键值
 * @param {String} value 存储值
 * @param {String} storage 存储位置
 * @return {*}
 * @author: gumingchen
 */
function set(key, value = '', storage) {
  switch (storage) {
    case StorageType.COOKIE:
      cookie.set(key, value)
      break
    case StorageType.SESSION:
      sessionStorage.setItem(key, value)
      break
    case StorageType.LOCAL:
      localStorage.setItem(key, value)
      break
    default:
      cookie.set(key, value)
      break
  }
}
function get(key, storage) {
  let result
  switch (storage) {
    case StorageType.COOKIE:
      result = cookie.get(key)
      break
    case StorageType.SESSION:
      result = sessionStorage.getItem(key)
      break
    case StorageType.LOCAL:
      result = localStorage.getItem(key)
      break
    default:
      result = cookie.get(key)
      break
  }
  return result
}
function clear(key, storage) {
  switch (storage) {
    case StorageType.COOKIE:
      cookie.remove(key)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(key)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(key)
      break
    default:
      cookie.remove(key)
      break
  }
}

/**
 * @description: token-存储、获取、清除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getAuth() {
  return JSON.parse(get(AUTH_KEY, AUTH_STORAGE) || '{}')
}
export function setAuth(auth) {
  set(AUTH_KEY, JSON.stringify(auth), AUTH_STORAGE)
}
export function clearAuth() {
  clear(AUTH_KEY, AUTH_STORAGE)
}
