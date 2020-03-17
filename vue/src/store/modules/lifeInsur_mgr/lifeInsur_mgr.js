import { addBlackList,
         queryproposalForm,
         modBlackList,
         revokeBlackList,
         examineBlackList,
         queryPolicyById,
         customerFind,
         customerOfOrg,
         customerAdd,
         agentFind,
         getBank,
         blackExist,
         riskcode,
         insurPolicyAdd,
         insurPolicyEdit,
         insurPolicyEdit2,
         ProposalNoIsExist,
         checkCustomerIsExist,
         checkCustomerSimilar,
         cancelByProposalNo,
         lifetVerify,
         update,
         getStopDate
         } from '@/api/lifeInsur_mgr/lifeInsur_mgr.js'
export const proposalForm = {
  state: {
    queryproposal: [],
    gerInfos: [],
    customOfOrg: [],
    customerFind: [],
    customerFindTotals: '',
    totalredords: '',
    proposaltotal: '',
    lifePCMainCondition: {},
    lifePartyCondition: {},
    lifePartyConditionDList: [],
    lifePartyTConditionList: [],
    lifePartyAConditionList: [],
    lifeCItemKindConditionListTwo: [],
    lifeFeeCondition: {},
    agentFind: [],
    agentFindRecords: '',
    getBank: [],
    riskcode: [],  // 险种信息查询
    riskcodeTotals: '', // 险种信息查询的返回条数
    companyCode: '',
    chekflag: '',
    modProposalNo: '',
    checkCusflag: {},
    localStorage: {}, //
    insuridNumber: '',  // 投保人   证件号码
    insurantNumber: {}, // 被保人 证件号码
    insurantIdRes: false,
    insureIdRes: false,
    selfFlag: '0',
    zhihuiFlag: '0', // 自保件把被保险人的增删置灰
    insurSame: '0', // 投保人是否为本人
    toubaorenId: '0', // 投保人证件号
    toubaoreninfo: {},
    dataglodClose: '0',
    change: false,
    qinglihuancun: false, //  提交过后被保人里面清理code 和 name 的置灰问题
    baofeiheji: 0,
    getStopDate:'',
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getStopDate_1({commit},info) {
      return getStopDate(info)
    },
    addBlackList_1 ({commit}, info) {
      return addBlackList(info)
    },
    revokeBlackList_1 ({commit}, info) {
      return revokeBlackList(info)
    },
    modBlackList_1 ({commit}, info) {
      return modBlackList(info)
    },
    // 查询
    queryproposalForm_1 ({commit, state}, info) {
      return queryproposalForm(info).then(result => {
        //
        if (result.data.code === '000000') {
          state.queryproposal = result.data.data.data
          state.proposaltotal = result.data.data.totalRecords
          return result.data
        } else {
          return result.data
        }
      })
    },
    // 审核
    examineBlackList_1 ({commit}, info) {
      return examineBlackList(info)
    },
    // 投保单详细信息
    queryPolicyById_1 ({commit, state}, info) {
      let self = this
      return queryPolicyById(info).then(result => {
       //
        if (result.data.code === '000000') {
          // let selfTempBool = false
          state.lifePCMainCondition = result.data.data.lifePCMainCondition // 基本信息
          state.lifePartyCondition = result.data.data.lifePartyCondition // 投保人信息
          state.lifePartyConditionDList = result.data.data.lifePartyConditionDList // 被保险人信息
          state.lifePartyTConditionList = result.data.data.lifePartyTConditionList // 身故受益人
          state.lifePartyAConditionList = result.data.data.lifePartyAConditionList // 生存收益人
          state.lifeCItemKindConditionListTwo = result.data.data.lifeCItemKindConditionListTwo // 险种信息
          state.lifeFeeCondition = result.data.data.lifeFeeCondition // 缴费信息

          for (let i = 0; i < self.state.login.allAgentData.length; i++) {
            if (self.state.login.allAgentData[i] === state.lifePartyCondition.identifyNumber) {
              // 投保人与业务员对比，一样则自保件为是
              state.selfFlag = '1'
              state.insureIdRes = true
            }
            for (let j = 0; j < state.lifePartyConditionDList.length; j++) {
              // 被保人与业务员对比
              if (self.state.login.allAgentData[i] === state.lifePartyConditionDList[j].identifyNumberD) {
                state.selfFlag = '1'
                state.insurantIdRes = true
              }
            }
          }
          return result.data
        } else {
          return result.data
        }
      })
    },
    // 客户信息
    customerFind_1 ({commit, state}, info) {
      return customerFind(info).then(result => {
        //
        state.customerFind = result.data.data
        state.customerFindTotals = result.data.totalRecords
        return result.data
      })
    },
    // 客户所属机构
    customerOfOrg_1 ({commit, state}, info) {
      return customerOfOrg(info).then(result => {
        //

        // 投保人信息
        state.customOfOrg = result.data.data.data
        state.totalredords = result.data.data.totalRecords
        return result.data
      })
    },
    // 添加个人客户
    customerAdd_1 ({commit}, info) {
      return customerAdd(info).then(result => {
        if (result.data.code === '000000') {
          return result.data
        } else {
          return result.data
        }
      })
    },
    // 查询业务员
    agentFind_1 ({commit, state}, info) {
      return agentFind(info).then(result => {
        if (result.data.code === '000000') {
          state.agentFind = result.data.data.data
          state.agentFindRecords = result.data.data.totalRecords
          return result.data
        } else {
          return result.data
        }
      })
    },
    // 查询银行
    // getBank_1 ({commit, state}, info) {
    //   return getBank(info).then(result => {
    //
    //

    //     // 投保人信息
    //     state.agentFind = result.data.data.data
    //     state.agentFindRecords = result.data.data.totalRecords
    //     return result.data
    //   })
    // },

    getBank_1 ({commit}, query) {
      return getBank(query).then(resp => {
        return resp.data
      })
    },
    // 险种查询
    riskcode_1 ({commit, state}, info) {
      return riskcode(info).then(result => {
       //

        // 投保人信息
        state.riskcode = result.data.data
        state.riskcodeTotals = result.data.totalRecords
        return result.data
      })
    },
    // 投保单录入
    insurPolicyAdd_1 ({commit, state}, info) {
      return insurPolicyAdd(info).then(result => {
        if (result.data.code === '000000') {
          return result.data
        } else {
          return result.data
        }
      })
    },
    // 投保单超级权限修改
    insurPolicyEdit_1 ({commit, state}, info) {
      return insurPolicyEdit(info).then(result => {
        if (result.data.code === '000000') {
          return result.data
        } else {
          return result.data
        }
      })
    },
    // 投保单修改
    insurPolicyEdit_2 ({commit, state}, info) {
      return insurPolicyEdit2(info).then(result => {
        if (result.data.code === '000000') {
          return result.data
        } else {
          return result.data
        }
      })
    },
    // 判断投保单号是否存在
    ProposalNoIsExist_1 ({commit, state}, info) {
      return ProposalNoIsExist(info).then(result => {
        state.chekflag = result.data.flag
        return result.data
      })
    },
    // 判断客户是否存在
    checkCustomerIsExist_1 ({commit, state}, info) {
      return checkCustomerIsExist(info).then(result => {
        state.checkCusflag = result.data.flag
        return result.data
      })
    },
    // 判断客户是否存在
    checkCustomerSimilar_1 ({commit, state}, info) {
      return checkCustomerSimilar(info).then(result => {
        state.checkCusflag = result.data.flag
        return result.data
      })
    },

    cancelByProposalNo_1 ({commit, state}, info) {  // 撤销
      return cancelByProposalNo(info).then(result => {
        if (result.data.code === '000000') {
          return result.data
        } else {
          return result.data
        }
      })
    },
    lifetVerify_1 ({commit, state}, info) {  // 审核
      return lifetVerify(info).then(result => {
        if (result.data.code === '000000') {
          return result.data
        } else {
          return result.data
        }
      })
    },
       // 投保单修改
    update_1 ({commit, state}, info) {
      return update(info).then(result => {
         //
        if (result.data.code === '000000') {
          return result.data
        } else {
          return result.data
        }
      })
    },
    // 判断用户是否存在黑灰名单中
    blackExist_1 ({commit, state}, info) {
      return blackExist(info).then(result => {
         //
        if (result.data.code === '000000') {
          return result.data
        } else {
          return result.data
        }
      })
    }

  }
}
