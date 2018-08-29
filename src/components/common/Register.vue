<template>
  <div class="box">
    <div class="header">
      <img src="../../assets/image/login/logoandtext.png"/>
    </div>
    <div class="title">
      Account Register
    </div>
    <!--注册-->
    <div class="form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input type="password" v-model="ruleForm.confirmPass" auto-complete="off" placeholder="Confirm Password"></el-input>
        </el-form-item>
        <el-form-item prop="firstName">
          <el-input type="text" v-model="ruleForm.firstName" auto-complete="off" placeholder="First Name"></el-input>
        </el-form-item>
        <el-form-item prop="lastName">
          <el-input type="text" v-model="ruleForm.lastName" auto-complete="off" placeholder="Last Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="" @click="registerForm('ruleForm')">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {register} from '../../http/login.api.js'
  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your nickName'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        const reg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
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
          if (this.ruleForm.confirmPass !== '') {
            this.$refs.ruleForm.validateField('confirmPass')
          }
          callback()
        }
      }
      var validateConfirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('The two passwords don not match'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          firstName: '',
          lastName: '',
          email: '',
          pass: '',
          confirmPass: ''
        },
        rules: {
          firstName: [
            {validator: validateName, trigger: 'blur'}
          ],
          lastName: [
            {validator: validateName, trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmPass: [
            { validator: validateConfirmPass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 注册
      registerForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
              'username': this.ruleForm.email,
              'password': encodeURIComponent(this.ruleForm.pass),
              'nickName': encodeURIComponent(this.ruleForm.firstName + this.ruleForm.lastName),
              'mobileType': 2
            }
            console.log(encodeURIComponent("http://www.w3school.com.cn"))
            console.log(data, 'data')
            this.registerFun(data).then((resp) => {
              if (resp.STATE === 'SUCCESS') {
                this.$router.push({path: '/login'})
              } else if (resp.STATE === 'FAIL') {
                const errObj = {
                  '1017': 'email has been used!',
                }
                if (resp.ERROR_CODE in errObj) {
                  this.error(errObj[resp.ERROR_CODE])
                } else {
                  this.error('Register failed')
                }
              }
            })
          } else {
            return false
          }
        })
      },
      // 注册调用方法
      registerFun(payload) {
        return new Promise((resolve, reject) => {
          register(payload).then((resp) => {
            resolve(resp.body)
          }).catch((err) => {
            console.log(err, '调用register出错')
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
