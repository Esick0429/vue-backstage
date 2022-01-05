import request from '@/util/request'

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
    method: 'GET',
    data
  })
}

export function getUserInfo(data) {
  // console.log('data::',data)
  return request({
    url: '/api/getUserInfo',
    method: 'GET',
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
    url: `/api/getDiary?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&startTime=${data.startTime}&endTime=${data.endTime}`,
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
    url: `/api/deleteDiary?id=${data.id}&userName=${data.userName}`,
    method:'DELETE',
    data
  })
}


export function upload(data){
  return request({
    url: `/api/uploadImg`,
    method:'post',
    headers:{'Content-Type': 'multipart/form-data'},
    data
  })
}

export function getImgs(data){
  return request({
    url: `/api/getImgs`,
    method:'GET',
    data
  })
}

export function deleteImg(data){
  return request({
    url: `/api/deleteImgs?id=${data.id}&imgName=${data.imgName}`,
    method:'DELETE',
    data
  })
}