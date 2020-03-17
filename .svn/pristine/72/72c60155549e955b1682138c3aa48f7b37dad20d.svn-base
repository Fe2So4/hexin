import { uploadMoudle, analyResult, importResult } from '@/api/lifeInsur_mgr/firstPolicy_mgr/insPolicyList.js'
import { getAllsilverCom } from '@/api/dailogApi/dailogApi.js'
export const listImport = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    searchInsCom ({commit}, query) {
      return getAllsilverCom(query).then(resp => {
        return resp.data
      })
    },
    uploadMoudle ({commit}, query) {
      return uploadMoudle(query).then(resp => {
        return resp.data
      })
    },
    analyResult ({commit}, query) {
      return analyResult(query).then(resp => {
        return resp.data
      })
    },
    importResult ({commit}, query) {
      return importResult(query).then(resp => {
        return resp.data
      })
    }
  }
}
