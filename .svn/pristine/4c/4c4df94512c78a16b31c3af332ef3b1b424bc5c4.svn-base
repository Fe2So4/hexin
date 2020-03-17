import { getDataDictionary, addDictionary, deleteDictionary, updataDictionary, getCategorycode, getCode, checkedCode } from '@/api/system_mgr/dictionary.js'
export const dictionary = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getDataDictionary ({commit}, query) {
      return getDataDictionary(query).then(response => {
        return response.data
      })
    },
    addDataDictionary ({commit}, query) {
      return addDictionary(query).then(response => {
        return response.data
      })
    },
    deleteDataDictionary ({commit}, query) {
      return deleteDictionary(query).then(response => {
        return response.data
      })
    },
    updataDataDictionary ({commit}, query) {
      return updataDictionary(query).then(response => {
        return response.data
      })
    },
    searchCategoryCode ({commit}, query) {
      return getCategorycode(query).then(response => {
        return response.data
      })
    },
    searchCode ({commit}, query) {
      return getCode(query).then(response => {
        return response.data
      })
    },
    checkedCode ({commit}, query) {
      return checkedCode(query).then(response => {
        return response.data
      })
    }
  }
}
