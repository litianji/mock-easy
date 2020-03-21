export default {
  SET_CONFIG (state, payload) {
    payload.port && (state.port = payload.port)
    payload.host && (state.host = payload.host)
    state.baseUrl = 'http://' + state.host + ':' + state.port
  },
  SET_PROJECT_LIST (state, payload) {
    state.projectList = payload
  },
  SET_API_LIST (state, payload) {
    state.apiLists = payload
  },
  SET_PROJECT_ID (state, payload) {
    state.projectId = payload
  }
}
