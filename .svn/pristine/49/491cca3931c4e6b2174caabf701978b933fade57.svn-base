import { querySalarys, addSalary, modSalary, querySalaryDetail, delSalary } from '@/api/goodsCommRate_mgr/ProCommissionSet.js'
import { allOrg } from '@/api/dailogApi/dailogApi.js'
export const proCommissionSet = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    querySalarys ({commit}, query) { // 产险佣金率配置分页查询
      return querySalarys(query).then(resp => {
        return resp.data
      })
    },
    addSalary ({commit}, query) { // 新增
      return addSalary(query).then(resp => {
        return resp.data
      })
    },
    modSalary ({commit}, query) { // 修改
      return modSalary(query).then(resp => {
        return resp.data
      })
    },
    querySalaryDetail ({commit}, query) { // 详情
      return querySalaryDetail(query).then(resp => {
        return resp.data
      })
    },
    delSalary ({commit}, query) { // 删除
      return delSalary(query).then(resp => {
        return resp.data
      })
    },
    getAllOrg_ProCom ({commit}, query) { // 获取所有佰盈机构
      return allOrg(query).then(resp => {
        return resp.data
      })
    }
  }
}
