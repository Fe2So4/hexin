// import {
//   api
// } from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
export const bankInsureBillCheck = {
  state: {
    bankCheckshengchengBackData: '',
    bankCheckshenheBackData: '',
    bankCheckInsureRenderTableData: [],
    bankCheckInsureExport: {},
    bankCheckDetailData: [],
    bankInsureBillCheckRenderTableData: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // 查询
    // bankCheckInsureQueryData ({commit, state}, info) {
    //   console.log(info)
    //   api('/bankCharge/queryAllBankChargePoundageRecon', 'post', info).then(result => {
    //     console.log(result.data.content)
    //     state.bankInsureBillCheckRenderTableData = result.data.content
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // },
    // exportbankCheckInsure ({commit, state}, info) {
    //   window.location.href = `/tabycore/bankCharge/downloadBankChargePoundageRecons?companyCode=${info.companyCode}&companyName=${info.companyName}&comCode=${info.comCode}&comName=${info.comName}&verifyStatus=${info.verifyStatus}&status=${info.status}&startDate=${info.startDate}&endDate=${info.endDate}&yearMouth=${info.yearMouth}`
    // },
    // bankCheckDetailDataQuery ({commit, state}, info) {
    //   console.log(info)
    //   api('/bankCharge/queryBankChargePoundageRecon', 'post', `batchNO=${info[1]}`).then(result => {
    //     console.log(result)
    //     state.bankCheckDetailData = result
    //     info[0]()
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // },
    // bankCheckShenHe ({commit, state}, info) {
    //   console.log(info)
    //   return new Promise((resolve, reject) => {
    //     api('/bankCharge/updateBankChargePoundageRecon', 'post', info).then(result => {
    //       console.log(result.data)
    //       resolve(result.data)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    // },
    // bankChecktrail ({commit, state}, info) {
    //   api('/bankCharge/queryBankChargeOperatetrack', 'post', info).then(result => {
    //     console.log(info)
    //     console.log(result)
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // }
  }
}
