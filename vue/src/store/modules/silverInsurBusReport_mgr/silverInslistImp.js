import { bankReportQuery } from '@/api/silverInsurBusReport_mgr/silverInslistImp.js'
import { getAllsilverCom, allOrg } from '@/api/dailogApi/dailogApi.js'
export const silverListImport = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    bankReportQuery ({commit}, query) {
      return bankReportQuery(query).then(resp => {
        return resp.data
      })
    },
    getAllsilverCom ({commit}, query) {
      return getAllsilverCom(query).then(resp => {
        return resp.data
      })
    },
    getAllsilverAllOrg ({commit}, query) {
      return allOrg(query).then(resp => {
        return resp.data
      })
    }
  }
}
