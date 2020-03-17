import {
  api
} from '@/api/bill_mgr/blackInsure.js'
export const cooperInsureBillMake = {
  state: {
    coopershengchengBackData: '',
    coopershenheBackData: '',
    cooperInsureRenderTableData: [],
    cooperInsureExport: {}
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // 查询
    cooperInsureQueryData ({commit, state}, info) {
      api('/cooperCharge/querycooperChargeCompareDetail', 'post', info).then(result => {
        state.renderTableData = result.data.content
      }).catch((e) => {
        console.log(e)
      })
    },
    makeBillList ({commit, state}, info) {
      return new Promise((resolve, reject) => {
        api('/cooperCharge/cooperChargeCompanyStatement', 'post', info).then(result => {
          console.log(result)
          if (result.data === 1) {
            api('/cooperCharge/addcooperChargePoundageRecon', 'post', info).then(result => {
              state.coopershengchengBackData = '提交成功'
            }).catch((e) => {
              console.log(e)
            })
          } else if (result.data === 2) {
            // 已存在待审核或审核通过的对账单
            state.coopershengchengBackData = '已存在待审核或审核通过的对账单'
          } else if (result.data === 4) {
            // 正在生成对账单，请耐心等待!
            state.coopershengchengBackData = '正在生成对账单，请耐心等待!'
          } else if (result.data === 3) {
            // "请导入对账单模板"
            state.coopershengchengBackData = '请导入对账单模板'
          }
        }).catch((e) => {
          console.log(e)
        })
      })
    },
    goExamine ({commit, state}, info) {
      return new Promise((resolve, reject) => {
        api('/cooperCharge/updatecooperChargeCompareDetail', 'post', info).then(result => {
          if (result.data === '提交到审核岗') {
            state.coopershenheBackData = '提交成功'
          } else {
            state.coopershenheBackData = '提交失败'
          }
        }).catch((e) => {
          console.log(e)
        })
      })
    },
    importInsureList ({commit, state}, info) {
      api('/leaveAgent/leaveAgentPolicyQuery', 'post', info).then(result => {
        console.log(result)
        state.quitListMgr = result.data.data.content
      }).catch((e) => {
        console.log(e)
      })
    },
    downloadMoban ({commit, state}) {
      window.open('/tabycore/rate/cooperChargeMould')
      /**
       * fetch('http://192.168.1.121:8080/tabycore/blackList/blackListProQuery',
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify(info),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          console.log(response)
        }, (error) => {
          console.log(error)
        })
       */
    },
    exportcooperInsure ({commit, state}, info) {
      state.cooperInsureExport = info
      window.open(`/tabycore/cooperCharge/downloadcooperChargeCompareDetail?companyCode=${state.cooperInsureExport.companyCode}&companyName=${state.cooperInsureExport.companyName}&comCode=${state.cooperInsureExport.comCode}&comName=${state.cooperInsureExport.comName}&type=${state.cooperInsureExport.type}&yearMouth=${state.cooperInsureExport.yearMouth}&batch=${state.cooperInsureExport.batch}`)
    }
  }
}
