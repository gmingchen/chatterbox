export default {
  state: {
    active: 1
  },
  mutations: {
    SET_ACTIVE: (state, active) => {
      state.active = active
    }
  },
  actions: {

    /**
     * @description: 设置侧边栏选中
     * @param {*} commit
     * @param {*} active
     * @return {*}
     * @author: gumingchen
     */
    setActive({ commit }, active) {
      commit('SET_ACTIVE', active)
    },

    /**
     * @description: 初始化状态
     * @param {*} commit
     * @return {*}
     * @author: gumingchen
     */
    clear({ commit }) {
      commit('SET_ACTIVE', 1)
    }
  }
}
