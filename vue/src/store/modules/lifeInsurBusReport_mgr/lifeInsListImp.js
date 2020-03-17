import { queryReportImp } from '@/api/lifeInsurBusReport_mgr/lifeInsListImp.js'
import { getAllComP, getAllComC, getAllInsCom } from '@/api/dailogApi/dailogApi.js'
export const lifeInsListImp = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    queryReportImp ({commit}, query) {
      return queryReportImp(query).then(resp => {
        return resp.data
      })
    },
    getAllComPImp ({commit}, query) {
      return getAllComP(query).then(resp => {
        return resp.data
      })
    },
    getAllComCImp ({commit}, query) {
      return getAllComC(query).then(resp => {
        return resp.data
      })
    },
    getAllInsCom_Imp ({commit}, query) {
      return getAllInsCom(query).then(resp => {
        return resp.data
      })
    }
  }
}
