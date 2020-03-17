import { queryAuth, saveAuthor, getRoleList, getMenuList, getRoleInfo, addRole, updateRole, getAllUser, queryOrg, getUserRole, getUserTo, copyQuality } from '@/api/system_mgr/author.js'
import { allOrg } from '@/api/dailogApi/dailogApi.js'

export const author = {
  state: {
    // costmerList: {},
    // policyList: [],
    // reportInfo: {}
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    queryAuth ({commit}, query) {
      return queryAuth(query).then(response => {
        return response.data
      })
    },
    queryOrg ({commit}, query) {
      return queryOrg(query)
    },
    getUserRole ({commit}, query) {
      return getUserRole(query)
    },
    getRoleList ({commit}, query) {
      return getRoleList(query)
    },
    getMenuList ({commit}, query) {
      return getMenuList(query)
    },
    getRoleInfo ({commit}, query) {
      return getRoleInfo(query)
    },
    addRole ({commit}, query) {
      return addRole(query)
    },
    updateRole ({commit}, query) {
      return updateRole(query)
    },
    saveAuthor ({commit}, query) {
      return saveAuthor(query)
    },
    getAllUser ({commit}, query) {
      return getAllUser(query)
    },
    getUserTo ({commit}, query) {
      return getUserTo(query).then(response => {
        return response.data
      })
    },
    copyQuality ({commit}, query) {
      return copyQuality(query)
    },
    copyAllOrg ({commit}, query) {
      return allOrg(query).then(response => {
        return response.data
      })
    }
  }
}
