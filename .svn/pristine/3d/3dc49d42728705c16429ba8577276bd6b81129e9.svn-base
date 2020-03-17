import {
  api
} from '@/api/bill_mgr/blackInsure.js'
export const renewCommCal = {
  state: {
    renewCommCal: [],
    exportData: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    renewCommCalShengDblDialog ({commit, state}, info) {
      console.log(info)
      return api('/reports/provincialBanchQuery', 'post', info)
    }
  }
}
