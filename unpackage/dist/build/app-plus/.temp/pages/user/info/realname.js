require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([18],{87:function(t,e,a){"use strict";var s=n(a(2)),i=n(a(88));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},88:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(90),i=a.n(s),n=a(91);var r=function(t){a(89)},c=a(0)(i.a,n.a,r,null,null);e.default=c.exports},89:function(t,e){},90:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var s,i=a(3),n=(s=i)&&s.__esModule?s:{default:s};function r(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function s(i,n){try{var r=e[i](n),c=r.value}catch(t){return void a(t)}if(!r.done)return Promise.resolve(c).then(function(t){s("next",t)},function(t){s("throw",t)});t(c)}("next")})}}var c=null;e.default={data:function(){return{cardInfo:{realname:"",is_validate:"",card:"",card_img_a:"../../../static/card_a.png",card_img_b:"../../../static/card_b.png"},loading:!1,card_a:[],card_b:[],card_a_data:"",card_b_data:"",progress:0,cwidth:"1000px",cheight:"1000px"}},onReady:function(){c=t.createCanvasContext("canvas")},onLoad:function(){this.getIdCard()},onShow:function(){},methods:{getIdCard:function(){var e=this,a=this.$store.state.openid,s=this.$store.state.sessionKey;try{this.$http.post(this.websiteUrl+"/api/api/getIdCard",{openid:a,sessionKey:s},function(a){1==a.data.code?(e.cardInfo=a.data.result.cardInfo,null==e.cardInfo.card&&(e.cardInfo.card=""),null==e.cardInfo.realname&&(e.cardInfo.realname="")):t.showModal({content:a.data.msg,showCancel:!1})})}catch(e){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}},addIdCard:function(){var e=this.$store.state.openid,a=this.$store.state.sessionKey,s=this.cardInfo.realname,i=this.cardInfo.card,n=this.card_a_data,r=this.card_b_data;if(""!=s)if(""!=i)if(""!=n)if(""!=r){var c=this;try{if(this.loading)return;this.loading=!0,this.$http.post(this.websiteUrl+"/api/api/addIdCard",{openid:e,sessionKey:a,realname:s,card:i,card_a_data:n,card_b_data:r},function(e){t.showModal({content:e.data.msg,showCancel:!1,success:function(){c.loading=!1,t.redirectTo({url:"/pages/user/info/realname"})}})})}catch(e){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1,success:function(){c.loading=!1}})}}else t.showModal({content:"请上传身份证反面",showCancel:!1});else t.showModal({content:"请上传身份证正面",showCancel:!1});else t.showModal({content:"请填写身份证号码",showCancel:!1});else t.showModal({content:"请填写真实姓名",showCancel:!1})},upFile:function(e,a){var s=this,i=this.$store.state.openid,n=this.$store.state.sessionKey;t.uploadFile({url:this.websiteUrl+"/api/upload/uploadcard",filePath:e,name:"file",formData:{data:JSON.stringify({openid:i,sessionKey:n,side:a})},success:function(e){var i=JSON.parse(e.data);t.hideLoading(),1==i.code?"front"==a?1==i.result.juhe?0==i.result.juhedata.error_code?(s.card_a_data=i.result.img_url,s.cardInfo.realname=i.result.juhedata.result.realname,s.cardInfo.card=i.result.juhedata.result.idcard,t.showToast({title:"成功"})):t.showModal({content:i.result.juhedata.reason,showCancel:!1}):(s.card_a_data=i.result.img_url,t.showToast({title:"成功"})):1==i.result.juhe?0==i.result.juhedata.error_code?(s.card_b_data=i.result.img_url,t.showToast({title:"成功"})):t.showModal({content:i.result.juhedata.reason,showCancel:!1}):(s.card_b_data=i.result.img_url,t.showToast({title:"成功"})):t.showToast({title:i.msg})},fail:function(e){console.log(e),t.hideLoading(),t.showToast({title:"上传失败"})},complete:function(t){s.progress=0}}).onProgressUpdate(function(t){s.progress=t.progress})},resethb:function(){},chooseImage:function(){var e=r(n.default.mark(function e(){var a,s=this;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(a=this).progress=0,t.chooseImage({sizeType:["compressed"],sourceType:["camera"],count:1,success:function(e){s.card_a=[],s.card_a=s.card_a.concat(e.tempFilePaths);var i=s.card_a.length;if(i>=1){s.cardInfo.card_img_a=s.card_a[i-1];var n=e.tempFilePaths;t.showLoading({title:"识别中..."});try{return void t.getImageInfo({src:n[i-1],success:function(e){a.resethb(),e.width>1e3?(a.cwidth=e.width/7+"px",a.cheight=e.height/7+"px",c.drawImage(n[i-1],0,0,e.width/7,e.height/7),c.draw(!1,function(){t.canvasToTempFilePath({canvasId:"canvas",success:function(t){a.upFile(t.tempFilePath,"front")},fail:function(e){console.error(JSON.stringify(e)),t.hideLoading(),t.showToast({title:"图片压缩失败"})}})})):a.upFile(n[i-1],"front")}})}catch(e){t.hideLoading()}}else t.showToast({title:"没有选中图片"})}});case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),chooseImageB:function(){var e=r(n.default.mark(function e(){var a,s=this;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=this,this.$store.state.openid,this.$store.state.sessionKey,a.progress=0,t.chooseImage({sizeType:["compressed"],sourceType:["camera"],count:1,success:function(e){s.card_b=[],s.card_b=s.card_b.concat(e.tempFilePaths);var i=s.card_b.length;if(i>=1){s.cardInfo.card_img_b=s.card_b[i-1];var n=e.tempFilePaths;t.showLoading({title:"识别中..."});try{return void t.getImageInfo({src:n[i-1],success:function(e){a.resethb(),e.width>1e3?(a.cwidth=e.width/7+"px",a.cheight=e.height/7+"px",c.drawImage(n[i-1],0,0,e.width/7,e.height/7),c.draw(!1,function(){t.canvasToTempFilePath({canvasId:"canvas",success:function(t){a.upFile(t.tempFilePath,"back")},fail:function(e){console.error(JSON.stringify(e)),t.hideLoading(),t.showToast({title:"图片压缩失败"})}})})):a.upFile(n[i-1],"back")}})}catch(e){t.hideLoading()}}else t.showToast({title:"没有选中图片"})}});case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}}}).call(e,a(1).default)},91:function(t,e,a){"use strict";var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("view",{directives:[{name:"show",rawName:"v-show",value:t.progress>0,expression:"progress>0"}],staticClass:"top-jd"},[a("progress",{attrs:{percent:t.progress}})],1),a("view",{staticStyle:{overflow:"scroll",height:"0upx",width:"100%"}},[a("canvas",{staticClass:"canvas-element",style:{width:t.cwidth,height:t.cheight},attrs:{"canvas-id":"canvas"}})]),a("view",{directives:[{name:"show",rawName:"v-show",value:1===t.cardInfo.is_validate,expression:"cardInfo.is_validate===1"}]},[a("view",{staticClass:"realname-yes"},[t._m(0),a("view",{staticClass:"uni-list-cell-navigate bt-color"},[t._v("\n\t\t\t\t姓名\n\t\t\t\t"),a("text",{staticClass:"uni-list-cell-left by-sdh"},[t._v(t._s(t.cardInfo.realname))])]),a("view",{staticClass:"uni-list-cell-navigate bt-color"},[t._v("\n\t\t\t\t身份证号\n\t\t\t\t"),a("text",{staticClass:"uni-list-cell-left by-sdh"},[t._v(t._s(t.cardInfo.card))])])])]),a("view",{directives:[{name:"show",rawName:"v-show",value:0===t.cardInfo.is_validate,expression:"cardInfo.is_validate===0"}]},[a("view",{staticClass:"card_img_bg"},[a("view",{staticClass:"card_tip"},[t._v("请上传本人有效期内的身份证照片，享受更多权益")]),a("view",{staticClass:"uni-flex uni-row",staticStyle:{"justify-content":"center"}},[t._m(1),a("view",{staticClass:"text flex-w20"}),a("view",{staticClass:"text card_img",attrs:{eventid:"eq8-0"},on:{click:t.chooseImage}},[a("image",{attrs:{src:t.cardInfo.card_img_a?t.cardInfo.card_img_a:"../../../static/card_a.png"}})])]),a("view",{staticClass:"uni-flex uni-row",staticStyle:{"justify-content":"center"}},[t._m(2),a("view",{staticClass:"text flex-w20"}),a("view",{staticClass:"text card_img",attrs:{eventid:"oH3-1"},on:{click:t.chooseImageB}},[a("image",{attrs:{src:t.cardInfo.card_img_b?t.cardInfo.card_img_b:"../../../static/card_b.png"}})])])]),a("view",{staticClass:"uni-padding-wrap"},[t._m(3),a("view",{staticClass:"uni-card by-card"},[a("view",{staticClass:"uni-card-content"},[a("view",{staticClass:"uni-form-item uni-column by-border-bottom"},[a("view",{staticClass:"with-fun"},[t._m(4),a("input",{directives:[{name:"model",rawName:"v-model",value:t.cardInfo.realname,expression:"cardInfo.realname"}],staticClass:"uni-input",attrs:{maxlength:"20",placeholder:"",eventid:"zop-2"},domProps:{value:t.cardInfo.realname},on:{input:function(e){e.target.composing||(t.cardInfo.realname=e.target.value)}}})])]),a("view",{staticClass:"uni-form-item uni-column"},[a("view",{staticClass:"with-fun"},[t._m(5),a("input",{directives:[{name:"model",rawName:"v-model",value:t.cardInfo.card,expression:"cardInfo.card"}],staticClass:"uni-input",attrs:{type:"idcard",placeholder:"",eventid:"seE-3"},domProps:{value:t.cardInfo.card},on:{input:function(e){e.target.composing||(t.cardInfo.card=e.target.value)}}})])])])]),a("view",{staticClass:"by-mt-30 by-mb-30"},[a("button",{staticClass:"by-button-submit",attrs:{type:"warn",disabled:1===t.cardInfo.is_validate,loading:t.loading,eventid:"f0C-4"},on:{click:t.addIdCard}},[t._v("提交认证")])],1)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"yes-img"},[e("image",{attrs:{src:"../../../static/realname-yes.png"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"text card_img"},[e("image",{attrs:{src:"../../../static/card_a_sl.png"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"text card_img"},[e("image",{attrs:{src:"../../../static/card_b_sl.png"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"upload-tip"},[e("view",{staticClass:"upload-tip-title"},[this._v("身份证照片要求:")]),e("view",{staticClass:"upload-tip-center"},[e("view",[this._v("必须本人的有效身份证，与基本信息一致")]),e("view",[this._v("照片确保身份证边框完整，字体清晰，亮度均匀")]),e("view",[this._v("照片要求4M以内，支持jpg/jpeg/png格式")]),e("view",[this._v("若识别信息有误，可手动修改身份信息")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"by-sdhf"},[this._v("真实姓名"),e("text")])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"by-sdhf"},[this._v("身份证号"),e("text")])}]};e.a=s}},[87]);