<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="rules" ref="formRef" label-position="top" class="login-form" >
      <h2 class="login-title">wgxm管理系统</h2>
      <el-form-item prop="username" size="large">
        <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password
                  autocomplete="off"></el-input>
      </el-form-item>
            <el-form-item label="图片验证码">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input v-model="loginForm.captcha"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-image
                      class="captcha-img"
                      alt="Captcha"
                      fit="fill"
                      :src="captchaUrl"
                      @click="refreshCaptcha"
                  ></el-image>
                </el-col>
              </el-row>
            </el-form-item>
      <el-form-item class="login-button-container">
        <el-button type="primary" size="medium" @click="submitLogin" style="position: absolute; bottom: 0; right: 0;">登录</el-button>
      </el-form-item>
      <div style="display: flex; align-items: center">
        <div style="flex: 1"></div>
        <div style="flex: 1; text-align: right; color: black; font-weight: bold; font-size: 14px; ">
          还没有账号？请 <a href="/register">注册</a>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

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
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      },
      captchaUrl: ''
    };
  },
  created() {
    this.refreshCaptcha()
  },
  methods: {
    //刷新验证码
    refreshCaptcha() {
      this.captchaUrl = 'http://localhost:9010/user/checkCode?' + new Date().getTime();//加时间戳：确保每次请求的URL都是唯一的，避免浏览器缓存。
    },
    submitLogin() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //登录逻辑
          this.$request.post('/user/login', {
            userName: this.loginForm.username,
            password: this.loginForm.password,
            checkCode: this.loginForm.captcha
          }).then(res => {
            if (res.code === '200') {
              //登录成功，保存用户信息到vuex和本地存储
              this.$store.commit('user/setUserInfo', res.data)
              this.$message.success('登录成功')
              this.$router.push('/home')  // 跳转主页
            }else {
              //登录失败，刷新图片验证码
              this.refreshCaptcha()
              this.$message.error(res.msg)
            }
          }).catch(error => {
            //处理请求失败的情况
            console.error('登录请求失败：', error);
            this.$message.error('登录请求失败，请检查网络连接或稍后再试。');
          });
        } else {
          console.log('Validation failed!');
          return false;
        }
      });
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
  padding-bottom: 8px; /* 调整这个值以拉近按钮和表单下边界的距离 */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative; /* 确保按钮的绝对定位相对于此元素 */
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
}

.login-button-container {
  margin-top: 10%; /* 调整这个值以保持按钮和密码输入框的距离 */
  text-align: right; /* 将按钮右对齐 */
}

.captcha-img {
  width: 100%;
  cursor: pointer;
  height: 35px;
}

</style>
