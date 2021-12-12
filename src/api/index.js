import request from '@/util/axios'

export function login(data) {
  // console.log('data::',data)
  return request({
    url: '/api/login',
    method: 'POST',
    data
  })
}

export function select(data) {
  // console.log('data::',data)
  return request({
    url: '/api/select',
    method: 'POST',
    data
  })
}

export function deletePassword(data) {
  // console.log('data::',data)
  return request({
    url: '/api/delete',
    method: 'POST',
    data
  })
}

export function updateInfo(data) {
  // console.log('data::',data)
  return request({
    url: '/api/update',
    method: 'POST',
    data
  })
}

export function selectDiary() {
  return request({
    url: '/api/getDiary',
    method: 'GET'
  })
}
