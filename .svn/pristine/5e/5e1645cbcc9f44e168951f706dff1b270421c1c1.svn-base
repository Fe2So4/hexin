import { queryLifeRate, checkRate, queryCheck, exportRate, getRateInsuranceCom, getRateRisk, queryLifeNeimengRate, checkNeimengRate, queryNeimengCheck, exportNeimengRate, getNeimengRateInsuranceCom, getNeimengRateRisk } from '@/api/rate_mgr/rateMgr.js'
import { getBtnLimt } from '@/api/dailogApi/dailogApi.js'
export const rateMgr = {
  state: {
    insComData: [],
    dbtotalRecords: '',
    riskData: [],
    currentPage: 1,
    pageSize: 10
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    queryLifeRate ({commit}, query) {
      return queryLifeRate(query)
    },
    queryLifeNeimengRate ({commit}, query) {
      return queryLifeNeimengRate(query)
    },
    checkRate ({commit}, query) {
      return checkRate(query)
    },
    queryCheck ({commit}, info) {
      return queryCheck(info)
    },
    exportRate ({commit}, expData) {
      return exportRate(expData)
    },
    checkNeimengRate ({commit}, query) {
      return checkNeimengRate(query)
    },
    queryNeimengCheck ({commit}, info) {
      return queryNeimengCheck(info)
    },
    exportNeimengRate ({commit}, expData) {
      return exportNeimengRate(expData)
    },
    getRateInsuranceCom ({commit, state}, info) {
      return getRateInsuranceCom(info).then(resp => {
        if (resp.data.code === '000000') {
          state.insComData = resp.data.data.data
          state.dbtotalRecords = resp.data.data.totalRecords
          state.currentPage = resp.data.data.current
          state.pageSize = resp.data.data.pagesize
        } else {
          state.insComData = []
          state.dbtotalRecords = 0
        }
        return resp.data
      })
    },
    getNeimengRateInsuranceCom ({commit, state}, info) {
      return getNeimengRateInsuranceCom(info).then(resp => {
        if (resp.data.code === '000000') {
          state.insComData = resp.data.data.data
          state.dbtotalRecords = resp.data.data.totalRecords
          state.currentPage = resp.data.data.current
          state.pageSize = resp.data.data.pagesize
        } else {
          state.insComData = []
          state.dbtotalRecords = 0
        }
        return resp.data
      })
    },
    getRateRisk ({commit, state}, info) {
      return getRateRisk(info).then(resp => {
        if (resp.data.code === '000000') {
          state.riskData = resp.data.data.data
          state.dbtotalRecords = resp.data.data.totalRecords
          state.currentPage = resp.data.data.current
          state.pageSize = resp.data.data.pagesize
        } else {
          state.riskData = []
          state.dbtotalRecords = 0
        }
        return resp.data
      })
    },
    getNeimengRateRisk ({commit, state}, info) {
      return getNeimengRateRisk(info).then(resp => {
        if (resp.data.code === '000000') {
          state.riskData = resp.data.data.data
          state.dbtotalRecords = resp.data.data.totalRecords
          state.currentPage = resp.data.data.current
          state.pageSize = resp.data.data.pagesize
        } else {
          state.riskData = []
          state.dbtotalRecords = 0
        }
        return resp.data
      })
    },
    getBtnLimt_rate ({commit}, query) {
      return getBtnLimt(query).then(resp => {
        return resp.data
      })
    }
  }
}
