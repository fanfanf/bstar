import Vue from 'vue'
import 'jquery'
import { rpcCall } from './rpcapi.js'

export const getKey = (fn) => {
  // return Vue.http.jsonp('http://token.cloudalbum.site?from=yeke', { credentials: true })
  $.ajax({
    url: "http://token.cloudalbum.site?from=yeke",
    type: "GET",
    dataType: "jsonp", //指定服务器返回的数据类型
    success: fn
  })
}
// 通知上传成功
export const stateEdit = (registerData) => {
  const method = '/stampleStateEdit.do?from=yeke'
  const params = { key: JSON.stringify(registerData) }
  return rpcCall(method, params, true)
}

// 推送资源
export const pushResources = (registerData) => {
  const loginFlag = {
    'uniqueId': JSON.parse(window.sessionStorage.getItem('loginFlag')).uniqueId,
    'loginToken': JSON.parse(window.sessionStorage.getItem('loginFlag')).loginToken
  }
  registerData.uniqueId = loginFlag.uniqueId
  registerData.loginToken = loginFlag.loginToken
  registerData.pushId = '' + new Date().getTime()
  const method = '/pushResources.do?from=yeke'
  const params = { key: JSON.stringify(registerData) }
  return rpcCall(method, params, true)
}