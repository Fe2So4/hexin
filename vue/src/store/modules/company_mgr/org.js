import { addOrg, searchOrglist, searchProlist, searchDetailOrg, searchModifyOrg, auditOrg, beforeModify, afterModify, allOrg } from '@/api/company_mgr/org.js'
import { getBtnLimt } from '@/api/dailogApi/dailogApi.js'
export const orgBy = {
  state: {
    costmerList: {},
    policyList: [],
    reportInfo: {}
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    addOrg ({commit}, query) {
      return addOrg(query).then(resp => {
        return resp.data
      })
    },
    searchOrg ({commit}, query) {
      return searchOrglist(query).then(resp => {
        return resp.data
      })
    },
    searchPro ({commit}, query) {
      return searchProlist(query).then(resp => {
        return resp.data
      })
    },
    searchDetail ({commit}, query) {
      return searchDetailOrg(query).then(resp => {
        return resp.data
      })
    },
    searchModify ({commit}, query) {
      return searchModifyOrg(query).then(resp => {
        return resp.data
      })
    },
    auditOrgItem ({commit}, query) {
      return auditOrg(query).then(resp => {
        return resp.data
      })
    },
    beforeModify ({commit}, query) {
      return beforeModify(query).then(resp => {
        return resp.data
      })
    },
    afterModify ({commit}, query) {
      return afterModify(query).then(resp => {
        return resp.data
      })
    },
    allOrg ({commit}, query) {
      return allOrg(query).then(resp => {
        return resp.data
      })
    },
    getBtnLimt_Org ({commit}, query) {
      return getBtnLimt(query).then(resp => {
        return resp.data
      })
    }
  }
}
