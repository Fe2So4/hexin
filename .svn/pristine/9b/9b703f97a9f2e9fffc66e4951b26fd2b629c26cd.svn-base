import { searchIns, addIns, searchProlist, modifyIns, deleteIns, auditIns, getInsOrgDetail } from '@/api/supplier_mgr/insurance_Org.js'
import { getAllsilverCom, getAllInsOrg, getBtnLimt } from '@/api/dailogApi/dailogApi.js'
export const insurance = {
  state: {
    insLIst: [], // 保险公司机构列表
    proList: [] // 省份列表
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getInsList ({commit}, query) {
      return searchIns(query).then(resp => {
        return resp.data
      })
    },
    addInsOrg ({commit}, query) {
      return addIns(query).then(resp => {
        return resp.data
      })
    },
    searchProIns ({commit}, query) {
      return searchProlist(query).then(resp => {
        return resp.data
      })
    },
    modifyInsOrg ({commit}, query) {
      return modifyIns(query).then(resp => {
        return resp.data
      })
    },
    deleteInsOrg ({commit}, query) {
      return deleteIns(query).then(resp => {
        return resp.data
      })
    },
    auditInsOrg ({commit}, query) {
      return auditIns(query).then(resp => {
        return resp.data
      })
    },
    getInsCom ({commit}, query) {
      return getAllsilverCom(query).then(resp => {
        return resp.data
      })
    },
    getInsOrg ({commit}, query) {
      return getAllInsOrg(query).then(resp => {
        return resp.data
      })
    },
    getInsOrgDetail ({commit}, query) {
      return getInsOrgDetail(query).then(resp => {
        return resp.data
      })
    },
    getBtnLimt_InsOrg ({commit}, query) {
      return getBtnLimt(query).then(resp => {
        return resp.data
      })
    }
  }
}
