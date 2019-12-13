<template>
  <div>
    <div style="display: flex;justify-content: flex-start">
        <el-input
            placeholder="通过标题搜索该分类下的博客..."
            prefix-icon="el-icon-search"
            style="width: 400px" size="mini"
            v-model="filtercontent">
        </el-input>

        <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 3px" @click="searchClick">搜索
        </el-button>
    </div>
    
    <div>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="date"
                label="最近编辑时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="author"
                label="作者">
            </el-table-column>
            <el-table-column
                prop="classify"
                label="所属分类"
                >
            </el-table-column>
            <el-table-column label="操作" v-if=" showEdit || showDelete || showRestore">
                
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.$index)" v-if="showEdit">编辑</el-button>
                    <el-button type="warning" size="mini" v-if="showRestore" @click="restore(scope.$index)">还原</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="deleteArticle(scope.$index)" v-if="showDelete">删除</el-button>
                </template>
                
            </el-table-column>
            
        </el-table>
        
    </div>

    <div class="page">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pagesize"
            :total="total"
            :current-page="currentPage"
            @current-change="current_change"
            >
        </el-pagination>
    </div>
  </div>
</template>

<script>
import store from '../store'
import axios from 'axios'
import { getRequest, postRequest } from '../api'

export default {
    name:'BlogTable',
    data() {
        return {
            total:1000,
            pagesize:9,
            currentPage:1,
            originTableData: [],
            tableData:'',
            filtercontent:'',

        }
      },
    created:function(){
        const _this = this
        function getarticledata(url,path){
            return getRequest(url).then(data => {
                store[path] = data
                _this.originTableData = store[path]
                _this.tableData = _this.originTableData
                _this.total = _this.tableData.length
            })
        }

        switch (this.state){
            case 'allArticles':
                axios.all([
                    axios.get('http://127.0.0.1:3000/api/pulished'),
                    axios.get('http://127.0.0.1:3000/api/drafts')
                ]).then(data => {
                    let d0 = data[0].data
                    let d1 = data[1].data
                    store.allArticles.push(...d0)
                    store.allArticles.push(...d1)
                    this.originTableData = store.allArticles
                    this.tableData = this.originTableData
                    this.total = this.tableData.length 
                })
                
                break
            case 'pulished':
                getarticledata('http://127.0.0.1:3000/api/pulished','pulished')
                break
            case 'drafts':
                getarticledata('http://127.0.0.1:3000/api/drafts','drafts')
                break
            case 'recycleBin':
                getarticledata('http://127.0.0.1:3000/api/recyclebin','recycleBin')
                break
        }
        
        this.tableData = this.originTableData
        this.total = this.tableData.length
    },
    computed:{
        // tableData: function(){
        //     if(this.filtercontent == ''){
        //         return this.originTableData
        //     }else{
        //         const patt = new RegExp(this.filtercontent)
        //         return this.originTableData.filter( i => patt.test(i.date))
        //     }
        // },
        
    },
    methods:{
        edit(index){
            // this.$router.push({path: 'getarticle', query: {from: this.state}})
            
            const currentIndex = (this.currentPage-1) * 9 + index
            if(this.state == 'pulished'){
                store.edit.push(store.pulished[currentIndex])                
            }
            if(this.state == 'drafts'){
                store.edit.push(store.drafts[currentIndex])                
            }
            this.$router.push({path: 'postarticle', query: {from: this.state}})
            // this.$router.push({path: 'postarticle'})
        },
        deleteArticle(index){
            const currentIndex = (this.currentPage-1) * 9 + index
            switch (this.state){
                case 'recycleBin':
                    postRequest('http://127.0.0.1:3000/api/deletedata',this.originTableData[currentIndex])
                    .then(res => {
                        if(res.status == 200 && res.request.readyState == 4){
                            store.recycleBin.splice(currentIndex,1)
                        }
                    })                    
                    break
                case 'pulished':
                    this.originTableData[currentIndex].origin = 'pulished'
                    postRequest('http://127.0.0.1:3000/api/pulishedrecylebin',this.originTableData[currentIndex])
                    .then(res => {
                        if(res.status == 200 && res.request.readyState == 4){
                            store.recycleBin.push(this.originTableData[currentIndex])
                            store.allArticles.forEach((item,index) => {
                                if(item._id == this.originTableData[currentIndex]._id){
                                    store.allArticles.splice(index,1)
                                }
                            })
                            this.originTableData.splice(currentIndex,1)
                        }
                    })
                    break
                case 'drafts':
                    this.originTableData[currentIndex].origin = 'drafts'
                    postRequest('http://127.0.0.1:3000/api/draftsrecylebin',this.originTableData[currentIndex])
                    .then(res => {
                        if(res.status == 200 && res.request.readyState == 4){
                            store.recycleBin.push(this.originTableData[currentIndex])
                            store.allArticles.forEach((item,index) => {
                                if(item._id == this.originTableData[currentIndex]._id){
                                    store.allArticles.splice(index,1)
                                }
                            })                            
                            this.originTableData.splice(currentIndex,1)
                        }
                    })
                    break
            }
            
            

            this.total = this.tableData.length
            if(this.total % this.pagesize == 0){
                if(this.currentPage == 1){
                    return
                }else{
                    this.currentPage -= 1
                }
            }

        },
        restore(index){
            const currentIndex = (this.currentPage-1) * 9 + index
            if(this.state == 'recycleBin'){
                let data = JSON.parse(JSON.stringify(this.originTableData[currentIndex])) 
                if(data.origin == 'drafts'){
                    (async function(){
                        
                        await postRequest('http://127.0.0.1:3000/api/savedrafts',data).then((res) => {
                            if(res.status == 200 && res.request.readyState == 4){
                                store.drafts.push(data)
                                store.allArticles.push(data)
                            }
                        })

                        await postRequest('http://127.0.0.1:3000/api/deletedata',data).then(res => {
                            if(res.status == 200 && res.request.readyState == 4){
                                store.recycleBin.splice(currentIndex,1)
                            }
                        })


                    })()
                }
                if(data.origin == 'pulished'){
                    (async function(){
                        
                        await postRequest('http://127.0.0.1:3000/api/postarticle',data).then((res) => {
                            if(res.status == 200 && res.request.readyState == 4){
                                store.pulished.push(data)
                                store.allArticles.push(data)
                            }
                        })

                        await postRequest('http://127.0.0.1:3000/api/deletedata',data).then(res => {
                            if(res.status == 200 && res.request.readyState == 4){
                                store.recycleBin.splice(currentIndex,1)
                            }
                        })


                    })()
                }
            }

            this.total = this.tableData.length
            if(this.total % this.pagesize == 0){
                if(this.currentPage == 1){
                    return
                }else{
                    this.currentPage -= 1
                }
            }
        },
        searchClick(){
            if(this.filtercontent == ''){
                this.tableData = this.originTableData
                return
            }else{
                const patt = new RegExp(this.filtercontent)
                this.tableData = this.originTableData.filter( i => patt.test(i.title))
                return
            }
        },
        current_change(currentPage){
            this.currentPage = currentPage
        }
    },
    props:['state', 'showEdit', 'showDelete', 'showRestore', 'activeName']
}
</script>

<style>
    .page{
        display: flex;
        justify-content: center;
    }
</style>