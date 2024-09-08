<template>
  <div class="error-page">
    <div class="content">
      <p>哎呀，页面走丢了！</p>
      <router-link to="/home" class="home-link">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
  data() {
    return {};
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped>
.error-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('@/assets/404.png'); /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  color: #fff; /* 文本颜色 */
  text-align: center;
}

.content {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5); /* 文本背景色，增加对比度 */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content h1 {
  font-size: 60px;
  margin-bottom: 20px;
  font-weight: bold;
}

.content p {
  font-size: 20px;
  margin-bottom: 20px;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff; /* 链接背景色 */
  color: #fff; /* 链接文字颜色 */
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #0056b3; /* 鼠标悬停时的背景色 */
}
</style>
