import request from '@/utils/request'

export function searchBusPeople (query) { // 查询
  return request({
    url: '/bank/matchQuery',
    method: 'post',
    data: query
  })
}

export function addPeople (query) { // 添加
  return request({
    url: '/bank/matchAdd',
    method: 'post',
    data: query
  })
}

export function modifyPeople (query) { // 修改银保人员
  return request({
    url: '/bank/matchUpdate ',
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

export function outImportMesg (query) { // 导出
  return request({
    url: '/bank/matchExport',
    method: 'post',
    data: query
  })
}

export function getDalogMesg (query) { // 获取弹框信息
  return request({
    url: '/bank/matchAlertInfoQuery',
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

// 获取详情
export function detailMesg (query) {
  return request({
    url: '/bank/matchInfo',
    method: 'post',
    data: query
  })
}
