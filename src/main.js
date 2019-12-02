import Vue from 'vue'
import App from './App.vue'
import {Button, Card, Progress} from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(Button).use(Card).use(Progress)

new Vue({
  render: h => h(App),
}).$mount('#app')
