import request from '@/utils/request'

export function queryAuth (query) {
  return request({
    url: '/leaveAgent/agentQuery1',
    method: 'post',
    data: query
  })
}

export function getAllUser () {
  return request({
    url: '/userrole/findAllUsers',
    method: 'post'
  })
}

export function getUserTo (query) {
  return request({
    url: '/userrole/findUserBySubCode',
    method: 'post',
    data: query
  })
}

export function copyQuality (query) {
  return request({
    url: 'userrole/copyQuality?originId=' + query.originId + '&targetId=' + query.targetId,
    method: 'get',
    data: query
  })
}

export function queryOrg (query) {
  return request({
    url: '/userrole/findOrgsByLikeAndLimit?codeOrName=' + query.codeOrName + '&currentPage=' + query.currentPage + '&pageSize=' + query.pageSize,
    method: 'get',
    data: query
  })
}

export function getUserRole (query) {
  return request({
    url: '/userrole/findUsersRole?id=' + query.id,
    method: 'get',
    data: query
  })
}

export function saveAuthor (query) {
  return request({
    url: '/userrole/updateUsersRole',
    method: 'post',
    data: query
  })
}

export function getRoleList () {
  return request({
    url: '/role/findAllRole',
    method: 'get'
  })
}

export function getMenuList (query) {
  return request({
    url: '/roleMenu/findAllMenu',
    method: 'get',
    data: query
  })
}

export function getRoleInfo (query) {
  return request({
    url: '/role/findRole?id=' + query.id,
    method: 'get'
  })
}

export function addRole (query) {
  return request({
    url: 'role/postRole',
    method: 'post',
    data: query
  })
}

export function updateRole (query) {
  return request({
    url: 'role/updateRole',
    method: 'post',
    data: query
  })
}
