import request from '@/utils/request'

export function searchInsCom (query) { // 获取弹框信息
  return request({
    url: '/bank/getAllCompany',
    method: 'post',
    data: query
  })
}

export function silverErrorMesg (query) { // 查询银保渠道错误信息
  return request({
    url: '/bankChannel/matchErrorInfoQuery',
    method: 'post',
    data: query
  })
}
