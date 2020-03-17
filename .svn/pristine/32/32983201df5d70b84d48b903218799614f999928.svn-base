import request from '@/utils/request'

// 查询合作经代机构
export function searchOrgList (query) {
  return request({
    url: '/baseCooagencyOrganization/find',
    method: 'post',
    data: query
  })
}

export function getAllCom (query) { // 获取合作经代公司
  return request({
    url: '/baseCooagencyCompany/findByCodeOrName',
    method: 'post',
    data: query
  })
}

export function getAllCom2 (query) { // 获取合作经代公司
  return request({
    url: '/baseCooagencyCompany/findByCodeOrName2',
    method: 'post',
    data: query
  })
}

export function getAllCooOrg (query) { // 获取合作经代公司
  return request({
    url: '/baseCooagencyOrganization/findByOrgCodeOrName',
    method: 'post',
    data: query
  })
}

// // 添加作经代机构
export function addCooOrg (query) {
  return request({
    url: '/baseCooagencyOrganization/add',
    method: 'post',
    data: query
  })
}

// // 查询省份
export function searchProCooOrg (query) {
  return request({
    url: '/baseCompany/getCode',
    method: 'post',
    data: query
  })
}

// 查询修改前详情
export function searchDetailOrg (query) {
  return request({
    url: '/baseCooagencyOrganization/findByCode2',
    method: 'post',
    data: query
  })
}

// 查询修改后详情
export function searchDetailAfterOrg (query) {
  return request({
    url: '/baseCooagencyOrganization/findByCode',
    method: 'post',
    data: query
  })
}

// 修改
export function modifyCooOrg (query) {
  return request({
    url: '/baseCooagencyOrganization/update',
    method: 'post',
    data: query
  })
}

// 删除
export function deleteCooOrg (query) {
  return request({
    url: '/baseCooagencyOrganization/delete',
    method: 'post',
    data: query
  })
}

// 审核
export function auditCooOrg (query) {
  return request({
    url: '/baseCooagencyOrganization/verify',
    method: 'post',
    data: query
  })
}

export function getCooCity (query) { // 获取合作经代城市
  return request({
    url: '/baseCooagencyCompany/getCity',
    method: 'post',
    data: query
  })
}
