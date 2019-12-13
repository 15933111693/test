<template>
  <div class="login">
    <div class="main">
      <el-form label-width="80px">

        <el-form-item label="用户名">
          <el-input v-model="user" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="password" placeholder="" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12"><el-button type="primary" style="width:100%">登陆</el-button></el-col>
            <el-col :span="12"><el-button style="width:100%">注册</el-button></el-col>
          </el-row>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      user: null,
      password: null,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    width: 500px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    /* border: 1px solid #ccc; */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .main{
    width: 350px;
    position: relative;
    left: 45%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
