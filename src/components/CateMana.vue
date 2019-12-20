<template>
  <el-container>
    <el-container>
      <el-header height="60px" style="background:#ececec;">
        <div>
          <el-input v-model="cata" placeholder="请输入栏目名称" style="width: 200px" ></el-input>
          <el-button type="primary" @click="add">新增栏目</el-button>
        </div>
      </el-header>
      <el-main height="100%" style="background:#ececec;">
        <div class="main">
          <el-table
          :data="tabledata.slice((currentpage-1)*pagesize,currentpage*pagesize)"
          style="width: 100%">

          <el-table-column
          type="index"
          :index="id"
          label="编号"
          width="180">
          </el-table-column>            
 

          <el-table-column
            prop="name"
            label="栏目名称"
            width="180">
            <template slot-scope="scope">
              <span v-if="showname[scope.$index+(currentpage-1)*pagesize]">{{ origintabledata[scope.$index+(currentpage-1)*pagesize].name }}</span>
              <el-input v-if="showinput[scope.$index+(currentpage-1)*pagesize]" v-model="origintabledata[scope.$index+(currentpage-1)*pagesize].name" placeholder="" style="width:50px;" size="mini"></el-input>
            </template>
          </el-table-column>

          
          <el-table-column
            prop="date"
            label="启用时间">
          </el-table-column>
          <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index+(currentpage-1)*pagesize)"
              v-if="showedit[scope.$index+(currentpage-1)*pagesize]">编辑</el-button>
            <el-button 
            type="warning" 
            @click="handleSave(scope.$index+(currentpage-1)*pagesize)"
            size="mini"
            v-if="showsave[scope.$index+(currentpage-1)*pagesize]">保存</el-button>
            
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index+(currentpage-1)*pagesize)">删除</el-button>
          </template>
          </el-table-column>
          </el-table>
        </div>
        <div class="page" style="display:flex;justify-content: center;">
          <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pagesize"
          :current-page="currentpage"
          @current-change="current_change"></el-pagination>
        </div>

      </el-main>
    </el-container>
  </el-container>
  
</template>

<script>
import { getRequest, postRequest } from '../api'

export default {
    name:'CateMana',
    data: function(){
      return {
        cata: '',
        tabledata:[],
        origintabledata:[],
        total: 1,
        pagesize: 12,
        currentpage: 1,
        tablelengthwatch: null,
        showname:[],
        showedit:[],
        showinput:[],
        showsave:[],
      }
    },
    watch:{
      origintabledata(){
        if(this.origintabledata.length > this.tablelengthwatch){
          this.showname.push(true)
          this.showedit.push(true)
          this.showinput.push(false)
          this.showsave.push(false)
          this.tablelengthwatch = this.origintabledata.length
        }
        if(this.origintabledata.length < this.tablelengthwatch){
          this.showname.pop()
          this.showedit.pop()
          this.showinput.pop()
          this.showsave.pop()    
          this.tablelengthwatch = this.origintabledata.length      
        }
      },
    },
    created(){
      getRequest('http://127.0.0.1:3000/api/catadata').then(
        data => {
          this.origintabledata = data
          this.tabledata = this.origintabledata
          this.total = this.origintabledata.length
          this.tablelengthwatch = this.origintabledata.length
          for(let i=0;i<this.origintabledata.length;i++){
            this.showname.push(true)
            this.showedit.push(true)
            this.showinput.push(false)
            this.showsave.push(false)
          }
        }
      )
    },
    methods:{
      add(){
        let data = {}
        data.name = this.cata
        data.date = String(new Date())
        postRequest('http://127.0.0.1:3000/api/addcata',data).then(
          res => {
            if(res.status == 200 && res.request.readyState == 4){
              this.origintabledata.push(data)
              this.total = this.origintabledata.length
            }
          }
        )
      },
      id(index){
        return index + 1 + (this.currentpage-1)*this.pagesize
      },
      handleEdit(index){
        this.$set(this.showname,index,false)
        this.$set(this.showinput,index,true)
        this.$set(this.showedit,index,false)
        this.$set(this.showsave,index,true)
      },
      handleSave(index){
        let data = this.origintabledata[index]
        data.date = String(new Date())
        postRequest('http://127.0.0.1:3000/api/editcata',data).then(
          res => {
            if(res.status == 200 && res.request.readyState == 4){
              this.$set(this.showname,index,true)
              this.$set(this.showinput,index,false)
              this.$set(this.showedit,index,true)
              this.$set(this.showsave,index,false)
            }
          }
        )        
      },
      handleDelete(index){
        let data = this.origintabledata[index]
        postRequest('http://127.0.0.1:3000/api/deletecata',data).then(
          res => {
            if(res.status == 200 && res.request.readyState == 4){
              this.origintabledata.splice(index,1)
              this.total = this.origintabledata.length
              if(this.total%this.pagesize == 0){
                if(this.currentpage == 1){
                  return
                }else{
                  this.currentpage -= 1
                }
              }              
            }
          }
        )
      },
      current_change(currentPage){
        this.currentpage = currentPage
      },
    }
}
</script>

<style scoped>
  .el-header{
    display: flex;
    align-items: center;
    margin-top: 10px; 
  }
  .el-main{
    margin-top: 10px
  }
  .main{
    width: 100%;
    height: 700px;
  }
</style>