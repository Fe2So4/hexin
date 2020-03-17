import request from '@/utils/request'

export function searchBillList (query) { // 查询保单
  return request({
    url: '/policyQuery/singlePolicyQuery',
    method: 'post',
    data: query
  })
}

export function searchBillNoDetail (query) { // 查询保单详情
  return request({
    url: '/policyQuery/singlePolicyInfoView',
    method: 'post',
    data: query
  })
}

export function firstPolicyModify (query) { // 提交修改保单
  return request({
    url: '/policyModify/saveSinglePolicyModify',
    method: 'post',
    data: query
  })
}

export function deletePolicy (query) { // 获取业务员
  return request({
    url: '/policyModify/deletePolicyNo',
    method: 'post',
    data: query
  })
}

export function agentFind (query) { // 获取业务员
  return request({
    url: '/proposalForm/agentFind',
    method: 'post',
    data: query
  })
}

export function allOrg (query) { // 查询所有机构
  return request({
    url: '/baseCompany/getAllCom',
    method: 'post',
    data: query
  })
}

// 获取保险公司
export function getInsCom (query) {
  return request({
    url: '/organization/getInsures',
    method: 'post',
    data: query
  })
}

// 获取保险公司机构
export function getInsOrg (query) {
  return request({
    url: '/organization/getOrganizations',
    method: 'post',
    data: query
  })
}

// 客户查询
export function customerFind (info) {
  return request({
    url: '/proposalForm/customerFind',
    method: 'post',
    data: info
  })
}

// 业务员查询
export function agentBillFind (info) {
  return request({
    url: '/proposalForm/agentFind',
    method: 'post',
    data: info
  })
}

// 险种信息查询
export function riskcode (info) {
  return request({
    url: '/rate/getRiskCodes',
    method: 'post',
    data: info
  })
}

// 获取所有银行
export function getAllBank (info) {
  return request({
    url: '/proposalForm/getAllBank',
    method: 'post',
    data: info
  })
}

// 添加个人客户
export function customerAdd (info) {
  return request({
    url: '/proposalForm/customerAdd',
    method: 'post',
    data: info
  })
}

// 客户是否已存在
export function customerIsExist (info) {
  return request({
    url: '/proposalForm/checkCustomerIsExist',
    method: 'post',
    data: info
  })
}

// 是否存在相似客户
export function customerSimilar (info) {
  return request({
    url: '/proposalForm/checkCustomerSimilar',
    method: 'post',
    data: info
  })
}
