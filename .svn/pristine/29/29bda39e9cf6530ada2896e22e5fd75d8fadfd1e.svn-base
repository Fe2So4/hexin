import { queryRisk, addRisk, delRisk, modRisk, checkRisk, getRiskcodes, getInsuranceCom, uploadRisk, exportRisk, getRiskDetail } from '@/api/goodsCommRate_mgr/riskMgr.js'
export const riskMgr = {
  state: {
    riskQueryData: [],
    riskTotalRecords: '',
    dbtotalRecords: '',
    insComData: [],
    riskData: [],
    currentPage: 1,
    pageSize: 10,
    riskAllDataCheck: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    addRisk ({commit}, info) {
      return addRisk(info)
    },
    delRisk ({commit}, info) {
      return delRisk(info)
    },
    modRisk ({commit}, info) {
      return modRisk(info)
    },
    getInsuranceCom ({commit, state}, info) {
      return getInsuranceCom(info).then(resp => {
        state.riskAllDataCheck = resp.data.data
        state.insComData = resp.data.data.data
        state.dbtotalRecords = resp.data.data.totalRecords
        state.currentPage = resp.data.data.current
        state.pageSize = resp.data.data.pagesize
        return resp.data
      })
    },
    queryRisk ({commit, state}, query) {
      return queryRisk(query).then(resp => {
        state.riskQueryData = resp.data.data
        state.riskTotalRecords = resp.data.totalRecords
        state.currentPage = resp.data.current
        state.pageSize = resp.data.pagesize
        return resp.data
      })
    },
    checkRisk ({commit}, info) {
      return checkRisk(info)
    },
    getRiskcodes ({commit, state}, info) {
      return getRiskcodes(info).then(resp => {
        state.riskData = resp.data.data
        state.dbtotalRecords = resp.data.totalRecords
        return resp.data
      })
    },
    uploadRisk ({commit}, info) {
      return uploadRisk(info)
    },
    exportRisk ({commit}, info) {
      return exportRisk(info)
    },
    getRiskDetail ({commit}, info) {
      return getRiskDetail(info)
    }
  }
}
