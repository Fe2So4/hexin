import request from '@/utils/request'

// 增加
export function addblackList (info) {
  return request({
    url: '/blackList/insertBlackList',
    method: 'post',
    data: info
  })
}
// 撤销
export function revokeblackList (info) {
  return request({
    url: '/blackList/revokeBlackList',
    method: 'post',
    data: info
  })
}
// 修改
export function modblackList (info) {
  return request({
    url: '/blackList/blackListModify',
    method: 'post',
    data: info
  })
}
// 查询
export function queryBlackList (info) {
  return request({
    url: '/blackList/findBlackList1',
    method: 'post',
    data: info
  })
}
// 审核
export function examineblackList (info) {
  return request({
    url: '/blackList/aduit',
    method: 'post',
    data: info
  })
}
// 黑灰名单投保单信息查询
export function queryLsById (info) {
  return request({
    url: '/blackList/queryLsById',
    method: 'post',
    data: info
  })
}

// 黑灰名单投保单信息查询
export function queryDetail (info) {
  return request({
    url: '/blackList/blackListModifyQuery',
    method: 'post',
    data: info
  })
}

export function checkAdd (info) { // 新增校验
  return request({
    url: '/blackList/checkBlackListName',
    method: 'post',
    data: info
  })
}
export function customerFindById (info) { // 查询客户详情
  return request({
    url: '/proposalForm/customerFindById',
    method: 'post',
    data: info
  })
}
