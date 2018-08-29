<template>
  <div class="box">
    <div class="header">
      <img src="../../assets/image/login/logoandtext.png"/>
    </div>
    <div class="title">
      Change Password
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
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="Account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="" @click="changeForm('ruleForm')">Confirm</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validateFrame = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入FrameId'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          callback()
        }
      }
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          frameId: '',
          newpass: '',
          account: ''
        },
        rules: {
          frameId: [
            {validator: validateFrame, trigger: 'blur'}
          ],
          newpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 修改密码
      changeForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('修改密码成功')
            this.$router.push({path: '/login'})
          } else {
            console.log('修改密码失败')
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
