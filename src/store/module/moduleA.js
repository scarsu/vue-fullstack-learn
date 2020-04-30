export default {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      // 这里的 `state` 对象是模块的局部状态
      return state.count * 2
    }
  },

  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      // 这里的 `state` 对象是模块的局部状态
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
