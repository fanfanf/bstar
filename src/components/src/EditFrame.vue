<template>
<div class="editFrame">
<div class="selectFrame">
  <div class="header">
    <span class="title">Edit Frame</span>
    <span class="back" @click="backFun">back</span>
  </div>
  <!--框架选择-->
  <div class="framebox">
  <div class="frame" ref="frame">
    <div class="frameInbox" :style="{width: frameWidth + 'px',left:frameLeft + 'px'}">
      <div class="blackFrame" v-for="(item,i) in frameList" :key="i" @click="selectFrame(item)">
        <div class="single">
          <div class="inbox"></div>
        </div>
        <div class="singn" :class="{active: !frameSelected}"></div>
        <p class="selectText">{{item.remarkName}}</p>
      </div>
    </div>
  </div>
    <div class="frameBtn btnLeft el-icon-arrow-left" @click="btnLeft" v-if="frameWidth>fw+10"></div>
    <div class="frameBtn btnRight el-icon-arrow-right" @click="btnRight" v-if="frameWidth>fw+10"></div>
  </div>
  <el-button type="info" @click="editFrame" :disabled="frameSelected">Edit Frame</el-button>
  <el-button type="info" @click="removeFrame" :disabled="frameSelected">Remove Frame</el-button>
  <!--编辑框架-->
  <Popup v-show="editModal" @close="editContorl">
    <p slot="header" class="modalHeader">Edit Frame</p>
    <div slot="body" class="modalBody">
      <div class="form">
        <el-input type="text" v-model="uniqueNum" auto-complete="off" disabled=""></el-input>
        <el-input type="text" v-model="remarkName" auto-complete="off" placeholder="rename your frame"></el-input>
      </div>
    </div>
  </Popup>
   <!--删除框架-->
  <Popup v-show="removeModal" @close="removeContorl">
    <p slot="body" class="removeModalBody">Remove<span style="padding: 10px;">{{remarkName}}</span>Photoframe?</p>
  </Popup>
</div>
</div>
</template>

<script>
import Popup from '../common/Popup.vue'
import { gainFrame, unbound, rename } from '../../http/frame.api.js'
export default {
  components: {
    Popup
  },
  data() {
    return {
      frameList: [],
      frameSelected: true, // 当前是否有选中的相框
      remarkName: '11', // 相框名称
      uniqueNum: '',// 相框serial number
      removeModal: false, // 删除框架模态框显示状态
      editModal: false, // 编辑框架模态框显示状态
      frameLeft: 0,
      fw: 0
    }
  },
  mounted() {
    this.init()
    this.$nextTick(() => {
      this.fw = this.$refs.frame.offsetWidth
    })
  },
  computed: {
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
    frameWidth() {
      return this.frameList.length * 280
    }
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
    // 选择框架
    selectFrame(item) {
      // item.checked = !item.checked
      // console.log(item, item.checked)
      if (item) {
        this.frameSelected = !this.frameSelected
        this.remarkName = item.remarkName
        this.uniqueNum = item.uniqueNum
      }
    },
    // 获取相框列表
    init() {
      this.gainFrameFun().then((resp) => {
        if (resp.STATE === 'SUCCESS') {
          this.frameList = resp.DATA
        } else if (resp.ERROR_CODE === 1015) {
          this.$router.push({ path: '/selectFrame' })
        }
      })
    },
    // 修改框架
    editFrame() {
      this.editModal = true
    },
    // 编辑框架控制函数
    editContorl(type) {
      this.editModal = false
      if (type === 'yes') {
        const data = {
          uniqueNum: this.uniqueNum,
          remarkName: this.remarkName
        }
        this.renameFun(data).then((resp) => {
          if (resp.STATE === 'SUCCESS') {
            this.init()
          } else if (resp.STATE === 'FAIL') {
            this.error('Edit frame failed')
          }
        })
      }
    },
    // 删除框架
    removeFrame() {
      this.removeModal = true
    },
    // 删除框架控制函数
    removeContorl(type) {
      this.removeModal = false
      if (type === 'yes') {
        const data = {
          uniqueNum: this.uniqueNum
        }
        this.unboundFun(data).then((resp) => {
          if (resp.STATE === 'SUCCESS') {
            this.init()
          } else if (resp.STATE === 'FAIL') {
            this.error('Remove frame failed')
          }
        })
      }
    },
    // 删除选中相框调用方法
    renameFun(payload) {
      return new Promise((resolve, reject) => {
        rename(payload).then((resp) => {
          resolve(resp.body)
        }).catch((err) => {
          console.log(err, '调用unbound出错')
        })
      })
    },
    // 删除选中相框调用方法
    unboundFun(payload) {
      return new Promise((resolve, reject) => {
        unbound(payload).then((resp) => {
          resolve(resp.body)
        }).catch((err) => {
          console.log(err, '调用unbound出错')
        })
      })
    },
    // 获取已绑定相框调用方法
    gainFrameFun() {
      return new Promise((resolve, reject) => {
        gainFrame().then((resp) => {
          resolve(resp.body)
        }).catch((err) => {
          console.log(err, '调用gainFrame出错')
        })
      })
    },
    // 退回到主页面
    backFun() {
      this.$router.push({ path: '/selectFrame' })
    }
  }
}
</script>

<style scoped>
.editFrame {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  text-align: center;
}
.header {
  background: #00b2e2;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
}
.back {
  float: right;
  margin-right: 8%;
  cursor: pointer;
}
.removeModalBody {
  margin-top: -30px;
  color: #464646;
  font-size: 28px;
  text-align: center;
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
.el-input {
  margin-bottom: 20px;
}
* {
  box-sizing: border-box;
}
.selectFrame {
  width: 100%;
  text-align: center;
}
.framebox {
  width: 100%;
  height: 315px;
  margin-top: 50px;
  position: relative;
}
.frame {
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

.el-button {
  width: 200px;
  font-size: 22px;
  color: white;
  margin-right: 35px;
  height: 55px;
  background: #00b5e2;
  border-radius: 30px;
}
.selectText {
  font-size: 18px;
  color: #464646;
}
</style>

