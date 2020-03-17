import request from '@/utils/request'

// 查询列表 承保导入
export function queryReportImp (info) {
  return request({
    url: '/lifeAcceptInsurance/queryReport42',
    method: 'post',
    data: info
  })
}
