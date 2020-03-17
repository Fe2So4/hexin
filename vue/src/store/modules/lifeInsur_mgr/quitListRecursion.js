import { searchListQuit, queryLeaveAgentDetail, queryLeaveAgentPage } from '@/api/lifeInsur_mgr/quitListRecursion.js'
import { getAllComP, getAllComC } from '@/api/dailogApi/dailogApi.js'
export const quitListRecursion = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    searchList ({commit}, query) { // 离职单递归提醒基础查询
      return searchListQuit(query).then(resp => {
        return resp.data
      })
    },
    queryListPage ({commit}, query) { // 离职单递归提醒基础查询
      return queryLeaveAgentPage(query).then(resp => {
        return resp.data
      })
    },
    leaveAgentDetail ({commit}, query) { // 离职单递归提醒详情
      return queryLeaveAgentDetail(query).then(resp => {
        return resp.data
      })
    },
    getAllComP_quitList ({commit}, query) { // 离职单递归提醒获取省级分公司
      return getAllComP(query).then(resp => {
        return resp.data
      })
    },
    getAllComC_quitList ({commit}, query) { // 离职单递归提醒获取地市级分公司
      return getAllComC(query).then(resp => {
        return resp.data
      })
    }
  }
}
