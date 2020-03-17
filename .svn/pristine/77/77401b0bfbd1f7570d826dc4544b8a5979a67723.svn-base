import request from '@/utils/request'

// 增加
export function addInsurance (info) {
  return request({
    url: '/insurer/addInsurer',
    method: 'post',
    data: info
  })
}
// 删除
export function delInsurance (info) {
  return request({
    url: '/insurer/delInsurer',
    method: 'post',
    data: info
  })
}
// 修改
export function modInsurance (info) {
  return request({
    url: '/insurer/modInsurer',
    method: 'post',
    data: info
  })
}
// 查询
export function queryInsurance (info) {
  return request({
    url: '/insurer/queryInsurer',
    method: 'post',
    data: info
  })
}
// 查询省份
export function searchProlist (query) {
  return request({
    url: '/baseCompany/getCode',
    method: 'post',
    data: query
  })
}
// 审核
export function examineInsurance (info) {
  return request({
    url: '/insurer/checkInsurer',
    method: 'post',
    data: info
  })
}
// 保险公司代码/名称
export function getInsurers (info) {
  return request({
    url: '/rate/getInsures',
    // url: '/proposalForm/getOrgsByp',
    method: 'post',
    data: info
  })
}
// 保险机构代码/名称
export function getInsurersOrg (info) {
  return request({
    url: '/proposalForm/getOrgsByp',
    method: 'post',
    data: info
  })
}
