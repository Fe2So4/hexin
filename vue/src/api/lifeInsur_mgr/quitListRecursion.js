import request from '@/utils/request'

// 查询离职单递归提醒列表
export function searchListQuit (info) {
  return request({
    url: '/leaveAgent/queryLeaveAgent',
    method: 'post',
    data: info
  })
}

// 查询离职单递归提醒详情
export function queryLeaveAgentDetail (info) {
  return request({
    url: '/leaveAgent/queryLeaveAgentDetail',
    method: 'post',
    data: info
  })
}

// 查询离职单递归提醒翻页查询
export function queryLeaveAgentPage (info) {
  return request({
    url: '/leaveAgent/queryLeaveAgentPage',
    method: 'post',
    data: info
  })
}
