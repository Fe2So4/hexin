import { checkFile, checkResult } from '@/api/moneyInsur_mgr/carInsBatchImp.js'
export const carInsBatchImp = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    checkFile ({commit}, query) {
      return checkFile(query).then(resp => {
        return resp.data
      })
    },
    checkResult ({commit}, query) {
      return checkResult(query).then(resp => {
        return resp.data
      })
    }
  }
}
