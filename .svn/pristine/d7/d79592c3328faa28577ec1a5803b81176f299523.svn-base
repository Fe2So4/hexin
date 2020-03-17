import request from '@/utils/request'

// 获取省级分公司
export function getAllComP (info) {
  return request({
    url: '/persistency/getAllComP',
    method: 'post',
    data: info
  })
}

// 获取地市级分公司
export function getAllComC (info) {
  return request({
    url: '/persistency/getAllComC',
    method: 'post',
    data: info
  })
}

// 获取保险公司 (寿险承保清单)
export function getAllInsCom (info) {
  return request({
    url: '/rate/getInsures',
    method: 'post',
    data: info
  })
}

// 保险公司数据 (企划部银保代理承保清单, 供应商保险机构) type 1财险 2 寿险 3银代 没有查
export function getAllsilverCom (info) {
  return request({
    url: '/bankReports/getInsures',
    method: 'post',
    data: info
  })
}

// 保险机构数据 (企划部银保代理承保清单, 供应商保险机构)
export function getAllInsOrg (info) {
  return request({
    url: '/bankReports/getOrgs',
    method: 'post',
    data: info
  })
}

// 查询所有百盈机构
export function allOrg (query) {
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
