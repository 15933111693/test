<template>
  <el-container>
    <el-container class="main">
      <el-header height="">
        <el-select v-model="article.classify"  placeholder="请选择文章栏目" style="width: 150px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="article.title" placeholder="请输入标题..." style="width: 400px;"></el-input>
        <el-input v-model="article.author" placeholder="作者名称" style="width: 100px;"></el-input>
        
        <div class="subhead">
          <el-tag
          style="margin:4px;"
          :key="tag"
          v-for="tag in tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="subhead"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
        
      </el-header>
      <el-main height="">
        <div class="editor">
          <mavon-editor ref=md v-model="article.contenttext"/>
          <div class="ed-input">
            <el-button @click="cancelbtn" v-if="showabandonbtn">放弃修改</el-button>
            <el-button @click="savearticle" v-if="showdraftsbtn">保存到草稿箱</el-button>
            <el-button type="primary" @click="pulished" v-if="showpulishedbtn">发表文章</el-button>
          
          </div>
        </div>
        
      </el-main>
    </el-container>
  </el-container>
  
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from '../store'
import {postRequest} from '../api'

export default {
    name:'PostArticle',
    data(){
      return {
        options: [],
        value: '',
        article: {},
        tags:[],
        inputVisible: false,
        subhead:'',
        status:'new',
        showabandonbtn:false,
        showdraftsbtn:true,
        showpulishedbtn:true,
      }
    },
    methods:{
      handleClose(tag){
        this.tags.splice(this.tags.indexOf(tag), 1)
      },
      handleInputConfirm(){
        if (this.subhead) {
          this.tags.push(this.subhead);
        }
        this.inputVisible = false;
        this.subhead = '';
      },
      showInput(){
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      savearticle(){
        this.article.date = String(new Date())
        const newarticle = JSON.parse(JSON.stringify(this.article))
        if(this.status == 'new'){
          postRequest('http://127.0.0.1:3000/api/savedrafts',newarticle).then((res) => {
            if(res.status == 200 && res.request.readyState == 4){
              store.drafts.push(newarticle)
              store.allArticles.push(newarticle)
              this.$message('保存成功')
            }
          })
        }
        if(this.status == 'old'){
          this.status = 'new'
          postRequest('http://127.0.0.1:3000/api/revisedrafts',newarticle)
          .then(res => {
            if(res.status == 200 && res.request.readyState == 4){
              for(let i of store.drafts){
                if(i._id == newarticle._id){
                  Object.assign(i,newarticle)
                }
              }
              
              for(let i of store.allArticles){
                if(i._id == newarticle._id){
                  Object.assign(i,newarticle)
                }
              }

              this.$message('修改成功')
            }
          })
        }
        
      },
      pulished(){
        this.article.date = String(new Date())
        const newarticle = JSON.parse(JSON.stringify(this.article))
        if(this.status == 'new'){
          postRequest('http://127.0.0.1:3000/api/postarticle',newarticle).then((res) => {
            if(res.status == 200 && res.request.readyState == 4){
              store.pulished.push(newarticle)
              store.allArticles.push(newarticle)
              this.$message('发表成功')
            }
          })
        }
        
        if(this.status == 'old'){
          this.status = 'new'
          postRequest('http://127.0.0.1:3000/api/revisepulished',newarticle)
          .then(res => {
            if(res.status == 200 && res.request.readyState == 4){
              for(let i of store.pulished){
                if(i._id == newarticle._id){
                  Object.assign(i,newarticle)
                }
              }
              
              for(let i of store.allArticles){
                if(i._id == newarticle._id){
                  Object.assign(i,newarticle)
                }
              }

              this.$message('修改成功')
            }
          })          
        }
      },
      cancelbtn(){
        this.$router.go(-1)
      }
    },
    beforeRouteEnter (to,from,next) {
      next((vm) => {
        if(store.edit.length != 0){
          let editarticle = store.edit.pop()
          vm.status = 'old'
          vm.article = JSON.parse(JSON.stringify(editarticle))
        }
        if(to.query.from == 'pulished'){
          vm.showabandonbtn = true
          vm.showdraftsbtn = false
        }
        if(to.query.from == 'drafts'){
          vm.showabandonbtn = true
          vm.showpulishedbtn = false
        }        
      })
    },
    beforeRouteLeave (to, from, next) {
      this.status = 'new'
      this.showabandonbtn = false
      this.showdraftsbtn = true
      this.showpulishedbtn = true
      next()
    },
    components:{ mavonEditor }
}
</script>

<style scoped>
  .main{
    margin: 10px
  }
  .el-header{
    background-color: #ececec;
    margin-top: 0px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }
  .el-select,.el-input{
    margin: 10px;
  }
  .el-tag + .el-tag {
    margin: 10px;
  }
  .button-new-tag {
    margin: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin: 10px;
    vertical-align: bottom;
  }

  .el-main{
    background-color: #ececec;
    margin-top: 0px;
    padding-left: 5px;
    display: flex;
  }
  .ed-input{
    float: right;
    /* justify-content: center; */
  }
  .subhead{
    margin: 10px;
    height: 40px;
  }
  .subhead .el-tag,.subhead .el-input,.subhead .el-button{
    margin: 4px
  }

</style>