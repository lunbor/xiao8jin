(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-account-accountDetail"],{1463:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{get_id:"",accountDetail:[]}},computed:{},onLoad:function(t){t.get_id?this.get_id=t.get_id:uni.navigateTo({url:"/pages/user/account/account"})},onShow:function(){this.getAccountDetail()},onBackPress:function(){},methods:{getAccountDetail:function(){var t=this,e=this.$store.state.openid,i=this.$store.state.sessionKey,a=this.get_id;try{this.$http.post(this.websiteUrl+"/api/api/getAccountDetail",{openid:e,sessionKey:i,get_id:a},function(e){1==e.data.code?t.accountDetail=e.data.result.accountDetail:uni.showModal({content:e.data.msg,showCancel:!1})})}catch(n){uni.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}}}};e.default=a},"4f95":function(t,e,i){"use strict";var a=i("9761"),n=i.n(a);n.a},6205:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"contentbg"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"list contentbg by-mb-30"},[i("v-uni-view",{staticClass:"list-item pd20"},[i("v-uni-view",{staticClass:"list-time font-sg"},[t._v("支付通道:"),i("v-uni-text",[t._v(t._s(t.accountDetail.title))])],1),i("v-uni-view",{staticClass:"list-time font-sg"},[t._v("提交时间:"),i("v-uni-text",[t._v(t._s(t.accountDetail.ctime))])],1),i("v-uni-view",{staticClass:"list-order font-sg"},[t._v("交易单号:"),i("v-uni-text",[t._v(t._s(t.accountDetail.order_no))])],1),i("v-uni-view",{staticClass:"list-order font-sg"},[t._v("付款账户:"),i("v-uni-text",[t._v(t._s(t.accountDetail.credit_code))])],1),i("v-uni-view",{staticClass:"list-order font-sg"},[t._v("收款账户:"),i("v-uni-text",[t._v(t._s(t.accountDetail.bank_card))])],1),i("v-uni-view",{staticClass:"list-time font-sg"},[t._v("交易备注:"),i("v-uni-text",{staticClass:"red-text"},[t._v(t._s(t.accountDetail.dscInc))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"content pt30"},[i("v-uni-view",{staticClass:"list contentbg"},[i("v-uni-view",{staticClass:"uni-flex uni-row repay-fee",staticStyle:{"justify-content":"space-between"}},[i("v-uni-view",{staticClass:"text uni-list-cell-left"},[t._v("收款金额")]),i("v-uni-view",{staticClass:"text uni-list-cell-left red-text"},[t._v("￥"+t._s(t.accountDetail.money))])],1),i("v-uni-view",{staticClass:"uni-flex uni-row repay-fee",staticStyle:{"justify-content":"space-between"}},[i("v-uni-view",{staticClass:"text uni-list-cell-left"},[t._v("手续费")]),i("v-uni-view",{staticClass:"text uni-list-cell-left"},[t._v("￥"+t._s(t.accountDetail.fee))])],1),i("v-uni-view",{staticClass:"uni-flex uni-row repay-fee",staticStyle:{"justify-content":"space-between"}},[i("v-uni-view",{staticClass:"text uni-list-cell-left"},[t._v("代付费")]),i("v-uni-view",{staticClass:"text uni-list-cell-left"},[t._v("￥"+t._s(t.accountDetail.mercfee))])],1)],1)],1)],1),i("v-uni-view",{staticClass:"uni-common-mt uni-padding-wrap uni-common-mb"},[i("v-uni-button",{attrs:{type:"warn",disabled:"true"}},[i("v-uni-text",[t._v(t._s(t.accountDetail.dsc))])],1)],1)],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"6c26":function(t,e,i){"use strict";i.r(e);var a=i("1463"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},9761:function(t,e,i){var a=i("9b76");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("ff802ca6",a,!0,{sourceMap:!1,shadowMode:!1})},"9b76":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-703dfc0a]{height:auto;min-height:100%;background-color:#f7f8fa}.pt30[data-v-703dfc0a]{padding-top:%?30?%}.pd20[data-v-703dfc0a]{padding:%?28?% %?30?% %?0?% %?30?%}.by-mb-30[data-v-703dfc0a]{margin-bottom:%?30?%}.content[data-v-703dfc0a]{background-color:#f7f8fa}.contentbg[data-v-703dfc0a]{background-color:#fff}.list-item .font-sg[data-v-703dfc0a]{line-height:%?80?%;font-weight:500;font-size:%?28?%}.red-text[data-v-703dfc0a]{color:#fd5950}.repay-fee[data-v-703dfc0a]{height:%?100?%;line-height:%?100?%;color:#576175;font-weight:600;border-bottom:%?2?% solid #ecedef}.repay-fee .uni-list-cell-left[data-v-703dfc0a]{height:%?100?%;line-height:%?100?%}.by-button-submit[data-v-703dfc0a]{background-color:#fd5950;background:-webkit-gradient(linear,left top,right top,from(#ff7575),to(#fd5950));background:-o-linear-gradient(left,#ff7575,#fd5950);background:linear-gradient(left,#ff7575,#fd5950)}body.?%PAGE?%[data-v-703dfc0a]{background-color:#f7f8fa}",""])},f180:function(t,e,i){"use strict";i.r(e);var a=i("6205"),n=i("6c26");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("4f95");var c=i("2877"),o=Object(c["a"])(n["default"],a["a"],a["b"],!1,null,"703dfc0a",null);e["default"]=o.exports}}]);