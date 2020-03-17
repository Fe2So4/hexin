import request from '@/utils/request'

// 查询合作经代公司
export function searchCooCom (query) {
  return request({
    url: '/baseCooagencyCompany/find',
    method: 'post',
    data: query
  })
}

// 添加作经代公司
export function addCooCom (query) {
  return request({
    url: '/baseCooagencyCompany/add',
    method: 'post',
    data: query
  })
}

// 查询省份
export function searchProCoo (query) {
  return request({
    url: '/baseCompany/getCode',
    method: 'post',
    data: query
  })
}

// 查询保险公司详情
export function searchDetailCom (query) {
  return request({
    url: '/baseCooagencyCompany/findByCode',
    method: 'post',
    data: query
  })
}

// 修改
export function modifyCooCom (query) {
  return request({
    url: '/baseCooagencyCompany/update',
    method: 'post',
    data: query
  })
}

// 删除
export function deleteCooCom (query) {
  return request({
    url: '/baseCooagencyCompany/delete',
    method: 'post',
    data: query
  })
}

// 审核
export function auditCooCom (query) {
  return request({
    url: '/baseCooagencyCompany/verify',
    method: 'post',
    data: query
  })
}

export function getDetails (query) { // 获取修改前的详情
  return request({
    url: '/baseCooagencyCompany/findByCode2',
    method: 'post',
    data: query
  })
}

export function afterGetDetails (query) { // 获取修改后的详情
  return request({
    url: '/baseCooagencyCompany/findByCode',
    method: 'post',
    data: query
  })
}

export function getAllCom (query) { // 获取合作经代
  return request({
    url: '/baseCooagencyCompany/findByCodeOrName',
    method: 'post',
    data: query
  })
}

export function getCooCity (query) { // 获取合作经代城市
  return request({
    url: '/baseCooagencyCompany/getCity',
    method: 'post',
    data: query
  })
}

export function picDel (query) { // 预览图片
  return request({
    url: '/baseCooagencyCompany/pictureDelete',
    method: 'post',
    data: query
  })
}

export function getFiliale (query) { // 获取省级分公司
  return request({
    url: '/persistency/getAllComP',
    method: 'post',
    data: query
  })
}

export function getFiliale2 (query) { // 获取省级分公司
  return request({
    url: '/persistency/getAllComP2',
    method: 'post',
    data: query
  })
}

export function getAudit (query) { // 获取审核历史
  return request({
    url: '/baseCooagencyCompany/baseCooVerifyList',
    method: 'post',
    data: query
  })
}
