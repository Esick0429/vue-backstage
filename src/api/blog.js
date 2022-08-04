import request from '@/util/request'

export function getAllArchive(data) {
  return request({
    url: `/getAllArchive?currentPage=${data.currentPage}&pageSize=${data.pageSize}&tagId=${data.tagId}&startTime=${data.startTime}&endTime=${data.endTime}`,
    method: 'GET',
    data
  })
}

export function getTagList(data) {
  // console.log('data::',data)
  return request({
    url: '/getTagList',
    method: 'GET',
    data
  })
}
export function addTags(data) {
  // console.log('data::',data)
  return request({
    url: '/addTags',
    method: 'post',
    data
  })
}
export function deleteTags(data) {
  // console.log('data::',data)
  return request({
    url: `/deleteTags?tagId=${data.tagId}`,
    method: 'DELETE',
    data
  })
}

export function addArchive(data) {
  // console.log('data::',data)
  return request({
    url: '/addArchive',
    method: 'POST',
    data
  })
}

export function updateArchive(data) {
  // console.log('data::',data)
  return request({
    url: '/updateArchive',
    method: 'POST',
    data
  })
}

export function deleteArchive(data) {
  // console.log('data::',data)
  return request({
    url: `/deleteArchive?archiveId=${data.archiveId}`,
    method: 'DELETE',
    data
  })
}
