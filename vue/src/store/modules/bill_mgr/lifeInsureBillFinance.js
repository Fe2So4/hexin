import {
  api
} from '@/api/bill_mgr/blackInsure.js'

export const lifeInsureBillFinance = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    lifeInsureBillFinanceNashuiPeopleQuery ({commit, state}, info) { // 纳税人
      return api('/Charge/queryRatepayer', 'post', info)
    },
    lifeInsureBillFinanceFirmQuery ({commit, state}, info) { // 公司段
      return api('/Charge/queryFirm', 'post', info)
    },
    lifeInsureBillFinanceClientQuery ({commit, state}, info) { // 客户段
      return api('/Charge/queryClient', 'post', info)
    },
    lifeInsureBillFinanceBankQuery ({commit, state}, info) { // 银行段
      return api('/Charge/queryBank', 'post', info)
    }
  }
}
