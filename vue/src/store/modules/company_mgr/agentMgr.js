import { searchBusPeople, addPeople, modifyPeople, outImportMesg, getDalogMesg, getInsCom, detailMesg } from '@/api/company_mgr/agentMgr.js'
import { getBtnLimt } from '@/api/dailogApi/dailogApi.js'
export const agentManage = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    searchBusPeople ({commit}, query) {
      return searchBusPeople(query).then(resp => {
        return resp.data
      })
    },
    addPeople ({commit}, query) {
      return addPeople(query).then(resp => {
        return resp.data
      })
    },
    modifyPeople ({commit}, query) {
      return modifyPeople(query).then(resp => {
        return resp.data
      })
    },
    outImportMesg ({commit}, query) {
      return outImportMesg(query).then(resp => {
        return resp.data
      })
    },
    getDalogMesg ({commit}, query) {
      return getDalogMesg(query).then(resp => {
        return resp.data
      })
    },
    getSilverInsCom ({commit}, query) {
      return getInsCom(query).then(resp => {
        return resp.data
      })
    },
    detailMesg ({commit}, query) {
      return detailMesg(query).then(resp => {
        return resp.data
      })
    },
    getBtnLimt_Agent ({commit}, query) { // 按钮权限
      return getBtnLimt(query).then(resp => {
        return resp.data
      })
    }
  }
}
