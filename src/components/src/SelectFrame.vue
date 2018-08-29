<template>
<div class="selectFrame">
  <div class="header">
    Select frame to send photos
  </div>
  <!--设置-->
  <div class="setting">
    <img src="../../assets/image/main/setting.png" @click="controlSetting">
    <ul class="settings" v-show="settingsDisplay">
      <li @click="addFrame">Add Frame</li>
      <li @click="editFrame">Edit Frame</li>
      <li @click="logout" style="color: #00b9e3">Log Out</li>
    </ul>
  </div>
  <!--框架选择-->
  <div class="frame">
    <div class="blackFrame">
      <div class="single"></div>
      <p>John</p>
    </div>
    <div class="blackFrame">
      <div class="single"></div>
      <p>John</p>
    </div>
  </div>
  <!--图片选择发送-->
  <div class="send">
    <p class="title">Select photos to send to frame(0)</p>
    <p class="all">Select All</p>
    <div class="sendFrame">
      <div class="itemFrame">
      </div>
      <div class="itemFrame">
      </div>
    </div>
    <div class="buttonArea">
      <el-button type="">Send Photos</el-button>
      <el-button type="" @click="addCaption">Add Caption</el-button>
    </div>
  </div>
  <!--发送图片-->
  <Popup v-show="sendModal">
    <p slot="header" class="modalHeader">Sending</p>
    <div slot="body" class="modalBody">
      <input type="text"/>
      (8/10)
    </div>
    <div slot="footer" class="modalFooter">
     OK
    </div>
  </Popup>
</div>
</template>

<script>
  import Popup from '../common/Popup.vue'
  export default {
    components: {
      Popup
    },
    data() {
      return {
        sendModal: false, // 发送图片模态框显示状态
        settingsDisplay: false // 设置框显示状态
      }
    },
    methods: {
      // 显示设置框
      controlSetting() {
        this.settingsDisplay = !this.settingsDisplay
      },
      // 添加frame
      addFrame() {
        this.$router.push({path: '/addFrame'})
      },
      // 编辑frame
      editFrame() {
        this.$router.push({path: '/editFrame'})
      },
      // 退出
      logout() {
        window.sessionStorage.removeItem('test')
        this.$router.push({path: '/logout'})
      },
      
      addCaption() {
        this.selectModal = true
      },
      // 选择图片控制函数
      controlCaption(type) {
        this.selectModal = false
        if (type === 'yes') {
          console.log('走这了吗')
        }
      }
    }
  }
</script>

<style scoped>
.selectFrame {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/image/main/main_bg.png');
  background-size: 100% 100%;
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
  position:absolute;
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
}
.frame {
  margin-left: 144px;
  height: 200px;
  margin-top: 50px;
}
.blackFrame {
  margin-right: 59px;
  font-size: 23px;
  float: left;
}
.single {
  width: 220px;
  height: 150px;
  background: black;
  margin-bottom: 25px;
}
.send {
  clear: both;
  color: #afafaf;
  margin-top: 30px;
  margin-left: 49px;
}
.title{
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
}
.itemFrame {
  width: 250px;
  height: 150px;
  background: #ccc;
  margin-left: 35px;
  margin-bottom: 35px;
  float: left;
}
.buttonArea {
  clear: both;
}
.el-button {
  width: 400px;
  font-size: 22px;
  color: white;
  margin-right: 35px;
  height: 55px;
  background: #00b5e2;
  border-radius: 30px;
}
.modalHeader {
  color: #464646;
  font-size: 28px;
  padding-top:15px;
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
.modalFooter {
  text-align: center;
  color:#007aff;
  line-height: 55px;
  font-size: 22px;
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
  color:#007aff;
  line-height: 55px;
  font-size: 22px;
  cursor: pointer;
}
.footer-delt {
  float: left;
  width: 170px;
  height: 58px;
  text-align: center;
  color:#007aff;
  line-height: 55px;
  font-size: 22px;
  cursor: pointer;
}
</style>
