import request from '@/utils/request'

// 根据保单号获取是否满足条件
export function isBackRecord (info) {
  return request({
    url: '/policyBack/checkProposalNo?policyNo=' + info.policyNo,
    method: 'get',
    data: info
  })
}

// 续期回录根据保单号获取数据
export function getRecordInfo (info) {
  return request({
    url: '/policyBack/getPolicyBackRecord?policyNo=' + info.policyNo,
    method: 'get',
    data: info
  })
}

// 续期修改保存
export function submitRecordSave (query) {
  return request({
    url: '/policyBack/policyBackRecordAdd',
    method: 'post',
    data: query
  })
}

// 删除
export function deleteRecord (info) {
  return request({
    url: '/lifeInsurance/checkLife',
    method: 'post',
    data: info
  })
}

// 续期修改查询
export function queryReMod (info) {
  return request({
    url: '/policyQuery/singlePolicyQuery',
    method: 'post',
    data: info
  })
}

// 获取下拉列表
export function getSelectDataType (info) {
  return request({
    url: '/sysman/datadic/getConfigSetValueName?configSetCode=idNumber',
    method: 'get',
    data: info
  })
}
