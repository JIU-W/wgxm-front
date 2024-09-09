<template>
  <div class="register-container">
    <el-form :model="registerForm" ref="registerForm" label-position="top" class="register-form">
      <h2 class="register-title">Register</h2>
      <!-- 用户名和密码部分 -->
      <!-- ...（与登录页面相同） -->

      <el-form-item label="Email">
        <el-input v-model="registerForm.email" type="email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="Confirm Password">
        <el-input type="password" v-model="registerForm.confirmPassword" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 验证码部分 -->
      <!-- ...（与登录页面相同） -->

      <el-form-item>
        <el-button type="primary" @click="submitRegister">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        captcha: ''
      },
      captchaUrl: 'your-captcha-endpoint.php?' + Math.random().toString(36).substr(2, 9)
    };
  },
  methods: {
    // 提交注册的逻辑与登录类似，但你可能需要添加额外的验证
    submitRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid && this.registerForm.password === this.registerForm.confirmPassword) {
          // 这里添加注册逻辑，比如发送AJAX请求
          alert('Registration successful!');
          // 注意：实际项目中，你应该在这里调用API并处理响应
        } else {
          console.log('Validation failed or passwords do not match!');
          return false;
        }
      });
    },
    // 验证码刷新与登录页面相同
    // ...
  }
  // 验证码刷新方法与登录页面相同，无需重复
};
</script>

<style scoped>
/* 样式与登录页面类似，但类名需要更改以避免冲突 */
.register-container {
  /* ...（与登录页面相同） */
}

.register-form {
  /* ...（与登录页面相同） */
}

.register-title {
  /* ...（与登录页面相同，但类名更改） */
}

/* 验证码样式无需更改，因为它在登录和注册页面中是相同的 */
</style>
