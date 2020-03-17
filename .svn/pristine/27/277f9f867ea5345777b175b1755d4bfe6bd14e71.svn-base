import { submitRecordSave, getRecordInfo, deleteRecord, queryReMod, isBackRecord, getSelectDataType } from '@/api/lifeInsur_mgr/lifeInsur_renewal.js'
export const renewal = {
  state: {
    recordData: {
      lifeRenewalPolicyInfoVo: {},
      lifeRenewalPartyInfoVo: {},
      lifeRenewalPolicyChargeListVo: [],
      lifeRenewalRiskInfoListVo: []
    },
    reModQueryData: {}
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    isBackRecord ({commit, state}, info) {
      return isBackRecord(info)
    },
    getRecordInfo ({commit, state}, info) {
      return getRecordInfo(info).then(resp => {
        state.recordData = resp.data
        console.log(resp.data)
        return resp.data
      })
    },
    submitRecordSave ({commit}, info) {
      return submitRecordSave(info)
    },
    deleteRecord ({commit}, info) {
      return deleteRecord(info)
    },
    queryReMod ({commit, state}, info) {
      return queryReMod(info).then(resp => {
        state.reModQueryData = resp.data.data
        return resp.data
      })
    },
    getSelectDataType ({commit}, info) {
      return getSelectDataType(info)
    }
  }
}
