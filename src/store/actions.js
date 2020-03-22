
import { getProjects } from '../api/import-mock'
export default {
  setConfig ({ commit }, config) {
    commit('SET_CONFIG', config)
  },
  // 存储到store中
  async setProjectList ({ commit, state }, params) {
    let {projects, apiLists} = await getProjects(params)

    commit('SET_PROJECT_LIST', [...state.projectList, ...projects])
    commit('SET_API_LIST', Object.assign(state.apiLists, apiLists))
    return {projects, apiLists}
  },
  setProjectId ({ commit }, id) {
    commit('SET_PROJECT_ID', id)
  }
}
