import request from "../util/axios";


export function login(data) {
  console.log('data::',data)
  return request({
    url: "/api/login",
    method: "POST",
    data
  });
}