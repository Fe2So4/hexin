import { getNotice } from '@/api/home'
import Monent from 'moment'
export const home = {
  state: {
    noticeList: [],
    riskcaseList: [],
    search: ''
  },
  getters: {
  },
  mutations: {
    SAVE_NOTICE (state, list) {
      list.forEach((ele) => {
        const date = new Monent(ele.reportDate)
        ele.reportDate = date.format('YYYY-MM-DD HH:mm:ss')
      })
      state.noticeList = list
    },
    SAVE_RISKCASE (state, list) {
      list.forEach((ele) => {
        const date = new Monent(ele.reportDate)
        ele.reportDate = date.format('MM-DD')
      })
      state.riskcaseList = list
    },
    CLEAR_HOME (state) {
      state.noticeList = []
      state.riskcaseList = []
    },
    SEARCH_ACTION (state, action) {
      state.search = '' + action + '@@' + new Date().getTime()
    }
  },
  actions: {
    async getNotice ({commit}, query) {
      commit('CLEAR_HOME')
      const response = await getNotice(query)
      commit('SAVE_NOTICE', response.data.specialReport)
      commit('SAVE_RISKCASE', response.data.riskReportProc)
    },
    searchAction ({commit}, action) {
      commit('SEARCH_ACTION', action)
    }
  }
}
