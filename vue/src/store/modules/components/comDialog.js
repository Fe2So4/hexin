import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
import IsEmpty from '@/utils/IsEmpty'
export const comDialog = {
  state: {
    comDialogWorkerData: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    comDialogqueryWorker ({commit, state}, info) {
      api('/leaveAgent/agentQuery', 'post', info).then(result => {
        if (IsEmpty(result)) {
        } else {
          state.comDialogWorkerData = result.data.data.content
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
