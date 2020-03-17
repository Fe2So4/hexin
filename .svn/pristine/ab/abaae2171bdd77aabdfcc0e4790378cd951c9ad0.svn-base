import { queryBillFinan,
         checkBillFinan,
         getBillFinanDet,
         bankBillCheck,
         bankBillCheckDetail,
         queryFirm,
         queryClient,
         queryBank
        } from '@/api/bill_mgr/billFinance.js'
export const billFinan = {
  state: {
    billFinData: [],
    finTotal: '',
    billFinDetData: {},
    bankBillCheck: [],
    bankBillCheckTotals: {},
    billCheckDetail: {},
    bankChargeInvoice: [],
    queryFirm: [],
    queryFirmtotals: '',
    queryClient: [],
    queryClienttotals: '',
    queryBank: [],
    queryBanktotals: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    queryBillFinan ({commit, state}, query) {
      return queryBillFinan(query).then(resp => {
        state.billFinData = resp.data.content
        state.finTotal = resp.data.totalElements
        return resp.data
      })
    },
    checkBillFinan ({commit}, info) {
      return checkBillFinan(info)
    },
    getBillFinanDet ({commit, state}, info) {
      return getBillFinanDet(info).then(resp => {
        state.billFinDetData = resp.data
        return resp.data
      })
    },
     // 银保代理对账单查询
    bankBillCheck_1 ({commit, state}, info) {
      return bankBillCheck(info).then(result => {
        state.bankBillCheck = result.data.content
        state.bankBillCheckTotals = result.data.totalElements
        // console.log(result.data)
        return result.data
      })
    },
     // 银保代理对账单查询详细信息
    bankBillCheckDetail_1 ({commit, state}, info) {
      return bankBillCheckDetail(info).then(result => {
        // console.log(JSON.stringify(result))
        state.billCheckDetail = result.data
        state.bankChargeInvoice = result.data.bankChargeInvoice
        console.log(result.data)
        return result.data
      })
    },
     // 银保代理对账单    公司段
    queryFirm_1 ({commit, state}, info) {
      return queryFirm(info).then(result => {
        console.log(JSON.stringify(result))
        state.queryFirm = result.data.content
        state.queryFirmtotals = result.data.totalElements
        return result.data
      })
    },
     // 银保代理对账单    客户段
    queryClient_1 ({commit, state}, info) {
      return queryClient(info).then(result => {
        console.log(JSON.stringify(result))
        state.queryClient = result.data.content
        state.queryClienttotals = result.data.totalElements
        return result.data
      })
    },
     // 银保代理对账单    银行段
    queryBank_1 ({commit, state}, info) {
      return queryBank(info).then(result => {
        console.log(JSON.stringify(result))
        state.queryBank = result.data.content
        state.queryBanktotals = result.data.totalElements
        return result.data
      })
    }
  }
}
