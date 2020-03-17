import { queryAuth, addBatch, delBatch, modBatch, queryBatch } from '@/api/batchprocess.js'
export const batch = {
  state: {
    batch: [],
    totalRecords: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    queryAuthor ({commit}, query) {
      return queryAuth(query)
    },
    addBatch_1 ({commit}, info) {
      return addBatch(info)
    },
    delBatch_1 ({commit}, info) {
      return delBatch(info)
    },
    modBatch_1 ({commit}, info) {
      return modBatch(info)
    },
    queryBatch_1 ({commit, state}, info) {
      return queryBatch(info).then(result => {
        // console.log(result.data)
        state.batch = result.data.data
        state.totalRecords = result.data.totalRecords

        console.log(state.batch)
        console.log(state.totalRecords)
        // state.batch = result.data
        return result.data
      })
    }
  }
}
