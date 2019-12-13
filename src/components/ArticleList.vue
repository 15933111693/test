<template>
<el-container class="articlelist">
    <el-main>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="全部文章" name="all">
                <BlogTable :showEdit="false" :showDelete="false" :showRestore="false" state="allArticles"/>
            </el-tab-pane>
            <el-tab-pane label="已发表" name="second">
                <BlogTable :showEdit="true" :showDelete="true" :showRestore="false" state="pulished"/>
            </el-tab-pane>
            <el-tab-pane label="草稿箱" name="third">
                <BlogTable :showEdit="true" :showDelete="true" :showRestore="false" state="drafts"/>
            </el-tab-pane>
            <el-tab-pane label="回收站" name="fourth">
                <BlogTable :showEdit="false" :showDelete="true" :showRestore="true" state="recycleBin"/>
            </el-tab-pane>
            <el-tab-pane label="博客配置" name="fifth"></el-tab-pane>
        </el-tabs>
    </el-main>
</el-container>
  
</template>
<script>
import BlogTable from './BlogTable'
  
export default {
    name: 'ArticleList',
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
    //   handleClick(tab, event) {
    //     console.log(tab, event);
    //   }
    },
    components:{
        BlogTable,

    }
  };
</script>

<style>
    .articlelist{
        margin-top: 10px;
    }
</style>