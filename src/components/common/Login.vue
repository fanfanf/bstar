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
      <p class="creat" @click="createAccount"><a href="#">Creat New Account</a></p>
      <p class="change" @click="changePassword">Change Password</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validateEmail = (rule, value, callback) => {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else if (!reg.test(value)) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
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
             window.sessionStorage.setItem('test', 'test')
             this.$router.push({path: '/selectFrame'})
          } else {
            console.log('登录失败')
            return false
          }
        })
      },
      // 跳转到注册页面
      createAccount() {
        this.$router.push({path: '/register'})
      },
      // 跳转到修改密码页面
      changePassword() {
        this.$router.push({path: '/changePassword'})
      }
    }
  }
</script>

<style scoped>
@import '../../assets/css/common.css';
.footer {
  font-size: 18px;
  margin-top: 36px;
  cursor: pointer;
}
.creat {
  margin-bottom: 20px;
}
.creat a {
  color: #ffffff;
}
.back {
  font-size: 18px;
  font-weight: bold;
}
</style>
