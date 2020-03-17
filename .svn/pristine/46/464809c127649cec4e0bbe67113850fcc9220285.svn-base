import request from '@/utils/request'

export function silverDiffer (query) { // 查询保险公司
  return request({
    url: '/bankChannel/matchErrorInfoQuery',
    method: 'post',
    data: query
  })
}

export function silverDifferImport (query) { // 查询保险公司
  return request({
    url: '/bankChannel/matchExport',
    method: 'post',
    responseType: 'blob',
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
