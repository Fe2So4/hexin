import request from '@/utils/request'

export function queryBillFinan (query) {
  return request({
    // url: '/lifeCharge/queryAllLifeChargePoundageRecon',
    method: 'post',
    data: query
  })
}

// 审核
export function checkBillFinan (info) {
  return request({
    // url: '/lifeCharge/updateLifeChargePoundageRecon',
    method: 'post',
    data: info
  })
}

// 详情
export function getBillFinanDet (info) {
  return request({
    // url: '/lifeCharge/queryLifeChargePoundageRecon',
    method: 'post',
    data: info
  })
}
// 银保代理对账单查看所有
export function bankBillCheck (info) {
  return request({
    url: '/bankCharge/queryAllFinanceBankChargePoundageRecon',
    method: 'post',
    data: info
  })
}
// 银保代理对账单查看单个详情
export function bankBillCheckDetail (info) {
  return request({
    url: '/bankCharge/queryFinanceBankChargePoundageRecon',
    method: 'post',
    data: info
  })
}
// 银保代理对账单   公司段
export function queryFirm (info) {
  return request({
    url: '/Charge/queryFirm',
    method: 'post',
    data: info
  })
}
// 银保代理对账单   客户段
export function queryClient (info) {
  return request({
    url: '/Charge/queryClient',
    method: 'post',
    data: info
  })
}
// 银保代理对账单   银行段
export function queryBank (info) {
  return request({
    url: '/Charge/queryBank',
    method: 'post',
    data: info
  })
}
