import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project'
import server from './modules/server'
import router from './modules/router'
import apis from './modules/apis'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    project: {
      state: {
        projectList: [],
        token: null
      },
      ...project
    },
    apiList: {
      state: {
        apiList: []
      },
      ...apis
    },
    server: {
      state: {
        started: false,
        port: '',
        host: '',
        baseUrl: '',
        startUp: 1,
        sleep: 1
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
