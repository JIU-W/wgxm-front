<template>
  <div class="manager-container">
    <!--  头部  -->
    <div class="manager-header">
      <div class="manager-header-left">
        <img src="@/assets/imgs/logo2.png" alt=""/>
        <div class="title">后台管理系统</div>
      </div>

      <div class="manager-header-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.meta.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="manager-header-right">
        <el-dropdown placement="bottom">
          <div class="avatar">
            <img :src="user.avatar ? user.avatar : this.$baseUrl + '/file/getAvatar/defaultAvatar.jpg' "/>
            <div>{{ user.name || '管理员' }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goToPerson">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/password')">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!--  主体  -->
    <div class="manager-main">
      <!--  侧边栏  -->
      <div class="manager-main-left">
        <el-menu :default-openeds="['info', 'user']" router style="border: none" :default-active="$route.path">
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title" style="color: #dddddd">系统首页</span>
          </el-menu-item>

          <el-submenu index="info">
            <template slot="title">
              <i class="el-icon-menu"></i><span style="color: #dddddd">信息管理</span>
            </template>
            <el-menu-item style="color: #dddddd" index="/notice">
              公告信息
            </el-menu-item>
          </el-submenu>

          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-menu"></i><span style="color: #dddddd">用户管理</span>
            </template>
            <el-menu-item style="color: #dddddd" index="/admin">
              管理员信息
            </el-menu-item>
            <el-menu-item style="color: #dddddd" index="/user">
              用户信息
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <!--数据表格--><!--二级路由-->
      <div class="manager-main-right">
        <router-view @update:user="updateUser"></router-view>
      </div>
    </div>

  </div>
</template>

<script>

import store from "@/store";

export default {
  name: 'Manager',
  data() {
    return {
      user: store.state.user.userInfo
    }
  },
  created() {
    //console.log(this.user)
  },
  methods: {
    updateUser() {
      //this.user = this.$store.state.user.userInfo  //重新获取下用户的最新信息
    },

    //跳转到个人信息页面
    goToPerson() {
      this.$router.push('/adminPerson')
    },
    //退出登录
    logout(){
      this.$confirm('你确认要退出么？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            //登录逻辑
            //调用vuex的actions提供的方法
            this.$store.dispatch('user/logout')
            this.$router.push('/login')
          })
          .catch(() => {
            /*this.$message({
              type: 'info',
              message: '已取消退出'
            });*/
          });
    }
  }
}


</script>

<style scoped lang="less">

</style>
