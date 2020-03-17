import request from '@/utils/request'
export default function api (url, method, data) {
  return request({
    url: url,
    method: method,
    data: data
  })
}
