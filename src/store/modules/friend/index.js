/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-26 07:57:01
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 20:43:46
 */
import { listApi as groupListApi, addApi as friendGroupAddApi, deleteApi as friendGroupDelApi } from '@/api/friend-group'
import { deleteApi, moveApi, applyListApi as friendApplyListApi, acceptApi, refuseApi, againApi } from '@/api/friend'

export default {
  state: {
    isGetGroup: false,
    groups: [],
    applys: []
  },
  mutations: {
    SET_GROUPS: (state, groups) => {
      state.groups = groups
      state.isGetGroup = true
    },
    SET_GROUP_FRIENDS: (state, data) => {
      const { groupId, friends } = data
      for (let i = 0; i < state.groups.length; i++) {
        const group = state.groups[i]
        if (group.id === groupId) {
          group.friends = friends
          group.isGet = true
        }
      }
    },
    ADD_GROUP: (state, group) => {
      state.groups.push(group)
    },
    DELETE_GROUP: (state, index) => {
      state.groups.splice(index, 1)
    },
    ADD_FRIEND: (state, friend) => {
      for (let i = 0; i < state.groups.length; i++) {
        const group = state.groups[i]
        if (group.id === friend.group_id) {
          group.friends.push(friend)
          break
        }
      }
    },
    DELETE_FRIEND: (state, id) => {
      for (let i = 0; i < state.groups.length; i++) {
        const group = state.groups[i]
        for (let j = 0; j < group.friends.length; j++) {
          const friend = group.friends[j]
          if (friend.user_id === id) {
            group.friends.splice(j, 1)
            break
          }
        }
      }
    },
    SET_APPLYS: (state, applys) => {
      state.applys = applys
    },
    REMOVE_APPLY: (state, id) => {
      state.applys = state.applys.filter(item => item.id !== id)
    },
    UPDATE_APPLY_STATUS: (state, data) => {
      for (let i = 0; i < state.applys.length; i++) {
        const item = state.applys[i]
        if (item.id === data.id) {
          item.status = data.status
          break
        }
      }
    },
    CLEAR: (state) => {
      state.isGetGroup = false
      state.groups = []
      state.applys = []
    }
  },
  getters: {
    selectGroups: state => {
      return state.groups.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    },
    groups: state => {
      return function(keywords) {
        const groups = []
        state.groups.forEach(group => {
          const friends = []
          group.friends.forEach(friend => {
            if (friend.nickname.includes(keywords) || friend.username.includes(keywords)) {
              friends.push(friend)
            }
          })
          if (group.name.includes(keywords) || friends.length) {
            group.friends = friends
            groups.push(group)
          }
        })
        return groups
      }
    }
  },
  actions: {

    /**
     * @description: 获取好友分组 及好友列表
     * @param {*} commit
     * @return {*}
     * @author: gumingchen
     */
    async getGroups({ commit }) {
      const r = await groupListApi()
      if (r) {
        commit('SET_GROUPS', r.data)
      }
      return r
    },

    /**
     * @description: 添加分组
     * @param {*} commit
     * @param {*} group
     * @return {*}
     * @author: gumingchen
     */
    async addGroup({ commit }, value) {
      const r = await friendGroupAddApi({ name: value })
      if (r) {
        commit('ADD_GROUP', {
          ...r.data,
          friends: []
        })
      }
      return r
    },

    /**
     * @description: 移除分组
     * @param {*} commit
     * @param {*} index
     * @return {*}
     * @author: gumingchen
     */
    async deleteGroup({ commit }, { index, id }) {
      const r = await friendGroupDelApi(id)
      if (r) {
        commit('DELETE_GROUP', index)
      }
      return r
    },

    /**
     * @description: 移除好友
     * @param {*} commit
     * @param {*} params
     * @return {*}
     * @author: gumingchen
     */
    async deleteFriend({ commit, dispatch }, friend) {
      const r = await deleteApi(friend.user_id)
      if (r) {
        commit('DELETE_FRIEND', friend.user_id)
        dispatch('conversation/removeActive', { userId: friend.user_id }, { root: true })
        dispatch('conversation/removeConversation', { userId: friend.user_id }, { root: true })
      }
      return r
    },

    /**
     * @description: 移动好友
     * @param {*} dispatch
     * @param {*} data
     * @return {*}
     * @author: gumingchen
     */
    async moveFriend({ commit }, { friend, groupId }) {
      const params = {
        id: friend.id,
        group_id: groupId
      }
      const r = await moveApi(params)
      if (r) {
        commit('DELETE_FRIEND', friend.user_id)
        friend.group_id = groupId
        commit('ADD_FRIEND', friend)
      }
      return r
    },

    /**
     * @description: 获取好友申请列表
     * @param {*} commit
     * @return {*}
     * @author: gumingchen
     */
    async getApplys({ commit }) {
      const r = await friendApplyListApi()
      if (r) {
        commit('SET_APPLYS', r.data)
      }
      return r
    },

    /**
     * @description: 同意好友申请
     * @param {*} commit
     * @return {*}
     * @author: gumingchen
     */
    async acceptApply({ commit }, data) {
      const r = await acceptApi(data.params)
      if (r) {
        const friend = {
          ...data.user,
          group_id: data.params.group_id,
          user_id: data.user.id
        }
        commit('REMOVE_APPLY', data.params.id)
        commit('ADD_FRIEND', friend)
      }
      return r
    },

    /**
     * @description: 拒绝好友申请
     * @param {*} commit
     * @return {*}
     * @author: gumingchen
     */
    async refuseApply({ commit }, params) {
      const r = await refuseApi(params.id)
      if (r) {
        commit('UPDATE_APPLY_STATUS', params)
      }
      return r
    },

    /**
     * @description: 重新申请好友
     * @param {*} commit
     * @return {*}
     * @author: gumingchen
     */
    async againApply({ commit }, params) {
      const r = await againApi(params.id)
      if (r) {
        commit('UPDATE_APPLY_STATUS', params)
      }
      return r
    },

    /**
     * @description: 初始化数据
     * @param {*} commit
     * @return {*}
     * @author: gumingchen
     */
    clear({ commit }) {
      commit('CLEAR')
    }

  }
}
