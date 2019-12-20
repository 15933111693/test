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
            <el-col :span="24"><el-button type="primary" style="width:100%" @click="login">登陆</el-button></el-col>
          </el-row>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import { postRequest } from '../api'

export default {
  name: 'Login',
  data(){
    return{
      user: null,
      password: null,
    }
  },
  methods:{
    login(){
      let data = {user: this.user, password: this.password }
      postRequest('http://127.0.0.1:3000/api/login',data).then(
        res => {
          if(res.status == 200 && res.request.readyState == 4){
            this.$router.replace('home')
          }
        }
      ).catch((err) => {console.log(err);this.$message('账户或密码有误')})
    }
  }
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
