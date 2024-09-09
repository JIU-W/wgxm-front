<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="rules" ref="formRef" label-position="top" class="login-form">
      <h2 class="login-title">wgxm管理系统</h2>
      <el-form-item prop="username" size="large">
        <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入账号"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码"
                  autocomplete="off"></el-input>
      </el-form-item>
      <!--      <el-form-item label="验证码">
              <el-row>
                <el-col :span="12">
                  <el-image
                      class="captcha-img"
                      fit="fill"
                      :src="captchaUrl"
                      @click="refreshCaptcha"
                      style="cursor: pointer; width: 100%; height: 40px;"
                  ></el-image>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="loginForm.captcha" placeholder="Enter captcha"></el-input>
                </el-col>
              </el-row>
            </el-form-item>-->
      <el-form-item>
        <el-button type="primary" size="medium" @click="submitLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          /*{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }*/
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      },
      captchaUrl: 'your-captcha-endpoint.php?' + Math.random().toString(36).substr(2, 9)
    };
  },
  methods: {
    submitLogin() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //登录逻辑
          this.$request.post('/user/login', {
                userName: this.loginForm.username,
                password: this.loginForm.password
          }).then(res => {
            if (res.code === '200') {
              //登录成功，保存用户信息到vuex和本地存储
              this.$store.commit('user/setUserInfo', res.data)
              this.$message.success('登录成功')
              this.$router.push('/home')  // 跳转主页
            }else {
              this.$message.error(res.msg)
            }
          }).catch(error => {
            // 处理请求失败的情况
            console.error('登录请求失败：', error);
            this.$message.error('登录请求失败，请检查网络连接或稍后再试。');
          });
        } else {
          console.log('Validation failed!');
          return false;
        }
      });
    },
    refreshCaptcha() {
      this.captchaUrl = 'your-captcha-endpoint.php?' + Math.random().toString(36).substr(2, 9);
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
}

.captcha-img {
  width: 100%;
  cursor: pointer;
}

</style>
