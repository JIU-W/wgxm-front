<template>
  <div>
    <el-card>
      <h3>修改密码</h3>
      <el-form ref="changePasswordForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="当前密码" prop="password">
          <el-input show-password type="password" v-model="form.password" autocomplete="current-password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input show-password type="password" v-model="form.newPassword" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmNewPassword">
          <el-input show-password type="password" v-model="form.confirmNewPassword" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('changePasswordForm')">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      form: {
        userId: store.state.user.userInfo.userId,
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '新密码长度必须在6到20个字符之间', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: this.validatePasswordMatch, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //验证新密码和确认新密码是否一致
    validatePasswordMatch(rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入的新密码不一致'));
      } else {
        callback();
      }
    },
    //提交表单(修改密码)
    submitForm() {
      this.$refs.changePasswordForm.validate((valid) => {
        if (valid) {
          //此处可以添加修改密码的逻辑
          this.$request.put('/userInfo/updatePassword', this.form).then(res => {
                if (res.code === '200') {
                  this.$message.success('密码修改成功！')
                  this.resetForm()
                } else {
                  //密码修改失败
                  this.$message.error(res.msg)
                }
              }
          ).catch(error => {
            console.error('修改密码请求失败：', error)
            this.$message.error('修改密码请求失败，请检查网络连接或稍后再试。')
          })
        } else {
          console.log('验证失败');
          return false;
        }
      });
    },

    //重置表单
    resetForm() {
      this.$refs.changePasswordForm.resetFields();
    }
  }
};
</script>

<style scoped>
.el-card {
  width: 400px;
  margin: 50px auto;
}
</style>
