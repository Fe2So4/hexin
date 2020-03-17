import request from '@/utils/request'

export function searchInsCom (query) { // 查询保险公司
  return request({
    url: '/insurer/getInsurerCodes',
    method: 'post',
    data: query
  })
}

export function uploadMoudle (query) { // 查询保险公司
  return request({
    url: '/excelUpload/fileUpload',
    method: 'post',
    data: query
  })
}

export function analyResult (query) { // 查询解析结果
  return request({
    url: '/excelUpload/queryErrors',
    method: 'post',
    data: query
  })
}

export function importResult (query) { // 导出解析结果
  return request({
    url: '/excelUpload/exportExcel',
    method: 'post',
    data: query
  })
}
