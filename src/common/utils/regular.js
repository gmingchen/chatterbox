/**
 * @description: 邮箱
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isEmail(input) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(input)
}
