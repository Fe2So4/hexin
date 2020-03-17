import request from '@/utils/request'

export function queryLifeRate (query) {
  return request({
    url: '/rate/findRateConfigBySearch?insurerCode=' + query.insurerCode + '&riskCode=' + query.riskCode + '&period=' + query.period + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize,
    method: 'get'
  })
}

export function queryLifeNeimengRate (query) {
  return request({
    url: '/ratebranch/findRateConfigBySearch?insurerCode=' + query.insurerCode + '&riskCode=' + query.riskCode + '&period=' + query.period + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize + '&type=' + query.type,
    method: 'get'
  })
}

export function checkRate (check) {
  return request({
    url: '/rate/verifyRate',
    method: 'post',
    data: check
  })
}
export function checkNeimengRate (check) {
  return request({
    url: '/ratebranch/verifyRate',
    method: 'post',
    data: check
  })
}

export function queryCheck (info) {
  return request({
    url: '/rate/findRateAdjustRecord?batchNo=' + info,
    method: 'get'
  })
}

export function queryNeimengCheck (info) {
  return request({
    url: '/ratebranch/findRateAdjustRecord?batchNo=' + info.batchNo + '&type=' + info.type,
    method: 'get'
  })
}

export function queryCheckDown (fileId) {
  return request({
    url: '/rate/rateDownload?fileId=' + fileId,
    method: 'get',
    data: fileId
  })
}

export function exportRate (expData) {
  return request({
    url: '/rate/exportExcel?insurerCode=' + expData.insurerCode + '&riskCode=' + expData.riskCode + '&period=' + expData.period,
    method: 'get',
    data: expData
  })
}
export function exportNeimengRate (expData) {
  return request({
    url: '/ratebranch/exportExcel?insurerCode=' + expData.insurerCode + '&riskCode=' + expData.riskCode + '&period=' + expData.period,
    method: 'get',
    data: expData
  })
}

// 折标系数获取保险公司
export function getRateInsuranceCom (info) {
  return request({
    url: '/rate/getInsures',
    method: 'post',
    data: info
  })
}
export function getNeimengRateInsuranceCom (info) {
  return request({
    url: '/ratebranch/getInsures',
    method: 'post',
    data: info
  })
}

// 折标系数获取险种
export function getRateRisk (info) {
  return request({
    url: '/rate/getRiskCodes',
    method: 'post',
    data: info
  })
}
export function getNeimengRateRisk (info) {
  return request({
    url: '/ratebranch/getRiskCodes',
    method: 'post',
    data: info
  })
}
