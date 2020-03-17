import {
  api
} from '@/api/bill_mgr/blackInsure.js'
import IsEmpty from '@/utils/IsEmpty'
export const bankInsurBatchCal = {
  state: {
    bankInsurBatchCal: [],
    exportData: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    bankInsurBatchCalQueryData ({commit, state}, info) {
      console.log(info)
      api('/blackList/blackListProQuery', 'post', info).then(result => {
        console.log(result)
        if (IsEmpty(result)) {
        } else {
          state.bankInsurBatchCal = result.data.data.content
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
