
import { getProjects } from '../api/import-mock'
export default {
  setConfig ({ commit }, config) {
    commit('SET_CONFIG', config)
  },
  async setProjectList ({ commit, state }, params) {
    let projects = await getProjects(params)
    commit('SET_PROJECT_LIST', [...state.projectList, ...projects])

    return projects
  }
}
