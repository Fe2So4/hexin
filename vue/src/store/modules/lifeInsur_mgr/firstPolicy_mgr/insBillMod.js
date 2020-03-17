import { searchBillList, searchBillNoDetail, firstPolicyModify, agentFind, deletePolicy, allOrg, customerFind, agentBillFind, riskcode, getAllBank, customerAdd, customerIsExist, customerSimilar } from '@/api/lifeInsur_mgr/firstPolicy_mgr/insBillMod.js'
import { getAllsilverCom, getAllInsOrg } from '@/api/dailogApi/dailogApi.js'
export const insBillMod = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    searchBillList_Mod ({commit}, query) {
      return searchBillList(query).then(resp => {
        return resp.data
      })
    },
    searchBillNoDetail ({commit}, query) {
      return searchBillNoDetail(query).then(resp => {
        return resp.data
      })
    },
    firstPolicyModify ({commit}, query) {
      return firstPolicyModify(query).then(resp => {
        return resp.data
      })
    },
    deletePolicy ({commit}, query) { // 查询业务员
      return deletePolicy(query).then(resp => {
        return resp.data
      })
    },
    agentFind ({commit}, query) { // 查询业务员
      return agentFind(query).then(resp => {
        return resp.data
      })
    },
    getOrg_bill ({commit}, query) { // 查询机构
      return allOrg(query).then(resp => {
        return resp.data
      })
    },
    getInsCom_bill ({commit}, query) { // 查询保险公司
      return getAllsilverCom(query).then(resp => {
        return resp.data
      })
    },
    getInsOrg_bill ({commit}, query) { // 查询机构
      return getAllInsOrg(query).then(resp => {
        return resp.data
      })
    },
    customerFind_bill ({commit}, query) { // 查询业务员
      return customerFind(query).then(resp => {
        return resp.data
      })
    },
    agentBillFind ({commit}, query) { // 查询业务员
      return agentBillFind(query).then(resp => {
        return resp.data
      })
    },
    riskcodeBill ({commit}, query) { // 险种
      return riskcode(query).then(resp => {
        return resp.data
      })
    },
    getAllBankBill ({commit}, query) { // 获取所有银行
      return getAllBank(query).then(resp => {
        return resp.data
      })
    },
    customerAdd_Mod ({commit}, query) { // 查询业务员
      return customerAdd(query).then(resp => {
        return resp.data
      })
    },
    customerIsExist ({commit}, query) { // 查询业务员
      return customerIsExist(query).then(resp => {
        return resp.data
      })
    },
    customerSimilar ({commit}, query) { // 查询业务员
      return customerSimilar(query).then(resp => {
        return resp.data
      })
    }
  }
}
