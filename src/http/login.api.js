import { rpcCall } from './rpcapi.js'
// 用户注册
export const register = (registerData) => {
  const method = '/register.do?from=yeke'
  const params = {key:JSON.stringify(registerData)}
  // const params = {key:encodeURIComponent(JSON.stringify(registerData))}
  return rpcCall(method, params, true)
}
// 用户登录
export const login = (loginData) => {
  const method = '/login.do?from=yeke'
  const params = {key:JSON.stringify(loginData)}
  return rpcCall(method, params, true)
}
// 重置密码
export const resetPassword = (resetData) => {
  const method = '/resetPassword.do?from=yeke'
  const params = {key:JSON.stringify(resetData)}
  return rpcCall(method, params, true)
}
// 登出
export const logout = (logoutData) => {
  const method = '/logout.do?from=yeke'
  const params = {key:JSON.stringify(logoutData)}
  return rpcCall(method, params, true)
}