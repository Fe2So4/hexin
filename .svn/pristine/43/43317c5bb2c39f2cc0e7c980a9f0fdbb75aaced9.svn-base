import request from '@/utils/request'

// 查询保单
export function searchBillList (info) {
  return request({
    url: '/policyQuery/singlePolicyQuery',
    method: 'post',
    data: info
  })
}

// 查询保单号详情
export function searchPolicyNoDetail (info) {
  return request({
    url: '/policyQuery/singlePolicyInfoView',
    method: 'post',
    data: info
  })
}

// 查询业务员详情
export function searchAgentDetail (info) {
  return request({
    url: '/policyQuery/agentInfoView',
    method: 'post',
    data: info
  })
}

// 查询投保人详情
export function searchInsureDetail (info) {
  return request({
    url: '/policyQuery/singlePolicyInsureView',
    method: 'post',
    data: info
  })
}

// 查询被保人详情
export function searchInsuredDetail (info) {
  return request({
    url: '/policyQuery/singlePolicyInsuredView',
    method: 'post',
    data: info
  })
}

// 查询续期详情
export function searchXqDetail (info) {
  return request({
    url: '/policyQuery/getDetailByXqFlag',
    method: 'post',
    data: info
  })
}

// 检查续期详情
export function checkXqDetail (info) {
  return request({
    url: '/policyQuery/checkPolicyNoXqFlag',
    method: 'post',
    data: info
  })
}

// 检查续期详情，续期保单回录修改超级权限
export function searchXqDetaill (info) {
  return request({
    url: '/policyBack/getDetailByXqFlag',
    method: 'post',
    data: info
  })
}

// 检查续期详情
export function modBillDetail (info) {
  return request({
    url: '/policyBack/policyBackRecordUpdate',
    method: 'post',
    data: info
  })
}
