import { getProjects } from '../../api/import-mock'
const {chrome} = window
export default {
  namespaced: true,
  mutations: {
    SET_PROJECT_LIST (state, payload) {
      state.projectList = payload
    },
    SET_API_LIST (state, payload) {
      state.apiLists = payload
    }
  },
  actions: {
    // 存储到store中
    async setProjectList ({ commit, state }, params) {
      let {projects, apiLists} = await getProjects(params)

      // 存储到后台chrome服务
      chrome.runtime.getBackgroundPage(background => {
        background.saveProject(projects)
        background.saveApiLists(apiLists)
      })

      commit('SET_PROJECT_LIST', [...state.projectList, ...projects])
      commit('SET_API_LIST', {...state.apiLists, ...apiLists})
      return {projects, apiLists}
    },
    getProjectList ({ commit }) {
      chrome.runtime.getBackgroundPage(background => {
        background.getProject().then(data => {
          console.log('项目有', data)
          commit('SET_PROJECT_LIST', data || [])
        })
        background.getApiLists().then(data => {
          console.log('api', data)
          commit('SET_API_LIST', data || {})
        })
      })
    }
  }
}
