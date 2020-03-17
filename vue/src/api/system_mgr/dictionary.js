import request from '@/utils/request'

export function getDataDictionary (query) {
  return request({
    url: '/sysman/datadic/find',
    method: 'post',
    data: query
  })
}

export function addDictionary (query) {
  return request({
    url: '/sysman/datadic/add',
    method: 'post',
    data: query
  })
}

export function deleteDictionary (query) {
  return request({
    url: '/sysman/datadic/del',
    method: 'post',
    data: query
  })
}

export function updataDictionary (query) {
  return request({
    url: '/sysman/datadic/update',
    method: 'post',
    data: query
  })
}

export function getCategorycode (query) {
  return request({
    url: '/sysman/datadic/getCategorycode',
    method: 'post',
    data: query
  })
}

export function getCode (query) {
  return request({
    url: '/sysman/datadic/getCode',
    method: 'post',
    data: query
  })
}

export function checkedCode (query) { // 判断参数值代码是否存在
  return request({
    url: '/sysman/datadic/checkValueCodeExist',
    method: 'post',
    data: query
  })
}
