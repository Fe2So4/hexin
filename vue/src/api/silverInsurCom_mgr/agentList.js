import request from '@/utils/request'

export function queryRate (query) {
  return request({
    url: '/rate/findRateConfigBySearch?insurerCode=' + query.insurerCode + '&riskCode=' + query.riskCode + '&period=' + query.period + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize,
    method: 'get'
  })
}
