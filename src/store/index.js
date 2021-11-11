/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-11 10:06:05
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 20:03:18
 */
import { createStore } from 'vuex'

const path = require('path')
const requireModules = require.context('./modules', true, /index\.(ts|js)$/iu)

const modules = {}

requireModules.keys().forEach(filePath => {
  const modular = requireModules(filePath)
  let name = path.resolve(filePath, '..')
  name = name.split('/').pop()
  modules[name] = {
    namespaced: true,
    ...modular.default
  }
})

const store = createStore({
  actions: {

    /**
     * @description: 清除、初始化数据
     * @param {*} dispatch
     * @return {*}
     * @author: gumingchen
     */
    clear({ dispatch }) {
      dispatch('user/clear')
      dispatch('conversation/clear')
      dispatch('friend/clear')
      dispatch('status/clear')
      dispatch('websocket/close')
    }
  },
  modules: {
    ...modules
  }
})

export default store
