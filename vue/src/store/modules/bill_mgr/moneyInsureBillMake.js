// import {
//   api
// } from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
// import IsEmpty from '@/utils/IsEmpty'
export const propertyInsureBillMake = {
  state: {
    propertyshengchengBackData: '',
    propertyshenheBackData: '',
    propertyInsureRenderTableData: [],
    propertyInsureExport: {},
    propertyInsureBillMakedblComData1: [],
    propertyInsureBillMakedblComData2: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // // 查询
    // propertyInsureQueryData ({commit, state}, info) {
    //   console.log(info)
    //   api('/propertyCharge/queryPropertyChargeCompareDetail', 'post', info).then(result => {
    //     console.log(result.data)
    //     state.propertyInsureRenderTableData = result.data.content
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // },
    // makeBillListMoneyInsure ({commit, state}, info) {
    //   console.log(info)
    //   return new Promise((resolve, reject) => {
    //     api('/propertyCharge/propertyChargeCompanyStatement', 'post', info).then(result => {
    //       console.log(result.data)
    //       if (result.data === 1) {
    //         api('/propertyCharge/addPropertyChargePoundageRecon', 'post', info).then(result => {
    //           console.log(result.data)
    //           state.propertyshengchengBackData = '提交成功'
    //           resolve(state.propertyshengchengBackData)
    //         }).catch((e) => {
    //           console.log(e)
    //         })
    //       } else if (result.data === 2) {
    //         // 已存在待审核或审核通过的对账单
    //         state.propertyshengchengBackData = '已存在待审核或审核通过的对账单'
    //         reject(state.propertyshengchengBackData)
    //       } else if (result.data === 4) {
    //         // 正在生成对账单，请耐心等待!
    //         state.propertyshengchengBackData = '正在生成对账单，请耐心等待!'
    //         reject(state.propertyshengchengBackData)
    //       } else if (result.data === 3) {
    //         // "请导入对账单模板"
    //         state.propertyshengchengBackData = '请导入对账单模板'
    //         reject(state.propertyshengchengBackData)
    //       }
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    // },
    // goExamineMoneyInsure ({commit, state}, info) {
    //   console.log(info)
    //   return new Promise((resolve, reject) => {
    //     api('/propertyCharge/updatePropertyChargeCompareDetail', 'post', info).then(result => {
    //       console.log(result)
    //       if (result.data === '提交到审核岗') {
    //         state.propertyshenheBackData = '提交成功'
    //         resolve(state.propertyshenheBackData)
    //       } else {
    //         state.propertyshenheBackData = '提交失败'
    //         reject(state.propertyshenheBackData)
    //       }
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    // },
    // downloadMobanMoneyInsure ({commit, state}) {
    //   window.location.href = '/tabycore/rate/propertyChargeMould'
    // },
    // exportpropertyInsure ({commit, state}, info) {
    //   state.propertyInsureExport = info
    //   window.location.href = `/tabycore/propertyCharge/downloadPropertyChargeCompareDetail?companyCode=${state.propertyInsureExport.companyCode}&companyName=${state.propertyInsureExport.companyName}&comCode=${state.propertyInsureExport.comCode}&comName=${state.propertyInsureExport.comName}&type=${state.propertyInsureExport.type}&yearMouth=${state.propertyInsureExport.yearMouth}`
    // }
  }
}
