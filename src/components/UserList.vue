<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="dialogVisible = true" class="button"
      >点击打开 Dialog</el-button
    >
    <!-- 添加新用户 -->
    <el-dialog
      title="添加新用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClosed"
    >
      <!-- 表单 -->
      <el-form
        :model="inputData"
        label-width="80px"
        :rules="formRules"
        ref="dialogForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="inputData.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="inputData.age"></el-input>
        </el-form-item>
        <el-form-item label="用户头衔" prop="position">
          <el-input v-model="inputData.position"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewUserButton">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 用户表格 -->
    <el-table :data="userList" :border="booleans" stripe>
      <!-- 渲染一个索引头列就是给每行加上一个1234... -->
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="头衔" prop="position"></el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ scope.row.addtime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <div>
            <router-link :to="'/users/'+row.id">详情页</router-link> &nbsp;
            <a href="#" @click.prevent="getData(row.id)">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    // 表单验证的校验器函数
    let checkAge = (rules, value, callback) => {
      // 先判断是不是整数，不是的话，返回一个error错误信息
      if (!Number.isInteger(value)) {
        return callback(new Error("请填写整数"));
      }
      if (value > 100 || value < 1) {
        return callback(new Error("年龄要在0-100之间"));
      }
      callback();
    };
    return {
      userList: [],
      booleans: true,
      dialogVisible: false,
      inputData: {
        name: "",
        age: "",
        position: "",
      },
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: "请输入姓名", triger: "blur" },
          { min: 3, max: 5, message: "长度在3到5个字符", triger: "blur" },
        ],
        age: [
          {
            type: "number",
            required: true,
            message: "年龄不能为空",
            triger: "blur",
          },
          { validator: checkAge, triger: "blur" },
        ],
        position: [{ required: true, message: "头衔不能为空", triger: "blur" }],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 发起axios请求数据
    async getUserList() {
      const { data: res } = await this.$http.get("/api/users");
      if (res.status !== 0) return console.log("用户列表数据请求失败");
      this.userList = res.data;
    },
    // dialog对话框关闭对应的事件
    dialogClosed() {
      this.$refs.dialogForm.resetFields();
    },
    // 确认按钮，并且对表单数据进行验证
    addNewUserButton() {
      this.$refs.dialogForm.validate(async (valueBlooean) => {
        if (!valueBlooean) {
          return;
        }
        // 发起请求添加用户信息
        const { data: res } = await this.$http.post(
          "/api/users",
          this.inputData
        );
        if (res.status !== 0) {
          return this.$message.error("添加用户失败");
        }
        this.$message.success("添加成功");
        // 然后隐藏对话框
        this.dialogVisible = false;
        // 然后重新调用发起axios请求的函数，刷新页面数据
        this.getUserList();
      });
    },
    // 点击了删除的链接
    async getData(id) {
      const confirmSet = await this.$confirm(
        "此操作将永久删除该用户信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmSet !== "confirm") {
        return this.$message.info("取消删除");
      }
      const { data: res } = await this.$http.delete("/api/users/" + id);
      if (res.status !== 0) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getUserList();
    },
  },
};
</script>

<style scoped lang="less">
.button {
  margin-bottom: 20px;
}
</style>>

