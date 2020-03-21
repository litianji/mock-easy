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
  // 所有的项目
  projectList: [],
  // 当前的打开的项目
  projectId: '',
  // 所有的api
  apiLists: {}
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {}
})
