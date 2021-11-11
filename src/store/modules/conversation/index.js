/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-26 07:57:01
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 20:43:46
 */
import { listApi, createApi, deleteApi } from '@/api/conversation'
import { parseStringDate } from '@/utils'

export default {
  state: {
    active: null,
    list: []
  },
  mutations: {
    SET_CONVERSATION: (state, conversations) => {
      state.list = conversations
    },
    ADD_CONVERSATION: (state, conversation) => {
      state.list.unshift(conversation)
    },
    DELETE_CONVERSATION: (state, index) => {
      state.list.splice(index, 1)
    },
    SET_ACTIVE: (state, id) => {
      state.active = null
      for (let i = 0; i < state.list.length; i++) {
        const item = state.list[i]
        if (item.id === id) {
          state.active = {
            conversationId: item.id,
            ...item.to
          }
          item.unread_count = 0
          break
        }
      }
    },
    UPDATE_CONVERSATION_PRIVATE_MESSAGE: (state, message) => {
      let obj
      for (let i = 0; i < state.list.length; i++) {
        const item = state.list[i]
        if (item.to.id === message.to) {
          obj = item
          state.list.splice(i, 1)
        }
      }
      obj.message = {
        content: message.content,
        created_at: message.createdAt,
        createdAt: parseStringDate(message.createdAt),
        from: message.from,
        id: message.id,
        status: message.status,
        to: message.to,
        type: message.type,
        url: message.url
      }
      state.list.unshift(obj)
    },
    UPDATE_CONVERSATION_UNREAD: (state, id) => {
      for (let i = 0; i < state.list.length; i++) {
        const item = state.list[i]
        if (item.id === id) {
          item.unread_count = 0
          break
        }
      }
    },
    CLEAR: (state) => {
      state.active = false
      state.list = []
    }
  },
  getters: {
    conversations: state => {
      return function(keywords) {
        return state.list.filter(item => {
          return !keywords || item.to.nickname.includes(keywords) || item.to.username.includes(keywords)
        })
      }
    },
    unreadCount: state => {
      let count = 0
      state.list.forEach(item => {
        count += item.unread_count
      })
      return count
    }
  },
  actions: {

    /**
     * @description: 获取会话窗口
     * @return {*}
     * @author: gumingchen
     */
    async getConversations({ commit }) {
      const r = await listApi()
      if (r) {
        r.data.forEach(item => {
          if (item.message) {
            item.message.createdAt = parseStringDate(item.message.created_at)
          }
        })
        commit('SET_CONVERSATION', r.data)
      }
      return r
    },

    /**
     * @description: 设置当前会话窗口 不存在则添加聊天会话
     * @param {*} userId 好友ID
     * @return {*}
     * @author: gumingchen
     */
    async setActive({ commit, state }, userId) {
      if (userId) {
        const conversations = state.list.filter(item => item.to.id === userId)
        if (conversations.length) {
          commit('SET_ACTIVE', conversations[0].id)
        } else {
          const r = await createApi(userId)
          if (r) {
            commit('ADD_CONVERSATION', r.data)
            commit('SET_ACTIVE', r.data.id)
          }
        }
      } else {
        commit('SET_ACTIVE')
      }
    },

    /**
     * @description: 设置当前会话窗口 不存在则添加聊天会话
     * @param {*} id 会话ID
     * @return {*}
     * @author: gumingchen
     */
    async deleteConversation({ dispatch, state }, id) {
      const r = await deleteApi(id)
      if (r) {
        dispatch('removeConversation', id)
        if (state.active && state.active.conversationId === id) {
          dispatch('removeActive', { conversationId: id })
        }
      }
      return r
    },

    /**
     * @description: 移除当前会话窗口 选其中一个参数传递
     * @param {*} userId 好友ID
     * @param {*} conversationId 会话ID
     * @return {*}
     * @author: gumingchen
     */
    removeActive({ commit, state }, { userId, conversationId }) {
      if (!userId) {
        commit('SET_ACTIVE')
      } else if (state.active) {
        if (userId === state.active.id || conversationId === state.active.conversationId) {
          commit('SET_ACTIVE')
        }
      }
    },

    /**
     * @description: 移除会话 选其中一个参数传递
     * @param {*} userId 好友ID
     * @param {*} conversationId 会话ID
     * @return {*}
     * @author: gumingchen
     */
    removeConversation({ commit, state }, { userId, conversationId }) {
      let index, flag
      if (conversationId) {
        flag = 1
      } else if (userId) {
        flag = 2
      }
      for (let i = 0; i < state.list.length; i++) {
        const item = state.list[i]
        if (flag === 1 && item.id === conversationId) {
          index = i
          break
        } else if (flag === 2 && item.to.id === userId) {
          index = i
          break
        }
      }
      commit('DELETE_CONVERSATION', index)
    },

    /**
     * @description: 初始化数据
     * @param {*} message ack 确认消息
     * @return {*}
     * @author: gumingchen
     */
    updateConversationPrivateMessage({ commit, state, dispatch }, message) {
      const flag = state.list.some(item => item.to.id === message.to)
      if (flag) {
        commit('UPDATE_CONVERSATION_PRIVATE_MESSAGE', message)
      } else {
        dispatch('getConversations')
      }
    },

    /**
     * @description: 更新会话消息未读数
     * @param {*} message ack 确认消息
     * @return {*}
     * @author: gumingchen
     */
    updateConversationUnread({ commit }, id) {
      commit('UPDATE_CONVERSATION_UNREAD', id)
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
