(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/set/set"],{"11aa":function(t,e,a){"use strict";a("a8bc");var n=s(a("b0ce")),i=s(a("48f3"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},"33a2":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{userInfo:{nickname:"未设置",mobile:"未绑定",head_img:"../../../static/head-no-pic.png",vip_name:"普通会员",is_validate:0,realname:"",telphone:"000-00000000"},version:plus.runtime.version}},onLoad:function(){},onShow:function(){this.getUserInfoData()},onShareAppMessage:function(){return{title:this.webshareTitle,path:"/pages/tabBar/index/index"}},onBackPress:function(){t.switchTab({url:"/pages/tabBar/user/user"})},onNavigationBarButtonTap:function(t){},methods:{getUserInfoData:function(){var e=this,a=this.$store.state.openid,n=this.$store.state.sessionKey;try{this.$http.post(this.websiteUrl+"/api/api/getUserInfoData",{openid:a,sessionKey:n},function(t){1==t.data.code&&(e.userInfo=t.data.result.userInfo)})}catch(i){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}},goDetailPage:function(e){t.navigateTo({url:e})},makePhoneCall:function(){t.makePhoneCall({phoneNumber:this.userInfo.telphone,success:function(){console.log("成功拨打电话")}})},logoutUser:function(){this.$store.commit("logout"),t.reLaunch({url:"/pages/tabBar/index/index"})},checkVersion:function(){plus.screen.lockOrientation("portrait-primary");var e=this.websiteUrl+"/api/update/api",a={appid:plus.runtime.appid,version:plus.runtime.version,imei:plus.device.imei};t.request({url:e,data:a,success:function(e){if(console.log("success",e),200==e.statusCode&&1==e.data.code&&e.data.result.isUpdate){var a="iOS"===plus.os.name?e.data.result.iOS:e.data.result.Android;t.showModal({title:"更新提示",content:e.data.result.content?e.data.result.content:"是否选择更新",success:function(t){t.confirm&&plus.runtime.openURL(a)}})}else t.showModal({content:"当前是最新版本",showCancel:!1})}})}}};e.default=a}).call(this,a("649d")["default"])},"3e6a":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("view",{staticClass:"uni-padding-wrap"},[a("view",{staticClass:"uni-card by-card"},[a("view",{staticClass:"uni-card-content"},[a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"f1c97420-0"},on:{click:function(e){t.goDetailPage("/pages/user/set/getpass?mobile="+t.userInfo.mobile)}}},[t._v("修改登录密码")])]),a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"f1c97420-1"},on:{click:function(e){t.goDetailPage("/pages/index/about/about")}}},[t._v("关于我们")])]),a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"f1c97420-2"},on:{click:function(e){t.goDetailPage("/platforms/app-plus/feedback/feedback")}}},[t._v("问题反馈")])]),a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate uni-navigate-right bb0",staticStyle:{"border-bottom":"0"},attrs:{eventid:"f1c97420-3"},on:{tap:t.makePhoneCall}},[t._v("客服电话"),a("text",{staticClass:"uni-list-cell-left by-sdh"},[t._v(t._s(t.userInfo.telphone))])])])])]),a("view",{staticClass:"uni-card by-card by-mt-30"},[a("view",{staticClass:"uni-card-content"},[a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate uni-navigate-right bb0",attrs:{eventid:"f1c97420-4"},on:{tap:t.checkVersion}},[t._v("当前版本"),a("text",{staticClass:"uni-list-cell-left by-sdh"},[t._v(t._s(t.version))])])])])]),a("view",{staticClass:"uni-common-mt"},[a("button",{staticClass:"by-button-submit",attrs:{type:"warn",eventid:"f1c97420-5"},on:{click:t.logoutUser}},[t._v("退出登录")])],1)])])},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},"48f3":function(t,e,a){"use strict";a.r(e);var n=a("3e6a"),i=a("5bf6");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("8f72");var o=a("2877"),c=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},"5bf6":function(t,e,a){"use strict";a.r(e);var n=a("33a2"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},"8f72":function(t,e,a){"use strict";var n=a("eed0"),i=a.n(n);i.a},eed0:function(t,e,a){}},[["11aa","common/runtime","common/vendor"]]]);