<template>
  <div class="box">
    <div class="header">
      <img src="../../assets/image/login/logoandtext.png"/>
    </div>
    <div class="title">
      Reset Password
    </div>
    <!--注册-->
    <div class="form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="frameId">
          <el-input type="text" v-model="ruleForm.frameId" auto-complete="off" placeholder="Enter the frame ID"></el-input>
        </el-form-item>
        <el-form-item prop="newpass">
          <el-input type="password" v-model="ruleForm.newpass" auto-complete="off" placeholder="Enter new Password"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="" @click="changeForm('ruleForm')">Confirm</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {resetPassword} from '../../http/login.api.js'
  export default {
    data() {
      var validateFrame = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter the frame ID'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter new password'))
        } else {
          callback()
        }
      }
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
      return {
        ruleForm: {
          frameId: '',
          newpass: '',
          email: ''
        },
        rules: {
          frameId: [
            {validator: validateFrame, trigger: 'blur'}
          ],
          newpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 修改密码
      changeForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
               'newPassword': this.ruleForm.newpass,
               'username': this.ruleForm.email,
               'uniqueNum': this.ruleForm.frameId
            }
            this.resetFun(data).then((resp) => {
              if (resp.STATE === 'SUCCESS') {
                this.$router.push({path: '/login'})
              } else if (resp.STATE === 'FAIL') {
                const errObj = {
                  '1003': 'email not exist!',
                  '1019': 'Old and new passwords is not same',
                  '1015': 'Frame ID is not yours!',
                  '1018': 'Frame ID not exist!',
                }
                if (resp.ERROR_CODE in errObj) {
                  this.error(errObj[resp.ERROR_CODE])
                } else {
                  this.error('Reset Password failed')
                }
              }
            })
          }
        })
      },
      // 重置密码调用方法
      resetFun(payload) {
        return new Promise((resolve, reject) => {
          resetPassword(payload).then((resp) => {
            resolve(resp.body)
          }).catch((err) => {
            console.log(err, '调用resetPassword出错')
          })
        })
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
.title {
  margin-left: auto;
  margin-right: auto;
  width: 586px;
  font-size: 35px;
  text-align: center;
}
.form {
  margin-top: 50px;
}
.el-form-item {
  margin-bottom: 14px;
}
.el-button {
  margin-top: 33px;
}
</style>
