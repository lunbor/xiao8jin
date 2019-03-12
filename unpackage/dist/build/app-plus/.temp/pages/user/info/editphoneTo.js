require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([20],{72:function(t,e,s){"use strict";var i=o(s(2)),n=o(s(73));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},73:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(75),n=s.n(i),o=s(76);var a=function(t){s(74)},l=s(0)(n.a,o.a,a,null,null);e.default=l.exports},74:function(t,e){},75:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{inputClearValue:"发送验证码",mobile:"",loading:!1,is_sms:!0,Loop:"",downtime:60,verifyCode:"",smsCode:""}},onLoad:function(e){e.mobile?this.mobile=e.mobile:t.navigateTo({url:"/pages/user/info/info"})},onShow:function(){},onShareAppMessage:function(){return{title:this.webshareTitle,path:"/pages/tabBar/index/index"}},methods:{verification:function(e){var s=this.$store.state.openid,i=this.$store.state.sessionKey,n=this.verifyCode,o=this.smsCode,a=this;try{if(this.loading)return;this.loading=!0,this.$http.post(this.websiteUrl+"/api/api/verification",{openid:s,sessionKey:i,verifyCode:n,smsCode:o},function(e){1==e.data.code?t.navigateTo({url:"/pages/user/info/editPhoneToyz?toverifyCode="+e.data.result}):t.showModal({content:e.data.msg,showCancel:!1,success:function(){a.loading=!1}})})}catch(e){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1,success:function(){a.loading=!1}})}},sendSMS:function(e){var s=this;if(this.is_sms){this.is_sms=!1;var i=this.$store.state.openid,n=this.$store.state.sessionKey;try{this.$http.post(this.websiteUrl+"/api/api/sendSMS",{openid:i,sessionKey:n,is_user:1},function(e){1==e.data.code?(s.downtime=60,s.dateDown(),s.verifyCode=e.data.result):(t.showModal({content:e.data.msg,showCancel:!1}),s.is_sms=!0)})}catch(e){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1}),this.is_sms=!0}}},dateDown:function(){var t=this;this.inputClearValue="重新发送("+this.downtime+")",this.Loop=setInterval(function(){if(0==t.downtime)return t.inputClearValue="发送验证码",t.is_sms=!0,void clearInterval(t.Loop);t.downtime--,t.inputClearValue="重新发送("+this.downtime+")"}.bind(this),1e3),this.is_sms&&clearInterval(this.Loop)},setNickname:function(){var e=this.$store.state.openid,s=this.$store.state.sessionKey,i=this.inputClearValue;if(""!=i)try{if(this.loading)return;this.loading=!0;var n=this;this.$http.post(this.websiteUrl+"/api/api/setNickname",{openid:e,sessionKey:s,nickname:i},function(e){t.showToast({title:e.data.msg,success:function(){n.loading=!1}})})}catch(e){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1}),this.loading=!1}else t.showModal({content:"请填写昵称",showCancel:!1})}}}}).call(e,s(1).default)},76:function(t,e,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("view",{staticClass:"by-bg-title"},[t._v("验证码将发送至"+t._s(t.mobile))]),s("view",{staticClass:"uni-padding-wrap"},[s("view",{staticClass:"uni-card by-card"},[s("view",{staticClass:"uni-card-content"},[s("view",{staticClass:"uni-form-item uni-column"},[s("view",{staticClass:"with-fun"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.smsCode,expression:"smsCode"}],staticClass:"uni-input",attrs:{type:"number",placeholder:"请填入验证码",eventid:"jXM-0"},domProps:{value:t.smsCode},on:{input:function(e){e.target.composing||(t.smsCode=e.target.value)}}}),s("view",{staticClass:"text by-dj-btn",class:t.is_sms?"":"active",attrs:{eventid:"Fo8-1"},on:{click:t.sendSMS}},[t._v(t._s(t.inputClearValue))])])])])]),s("view",{staticClass:"uni-common-mt"},[s("button",{staticClass:"by-button-submit",attrs:{type:"warn",loading:t.loading,eventid:"Z8J-2"},on:{click:t.verification}},[t._v("下一步")])],1)])])},staticRenderFns:[]};e.a=i}},[72]);