import { checkBillNo, searchHfDate, policyDateModify, getProposalDetail, customerFind, agentBillFind, riskcode, getAllBank, savePolicy, valiPolicyNo, allOrg, customerAdd, customerIsExist, customerSimilar } from '@/api/lifeInsur_mgr/firstPolicy_mgr/newContractBillEnter.js'
import { getAllsilverCom, getAllInsOrg } from '@/api/dailogApi/dailogApi.js'
export const newBillReturn = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    checkBillNo ({commit}, query) {
      return checkBillNo(query).then(resp => {
        return resp.data
      })
    },
    valiPolicyNo_newBill ({commit}, query) {
      return valiPolicyNo(query).then(resp => {
        return resp.data
      })
    },
    searchHfDate ({commit}, query) {
      return searchHfDate(query).then(resp => {
        return resp.data
      })
    },
    policyDateModify ({commit}, query) {
      return policyDateModify(query).then(resp => {
        return resp.data
      })
    },
    getProposalDetail ({commit}, query) {
      return getProposalDetail(query).then(resp => {
        return resp.data
      })
    },
    customerAdd_NewBill ({commit}, query) { // 添加客户
      return customerAdd(query).then(resp => {
        return resp.data
      })
    },
    customerIsExist_NewBill ({commit}, query) { // 添加客户是否存在
      return customerIsExist(query).then(resp => {
        return resp.data
      })
    },
    customerSimilar_NewBill ({commit}, query) { // 添加客户是否存在
      return customerSimilar(query).then(resp => {
        return resp.data
      })
    },
    savePolicy_newBill ({commit}, query) { // 查询保险公司
      return savePolicy(query).then(resp => {
        return resp.data
      })
    },
    getInsCom_newBill ({commit}, query) { // 查询保险公司
      return getAllsilverCom(query).then(resp => {
        return resp.data
      })
    },
    getInsOrg_newBill ({commit}, query) { // 查询机构
      return getAllInsOrg(query).then(resp => {
        return resp.data
      })
    },
    allOrg_newBill ({commit}, query) { // 查询机构
      return allOrg(query).then(resp => {
        return resp.data
      })
    },
    customerFind_newBill ({commit}, query) { // 查询机构
      return customerFind(query).then(resp => {
        return resp.data
      })
    },
    agentFind_newBill ({commit}, query) { // 查询机构
      return agentBillFind(query).then(resp => {
        return resp.data
      })
    },
    riskcode_newBill ({commit}, query) { // 查询机构
      return riskcode(query).then(resp => {
        return resp.data
      })
    },
    getAllBank_newBill ({commit}, query) { // 查询机构
      return getAllBank(query).then(resp => {
        return resp.data
      })
    }
  }
}
