<template>
    <div class="main">
      <div style="margin-top: 10px;display: flex;justify-content: center">
        <el-input v-model="search" placeholder="在此处搜索用户" prefix-icon="el-icon-search" size="small"></el-input>
        <el-button type="primary" @click="searchbtn" size="small">搜索</el-button>
      </div>

      <div class="outcard">
        <div class="card">
        <el-card class="box-card" v-for="user in userdata.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="user._id">
          <div slot="header" class="card-header">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deletebtn(user._id)"></el-button>          
          </div>
          <div class="card-body">
            <div class="head"><img :src="user.userface" :alt="user.nickname" style="width: 70px;height: 70px"></div>
          </div>
          <div class="card-body_content">
              <div>用户名:{{ user.username }}</div>        
              <div>电子邮箱:{{ user.email }}</div>  
              <div>注册时间:{{ user.date }}</div>  
              <div>用户状态:<el-switch v-model="user.switch" active-color="#13ce66" inactive-color="#ff4949" @change="switchbtn(user._id)"></el-switch></div>     
          </div>

        </el-card>        
        </div>        
      </div>


      <div class="page">
        <el-pagination
        layout="prev, pager, next"
        background
        :page-size="pagesize"
        :total="total"
        :current-page="currentPage"
        @current-change="current_change"
        ></el-pagination>
      </div>


    

    </div>
</template>

<script>
import { getRequest, postRequest } from '../api'

export default {
    name: 'User',
    data(){
      return {
        search: '',
        userdata: [{}],
        originuserdata: [{}],
        pagesize:6,
        total:1,
        currentPage:1,
      }
    },
    created(){
      getRequest('http://127.0.0.1:3000/api/userdata').then(data => {
        this.originuserdata = data
        this.total = this.originuserdata.length
        this.userdata = this.originuserdata
      })
    },
    methods:{
      searchbtn(){
        if(this.search == ''){
          this.userdata = this.originuserdata
        }
        if(this.search != ''){
          const patt = new RegExp(this.search)
          this.userdata = this.originuserdata.filter( i => patt.test(i.username))
        } 
        return
      },
      deletebtn(id){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          postRequest('http://127.0.0.1:3000/api/deleteuser',{"_id":id}).then(res => {
            if(res.status == 200 && res.request.readyState == 4){
              this.originuserdata.forEach((item,index) => {
                if(item._id == id){
                  this.originuserdata.splice(index,1)
                  this.total = this.originuserdata.length
                  if(this.originuserdata.length % this.pagesize == 0){
                    if(this.currentPage != 1){
                      this.currentPage -= 1
                    }
                  }
                }
              })
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
        })  
      },
      current_change(currentPage){
        this.currentPage = currentPage
      },
      switchbtn(id){
        let data
        this.originuserdata.forEach(
          (item, index) => {
            if(item._id == id){
              data = this.originuserdata[index]
            }
          }
        )
        postRequest('http://127.0.0.1:3000/api/stwitch',data)
      }
    },
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
  .outcard{
    display: flex;
  }
  .card{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .box-card{
    width: 332px;
    height: 314px;
    margin: 20px;
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
  }
  .deletebtn{
    position: relative;
    right: 0;
  }
  .page{
    display: flex;
    justify-content: center;
  }
</style>