/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-26 07:57:01
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 20:43:46
 */
import { messagePageApi, messageStatusApi } from '@/api/friend'
import { parseStringDate } from '@/utils'

export default {
  state: {
    privateMessages: [],
    scrollBottom: 0 // 消息滚动底部标识
  },
  mutations: {
    SET_PRIVATE_MESSAGE: (state, messages) => {
      state.privateMessages = messages
    },
    PUSH_PRIVATE_MESSAGE: (state, message) => {
      state.privateMessages.push({
        ...message,
        createdAt: parseStringDate(message.created_at || message.createdAt)
      })
    },
    UNSHIFT_PRIVATE_MESSAGE: (state, message) => {
      state.privateMessages.unshift(message)
    },
    UPDATE_PRIVATE_MESSAGE: (state, message) => {
      for (let i = 0; i < state.privateMessages.length; i++) {
        const item = state.privateMessages[i]
        if (item.ack === message.ack) {
          item.id = message.id
          item.loading = false
          item.created_at = message.createdAt
          item.createdAt = parseStringDate(message.createdAt)
          break
        }
      }
    },
    UPDATE_PRIVATE_MESSAGE_STATUS: (state, ids) => {
      state.privateMessages.forEach(item => {
        if (ids.includes(item.id)) {
          item.status = 1
        }
      })
    },
    UPDATE_SCROLL_BOTTOM: (state) => {
      state.scrollBottom = state.scrollBottom + 1
    },

    CLEAR: (state) => {
      state.privateMessages = []
    }
  },
  actions: {

    /**
     * @description: 设置消息
     * @param {*} friendId 好友ID
     * @return {*}
     * @author: gumingchen
     */
    setPrivateMessages({ commit }, messages = []) {
      commit('SET_PRIVATE_MESSAGE', messages)
    },

    /**
     * @description: 获取消息
     * @param {*} params 参数
     * @param {*} clear 是否重置列表
     * @return {*}
     * @author: gumingchen
     */
    async getPrivateMessages({ commit, dispatch }, { params, clear }) {
      const r = await messagePageApi(params)
      if (r) {
        if (clear) {
          dispatch('setPrivateMessages')
        }
        r.data.list.forEach(item => {
          item.createdAt = parseStringDate(item.created_at)
          commit('UNSHIFT_PRIVATE_MESSAGE', item)
        })
      }
      return r
    },

    /**
     * @description: 添加消息
     * @param {*} message 消息
     * @return {*}
     * @author: gumingchen
     */
    pushPrivateMessage({ commit }, message) {
      commit('PUSH_PRIVATE_MESSAGE', message)
    },

    /**
     * @description: 消息滚动底部标识 变化 则滚动到底部
     * @return {*}
     * @author: gumingchen
     */
    updatePrivateMessage({ commit }, message) {
      commit('UPDATE_PRIVATE_MESSAGE', message)
    },

    /**
     * @description: 设置消息已读
     * @param {*} ids 消息ID数组
     * @return {*}
     * @author: gumingchen
     */
    async updatePrivateMessageStatus({ commit }, ids) {
      const r = await messageStatusApi(ids)
      if (r) {
        commit('UPDATE_PRIVATE_MESSAGE_STATUS', ids)
      }
      return r
    },

    /**
     * @description: 更新发送消息状态 ack 确认
     * @param {*} message 消息
     * @return {*}
    * @author: gumingchen
    */
    updateScrollBottom({ commit }) {
      commit('UPDATE_SCROLL_BOTTOM')
    },

    /**
     * @description: 初始化数据
     * @return {*}
     * @author: gumingchen
     */
    clear({ commit }) {
      commit('CLEAR')
    }

  }
}
