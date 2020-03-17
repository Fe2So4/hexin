import {
  api
} from '@/api/bill_mgr/blackInsure.js'
// import IsEmpty from '@/utils/IsEmpty'
export const contiPerbatch = {
  state: {
    contiPerbatch: [],
    contiPerbatchAllComData: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    contiPerbatchQueryAllCom ({commit, state}, info) {
      console.log(info)
      return api('/baseCompany/getAllCom', 'post', info)
    }
  }
}
