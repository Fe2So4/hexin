import request from '@/utils/request'

// 查询列表
export function searchList (info) {
  return request({
    url: '/reports/reportInfoQuery',
    method: 'post',
    data: info
  })
}
