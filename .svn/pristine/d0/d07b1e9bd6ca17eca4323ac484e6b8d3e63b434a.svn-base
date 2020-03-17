import {
  api
} from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
export const contiListCheck = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    contiListCheckDialogDataGet1 ({commit, state}, info) {
      return api('/persistency/getAllComP', 'post', info)
    },
    contiListCheckDialogDataGet2 ({commit, state}, info) {
      return api('/persistency/getAllComC', 'post', info)
    },
    contiListCheckDialogDataGet3 ({commit, state}, info) {
      return api('/persistency/getAllComA', 'post', info)
    },
    tdWorkerQuery ({commit, state}, info) {
      return api('/tdEmpIntern/getAllPrpsagent', 'post', info)
    },
    baiyingWorkerQuery ({commit, state}, info) {
      return api('/proposalForm/agentFind', 'post', info)
    },
    ultimateBaiyingCompanyQuery ({commit, state}, info) {
      return api('/persistency/getAllComB', 'post', info)
    },
    partnerRenewalProListWorkerQuery ({commit, state}, info) {
      return api('/partnerRenewedInterest/queryAgent', 'post', info)
    }
  }
}
