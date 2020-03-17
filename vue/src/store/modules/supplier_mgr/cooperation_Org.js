import { searchOrgList, getAllCom, getAllCom2, getAllCooOrg, searchProCooOrg, addCooOrg, modifyCooOrg, searchDetailOrg, auditCooOrg, deleteCooOrg, searchDetailAfterOrg, getCooCity } from '@/api/supplier_mgr/cooperation_Org.js'
import { getBtnLimt } from '@/api/dailogApi/dailogApi.js'
export const cooperationOrg = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getOrgList ({commit}, query) {
      return searchOrgList(query).then(resp => {
        return resp.data
      })
    },
    getAllCom_Org ({commit}, query) {
      return getAllCom(query).then(resp => {
        return resp.data
      })
    },
    getAllCom2 ({commit}, query) {
      return getAllCom2(query).then(resp => {
        return resp.data
      })
    },
    getAllCooOrg ({commit}, query) {
      return getAllCooOrg(query).then(resp => {
        return resp.data
      })
    },
    searchProCooOrg ({commit}, query) {
      return searchProCooOrg(query).then(resp => {
        return resp.data
      })
    },
    addCooOrg ({commit}, query) {
      return addCooOrg(query).then(resp => {
        return resp.data
      })
    },
    modifyCooOrg ({commit}, query) {
      return modifyCooOrg(query).then(resp => {
        return resp.data
      })
    },
    searchDetailOrg ({commit}, query) {
      return searchDetailOrg(query).then(resp => {
        return resp.data
      })
    },
    auditCooOrg ({commit}, query) {
      return auditCooOrg(query).then(resp => {
        return resp.data
      })
    },
    deleteCooOrg ({commit}, query) {
      return deleteCooOrg(query).then(resp => {
        return resp.data
      })
    },
    searchDetailAfterOrg ({commit}, query) {
      return searchDetailAfterOrg(query).then(resp => {
        return resp.data
      })
    },
    getBtnLimt_cooOrg ({commit}, query) {
      return getBtnLimt(query).then(resp => {
        return resp.data
      })
    },
    getCooCity_cooOrg ({commit}, query) { // 获取城市
      return getCooCity(query).then(resp => {
        return resp.data
      })
    }
  }
}
