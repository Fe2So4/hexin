import { queryReport } from '@/api/lifeInsurBusReport_mgr/lifeInsFirstList.js'
import { getAllComP, getAllComC, getAllInsCom } from '@/api/dailogApi/dailogApi.js'
export const lifeInsFirstListImp = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    queryReport ({commit}, query) { // 首期承保清单
      return queryReport(query).then(resp => {
        return resp.data
      })
    },
    getAllComP ({commit}, query) {
      return getAllComP(query).then(resp => {
        return resp.data
      })
    },
    getAllComC ({commit}, query) {
      return getAllComC(query).then(resp => {
        return resp.data
      })
    },
    getAllInsCom_rate ({commit}, query) {
      return getAllInsCom(query).then(resp => {
        return resp.data
      })
    }
  }
}
