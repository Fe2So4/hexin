import request from '@/utils/request'
export function api (url, method, data) {
  return request({
    url: url,
    method: method,
    data: data
  })
}
