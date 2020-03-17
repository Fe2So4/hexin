import request from '@/utils/request'

export function checkFile (query) { // 查询
  return request({
    url: '/excelUpload/carEndcheckNoParsingFile',
    method: 'get',
    data: query
  })
}

export function checkResult (query) { // 查询
  return request({
    url: '/excelUpload/carEndqueryResult',
    method: 'get',
    data: query
  })
}
