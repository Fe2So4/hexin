import {
  api
} from '@/api/lifeInsur_mgr/batchImportCheck.js'
import IsEmpty from '@/utils/IsEmpty'
export const batchImportCheck = {
  state: {
    batchImportCheck: [],
    batchImportExportData: [],
    batchdblcom: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    batchImportQueryData ({commit, state}, info) {
      api('/leaveAgent/leaveAgentReportQuery', 'post', info).then(result => {
        console.log(result)
        state.batchImportCheck = result.data.data.content
      }).catch((e) => {
        console.log(e)
      })
    },
    batchImportExport ({commit, state}, info) {
      window.open(`/tabycore/leaveAgent/leaveAgentReportExportQuery?policyNo=${info.policyNo}&message=${info.message}&comCode=${info.comCode}&comComCode=${info.comComCode}&createTime=${info.createTime}&updateTime=${info.updateTime}`)
    },
    batchImportDbclickCom ({commit, state}, info) {
      api('/leaveAgent/baseCompanyQuery', 'post', `type=${info[0]}`).then(result => {
        console.log(result)
        if (IsEmpty(result)) {
        } else {
          state.batchdblcom = result.data.data
          info[1]()
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
