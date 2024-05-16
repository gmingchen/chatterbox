/**
 * @description: 绑定导出方法 到当前实例
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function bindExposed(ref) {
  const instance = getCurrentInstance()
  const entries = Object.entries(ref.value.$.exposed)
  for (const [key, value] of entries) {
    instance.exposed[key] = value
  }
}
