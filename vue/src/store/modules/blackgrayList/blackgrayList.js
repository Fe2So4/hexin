import { addblackList, queryBlackList, modblackList, revokeblackList, examineblackList, queryLsById, queryDetail, checkAdd, customerFindById } from '@/api/blackgrayList_mgr/blackgrayList.js'
export const BlackList = {
  state: {
    queryBlackList: [],
    getInfos: [],
    totalElements: '',
    custDetail: {},
    getInfosNum: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    addblackList_1 ({commit}, info) {
      return addblackList(info).then(resp => {
        return resp.data
      })
    },
    revokeblackList_1 ({commit}, info) {
      // return revokeblackList(info)
      // return resp.data
      return revokeblackList(info).then(resp => {
        return resp.data
      })
    },
    modblackList_1 ({commit}, info) {
      return modblackList(info).then(resp => {
        return resp.data
      })
    },
    // 查询
    queryBlackList_1 ({commit, state}, info) {
      return queryBlackList(info).then(result => {
        // console.log(JSON.stringify(result.data.data.content))
        // state.queryBlackList = result.data.data.content
        // state.totalElements = result.data.data.totalElements
        return result.data
      })
    },
    // 审核
    examineBlackList_black ({commit}, info) {
      return examineblackList(info).then(resp => {
        return resp.data
      })
    },
    // 黑灰名单投保单信息查询
    queryLsById_1 ({commit, state}, info) {
      return queryLsById(info).then(result => {
        if (result.data.code === '000000') {
          console.log(result.data)
          // state.getInfos = result.data.data.content
          // state.getInfosNum = result.data.data.totalElements

          console.log('totalElements:' + state.totalElements)
          return result.data
        } else {
          return result.data
        }
      })
    },
    queryDetail_1 ({commit, state}, info) { // 查看详情
      return queryDetail(info).then(result => {
        return result.data
      })
    },
    checkAdd ({commit, state}, info) { // 查看详情
      return checkAdd(info).then(result => {
        return result.data
      })
    },
    customerFindById_1 ({commit, state}, info) { // 查看详情
      return customerFindById(info).then(data => {
        state.custDetail = data.data
      // console.log('store里面查询出的：' + JSON.stringify(data))
        return data
      })
    }
  }
}
