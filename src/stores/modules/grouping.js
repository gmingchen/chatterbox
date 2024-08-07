import { clearJson } from '@utils'

import { listApi } from '@/api/grouping'

export const useGroupingStore = defineStore('grouping', {
  state: () => ({
    active: null,
    list: [],
    keyword: ''
  }),
  getters: {
    filterList: (state) => {
      const result = []
      const { list, keyword } = state
      list.forEach(grouping => {
        const exist = grouping.friends.filter(({ nickname , remark }) => nickname.includes(keyword) || remark.includes(keyword))
        exist.sort((a, b) => {
          return b.online - a.online
        })
        result.push({
          ...grouping,
          friends: exist
        })
      })
      return result
    }
  },
  actions: {
    /**
     * 获取分组好友列表
     * @param {*} params
     * @returns
     */
    async getList() {
      const r = await listApi()
      if (r) {
        this.$state.list = r.data
      }
    },
    /**
     * 新增好友
     * @param {*} params 
     */
    addFriend(grouping) {
      const { id, friends } = grouping
      const exist = this.list.find(item => item.id === id)
      if (exist) {
        exist.friends.push(...friends)
      } else {
        this.list.push(grouping)
      }
    },
    /**
     * 移除好友
     * @param {*} userId 
     */
    removeFriend(userId) {
      let flag = false, groupIndex = '', friendIndex = ''
      
      outer:for (let i = 0; i < this.list.length; i++) {
        const grouping = this.list[i];
        for (let j = 0; j < grouping.friends.length; j++) {
          const friend = grouping.friends[j];
          if (friend.userId === userId) {
            flag = true
            groupIndex = i
            friendIndex = j
            break outer
          }
        }
      }
      
      if (flag) {
        this.list[groupIndex].friends.splice(friendIndex, 1);
      }
    },
    /**
     * 设置选中
     * @param {*} friend 
     */
    setActive({ id }) {
      let friend = null
      for (let i = 0; i < this.list.length; i++) {
        const { friends } = this.list[i];
        friend = friends.find(item => item.id === id)
        if (friend) {
          break
        }
      }
      this.active = friend
    },
    /**
     * 更新用户在线状态
     * @param {*} userId 用户ID
     * @param {*} online 在线状态
     */
    updateUserOnline(userId, online) {
      for (let i = 0; i < this.list.length; i++) {
        const { friends } = this.list[i];
        inner:for (let j = 0; j < friends.length; j++) {
          const friend = friends[j];
          if (friend.userId === userId) {
            friend.online = online
            break inner;
          }
        }
      }
    },
    /**
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
