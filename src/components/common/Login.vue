<template>
  <div class="box">
    <div class="header">
      <img src="../../assets/image/login/logoandtext.png"/>
    </div>
    <div class="logo">
      <img src="../../assets/image/login/logo.png"/>
    </div>
    <!--登录-->
    <div class="form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="" @click="submitForm('ruleForm')">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--底部信息-->
    <div class="footer">
      <p class="creat" @click="createAccount"><span>Creat New Account</span></p>
      <p class="change" @click="resetPassword">Change Password</p>
    </div>
  </div>
</template>

<script>
  import {login} from '../../http/login.api.js'
  export default {
    data() {
      var validateEmail = (rule, value, callback) => {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (value === '') {
          callback(new Error('Please enter your email address'))
        } else if (!reg.test(value)) {
          callback(new Error('It is not an email address'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter tour password'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          email: '',
          pass: ''
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 登录
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             const data = {
               'password': this.ruleForm.pass,
               'username': this.ruleForm.email,
              //  'deviceId': '',
              //  'appKey': '',
               'mobileType': 2
             }
             this.loginFun(data).then((resp) => {
              if (resp.STATE === 'SUCCESS') {
                const loginFlag = {
                  'uniqueId': resp.DATA.uniqueId,
                  'loginToken': resp.DATA.loginToken,
                  'nickName': resp.DATA.loginToken
                }
                window.sessionStorage.setItem('loginFlag', JSON.stringify(loginFlag))
                console.log(window.sessionStorage.getItem('loginFlag'), 'ssssssssssssssssssssssssss')
                this.$router.push({path: '/selectFrame'})
              } else if (resp.STATE === 'FAIL') {
                const errObj = {
                  '1003': 'email not exist!',
                  '1007': 'password error!'
                }
                if (resp.ERROR_CODE in errObj) {
                  this.error(errObj[resp.ERROR_CODE])
                } else {
                  this.error('Login failed')
                }
              }
             })
          } else {
            return false
          }
        })
      },
      // 登录调用方法
      loginFun(payload) {
        return new Promise((resolve, reject) => {
          login(payload).then((resp) => {
            resolve(resp.body)
          }).catch((err) => {
            console.log(err, '调用login出错')
          })
        })
      },
      // 跳转到注册页面
      createAccount() {
        console.log('跳转到注册页面')
        this.$router.push({path: '/register'})
      },
      // 跳转到重置密码页面
      resetPassword() {
        this.$router.push({path: '/resetPassword'})
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
@import '../../assets/css/common.css';
.el-button {
  margin-top: 30px;
}
.footer {
  font-size: 18px;
  margin-top: 36px;
  cursor: pointer;
  color: #ffffff;
}
.creat {
  margin-bottom: 20px;
}
.creat span {
  border-bottom: 1px solid white;
}
.back {
  font-size: 18px;
  font-weight: bold;
}
</style>
