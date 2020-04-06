const {chrome} = window
export default {
  namespaced: true,
  mutations: {
    SET_CONFIG (state, payload) {
      state.started = true
      payload.port && (state.port = payload.port)
      payload.host && (state.host = payload.host)
      state.baseUrl = 'http://' + state.host + ':' + state.port
    }
  },
  actions: {
    startServer ({ commit }) {
      return new Promise((resolve, reject) => {
        chrome.runtime.getBackgroundPage((background) => {
          if (!background) {
            reject(new Error())
          }
          background.startWebserver().then(res => {
            commit('SET_CONFIG', res)
            resolve(res)
          })
        })
      })
    },
    changePort ({ dispatch }, port) {
      chrome.storage.local.set({port}, () => {})
      return new Promise((resolve, reject) => {
        dispatch('startServer').then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
