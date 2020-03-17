import request from '@/utils/request'

export function querySalarys (query) { // 查询
  return request({
    url: '/salaryCommissionProduct/querySalarys',
    method: 'post',
    data: query
  })
}

export function addSalary (query) { // 新增
  return request({
    url: '/salaryCommissionProduct/addSalary',
    method: 'post',
    data: query
  })
}

export function modSalary (query) { // 修改
  return request({
    url: '/salaryCommissionProduct/modSalary',
    method: 'post',
    data: query
  })
}

export function querySalaryDetail (query) { // 查看详情
  return request({
    url: '/salaryCommissionProduct/querySalaryDetail',
    method: 'post',
    data: query
  })
}

export function delSalary (query) { // 查看详情
  return request({
    url: '/salaryCommissionProduct/delSalary',
    method: 'post',
    data: query
  })
}
