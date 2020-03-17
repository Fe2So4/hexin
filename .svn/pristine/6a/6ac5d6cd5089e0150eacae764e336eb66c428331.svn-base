import {
        //  queryAuth,
         addInsurance,
         delInsurance,
         modInsurance,
         queryInsurance,
         examineInsurance,
         searchProlist,
         getInsurersOrg,
         getInsurers } from '@/api/supplier_mgr/Insurance_Co.js'
export const InsuranceCo = {
  state: {
    Insurance: [],
    getInsurersOrg: [],
    getInsurers: [],
    totalRecords: 0,
    orgRecords: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // queryAuthor ({commit}, query) {
    //   return queryAuth(query)
    // },
    addInsurance_1 ({commit}, info) {
      return addInsurance(info)
    },
    delInsurance_1 ({commit}, info) {
      return delInsurance(info)
    },
    modInsurance_1 ({commit}, info) {
      return modInsurance(info)
    },
    // 保险公司代码/名称
    getInsurers_1 ({commit, state}, info) {
      return getInsurers(info).then(result => {
        // console.log(result.data.data)
        // if (result.data.code === '000000') {
        //   state.getInsurers = result.data.data.data
        //   state.totalRecords = result.data.data.totalRecords
        // // console.log('getInsurers：' + JSON.stringify(state.getInsurers))
        //   return result.data
        // } else {
        //   return result.data
        // }
        return result.data
        // console.log('getInsurers:' + JSON.stringify(result.data))

        // console.log('getInsurers：' + JSON.stringify(state.getInsurers))
      })
    },
    // 保险机构代码/名称
    getInsurersOrg_1 ({commit, state}, info) {
      return getInsurersOrg(info).then(result => {
        console.log('getInsurers:' + JSON.stringify(result.data))
        // state.getInsurersOrg = result.data.data
        // state.orgRecords = result.data.totalRecords
        // console.log('getInsurers：' + JSON.stringify(state.getInsurers))
        return result.data
      })
    },
    queryInsurance_1 ({commit, state}, info) {
      state.Insurance = []
      state.totalRecords = 0
      console.log(info)
      return queryInsurance(info).then(result => {
        state.Insurance = result.data.data
        state.totalRecords = result.data.totalRecords
        // console.log(state.Insurance)
        // console.log(state.totalRecords)
        // state.batch = result.data
        return result.data
      })
    },
    _searchProIns ({commit}, query) {
      return searchProlist(query).then(resp => {
        return resp.data
      })
    },
    // 审核
    examineInsurance_1 ({commit}, info) {
      return examineInsurance(info)
    }
  }
}
