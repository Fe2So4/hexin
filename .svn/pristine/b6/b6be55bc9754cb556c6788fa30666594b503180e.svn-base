import { searchCooCom, addCooCom, searchProCoo, searchDetailCom, deleteCooCom, modifyCooCom, auditCooCom, getDetails, afterGetDetails, getAllCom, getCooCity, picDel, getFiliale, getFiliale2, getAudit } from '@/api/supplier_mgr/cooperation_Com.js'
import { getBtnLimt } from '@/api/dailogApi/dailogApi.js'
export const cooperationCom = {
  state: {
    cooLIst: [], // 合作经代公司列表
    proList: [] // 省份列表
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getComList ({commit}, query) {
      return searchCooCom(query).then(resp => {
        return resp.data
      })
    },
    addCom ({commit}, query) {
      return addCooCom(query).then(resp => {
        return resp.data
      })
    },
    searchProCoo ({commit}, query) {
      return searchProCoo(query).then(resp => {
        return resp.data
      })
    },
    searchDetailCom ({commit}, query) { // 查询保险公司详情
      return searchDetailCom(query).then(resp => {
        return resp.data
      })
    },
    modifyCooCom ({commit}, query) { // 修改
      return modifyCooCom(query).then(resp => {
        return resp.data
      })
    },
    deleteCooCom ({commit}, query) { // 删除
      return deleteCooCom(query).then(resp => {
        return resp.data
      })
    },
    auditCooCom ({commit}, query) { // 修改
      return auditCooCom(query).then(resp => {
        return resp.data
      })
    },
    getDetails ({commit}, query) { // 获取修改前的详情
      return getDetails(query).then(resp => {
        return resp.data
      })
    },
    afterGetDetails ({commit}, query) { // 获取修改前的详情
      return afterGetDetails(query).then(resp => {
        return resp.data
      })
    },
    getAllCom ({commit}, query) { // 获取修改前的详情
      return getAllCom(query).then(resp => {
        return resp.data
      })
    },
    getBtnLimt_cooCom ({commit}, query) { // 获取修改前的详情
      return getBtnLimt(query).then(resp => {
        return resp.data
      })
    },
    getCooCity_cooCom ({commit}, query) { // 获取城市
      return getCooCity(query).then(resp => {
        return resp.data
      })
    },
    picDel_cooCom ({commit}, query) { // 预览图片
      return picDel(query).then(resp => {
        return resp.data
      })
    },
    getFiliale_cooCom ({commit}, query) { // 获取分公司
      return getFiliale(query).then(resp => {
        return resp.data
      })
    },
    getFiliale_cooCom2 ({commit}, query) { // 获取分公司
      return getFiliale2(query).then(resp => {
        return resp.data
      })
    },
    getAudit_cooCom ({commit}, query) { // 获取审核历史
      return getAudit(query).then(resp => {
        return resp.data
      })
    }
  }
}
