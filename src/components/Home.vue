<template>
  <div class="home">
    <el-container class="home-container">
        <el-header>V部落博客管理平台</el-header>
        
        <el-container direction="horizontal">
            <el-aside width="200px">
              <el-menu router> 
                
                <el-submenu index="/home">
                  <template slot="title">文章管理</template>
                  <template v-for="(item,i) in this.$router.options.routes[1].children">
                    <el-menu-item :index="item.path" :key="i" v-if="i<2">
                      {{ item.name }}
                    </el-menu-item>
                  </template>
                </el-submenu>
                
                <template v-for="(item,i) in this.$router.options.routes[1].children">
                  <el-menu-item  v-if="i>1" :index="item.path" :key="i">
                    {{ item.name }}
                  </el-menu-item>
                </template>
                

              </el-menu>
            
            </el-aside>
            
            <el-container>
                
                <el-main>
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
                  </el-breadcrumb>
                  <keep-alive>
                    <router-view/>
                  </keep-alive>              
                  
                </el-main>

            </el-container>

        </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
    name:'Home',
    data(){
      return {
        index: null,
      }
    },
    created: function(){
      console.log(this.$router)
    }
}
</script>

<style scoped>
  .home-container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .el-header{
    background-color: #20a0ff;
    color: #fff;
    font-size: 22px;
    line-height: 60px;
  }
  .el-aside,
  .el-menu {
    background-color: #ECECEC;
  }
  .el-menu-vertical-demo{
    height: auto;
  }
</style>