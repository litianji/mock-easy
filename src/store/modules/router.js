export default {
  namespaced: true,
  mutations: {
    SET_ACTIVE (state, { name, params }) {
      state.active = name
      state.params[name] = params
    }
  },
  actions: {
    setActive ({ commit }, { name, params }) {
      commit('SET_ACTIVE', { name, params })
    }
  }
}
