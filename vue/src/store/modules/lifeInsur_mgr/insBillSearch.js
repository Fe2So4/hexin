import { searchBillList, searchPolicyNoDetail, searchAgentDetail, searchInsureDetail, searchInsuredDetail, searchXqDetail, checkXqDetail, searchXqDetaill, modBillDetail } from '@/api/lifeInsur_mgr/insBillSearch.js'
export const insBill = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    searchBillList ({commit}, query) {
      return searchBillList(query).then(resp => {
        return resp.data
      })
    },
    searchPolicyNoDetail ({commit}, query) { // 查询保单号
      return searchPolicyNoDetail(query).then(resp => {
        return resp.data
      })
    },
    searchAgentDetail ({commit}, query) { // 查询业务员
      return searchAgentDetail(query).then(resp => {
        return resp.data
      })
    },
    searchInsureDetail ({commit}, query) { // 查询投保人员
      return searchInsureDetail(query).then(resp => {
        return resp.data
      })
    },
    searchInsuredDetail ({commit}, query) { // 查询被投保人
      return searchInsuredDetail(query).then(resp => {
        return resp.data
      })
    },
    searchXqDetail ({commit}, query) { // 查询续期详情
      return searchXqDetail(query).then(resp => {
        return resp.data
      })
    },
    checkXqDetail ({commit}, query) { // 检查续期
      return checkXqDetail(query).then(resp => {
        return resp.data
      })
    },
    searchXqDetaill ({commit}, query) { // 检查续期,续期保单回录修改超级权限
      return searchXqDetaill(query).then(resp => {
        return resp.data
      })
    },
    modBillDetail ({commit}, query) { // 检查续期
      return modBillDetail(query).then(resp => {
        return resp.data
      })
    }
  }
}
