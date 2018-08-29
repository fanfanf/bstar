<template>
<div class="selectFrame" v-loading="loading">
  <div class="header">
    Select frame to send photos
  </div>
  <!--设置-->
  <div class="setting">
    <img src="../../assets/image/main/setting.png" @click="controlSetting">
    <ul class="settings" v-show="settingsDisplay">
      <li @click="addFrame">Add Frame</li>
      <li @click="editFrame">Edit Frame</li>
      <li @click="exit" style="color: #00b9e3">Log Out</li>
    </ul>
  </div>
  <!--框架选择-->
  <div class="framebox">
  <div class="frame" ref="frame">
    <div class="frameInbox" :style="{width: frameWidth + 'px',left:frameLeft + 'px'}">
      <div class="blackFrame" v-for="(item,i) in frameList" :key="i" @click="item.checked=!item.checked">
        <div class="single">
          <div class="inbox"></div>
        </div>
        <div class="singn" :class="{active: item.checked}"></div>
        <p>{{item.remarkName}}</p>
      </div>
    </div>
  </div>
    <div class="frameBtn btnLeft el-icon-arrow-left" @click="btnLeft" v-if="frameWidth>fw+10"></div>
    <div class="frameBtn btnRight el-icon-arrow-right" @click="btnRight" v-if="frameWidth>fw+10"></div>
  </div>
  <!--图片选择发送-->
  <div class="send">
    <p class="title">Select photos to send to frame({{selectPhotos.length}}/18)</p>
    <p class="all">Select All</p>
    <div class="sendFrame">
      <div class="itemFrame" v-for="(item,i) in photoList" :key="i" @click="imgClick(item)">
        <img :src="item.url" :alt="item.name">
        <div class="singn" :class="{active: item.checked, sended: sendeds[item.md5] === 1}"></div>
      </div>
    </div>
    <div class="buttonArea">
      <el-button type="" @click="$refs.file.click()">Select Photo</el-button>
      <el-button type="" @click="sengPhotos">Send Photos</el-button>
      <el-button type="" @click="addCaption">Add Caption</el-button>
    </div>
  </div>
  <!--添加框架-->
  <Popup v-show="serialModal" @close="serialContorl">
    <p slot="header" class="modalHeader">Add Frame</p>
    <div slot="body" class="modalBody">
      <div class="form">
        <el-input type="text" v-model="serialNumber" auto-complete="off" placeholder="Enter the Frame ID of your frame"></el-input>
        <el-input type="text" v-model="name" auto-complete="off" placeholder="name your frame"></el-input>
        <p class="addText">Your frame ID can be found in Settings-Manage User After the frame is registered you can begin to send photos from the app to the frame</p>
      </div>
    </div>
  </Popup>
  <!--无框架，添加框架-->
  <Popup v-show="isOnceAdd" @close="onceAdd">
    <p slot="body" class="modalHeader" style="margin-top: -20px;">Please register your frame first!</p>
    
  </Popup>
  <!--再次发送照片-->
  <Popup v-show="isSendAgain" @close="sendAgain">
    <p slot="body" class="modalHeader" style="margin-top: -20px;">You have sent this photo,do you want send again?</p>
    
  </Popup>
  <!--发送图片-->
  <Popup v-show="sendModal" @close="controlCaption">
    <p slot="header" class="modalHeader">{{sendNum === sendAllnum ? 'Finshed' : 'Sending'}}</p>
    <div slot="body" class="modalBody">
      <el-progress :stroke-width="18" :percentage="sendPer" :show-text="false"></el-progress>
      ({{sendNum}}/{{sendAllnum}})
    </div>
    <div slot="footer" class="modalFooter">
     <div class="footer-delt" @click="controlCaption('yes')" style="width:100%">OK</div>
    </div>
  </Popup>
  <!--添加图片描述-->
  <Popup v-show="captionModal" class="captionModal" @close="captionContorl">
    <!-- <p slot="header" class="modalHeader">描述</p> -->
    <div slot="body" class="captionBody">
      <img :src="captionPhoto.url" alt="">
      <el-input type="text" v-model="captionPhoto.caption" style="" auto-complete="off" placeholder="caption your photo"></el-input>
    </div>
  </Popup>

  <input id="pop_file" type="file" accept=".jpg,.jpeg,.png" @change="uploadFile($event)" name="fileTrans" multiple ref="file" value="" v-show="false"/>
