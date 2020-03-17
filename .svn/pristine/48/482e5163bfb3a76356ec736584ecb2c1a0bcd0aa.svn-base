import request from '@/utils/request'

export function checkFile (query) { // 检查是否存在解析的文件
  return request({
    url: '/excelUpload/carCheckNoParsingFile',
    method: 'get',
    data: query
  })
}

export function checkResult (query) { // 查询结果
  return request({
    url: '/excelUpload/carqueryResult',
    method: 'get',
    data: query
  })
}
