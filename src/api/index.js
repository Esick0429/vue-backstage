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

export function selectDiary(data) {
  return request({
    url: `/api/getDiary?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`,
    method: 'GET'
  })
}


export function addDiary(data) {
  return request({
    url: `/api/addDiary`,
    method:'POST',
    data
  })
}

export function updateDiary(data) {
  return request({
    url: `/api/updateDiary`,
    method:'POST',
    data
  })
}

export function deleteDiary(data) {
  return request({
    url: `/api/deleteDiary?id=${data.id}`,
    method:'DELETE',
    data
  })
}

