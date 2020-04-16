import { background } from '../../api/background'
export default {
  namespaced: true,
  mutations: {
    SET_CONFIG (state, payload) {
      payload.port && (state.port = payload.port)
      payload.host && (state.host = payload.host)
      state.baseUrl = 'http://' + state.host + ':' + state.port
    },
    SET_STATUS (state, payload) {
      state.started = payload
    }
  },
  actions: {
    async startServer ({ commit }, port) {
      let bk = await background()
      let config = await bk.HttpServer.startWebserver(port)
      commit('SET_CONFIG', config)
      commit('SET_STATUS', true)
      return config
    },
    async stopServer ({ commit }) {
      let bk = await background()
      await bk.HttpServer.stopServer()
      commit('SET_STATUS', false)
    },
    changePort ({ dispatch }, port) {
      dispatch('startServer', port)
    }
  }
}
