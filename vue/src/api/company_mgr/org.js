import request from '@/utils/request'

export function addOrg (query) {
  return request({
    url: '/baseCompany/add',
    method: 'post',
    data: query
  })
}

export function searchOrglist (query) {
  return request({
    url: '/baseCompany/find',
    method: 'post',
    data: query
  })
}

export function searchProlist (query) {
  return request({
    url: '/baseCompany/getCode',
    method: 'post',
    data: query
  })
}

export function searchDetailOrg (query) {
  return request({
    url: '/baseCompany/findByCode',
    method: 'post',
    data: query
  })
}

export function searchModifyOrg (query) {
  return request({
    url: '/baseCompany/update',
    method: 'post',
    data: query
  })
}

export function auditOrg (query) {
  return request({
    url: '/baseCompany/verify',
    method: 'post',
    data: query
  })
}

export function beforeModify (query) { // 查询修改前 即点击code获取详情
  return request({
    url: '/baseCompany/findByCode2',
    method: 'post',
    data: query
  })
}

export function afterModify (query) { // 查询修改前 即点击code获取详情
  return request({
    url: '/baseCompany/findByCode',
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

// 获取页面按钮权限
export function getBtnLimt (query) {
  return request({
    url: '/userrole/findButtonByUserCodeAndPage?userId=' + query.userId + '&page=' + query.page,
    method: 'get'
  })
}
