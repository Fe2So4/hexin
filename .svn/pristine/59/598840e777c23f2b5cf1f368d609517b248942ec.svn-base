import request from '@/utils/request'

export function getComBillView (query) {
  return request({
    url: '/persistency/getAllComP',
    method: 'post',
    data: query
  })
}

export function queryBillView (query) {
  return request({
    url: '/lifeCharge/queryAllLifeChargePoundageRecon',
    method: 'post',
    data: query
  })
}

// 审核
export function checkBillView (info) {
  return request({
    url: '/lifeCharge/updateLifeChargePoundageRecon',
    method: 'post',
    data: info
  })
}

// 轨迹
export function queryTrack (info) {
  return request({
    url: '/lifeCharge/queryLifeChargeOperatetrack',
    method: 'post',
    data: info
  })
}

// 详情
export function getBillDetail (info) {
  return request({
    url: '/lifeCharge/queryLifeChargePoundageRecon',
    method: 'post',
    data: info
  })
}

// 导出
export function expBillView (info) {
  return request({
    url: '/lifeCharge/downloadLifeChargePoundageRecons',
    method: 'post',
    data: info
  })
}

// 财险
export function queryMoneyBillView (query) {
  return request({
    url: '/propertyCharge/queryAllPropertyChargePoundageRecon ',
    method: 'post',
    data: query
  })
}

// 审核
export function checkMoneyBillView (info) {
  return request({
    url: '/propertyCharge/updatePropertyChargePoundageRecon',
    method: 'post',
    data: info
  })
}

// 轨迹
export function queryMoneyTrack (info) {
  return request({
    url: '/propertyCharge/queryPropertyChargeOperatetrack',
    method: 'post',
    data: info
  })
}

// 详情
export function getMoneyBillDetail (info) {
  // return request({
  //   url: '/propertyCharge/queryPropertyChargePoundageRecon',
  //   method: 'post',
  //   data: info
  // })
}

// 导出
export function expMoneyBillView (info) {
  return request({
    url: '/propertyCharge/downloadPropertyChargePoundageRecon ',
    method: 'post',
    data: info
  })
}