</div>
</template>

<script>
import Popup from '../common/Popup.vue'
import OSS from 'ali-oss'
import browserMD5File from 'browser-md5-file'
import { logout } from '../../http/login.api.js'
import { addPhotoFrame, gainFrame, photoFrameIsBind } from '../../http/frame.api.js'
import { getKey, stateEdit, pushResources } from '../../http/updata.api.js'
export default {
  components: {
    Popup
  },
  data() {
    return {
      client: null,
      settingsDisplay: false, // 设置框显示状态
      captionModal: false, // 添加描述模态框显示状态
      sendModal: false, // 发送图片模态框显示状态
      serialModal: false, //添加框架
      serialNumber: '', //添加框架时的serialNumber
      name: '', // 添加框架时的框架名称
      isOnceAdd: false,
      frameList: [],
      photoList: [],
      sending: false,
      sendNum: 0,
      captionPhoto: {},
      sendeds: {},
      selecteds: {},
      frameLeft: 0,
      fw: 0,
      sendAllnum: 0,
      loading: false,
      isSendAgain: false,
      curImg: {}
    }
  },
  computed: {
    selectPhotos() {
      return this.photoList.filter((item) => item.checked) || []
    },
    selectFrames() {
      return this.frameList.filter((item) => item.checked) || []
    },
    selectFrameIds() {
      const ids = []
      this.selectFrames.forEach(item => {
        ids.push(item.uniqueNum)
      })
      return ids
    },
    sendPer() {
      return parseInt(this.sendNum / (this.sendAllnum) * 100) || 0
    },
    frameWidth() {
      return this.frameList.length * 280
    }
  },
  created() {
    getKey(res => {
      const o = {
        // region : 'oss-us-west-1',  // 正式用
        region: 'oss-cn-shenzhen',  // 测试用
        accessKeyId: res.AccessKeyId,
        accessKeySecret: res.AccessKeySecret,
        stsToken: res.SecurityToken,
        // bucket : 'yiguoresources' // 正式用
        bucket: 'yiguosouthchina'  // 测试用
      }
      this.client = new OSS(o)
    })
    this.gainFrameFun().then(res => {
      if (!res.DATA || !res.DATA.length) {
        this.isOnceAdd = true
      }
    })
    this.sendeds = JSON.parse(window.sessionStorage.getItem('sendeds')) || {}
  },
  mounted() {
    this.$nextTick(() => {
      this.fw = this.$refs.frame.offsetWidth
    })
  },
  beforeDestroy() {
    window.sessionStorage.setItem('sendeds', JSON.stringify(this.sendeds))
  },
  methods: {
    btnLeft() {
      if (this.frameWidth - this.fw + this.frameLeft < 279) { return }
      this.frameLeft -= 279
    },
    btnRight() {
      if (-this.frameLeft < 279) { return }
      this.frameLeft += 279
    },
    // 显示设置框
    controlSetting() {
      this.settingsDisplay = !this.settingsDisplay
    },
    sendAgain(type) {
      this.isSendAgain = false
      if (type === 'yes') {
        const item = this.curImg
        console.log(item)
        item.checked = true
        this.sendeds[item.md5] = 2
      }
    },
    // 添加frame
    addFrame() {
      this.serialModal = true
      this.settingsDisplay = false
      // this.$router.push({path: '/addFrame'})
    },
    onceAdd(type) {
      this.isOnceAdd = false
      if (type === 'yes') {
        this.addFrame()
      }
    },
    // 添加相框控制函数
    serialContorl(type) {
      this.serialModal = false
      if (type === 'yes') {
        const data = {
          'uniqueNum': parseInt(this.serialNumber),
          'remarkName': this.name
        }
        // 先检测相框是否达到绑定上限
        this.photoFrameIsBindFun({ uniqueNum: data.uniqueNum }).then((resp) => {
          if (resp.STATE === 'SUCCESS') {
            if (resp.DATA.IS_BIND === '1') {
              this.addFrameFun(data)
            } else {
              this.error('the users of frame reached the upper limit')
            }
          } else {
            this.addFrameFun(data)
            // this.error('绑定相框失败')
          }
        })
      }
    },
    // 添加相框逻辑方法
    addFrameFun(data) {
      this.addPhotoFrameFun(data).then((resp) => {
        if (resp.STATE === 'SUCCESS') {
          // 两秒后获取已绑定相框列表,如果有未成功的，则三十秒后再调用一次，之后不再关注状态
          this.loading = true
          setTimeout(() => {
            this.gainFrameFun().then((resp) => {
              if (resp.STATE === 'SUCCESS') {
                this.loading = false
                console.log(resp.DATA, '绑定成功后获取到的数据')
              } else if (resp.STATE === 'FAIL') {
                this.loading = true
                setTimeout(() => {
                  this.gainFrameFun().then((resp) => {
                    if (resp.STATE === 'SUCCESS') {
                      this.loading = false
                      console.log(resp.DATA, '绑定成功后获取到的数据')
                    } else {
                      this.error('Register frame failed')
                    }
                  })
                }, 30000)
              }
            })
          }, 2000)
        } else if (resp.STATE === 'FAIL') {
          const errObj = {
            '1022': 'Can not repeat binding',
            '1018': 'This number does not exist on the server'
          }
          if (resp.ERROR_CODE in errObj) {
            this.error(errObj[resp.ERROR_CODE])
          } else {
            this.error('Register frame failed')
          }
        }
      })
    },
    // 添加相框调用方法
    addPhotoFrameFun(payload) {
      return new Promise((resolve, reject) => {
        addPhotoFrame(payload).then((resp) => {
          resolve(resp.body)
        }).catch((err) => {
          console.log(err, '调用addPhotoFrame出错')
        })
      })
    },
    // 检测相框是否到达绑定上限调用方法
    photoFrameIsBindFun(payload) {
      return new Promise((resolve, reject) => {
        photoFrameIsBind(payload).then((resp) => {
          resolve(resp.body)
        }).catch((err) => {
          console.log(err, '调用photoFrameIsBind出错')
        })
      })
    },
    // 获取已绑定相框调用方法
    gainFrameFun() {
      return new Promise((resolve, reject) => {
        gainFrame().then((resp) => {
          if (resp.body && resp.body.STATE === 'SUCCESS') {
            this.frameList = []
            resp.body.DATA.forEach(item => {
              this.frameList.push({ ...item, checked: false })
            });
          }
          resolve(resp.body)
        }).catch((err) => {
          console.log(err, '调用gainFrame出错')
        })
      })
    },
    // 编辑frame
    editFrame() {
      this.settingsDisplay = false
      this.$router.push({ path: '/editFrame' })
    },
    // 退出
    exit() {
      this.settingsDisplay = false
      const loginFlag = JSON.parse(window.sessionStorage.getItem('loginFlag'))
      const data = {
        'uniqueId': loginFlag.uniqueId,
        'loginToken': loginFlag.loginToken
      }
      this.logoutFun(data).then((resp) => {
        window.sessionStorage.removeItem('loginFlag')
        this.$router.push({ path: '/login' })
      })
      window.sessionStorage.removeItem('loginFlag')
      this.$router.push({ path: '/login' })
    },
    // 退出调用方法
    logoutFun(payload) {
      return new Promise((resolve, reject) => {
        logout(payload).then((resp) => {
          resolve(resp.body)
        }).catch((err) => {
          console.log(err, '调用logout出错')
        })
      })
    },
    // 发送图片
    sengPhotos() {
      if (!this.selectPhotos.length) return
      if (!this.selectFrames.length) return
      this.sending = true
      this.sendModal = true
      this.sendAllnum = 0
      this.sendAllnum = this.selectPhotos.length
      this.sendNum = 0
      this.selectPhotos.forEach((item, i) => {
        if (this.sendeds[item.md5] === 1) {
          this.sendNum++
          if (this.sendNum === this.sendAllnum) {
            this.sending = false
          }
          return
        }
        this.upload(item)
      })
    },
    // 选择图片控制函数
    controlCaption(type) {
      if (this.sending) return
      this.sendModal = false
      if (type === 'yes') {
      }
    },
    // 上传照图片
    upload(item) {
      const userToken = JSON.parse(window.sessionStorage.getItem('loginFlag')).uniqueId
      const storeAs = 'appImage/' + userToken + '/dynamic/' + currentTimeMillis() + "_" + item.name
      // console.log(' => ' + storeAs)
      console.log(storeAs, 'storeAs')
      console.log(item.data, 'item.data')
      this.client.multipartUpload(storeAs, item.data, { headers: { Expires: 172800000 } }).then((result) => {
        this.sendNum++
        this.sendeds[item.md5] = 1
        item.checked = false
        if (this.sendNum === this.sendAllnum) {
          this.sending = false
        }
        // string.split(str)[0]
        // console.log(result.res.requestUrls, 'result.res.requestUrls')
        const requestUrls = result.res.requestUrls
        const urlArray = []
        requestUrls.forEach((item, index) => {
          const urlSingle = item.split('?')[0]
          urlArray.push(urlSingle)
        })
        pushResources({
          uniqueNums: this.selectFrameIds,
          urls: [...urlArray],
          descriptions: [item.caption]
        }).then(r => {
          // console.log(r)
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })

      function currentTimeMillis() {
        var time = new Date()
        return '' + time.getFullYear() + add0(time.getMonth() + 1) + add0(time.getDate()) + add0(time.getHours()) + add0(time.getMinutes()) + add0(time.getSeconds());
      }
      function add0(m) { return m < 10 ? '0' + m : m }
    },
    uploadFile(e) {
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        const item = this.$refs.file.files[i]
        browserMD5File(item, (err, md5) => {
          if (!this.selecteds[md5]) {
            const windowURL = window.URL || window.webkitURL
            let obj = {}
            obj.data = item
            obj.name = item.name
            obj.checked = false
            obj.caption = ''
            obj.md5 = md5
            obj.url = windowURL.createObjectURL(item)
            this.photoList.push(obj)
            this.selecteds[md5] = true
          }
        })
      }
    },
    imgClick(item) {
      if (this.selectPhotos.length >= 18 && !item.checked) { return }
      if (this.sendeds[item.md5] === 1) {
        this.isSendAgain = true
        this.curImg = item
        return
      } else if (this.sendeds[item.md5] === 2) {
        this.sendeds[item.md5] = 1
      }
      item.checked = !item.checked
    },
    // 添加图片描
    addCaption() {
      if (!this.selectPhotos.length) return
      this.captionPhoto = this.selectPhotos[0]
      this.oldcaption = this.captionPhoto.caption
      this.captionModal = true
    },
    captionContorl(type) {
      this.captionModal = false
      if (type === 'yes') {
      } else {
        this.captionPhoto.caption = this.oldcaption
      }
    },
    // 错误提示
    error(errorMessage) {
      this.$message({
        showClose: true,
        message: errorMessage,
        type: 'error'
      })
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.selectFrame {
  width: 100%;
  min-height: 100%;
  background-color: rgb(244, 244, 244);
  background-image: url("../../assets/image/main/main_bg.png");
  /* background-size: 100% 100%; */
  background-repeat: no-repeat;
  text-align: center;
}
.header {
  padding-top: 40px;
  color: white;
  font-size: 40px;
  width: 680px;
  margin-left: auto;
  margin-right: auto;
}
.setting {
  height: 150px;
  width: 150px;
  position: absolute;
  top: 40px;
  left: 85%;
}
.setting img {
  height: 50px;
  width: 50px;
}
.settings {
  list-style: none;
  background: white;
  border-radius: 15px;
}
.settings li {
  padding: 0 18px;
  margin-left: 4px;
  font-size: 14px;
  color: #555555;
  cursor: pointer;
  line-height: 35px;
  text-align: left;
  position: relative;
  z-index: 99;
}
.framebox {
  width: 100%;
  height: 315px;
  margin-top: 50px;
  position: relative;
}
.frame {
  /* margin-left: 144px; */
  width: calc(100% - 288px);
  padding: 5px 0px;
  height: 315px;
  margin: 0 auto;
  text-align: left;
  position: relative;
  overflow: hidden;
}
.blackFrame {
  margin-right: 59px;
  font-size: 23px;
  display: inline-block;
  position: relative;
}
.frameBtn {
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 36px;
  position: absolute;
  top: 75px;
}
.btnLeft {
  left: 60px;
}
.btnRight {
  right: 60px;
}
.frameInbox {
  height: 100%;
  position: absolute;
}
.blackFrame p {
  text-align: center;
}
.single {
  width: 220px;
  height: 150px;
  padding: 20px;
  background: black;
  margin-bottom: 25px;
}
.single .inbox {
  width: 100%;
  height: 100%;
  border: 10px solid #fff;
}
.singn {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  position: absolute;
  top: -3px;
  right: -3px;
  border-radius: 50%;
}
.singn.active {
  background: rgb(17, 236, 73);
}
.singn.sended {
  background: rgb(161, 161, 161);
}
.send {
  clear: both;
  color: #afafaf;
  margin-top: 30px;
  margin-left: 49px;
}
.title {
  font-size: 40px;
}
.all {
  font-size: 28px;
  margin-top: 13px;
  margin-bottom: 30px;
  color: #555555;
}
.sendFrame {
  width: 100%;
  padding: 0 18px 20px 18px;
  text-align: left;
}
.itemFrame {
  width: 250px;
  height: 150px;
  background: #ccc;
  margin: 10px 18px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
}
.itemFrame img {
  width: 100%;
  height: 100%;
}
.buttonArea {
  clear: both;
  margin-bottom: 20px;
}
.el-button {
  width: 200px;
  font-size: 22px;
  color: white;
  margin-right: 35px;
  height: 55px;
  background: #00b5e2;
  border-radius: 30px;
}
.addText {
  font-size: 14px;
}
.modalHeader {
  color: #464646;
  font-size: 28px;
  padding-top: 15px;
}
.modalBody {
  color: #464646;
  font-size: 28px;
  margin-top: 10px;
  text-align: center;
}
.modalBody input {
  height: 40px;
  width: 300px;
  margin-bottom: 17px;
}
.modalImage {
  width: 529px;
  height: 353px;
}
.modalImage img {
  position: relative;
  top: 20%;
  left: -15%;
}
.footer-sure {
  width: 175px;
  border-right: 1px solid #afafaf;
  float: left;
  height: 58px;
  text-align: center;
  color: #007aff;
  line-height: 55px;
  font-size: 22px;
  cursor: pointer;
}
.footer-delt {
  float: left;
  width: 170px;
  height: 58px;
  text-align: center;
  color: #007aff;
  line-height: 55px;
  font-size: 22px;
  cursor: pointer;
}
.el-input {
  margin-bottom: 20px;
}
.captionBody {
  width: 360px;
  height: 240px;
  position: relative;
}
.captionBody img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.captionBody .el-input {
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 2px;
}
</style>
<style>
.selectFrame
  .captionModal.popup
  .modal-mask
  .modal-wrapper
  .modal-container
  .modal-header {
  height: 0;
}
</style>

