import { background, choosefolder, displayPath, retainstr } from '../../api/background'
export default {
  namespaced: true,
  mutations: {
    SET_CONFIG (state, payload) {
      payload.port && (state.port = payload.port)
      payload.host && (state.host = payload.host)
      payload.network && (state.network = payload.network)
      payload.sleep && (state.sleep = payload.sleep)
      payload.startUp && (state.startUp = payload.startUp)
      payload.fileFolder && (state.fileFolder = payload.fileFolder)
      state.baseUrl = 'http://' + state.host + ':' + state.port
      state.networkUrl = 'http://' + state.network + ':' + state.port
    },
    SET_STATUS (state, payload) {
      state.started = payload
    }
  },
  actions: {
    async startServer ({ commit }, port) {
      let bk = await background()
      let config = await bk.HttpServer.startWebserver(port)
      console.log(config)
      commit('SET_CONFIG', config)
      commit('SET_STATUS', true)
      return config
    },
    async stopServer ({ commit }) {
      let bk = await background()
      await bk.HttpServer.stopServer()
      commit('SET_STATUS', false)
    },
    async choosefolder () {
      let entry = await choosefolder()
      let _retainstr = await retainstr(entry)
      let _displayPath = await displayPath(entry)

      return {
        retainstr: _retainstr,
        displayPath: _displayPath
      }
    }
  }
}
