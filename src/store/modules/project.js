// import { getProjects } from '../../api/import-mock'
import { background } from '../../api/background'
import { loginEm, getProject } from '../../api'
// const {chrome} = window
export default {
  namespaced: true,
  mutations: {
    SET_PROJECT_LIST (state, payload) {
      state.projectList = payload
    },
    SET_API_LIST (state, payload) {
      state.apiLists = payload
    },
    SET_TOKEN (state, payload) {
      state.token = payload
    }
  },
  actions: {
    async downloadProjects ({ commit, state }, params) {
      let login = await loginEm({
        name: params.onlineUserName,
        password: params.onlineUserPassword,
        baseUrl: params.onlineUrl
      })
      let token = login.data.token
      // 保存token
      commit('SET_TOKEN', token)
      setTimeout(() => { commit('SET_TOKEN', null) }, 1000 * 60 * 10)
      // 获取项目
      let res = await getProject({
        token,
        baseUrl: params.onlineUrl
      })
      let projects = res.data.map(item => {
        return {
          ...item,
          onlineUrl: params.onlineUrl
        }
      })
      let bk = await background()
      await bk.ProjectStorage.adds(projects)

      let all = await bk.ProjectStorage.find()
      commit('SET_PROJECT_LIST', all)
    },
    async getProjectList ({ commit }) {
      let bk = await background()
      let projects = await bk.ProjectStorage.find()
      console.log('所有项目', projects)
      commit('SET_PROJECT_LIST', projects || [])
    },
    async removeProject ({ commit }, projectId) {
      let bk = await background()
      await bk.ProjectStorage.del(projectId)

      let all = await bk.ProjectStorage.find()
      commit('SET_PROJECT_LIST', all)
    },
    async updateProject ({ commit }, project) {
      let bk = await background()
      await bk.ProjectStorage.update(project)
      let all = await bk.ProjectStorage.find()
      commit('SET_PROJECT_LIST', all)
    },
    async createProject ({ commit }, project) {
      project.loaded = true
      project.onlineUrl = 'localhost'
      let bk = await background()
      await bk.ProjectStorage.add(project)

      let all = await bk.ProjectStorage.find()
      commit('SET_PROJECT_LIST', all)
    }
  }
}
