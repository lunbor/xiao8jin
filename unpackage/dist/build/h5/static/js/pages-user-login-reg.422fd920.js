(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-login-reg"],{"072d":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-1bba06a3]{height:auto;min-height:100%;background-color:#fff;color:#989898}.by-dj-btn[data-v-1bba06a3]{color:#666;border:%?2?% #d7d5d5 solid;padding:%?14?% %?20?%;height:%?30?%;line-height:%?30?%;border-radius:%?12?%;margin-top:%?10?%;margin-right:%?15?%}.by-dj-btn.active[data-v-1bba06a3]{-webkit-box-ordinal-group:3;-webkit-order:%?2?% #f7f8fa solid;-ms-flex-order:%?2?% #f7f8fa solid;order:%?2?% #f7f8fa solid;color:#d7d5d5}.uni-login-logo[data-v-1bba06a3]{text-align:center;height:%?390?%;vertical-align:middle}.uni-login-logo uni-image[data-v-1bba06a3]{width:%?350?%;height:%?225?%;margin:0 auto;margin-top:%?87?%}.uni-btn-v uni-button[data-v-1bba06a3]{background-color:#f44}.with-fun.by-login-input[data-v-1bba06a3]{border-bottom:%?2?% #ddd solid;height:%?110?%;line-height:%?110?%;font-size:%?32?%}.by-login-input .uni-input[data-v-1bba06a3]{height:%?60?%;line-height:%?60?%;font-size:%?32?%}.by-login-input uni-input[data-v-1bba06a3]{height:%?60?%;line-height:%?60?%;font-size:%?32?%}.clause[data-v-1bba06a3]{margin-top:%?127?%;text-align:center;color:#999;font-weight:500}.clause uni-text[data-v-1bba06a3]{color:#fe5950}body.?%PAGE?%[data-v-1bba06a3]{background-color:#fff}",""])},"083b":function(t,e,i){"use strict";i.r(e);var n=i("8c02"),a=i("a0d8");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("9fd5");var s=i("2877"),u=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"1bba06a3",null);e["default"]=u.exports},3434:function(t,e,i){var n=i("49ac");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("f34e3b30",n,!0,{sourceMap:!1,shadowMode:!1})},"49ac":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-mask[data-v-1aa7fde2]{position:fixed;z-index:998;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.3)}.uni-popup[data-v-1aa7fde2]{position:absolute;z-index:999;background-color:#fff;-webkit-box-shadow:0 0 %?30?% rgba(0,0,0,.1);box-shadow:0 0 %?30?% rgba(0,0,0,.1)}.uni-popup-middle[data-v-1aa7fde2]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:%?640?%;min-height:%?380?%;border-radius:%?30?%;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);overflow:hidden}.uni-popup-middle .title[data-v-1aa7fde2]{background-color:#f4f4f4;height:%?110?%;border-bottom:%?2?% solid #e1e1e1;width:100%;text-align:center;color:#595d68;line-height:%?110?%;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.uni-popup-middle .title .text[data-v-1aa7fde2]{line-height:%?110?%;font-size:%?32?%}.uni-popup-middle .uni-icon-closeempty[data-v-1aa7fde2]{line-height:%?110?%;font-size:%?82?%}.uni-popup-middle .by-content[data-v-1aa7fde2]{text-align:left;padding:%?20?%;color:#0f0f0f;overflow:scroll;max-height:%?500?%;min-height:%?80?%}.uni-popup-middle .by-button[data-v-1aa7fde2]{padding:%?25?% 0;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.uni-popup-middle .mini-btn[data-v-1aa7fde2]{width:%?248?%}.uni-popup-middle .quxiao-btn[data-v-1aa7fde2]{background:#fff;margin-right:%?10?%;color:#576175;border-color:#e1e1e1}.uni-popup-middle .queren-btn[data-v-1aa7fde2]{background:#fe5950;margin-left:%?10?%}.uni-popup-top[data-v-1aa7fde2]{top:0;left:0;width:100%;height:%?100?%;line-height:%?100?%;text-align:center}.uni-popup-bottom[data-v-1aa7fde2]{left:0;bottom:0;width:100%;padding:%?30?% %?0?%;text-align:center}",""])},"52db":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("a4ce"));function a(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{showPassword:!0,showClearIcon:!1,inputClearValue:"",loading:!1,popType:"middle",tiptitle:"提示",showPopupMiddle:!1,tipcontent:"",is_sms:!0,Loop:"",downtime:60,verifyCode:"",smsCode:"",fsbtn:"发送验证码"}},onLoad:function(){},onPullDownRefresh:function(){},onShareAppMessage:function(){return{title:this.webshareTitle,path:"/pages/tabBar/index/index"}},onNavigationBarButtonTap:function(t){},methods:{goDetailPage:function(t){uni.navigateTo({url:t})},hidePopup:function(){this.showPopupMiddle=!1,this.showPopupTop=!1,this.showPopupBottom=!1},showMiddlePopup:function(){this.hidePopup(),this.popType="middle",this.showPopupMiddle=!0},changePassword:function(){this.showPassword=!this.showPassword},bindClearInput:function(t){this.inputClearValue=t.target.value,t.target.value.length>0?this.showClearIcon=!0:this.showClearIcon=!1},clearIcon:function(){this.inputClearValue="",this.showClearIcon=!1},formSubmit:function(t){var e=this,i=t.detail.value.account,n=t.detail.value.password,a=t.detail.value.smsCode,o=this.verifyCode,s=uni.getStorageSync("shareId"),u=uni.getStorageSync("agentId"),l=uni.getStorageSync("qdId");if(""===i)return uni.showModal({content:"请填写手机号",showCancel:!1}),!1;if(""===a)return uni.showModal({content:"请填写验证码",showCancel:!1}),!1;if(""===o)return uni.showModal({content:"请先获取验证码",showCancel:!1}),!1;if(""===n)return uni.showModal({content:"请填写6~18位字符新密码",showCancel:!1}),!1;var d=this;try{this.$http.post(this.websiteUrl+"/api/api/reg",{phone:i,password:n,smsCode:a,verifyCode:o,shareId:s,agentId:u,qdId:l},function(t){1==t.data.code?uni.showModal({content:t.data.msg,showCancel:!1,success:function(){e.$store.dispatch("apiLogin",{openid:t.data.result.token,sessionKey:t.data.result.session_id}),uni.switchTab({url:"/pages/tabBar/user/user"})}}):uni.showModal({content:t.data.msg,showCancel:!1,success:function(){d.loading=!1}})})}catch(t){uni.showModal({content:"网络异常,请稍后重试...",showCancel:!1,success:function(){d.loading=!1}})}},getClause:function(){var t=this;try{this.$http.post(this.websiteUrl+"/api/api/getClause",{},function(e){1==e.data.code?(t.tiptitle="隐私条款",t.tipcontent=e.data.result.article.content.replace(/\\/g,"").replace(/<img/g,'<img style="display:none;"'),t.showMiddlePopup()):uni.showModal({content:e.data.msg,showCancel:!1})})}catch(e){uni.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}},sendSMS:function(t){var e=this;if(this.is_sms){this.is_sms=!1;var i=this.inputClearValue;if(""===i)return uni.showModal({content:"请填写手机号",showCancel:!1}),!1;try{this.$http.post(this.websiteUrl+"/api/api/sendSMS",{phone:i},function(t){1==t.data.code?(e.downtime=60,e.dateDown(),e.verifyCode=t.data.result):(uni.showModal({content:t.data.msg,showCancel:!1}),e.is_sms=!0)})}catch(t){uni.showModal({content:"网络异常,请稍后重试...",showCancel:!1}),this.is_sms=!0}}},dateDown:function(){var t=this;this.fsbtn="重新发送("+this.downtime+")",this.Loop=setInterval(function(){if(0==t.downtime)return t.fsbtn="发送验证码",t.is_sms=!0,void clearInterval(t.Loop);t.downtime--,t.fsbtn="重新发送("+this.downtime+")"}.bind(this),1e3),this.is_sms&&clearInterval(this.Loop)}},components:{uniPopup:n.default}};e.default=o},7032:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"uni-mask",style:{top:t.offsetTop+"px"},on:{click:function(e){e=t.$handleEvent(e),t.hide(e)}}}),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],class:["uni-popup","uni-popup-"+t.type]},[i("v-uni-view",{staticClass:"title uni-flex uni-row"},[i("v-uni-view",{staticClass:"text",staticStyle:{width:"80upx"}}),i("v-uni-view",{staticClass:"text",staticStyle:{flex:"1"}},[t._v(t._s(t.title))]),i("v-uni-view",{staticClass:"text",staticStyle:{width:"80upx"},on:{click:function(e){e=t.$handleEvent(e),t.hide(e)}}},[i("v-uni-text",{staticClass:"uni-icon uni-icon-closeempty"})],1)],1),i("v-uni-view",{staticClass:"by-content"},[t._v(t._s(t.msg)),t._t("default")],2),t.queren?i("v-uni-view",{staticClass:"by-button uni-flex uni-row"},[t.quxiao?i("v-uni-view",{staticClass:"text",on:{click:function(e){e=t.$handleEvent(e),t.hide(e)}}},[i("v-uni-button",{staticClass:"mini-btn quxiao-btn",attrs:{type:"warn"}},[t._v("取消")])],1):t._e(),t.queren?i("v-uni-view",{staticClass:"text",on:{click:function(e){e=t.$handleEvent(e),t.hide(e)}}},[i("v-uni-button",{staticClass:"mini-btn queren-btn",attrs:{type:"warn"}},[t._v("确定")])],1):t._e()],1):t._e()],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"8c02":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-common-pb"},[i("v-uni-view",{staticClass:"uni-login-logo"},[i("v-uni-image",{attrs:{src:"../../../static/login-logo.png"}})],1),i("v-uni-view",{staticClass:"uni-padding-wrap"},[i("v-uni-form",{on:{submit:function(e){e=t.$handleEvent(e),t.formSubmit(e)}}},[i("v-uni-view",{staticClass:"uni-form-item uni-column"},[i("v-uni-view",{staticClass:"with-fun by-login-input"},[i("v-uni-input",{staticClass:"uni-input",attrs:{type:"number",name:"account",placeholder:"请填写手机号",value:t.inputClearValue},on:{input:function(e){e=t.$handleEvent(e),t.bindClearInput(e)}}}),t.showClearIcon?i("v-uni-view",{staticClass:"uni-icon uni-icon-clear",on:{click:function(e){e=t.$handleEvent(e),t.clearIcon(e)}}}):t._e()],1)],1),i("v-uni-view",{staticClass:"uni-form-item uni-column"},[i("v-uni-view",{staticClass:"with-fun by-login-input"},[i("v-uni-input",{staticClass:"uni-input",attrs:{type:"number",name:"smsCode",placeholder:"请填入验证码"},model:{value:t.smsCode,callback:function(e){t.smsCode=e},expression:"smsCode"}}),i("v-uni-view",{staticClass:"text by-dj-btn",class:t.is_sms?"":"active",on:{click:function(e){e=t.$handleEvent(e),t.sendSMS(e)}}},[t._v(t._s(t.fsbtn))])],1)],1),i("v-uni-view",{staticClass:"uni-form-item uni-column"},[i("v-uni-view",{staticClass:"with-fun by-login-input"},[i("v-uni-input",{staticClass:"uni-input",attrs:{placeholder:"请填写6~18位字符密码",name:"password",password:t.showPassword}}),i("v-uni-view",{staticClass:"uni-icon uni-icon-eye",class:[t.showPassword?"":"uni-active"],on:{click:function(e){e=t.$handleEvent(e),t.changePassword(e)}}})],1)],1),i("v-uni-view",{staticClass:"uni-btn-v"},[i("v-uni-button",{attrs:{formType:"submit",loading:t.loading,type:"warn"}},[t._v("注 册")])],1),i("v-uni-view",{staticClass:"text clause"},[t._v("点击注册即表示您同意"),i("v-uni-text",{on:{click:function(e){e=t.$handleEvent(e),t.getClause(e)}}},[t._v("《隐私条例和服务条款》")])],1)],1)],1),i("uni-popup",{attrs:{show:t.showPopupMiddle,type:t.popType,title:t.tiptitle,queren:!0,quxiao:!0},on:{hidePopup:function(e){e=t.$handleEvent(e),t.hidePopup(e)}}},[i("v-uni-view",{staticClass:"uni-common-mt uni-helllo-text uni-center",staticStyle:{"text-align":"left"}},[i("v-uni-rich-text",{attrs:{nodes:t.tipcontent}})],1)],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"9b18":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{queren:{type:Boolean,default:!0},quxiao:{type:Boolean,default:!1},show:{type:Boolean,default:!1},type:{type:String,default:"middle"},msg:{type:String,default:""},title:{type:String,default:"提示"}},data:function(){var t=0;return t=44,{offsetTop:t}},methods:{hide:function(){this.$emit("hidePopup")}}};e.default=n},"9e5a":function(t,e,i){var n=i("072d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("9d67164e",n,!0,{sourceMap:!1,shadowMode:!1})},"9fd5":function(t,e,i){"use strict";var n=i("9e5a"),a=i.n(n);a.a},a0d8:function(t,e,i){"use strict";i.r(e);var n=i("52db"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},a4ce:function(t,e,i){"use strict";i.r(e);var n=i("7032"),a=i("feb9");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("a917");var s=i("2877"),u=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"1aa7fde2",null);e["default"]=u.exports},a917:function(t,e,i){"use strict";var n=i("3434"),a=i.n(n);a.a},feb9:function(t,e,i){"use strict";i.r(e);var n=i("9b18"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a}}]);