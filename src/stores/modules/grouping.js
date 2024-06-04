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
        // if (exist.length) {
          result.push({
            ...grouping,
            friends: exist
          })
        // }
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
     * 清除数据
     */
    clear() {
      clearJson(this.$state)
    }
  }
})
