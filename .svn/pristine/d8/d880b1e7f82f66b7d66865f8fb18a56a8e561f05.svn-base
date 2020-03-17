import request from '@/utils/request'

export function checkBillNo (query) { // 查询保单
  return request({
    url: '/lifeManage/checkProposalNo?proposalNo=' + query,
    method: 'get',
    data: query
  })
}

export function searchHfDate (query) { // 查询回访日期
  let url
  if (query.type === '0') {
    url = '/lifeManage/initHFModify?proposalNo=' + query.proposalNo
  } else {
    url = '/lifeManage/initHFModify?policyNo=' + query.policyNo
  }
  return request({
    url: url,
    method: 'get',
    data: query
  })
}

export function policyDateModify (query) { // 提交修改回录日期
  return request({
    url: '/lifeManage/savePolicyModify',
    method: 'post',
    data: query
  })
}

export function getProposalDetail (query) { // 查询回录详情
  return request({
    url: '/lifeManage/getProposalJSON?proposalNo=' + query,
    method: 'get',
    data: query
  })
}

export function savePolicy (query) { // 保存新契约回录信息
  return request({
    url: '/lifeManage/saveSinglePolicy',
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

export function valiPolicyNo (query) { // 保单号校验
  return request({
    url: '/lifeManage/valiPolicyNo?policyNo=' + query,
    method: 'get',
    data: query
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

export function allOrg (query) { // 查询所有机构
  return request({
    url: '/baseCompany/getAllCom',
    method: 'post',
    data: query
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
    url: '/lifeManage/prpsCustomOneAdd',
    method: 'post',
    data: info
  })
}

// 客户是否已存在
export function customerIsExist (info) {
  return request({
    url: '/lifeManage/checkCustomerExist?idType=' + info.idType + '&idNo=' + info.idNo,
    method: 'get',
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
