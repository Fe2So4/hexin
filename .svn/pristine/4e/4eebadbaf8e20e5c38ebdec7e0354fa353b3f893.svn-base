import {
  api
} from '@/api/lifeInsur_mgr/adminQuitListMgr.js'
import IsEmpty from '@/utils/IsEmpty'
export const adminQuitListMgr = {
  state: {
    adminQuitListMgrdblComData: [],
    adminQuitListMgrdblworkerData: [],
    adminQuitListMgr: [],
    adminQuitListDetail: {
      AgentCode: '',
      AgentName: '',
      comCode: '',
      comName: '',
      AgentType: '1',
      agentCode2: '',
      AgentName2: '',
      comCode2: '',
      comName2: ''
    }
    /**  {
      AgentCode 原员工代码
AgentName 原员工姓名
comCode 原员工归属机构代码
comName 原员工归属机构名称

AgentType 人员类型 1-续收人员 2-服务人员
agentCode2 指派员工代码
AgentName2 指派员工姓名
comCode2 指派员工归属机构代码
comName2 指派员工归属机构名称
    } */
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    downloadadminQuitList ({commit, state}, info) {
      window.open('/tabycore/leaveAgent/downloadModel?downType=model')
    },
    checkadminQuitList ({commit, state}, info) {
      api('/leaveAgent/leaveAgentPolicyQuery', 'post', info).then(result => {
        state.adminQuitListMgr = result.data.data.content
      }).catch((e) => {
        console.log(e)
      })
    },
    importadminQuitList ({commit, state}, info) {
      api('/leaveAgent/superleaveAgentReport', 'post', info).then(result => {
        console.log(result)
      }).catch((e) => {
        console.log(e)
      })
    },
    changeadminQuitList ({commit, state}, info) {
      console.log(typeof (info))
      api('/leaveAgent/getLeaveAgentInfo', 'post', `policyNo=${info}`).then(result => {
        state.adminQuitListDetail = result.data.data
      }).catch((e) => {
        console.log(e)
      })
    },
    adminQuitsendListDetail ({commit, state}, info) {
      api('/leaveAgent/saveLeaveAgent', 'post', info).then(result => {
        console.log(result)
      }).catch((e) => {
        console.log(e)
      })
    },
    adminQuitListMgrdbclickCom ({commit, state}, info) {
      api('/leaveAgent/baseCompanyQuery', 'post', `type=${info[0]}`).then(result => {
        console.log(result)
        if (IsEmpty(result)) {
        } else {
          state.adminQuitListMgrdblComData = result.data.data
          info[1]()
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    adminQuitListMgrdbclickWorker ({commit, state}, info) {
      console.log(info[0])
      api('/leaveAgent/agentQuery', 'post', info[0]).then(result => {
        console.log(result)
        if (IsEmpty(result)) {
        } else {
          state.adminQuitListMgrdblworkerData = result.data.data.content
          info[1]()
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
