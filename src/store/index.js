import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

let state = {
  port: '',
  host: '',
  baseUrl: '',
  page: '',
  projectList: [],
  projectId: ''
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {}
})
