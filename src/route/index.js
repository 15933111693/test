import Vue from 'vue'
import Router from 'vue-router'


import Login from '../components/Login'
import Home from '../components/Home'
import ArticleList from '../components/ArticleList'
import CateMana from '../components/CateMana'
import Charts from '../components/Charts'
import PostArticle from '../components/PostArticle'
import User from '../components/User'
import error from '../components/Error'



Vue.use(Router)
const homeChild = [
    {path:'/articleList',component: ArticleList,name:'文章列表'},
    {path:'/postarticle',component: PostArticle,name:'发表文章'},
    {path:'/user',component: User,name:'用户管理'},
    {path:'/catamana',component: CateMana,name:'栏目管理'},
    {path:'/charts',component: Charts,name:'数据统计'},
]   

const routes = [
    {path: '/',component: Login,},
    {path: '/home',component: Home,children: homeChild,},
    {path: '*',component: error,}
] 

export default new Router ({
    mode: 'history',
    routes: routes,
})