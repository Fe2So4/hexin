import { setToken } from '@/utils/cookie'
import { login as lg, logout, getUserInfo, getAllAgent, getEnumData } from '@/api/login'
// import IsEmpty from '@/utils/IsEmpty'
import global from '@/utils/global'
export const login = {
  state: {
    username: '',
    userInfo: {},
    menuData: [],
    renguanList: [],
    zqEmploMag: [],
    basicLawMag: [],
    comMag: [],
    chanxianEmploMag: [],
    sysMag: [],
    lifeInsureMgr: [],
    lifeCharge: [],
    caseCount: {},
    enumData: [],
    enumDataTime: new Date(),
    isLogin: true,
    token: '',
    marginLeft: 0,
    loginUserId: '',
    showUserId: '',
    showComName: '',
    showComCode: '',
    allAgentData: '',
    orgName: '',
    operateTime: new Date().getTime()
  },
  mutations: {
    CHANGE_OPERATE_TIME: (state, operateTime) => {
      state.operateTime = operateTime
    },
    CASE_COUNT: (state, caseCount) => {
      state.caseCount = caseCount
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = Object.assign({}, state.userInfo, userInfo)
    },
    SET_MARGINLEFT: (state, width) => {
      state.marginLeft = width
    },
    LOGIN: state => {
      state.isLogin = true
    },
    LOGOUT: state => {
      state.isLogin = false
    },
    SET_ENUM: (state, enumData) => {
      state.enumData = enumData
      state.enumDataTime = new Date()
    },
    SET_MEMUDATA: (state, menuData) => {
      var dealList = menuData.filter(element => {
        return !element.parentId
      })
      var resultArr = Object.assign([], dealList)
      while (dealList.length) {
        var newDealList = []
        menuData.map(ele => {
          var index = dealList.findIndex(obj => obj.id === ele.parentId)
          if (index !== -1) {
            if (!dealList[index].children) {
              dealList[index].children = [ele]
            } else {
              dealList[index].children.push(ele)
            }
            if (ele.group) {
              if (!dealList[index].cGroup) {
                dealList[index].cGroup = [ele.group]
              } else if (
                dealList[index].cGroup.findIndex(item => item === ele.group) ===
                -1
              ) {
                dealList[index].cGroup.push(ele.group)
              }
            }
            newDealList.push(ele)
          }
        })
        dealList = newDealList
      }
      state.menuData = resultArr

      for (let i = 0; i < resultArr.length; i++) {
        if (resultArr[i].label === '人管处报表') {
          state.renguanList = resultArr[i].children
        } else if (resultArr[i].label === '展期佣金管理') {
          state.zqEmploMag = resultArr[i].children
        } else if (resultArr[i].label === '基本法管理') {
          state.basicLawMag = resultArr[i].children
        } else if (resultArr[i].label === '公司管理') {
          state.comMag = resultArr[i].children
        } else if (resultArr[i].label === '产险佣金管理') {
          state.chanxianEmploMag = resultArr[i]
        } else if (resultArr[i].label === '系统管理') {
          state.sysMag = resultArr[i].children
        } else if (resultArr[i].label === '寿险佣金管理') {
          state.lifeInsureMgr = resultArr[i].children
        } else if (resultArr[i].label === '寿险业务报表管理') {
          state.lifeCharge = resultArr[i].children
        }
      }
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return lg(username, userInfo.password)
        .then(response => {
          const data = response.data
          commit('LOGIN', data.token)
          setToken(response.data.token)
          return data
        })
        .catch(error => {
          return error
        })
    },
    logout ({ commit, state }) {
      logout(state.token)
        .then(response => {
          commit('LOGOUT')
          return response.data
        })
        .catch(error => {
          return error
        })
    },
    GetUserInfo ({ commit, state }, userId) {
      // userId = 1000
      state.loginUserId = userId
      localStorage.setItem('userId', '')
      return getUserInfo(userId)
        .then(response => {
          if (response.data.code === '000000') {
            // 由于mockjs 不支持自定义状态码只能这样hack
            global.isLogin = response.data.userName
            localStorage.setItem('userId', response.data.userName)
            state.showUserId = response.data.userName
            state.showComName = response.data.comName
            var regex = '\\((.+?)\\)'
            var arr = state.showComName.match(regex)
            var arr2 = state.showComName.split('(')
            state.orgName = arr2[0]
            state.showComCode = arr[1]
            const data = response.data
            data.data.forEach(element => {
              if (element.parentId === null || element.parentId === 'null') {
                element.parentId = ''
              }
            })
            commit('SET_MEMUDATA', data.data)
          } else {
            return new Error('失败')
          }
          // const data = response.data
          // commit('SET_MEMUDATA', data.menuList)
          // commit('SET_USERINFO', data.userInfo)
          // commit('CASE_COUNT', {
          //   init: data.admissibleReportNum, report: data.reportNum, risk: data.riskNum
          // })
          return response.data
        })
        .catch(error => {
          return error
        })
    },
    GetAllAgent ({ commit, state }) {
      return getAllAgent()
        .then(response => {
          let tempArr = []
          for (let i = 0; i < response.data.length; i++) {
            tempArr.push(response.data[i].identifyNumber)
          }
          state.allAgentData = tempArr
        })
    },
    changeView ({ commit }, width) {
      commit('SET_MARGINLEFT', width)
    },
    getEnumData ({ commit, state }) {
      const loadFlag = !state.enumData.length
      if (loadFlag) {
        getEnumData().then(response => {
          commit('SET_ENUM', response.data)
        })
      }
    }
  },
  getters: {
    getEnumDataByType: state => type => {
      return state.enumData.filter(ele => ele.field === type)
    },
    getEnumText: state => (type, value) => {
      const rs = state.enumData.find(
        ele => ele.field === type && ele.enumrate === value
      )
      if (rs) {
        return rs.describe
      } else {
        return ''
      }
    }
  }
}
