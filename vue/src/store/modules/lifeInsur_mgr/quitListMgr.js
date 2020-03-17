import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
// import IsEmpty from '@/utils/IsEmpty'
export const quitListMgr = {
  state: {
    quitListMgrdblComData: [],
    quitListMgrdblworkerData: [],
    quitListMgr: [],
    quitListDetail: {
      agentCode: '',
      agentName: '',
      comCode: '',
      comName: '',
      AgentType: 1,
      agentCode2: '',
      AgentName2: '',
      comCode2: '',
      comName2: '',
      baodanDetailData1: '',
      baodanDetailData2: ''
    },
    quitListMgrZhipaijieguo: '',
    quitListMgrTotal: 0
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // quitListMgrdownloadQuitList ({commit, state}, info) {
    //   window.location.href = '/tabycore/leaveAgent/downloadModel?downType=model'
    // },
    // quitListMgrcheckQuitList ({commit, state}, info) {
    //   api('/leaveAgent/leaveAgentPolicyQuery', 'post', info).then(result => {
    //     console.log(result)
    //     state.quitListMgr = result.data.data.content
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // },
    // quitListMgrimportQuitList ({commit, state}, info) {
    //   api('/leaveAgent/leaveAgentReport', 'post', info).then(result => {
    //     console.log(result)
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // },
    // quitListMgrchangeQuitList ({commit, state}, info) {
    //   console.log(typeof (info))
    //   api('/leaveAgent/getLeaveAgentInfo', 'post', `policyNo=${info}`).then(result => {
    //     console.log(result)
    //     state.quitListDetail = result.data.data
    //     // if (state.quitListDetail.AgentType == ) {
    //     // }
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // },
    // quitsendListDetail ({commit, state}, info) {
    //   api('/leaveAgent/saveLeaveAgent', 'post', info[1]).then(result => {
    //     console.log(result)
    //     state.quitListMgrZhipaijieguo = result.data
    //     info[0]()
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // },
    quitListMgrdbclickCom ({commit, state}, info) {
      return api('/leaveAgent/baseCompanyQuery', 'post', info)
    },
    quitListMgrdbclickWorker ({commit, state}, info) {
      return api('/leaveAgent/agentQuery', 'post', info)
    },
    contiListCheckclickWorker ({commit, state}, info) {
      return api('/proposalForm/agentFind2', 'post', info)
    },
    contiListCheckclickWorker1 ({commit, state}, info) {
      return api('/salaryCommissionProperty/querySomeAgent', 'post', info)
    }
    // baodanDetailGet1 ({commit, state}, info) {
    //   return new Promise((resolve, reject) => {
    //     api('policyQuery/singlePolicyInfoView', 'post', info).then(result => {
    //       console.log(result)
    //       if (result.data.code === '000000') {
    //         state.baodanDetailData1 = result.data.data.content
    //         resolve()
    //       }
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    // },
    // baodanDetailGet2 ({commit, state}, info) {
    //   return new Promise((resolve, reject) => {
    //     api('policyQuery/singlePolicyInsureView', 'post', info).then(result => {
    //       console.log(result)
    //       if (result.data.code === '000000') {
    //         state.baodanDetailData2 = result.data.data.content
    //         resolve()
    //       }
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    // }
  }
}
