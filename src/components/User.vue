<template>
    <div class="main">
      <div style="margin-top: 10px;display: flex;justify-content: center">
        <el-input v-model="search" placeholder="在此处搜索用户" prefix-icon="el-icon-search" size="small"></el-input>
        <el-button type="primary" @click="searchbtn" size="small">搜索</el-button>
      </div>

      <div class="card">
        <el-card class="box-card" v-for="card in cardsdata" :key="card._id">
          <div slot="header" class="card-header">
            <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>          </div>
          <div class="card-body">
            <div class="head"></div>
          </div>
          <div class="card-body_content">
              <div>用户名:{{ card.admin }}</div>        
              <div>电子邮箱:{{ card.admin }}</div>  
              <div>注册时间:{{ card.admin }}</div>  
              <div>用户状态:<el-switch v-model="card.switch" active-color="#13ce66" inactive-color="#ff4949"></el-switch> </div>     
          </div>

        </el-card>        
      </div>    

    </div>
</template>

<script>
export default {
    name: 'User',
    data(){
      return {
        search: '',
        cardsdata: [{}],

      }
    },
    methods:{
      searchbtn(){
        return
      },
    }
}
</script>

<style scoped>
  .main{
    width: 100%;
    position: relative;
  }
  .el-input{
    width: 400px;
  }
  .card{
    width: 100%;
    display: flex;
  }
  .box-card{
    width: 332px;
    height: 314px;
  }
  .card-header{
    height: 100%;
    margin:-18px -20px; 
    padding:5px 2px;
    float: right;
  }
  .card-body{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .card-body_content{
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color:rgb(32, 160, 255);
  }
  .card-body_content>div{
    padding: 10px
  }
  .head{
    width: 70px;
    height: 70px;
    border: 1px solid #ccc;
  }
  .deletebtn{
    position: relative;
    right: 0;
  }
</style>