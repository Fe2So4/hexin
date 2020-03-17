import {
  api
} from '@/api/bill_mgr/blackInsure.js'
import IsEmpty from '@/utils/IsEmpty'
export const contiPercheck = {
  state: {
    contiPercheck: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    contiPercheckQueryData ({commit, state}, info) {
      console.log(info)
      api('/blackList/blackListProQuery', 'post', info).then(result => {
        console.log(result)
        if (IsEmpty(result)) {
        } else {
          state.contiPercheck = result.data.data.content
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
