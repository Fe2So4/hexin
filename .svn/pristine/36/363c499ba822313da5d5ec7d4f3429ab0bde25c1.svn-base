import { insBillDiffer } from '@/api/lifeInsur_mgr/firstPolicy_mgr/lifeInsur_differ.js'
import { getAllsilverCom } from '@/api/dailogApi/dailogApi.js'
export const InsBillDiffer = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    insBillDiffer ({commit}, query) {
      return insBillDiffer(query).then(resp => {
        return resp.data
      })
    },
    getInsComDiffer ({commit}, query) {
      return getAllsilverCom(query).then(resp => {
        return resp.data
      })
    }
  }
}
