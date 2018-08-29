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
        <el-form-item prop="nickName">
          <el-input type="text" v-model="ruleForm.nickName" auto-complete="off" placeholder="Nick Name"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input type="password" v-model="ruleForm.confirmPass" auto-complete="off" placeholder="Confirm Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="" @click="registerForm('ruleForm')">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else if (reg.test(value)) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.confirmPass !== '') {
            this.$refs.ruleForm.validateField('confirmPass')
          }
          callback()
        }
      }
      var validateConfirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          nickName: '',
          email: '',
          pass: '',
          confirmPass: ''
        },
        rules: {
          nickName: [
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
            console.log('注册成功')
            this.$router.push({path: '/login'})
          } else {
            console.log('注册失败')
            return false
          }
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
