import { rpcCall } from './rpcapi.js'
// 绑定相框
export const addPhotoFrame = (addFrameData) => {
  const loginFlag = {
    'uniqueId': JSON.parse(window.sessionStorage.getItem('loginFlag')).uniqueId,
    'loginToken': JSON.parse(window.sessionStorage.getItem('loginFlag')).loginToken
  }
  addFrameData.uniqueId = loginFlag.uniqueId
  addFrameData.loginToken = loginFlag.loginToken
  const method = '/addPhotoFrame.do?from=yeke'
  const params = {key:JSON.stringify(addFrameData)}
  return rpcCall(method, params, true)
}
// 获取已经绑定的相框
export const gainFrame = () => {
  const loginFlag = {
    'uniqueId': JSON.parse(window.sessionStorage.getItem('loginFlag')).uniqueId,
    'loginToken': JSON.parse(window.sessionStorage.getItem('loginFlag')).loginToken
  }
  const gainFrameData = {}
  gainFrameData.uniqueId = loginFlag.uniqueId
  gainFrameData.loginToken = loginFlag.loginToken
  const method = '/getPhotoFrameList.do?from=yeke'
  const params = {key:JSON.stringify(gainFrameData)}
  return rpcCall(method, params, true)
}
// 检测相框是否到达绑定上限
export const photoFrameIsBind = (photoFrameIsBindData) => {
  const loginFlag = {
    'uniqueId': JSON.parse(window.sessionStorage.getItem('loginFlag')).uniqueId,
    'loginToken': JSON.parse(window.sessionStorage.getItem('loginFlag')).loginToken
  }
  photoFrameIsBindData.uniqueId = loginFlag.uniqueId
  photoFrameIsBindData.loginToken = loginFlag.loginToken
  const method = '/photoFrameIsBind.do?from=yeke'
  const params = {key:JSON.stringify(photoFrameIsBindData)}
  return rpcCall(method, params, true)
}
// 解除绑定
export const unbound = (unboundData) => {
  const loginFlag = {
    'uniqueId': JSON.parse(window.sessionStorage.getItem('loginFlag')).uniqueId,
    'loginToken': JSON.parse(window.sessionStorage.getItem('loginFlag')).loginToken
  }
  unboundData.uniqueId = loginFlag.uniqueId
  unboundData.loginToken = loginFlag.loginToken
  const method = '/appUpdatePhotoFrameUnbound.do?from=yeke'
  const params = {key:JSON.stringify(unboundData)}
  return rpcCall(method, params, true)
}
// 重命名
export const rename = (renameData) => {
  const loginFlag = {
    'uniqueId': JSON.parse(window.sessionStorage.getItem('loginFlag')).uniqueId,
    'loginToken': JSON.parse(window.sessionStorage.getItem('loginFlag')).loginToken
  }
  renameData.uniqueId = loginFlag.uniqueId
  renameData.loginToken = loginFlag.loginToken
  const method = '/rename.do?from=yeke'
  const params = {key:JSON.stringify(renameData)}
  return rpcCall(method, params, true)
}