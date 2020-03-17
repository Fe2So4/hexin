import request from '@/utils/request'

export function queryBatch (query) { // 查询承保数据
  return request({
    url: '/lifeinsuranceBatch/queryFiveBatch',
    method: 'post',
    data: query
  })
}
export function queryNeedForBatch (query) { // 查询需要跑批的数据
  return request({
    url: '/lifeinsuranceBatch/queryNeedForBatch',
    method: 'post',
    data: query
  })
}

export function fiveCovery (query) { // 批处理数据
  return request({
    url: '/lifeinsuranceBatch/fiveCovery',
    method: 'post',
    data: query
  })
}
