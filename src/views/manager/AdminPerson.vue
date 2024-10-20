<template>
  <div>
    <el-card style="width: 50%">
      <el-form :model="user" label-width="100px" style="padding-right: 50px">
        <div style="margin: 15px; text-align: center">
          <el-upload
              class="avatar-uploader"
              :action=" this.$baseUrl + '/file/uploadAvatar'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="user.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="user.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个人简介" prop="info">
          <el-input type="textarea" v-model="user.info" placeholder="介绍介绍自己吧。。。"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="user.birth"
                          style="width: 100%"></el-date-picker>
        </el-form-item>
        <div style="text-align: center; margin-bottom: 20px">
          <el-button type="primary" @click="update">保 存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "AdminPerson",
  data() {
    return {
      user: store.state.user.userInfo
    }
  },
  created() {

  },
  methods: {
    update() {
      // 创建一个新的对象，除了avata 属性外，其余属性都与this.use 相同
      const newAvatar = this.user.avatar.lastIndexOf("/file/getAvatar")
      const updatedUserDb = {
        ...this.user,
        avatar: this.user.avatar.substring(newAvatar)
      };

      // 保存当前的用户信息到数据库
      this.$request.put('/userInfo/update', updatedUserDb).then(res => {
        console.log(updatedUserDb.avatar)

        if (res.code === '200') {
          // 成功更新
          this.$message.success('保存成功')

          // 更新浏览器缓存里的用户信息(缓存和vuex里面用户头像信息还是存这个
          // http://localhost:9010/file/getAvatar/14b5787b-8007-44f1-b44d-53f1dd3b8b04.webp)形式的URL
          store.commit('user/setUserInfo', this.user)

          //触发父级的数据更新(更改了vuex和缓存的数据，不在需要在父级重新更新数据了)
          //this.$emit('update:user')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //上传图片的回调函数
    // response: 服务器返回的数据，file: 是上传成功的文件信息，fileList: 是上传文件列表的信息
    handleAvatarSuccess(response, file, fileList) {
      if (response) {
        //this.$set 是 Vue 提供的一个全局方法，用于向响应式对象上添加属性，并确保新属性也是响应式的，同时能够触发视图更新。
        //更新用户头像的URL(只是更新这个页面的数据，没有更新vuex也没有更改持久化缓存)
        this.$set(this.user, 'avatar', this.$baseUrl + response.data);
      } else {
        console.error('头像上传成功，但未获取到图片URL')
      }
    },
    beforeAvatarUpload(file) {
      //const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      /*if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }*/
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
  }

}
</script>

<style scoped>
/deep/ .el-form-item__label {
  font-weight: bold;
}

/deep/ .el-upload {
  border-radius: 50%;
}

/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border-radius: 50%;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 50%;
}
</style>
