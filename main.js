import Vue from 'vue'
import App from './App'

import store from './store'

import http from './http'

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.$http = http;

//Vue.prototype.websiteUrl = 'http://xiao8jin.tw186.com'
Vue.prototype.websiteUrl = 'http://h5.guanjia.com'

//Vue.prototype.shareUrl = 'http://h5xiao8jin.tw186.com'
Vue.prototype.shareUrl = 'http://h5.guanjia.com'

Vue.prototype.webshareTitle = '小8金管家-信用卡一族至爱。资金即时结算，代还、周转必备APP。'

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
