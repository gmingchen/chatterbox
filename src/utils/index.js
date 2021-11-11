import { MAPPING } from './constants'

/**
 * @description: 获取Api BaseUrl
 * @param {*} key
 * @return {*}
 * @author: gumingchen
 */
export function getApiBaseUrl () {
  const baseUrl = process.env.VUE_APP_PROXY === 'true'
    ? `/proxy${ MAPPING }`
    : process.env.VUE_APP_BASE_API + MAPPING
  return baseUrl
}

/**
 * @description: 置空json数据
 * @param {*} json
 * @return {*}
 * @author: gumingchen
 */
export function clearJson(data) {
  const json = data
  let key
  for (key in json) {
    if (json[key] instanceof Array) {
      json[key] = []
    } else if (typeof json[key] === 'object' && Object.prototype.toString.call(json[key]).toLowerCase() === '[object object]' && !json[key].length) {
      json[key] = {}
    } else {
      json[key] = ''
    }
  }
}

/**
 * @description: 日期转字符串
 * @param {*} time 日期 默认当前日期
 * @param {*} format 格式
 * @return {*}
 * @author: gumingchen
 */
export function parseDate2Str(time = new Date(), format = '{y}-{M}-{d} {h}:{m}:{s}') {
  let result = ''
  let date = new Date()
  const type = typeof time
  if (type === 'object') {
    date = time
  } else if (type === 'number') {
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  result = format.replace(/\{[yMdhmsa]+\}/g, (val) => {
    const key = val.replace(/\{|\}/g, '')
    const value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return result
}

/**
 * @description: 字符串转日期
 * @param {*} time 日期字符串
 * @param {*} separator 分隔符
 * @return {*}
 * @author: gumingchen
 */
export function parseStr2Date(time = '', separator = ['-', ' ', ':']) {
  let result = new Date()
  const regexp = `/[${ separator.join('') }]/g`
  const data = time.split(eval(regexp))
  switch (data.length) {
    case 3:
      result = new Date(+data[0], +data[1] - 1, +data[2])
      break
    case 6:
      result = new Date(+data[0], +data[1] - 1, +data[2], +data[3], +data[4], +data[5])
      break
  }
  return result
}

/**
 * @description: 毫秒转日期字符串
 * @param {*} time 毫秒 默认当前日期毫秒数
 * @param {*} format 格式
 * @return {*}
 * @author: gumingchen
 */
export function parseTime2Str(time = new Date().getTime(), format = '{y}-{M}-{d} {h}:{m}:{s}') {
  return parseDate2Str(new Date(time), format)
}

/**
 * @description: 日期转字符串
 * @param {*} time 毫秒 默认当前日期毫秒数
 * @param {*} format 格式
 * @return {*}
 * @author: gumingchen
 */
export function parseStringDate(time) {
  let result = parseDate2Str(new Date(time), '{y}-{M}-{d} {h}:{m}:{s}')
  if (time) {
    const now = parseDate2Str(new Date(), '{y}-{M}-{d}')
    const formats = result.split(' ')
    if (now === formats[0]) {
      result = formats[1]
    }
  }
  return result
}

/**
 * @description: 生成UUID
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getUUID() {
  let result = ''
  const str = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  result = str.replace(/[xy]/gu, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  return result
}
