import { getApiList } from '../../api'
import { background } from '../../api/background'
export default {
  namespaced: true,
  mutations: {
    SET_API_LIST (state, payload) {
      state.apiList = payload
    }
  },
  actions: {
    async downloadApiList (context, params) {
      let res = await getApiList(params)
      let bk = await background()
      // 存储
      await bk.ApisStorage.adds(params.id, res.data.mocks)
    },
    async getApiList ({ commit }, projectId) {
      let bk = await background()
      let apis = await bk.ApisStorage.find(projectId)
      commit('SET_API_LIST', apis)
    },
    async delApi ({ dispatch }, { projectId, apiId }) {
      let bk = await background()
      await bk.ApisStorage.del(projectId, apiId)
      dispatch('getApiList', projectId)
    },
    async createApi ({ dispatch }, { projectId, api }) {
      let bk = await background()
      await bk.ApisStorage.add(projectId, api)
    }
  }
}
