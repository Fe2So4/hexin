import { silverDiffer, silverDifferImport, getDalogMesg } from '@/api/silverInsurAgent_mgr/silverDataDiffer.js'
export const silverDataDiffer = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    silverDiffer ({commit}, query) {
      return silverDiffer(query).then(resp => {
        return resp.data
      })
    },
    silverDifferImport ({commit}, query) {
      return silverDifferImport(query).then(resp => {
        return resp
      })
    },
    getDifferInsCom ({commit}, query) {
      return getDalogMesg(query).then(resp => {
        return resp.data
      })
    }
  }
}
