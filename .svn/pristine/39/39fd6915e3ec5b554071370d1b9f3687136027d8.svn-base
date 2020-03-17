import request from '@/utils/request'

export function insBillDiffer (query) { // 保险单差异查询
  return request({
    url: '/lifeDiff/queryDiff',
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
