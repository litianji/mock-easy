import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project'
import server from './modules/server'
import router from './modules/router'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    project: {
      state: {
        // 所有的项目
        projectList: [],
        // 所有的api
        apiLists: {}
      },
      ...project
    },
    server: {
      state: {
        started: false,
        port: '',
        host: '',
        baseUrl: ''
      },
      ...server
    },
    router: {
      state: {
        active: '',
        params: {}
      },
      ...router
    }
  }
})
