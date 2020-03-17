import { queryBatch, queryNeedForBatch, fiveCovery } from '@/api/lifeInsur_mgr/firstPolicy_mgr/batchHandle.js'
import { getBtnLimt } from '@/api/dailogApi/dailogApi.js'
export const batchHandle = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    queryBatch ({commit}, query) {
      return queryBatch(query).then(resp => {
        return resp.data
      })
    },
    queryNeedForBatch ({commit}, query) {
      return queryNeedForBatch(query).then(resp => {
        return resp.data
      })
    },
    fiveCovery ({commit}, query) {
      return fiveCovery(query).then(resp => {
        return resp.data
      })
    },
    getBtnLimt_batch ({commit}, query) {
      return getBtnLimt(query).then(resp => {
        return resp.data
      })
    }
  }
}
