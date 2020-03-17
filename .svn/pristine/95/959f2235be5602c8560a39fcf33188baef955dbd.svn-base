import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
// import IsEmpty from '@/utils/IsEmpty'
export const commissionConfig = {
  state: {
    commissionConfigData: [],
    commissionConfigdblComData1: [],
    commissionConfigdblComData2: [],
    commissionConfigdblComData3: [],
    commissionConfigdblXianzhongData: [],
    commissionConfigTotalRecords1: 0,
    commissionConfigTotalRecords2: 0,
    fenyetotalData: 0
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    commissionConfigdblqueryCom1 ({commit, state}, info) {
      return api('/bankReports/getInsures', 'post', info)
    },
    commissionConfigdblqueryCom2 ({commit, state}, info) {
      return api('/bankReports/getOrgs', 'post', info)
    },
    commissionConfigdblqueryCom3 ({commit, state}, info) {
      return api('/baseCompany/getAllCom', 'post', info)
    },
    commissionConfigdblqueryXianzhong ({commit, state}, info) {
      return api('/bankReports/getRisks', 'post', info)
    },
    commissionConfigdblqueryCom4 ({commit, state}, info) {
      return api('/baseCompany/getAllComNoControl', 'post', info)
    }
  }
}
