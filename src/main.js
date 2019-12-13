import Vue from 'vue'
import App from './App.vue'
import router from './route/index.js'
// import {Button, Form, FormItem, Input, Col, Row, Container, Header, Main, Aside, Menu, MenuItem, MenuItemGroup, Submenu, Breadcrumb, BreadcrumbItem} from 'element-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
// Vue.use(Button)
// .use(Form)
// .use(Input)
// .use(FormItem)
// .use(Col)
// .use(Row)
// .use(Header)
// .use(Main)
// .use(Aside)
// .use(Container)
// .use(Menu)
// .use(MenuItem)
// .use(MenuItemGroup)
// .use(Submenu)
// .use(Breadcrumb)
// .use(BreadcrumbItem)

Vue.use(ElementUI)

// router.beforeEach((to, from, next) => {
//   console.log(to, from)
//   if(to.fullPath == '/user'){
//     // router.push('')
//     next('')
//   }
//   next()
// })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
