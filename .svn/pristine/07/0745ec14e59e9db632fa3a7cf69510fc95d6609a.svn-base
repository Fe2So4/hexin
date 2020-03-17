import { queryBillView, checkBillView, queryTrack, getComBillView, expBillView, queryMoneyBillView, checkMoneyBillView, queryMoneyTrack, expMoneyBillView } from '@/api/bill_mgr/billView.js'
import {
  api
} from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
import IsEmpty from '@/utils/IsEmpty'
export const billView = {
  state: {
    billQueryData: [],
    billTotalRecords: '',
    msg: '',
    billDetailData: {},
    billMoneyQueryData: [],
    billMoneyTotalRecords: '',
    moneymsg: '',
    billMoneyDetailData: {},
    comData: [],
    totalCom: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getComBillView ({commit, state}, query) {
      // state.comData = []
      return getComBillView(query).then(resp => {
        console.log(resp)
        if (!(resp.data.code !== '000000' && !IsEmpty(resp.data.code))) {
          state.comData = resp.data
          state.totalCom = resp.data.data.totalRecords
        }
      })
    },
    queryBillView ({commit, state}, query) {
      state.billQueryData = []
      return queryBillView(query).then(resp => {
        if (!(resp.data.code !== '000000' && !IsEmpty(resp.data.code))) {
          state.billQueryData = resp.data.content
          state.billTotalRecords = resp.data.totalElements
        }
      })
    },
    checkBillView ({commit}, info) {
      return checkBillView(info)
    },
    queryTrack ({commit, state}, info) {
      state.msg = ''
      return queryTrack(info).then(resp => {
        // alert(resp.data)
        state.msg = resp.data
      })
    },
    getBillDetail ({commit, state}, info) {
      state.billDetailData = {}
      return api('/lifeCharge/queryLifeChargePoundageRecon', 'post', `batchNO=${info}`).then(resp => {
        state.billDetailData = resp.data
        if (state.billDetailData.status === '1') {
          state.billDetailData.status = '财务未审核'
        } else if (state.billDetailData.status === '2') {
          state.billDetailData.status = '财务复核通过'
        } else if (state.billDetailData.status === '3') {
          state.billDetailData.status = '财务审核通过'
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    expBillView ({commit}, info) {
      return expBillView(info)
    },
    // 财险
    queryMoneyBillView ({commit, state}, query) {
      state.billMoneyQueryData = []
      return queryMoneyBillView(query).then(resp => {
        console.log(resp)
        state.billMoneyQueryData = resp.data.content
        state.billMoneyTotalRecords = resp.data.totalElements
      })
    },
    checkMoneyBillView ({commit}, info) {
      return checkMoneyBillView(info)
    },
    queryMoneyTrack ({commit, state}, info) {
      state.moneymsg = ''
      return queryMoneyTrack(info).then(resp => {
        state.moneymsg = resp.data
      })
    },
    getMoneyBillDetail ({commit, state}, info) {
      state.billMoneyDetailData = {}
      // return getMoneyBillDetail(info).then(resp => {
      //   if (resp.data.code === '000000')
      //   state.billMoneyDetailData = resp.data
      //   if (state.billMoneyDetailData.status === '1') {
      //     state.billMoneyDetailData.status = '未审核'
      //   } else if (state.billMoneyDetailData.status === '2') {
      //     state.billMoneyDetailData.status = '复核通过'
      //   } else if (state.billMoneyDetailData.status === '3') {
      //     state.billMoneyDetailData.status = '审核通过'
      //   }
      //   return resp.data
      // })
      return api('/propertyCharge/queryPropertyChargePoundageRecon', 'post', `batchNO=${info}`).then(resp => {
        state.billMoneyDetailData = resp.data
      }).catch((e) => {
        console.log(e)
      })
    },
    expMoneyBillView ({commit}, info) {
      return expMoneyBillView(info)
    }
  }
}
