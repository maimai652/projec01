<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户详情</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="goBack"
          >返回</el-button
        >
      </div>
      <div class="text item">
        <p>姓名：{{ userData.name }}</p>
        <p>年龄：{{ userData.age }}</p>
        <p>头衔：{{ userData.position }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserComponentSon",
  props: ["id"],
  data() {
    return {
      userData: {},
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      const { data: res } = await this.$http.get("/api/users/" + this.id);
      if (res.status !== 0) {
        return this.$message.error("获取用户详情失败");
      }
      //   如果请求数据成功，我们把获取的数据存起来
      this.userData = res.data;
      console.log(this.userData);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>