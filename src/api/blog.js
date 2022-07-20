import request from '@/util/request'

export function getAllArchive(data) {
  return request({
    url: `/api/getAllArchive?currentPage=${data.currentPage}&pageSize=${data.pageSize}&tagId=${data.tagId}&startTime=${data.startTime}&endTime=${data.endTime}`,
    method: 'GET',
    data
  })
}

export function getTagList(data) {
  // console.log('data::',data)
  return request({
    url: '/api/getTagList',
    method: 'GET',
    data
  })
}
export function addTags(data) {
  // console.log('data::',data)
  return request({
    url: '/api/addTags',
    method: 'post',
    data
  })
}
export function deleteTags(data) {
  // console.log('data::',data)
  return request({
    url: `/api/deleteTags?tagId=${data.tagId}`,
    method: 'DELETE',
    data
  })
}

export function addArchive(data) {
  // console.log('data::',data)
  return request({
    url: '/api/addArchive',
    method: 'POST',
    data
  })
}

export function updateArchive(data) {
  // console.log('data::',data)
  return request({
    url: '/api/updateArchive',
    method: 'POST',
    data
  })
}

export function deleteArchive(data) {
  // console.log('data::',data)
  return request({
    url: `/api/deleteArchive?archiveId=${data.archiveId}`,
    method: 'DELETE',
    data
  })
}
