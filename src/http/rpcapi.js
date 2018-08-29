import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export const rpcCall = (method, params) => {
  // http://frame.cloudalbum.site 客户看
  // http://api.swm.cloudalbum.site 打包
  return Vue.http.post('http://frame.cloudalbum.site' + method, params, { timeout: 10000, emulateJSON: true }).then((resp) => {
    if (resp.status !== 200) {
      return Promise.reject(resp)
    }
    return resp
  }).catch((err) => {
    console.log(err, '接口调用失败')
  })
}