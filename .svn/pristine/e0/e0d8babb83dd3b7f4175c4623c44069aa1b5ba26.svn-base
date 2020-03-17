import { checkFile, checkResult } from '@/api/moneyInsur_mgr/carInsurance.js'
export const carInsurance = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    checkFile_carIns ({commit}, query) {
      return checkFile(query).then(resp => {
        return resp.data
      })
    },
    checkResult_carIns ({commit}, query) {
      return checkResult(query).then(resp => {
        return resp.data
      })
    }
  }
}
