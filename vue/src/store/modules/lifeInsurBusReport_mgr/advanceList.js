import { searchList } from '@/api/lifeInsurBusReport_mgr/advanceList.js'
import { getAllComP, getAllComC, getAllInsCom } from '@/api/dailogApi/dailogApi.js'
export const advanceList = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    searchList_ad ({commit}, query) {
      return searchList(query).then(resp => {
        return resp.data
      })
    },
    getAllComP_PreImp ({commit}, query) {
      return getAllComP(query).then(resp => {
        return resp.data
      })
    },
    getAllComC_PreImp ({commit}, query) {
      return getAllComC(query).then(resp => {
        return resp.data
      })
    },
    getAllInsCom_ImpAd ({commit}, query) {
      return getAllInsCom(query).then(resp => {
        return resp.data
      })
    }
  }
}
