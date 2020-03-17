import request from '@/utils/request'

export function login (username, jpassword) {
  const post = { username, jpassword }
  return request({
    url: '/j_spring_security_check',
    method: 'post',
    data: post
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// export function getUserInfo () {
//   return request({
//     url: '/role/findMenuByUser',
//     method: 'get'
//   })
// }

export function getUserInfo (userId) {
  return request({
    url: '/homePage/getMenuInfo?id=' + userId,
    method: 'get'
  })
}

export function getAllAgent () {
  return request({
    url: '/proposalForm/findAgents',
    method: 'post'
  })
}

export function getEnumData () {
  return request({
    url: '/enums/getAllEnums',
    method: 'post'
  })
}
