require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([1],{115:function(t,e,s){"use strict";var n=o(s(2)),i=o(s(116));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},116:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(118),i=s.n(n),o=s(127);var a=function(t){s(117)},c=s(0)(i.a,o.a,a,null,null);e.default=c.exports},117:function(t,e){},118:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n=o(s(119)),i=o(s(123));function o(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{style:{pageHeight:0,contentViewHeight:0,footViewHeight:90,mitemHeight:0},scrollTop:0,messages:[{user:"home",type:"head",content:"你好!"}]}},components:{chatInput:n.default,messageShow:i.default},onLoad:function(){var e=t.getSystemInfoSync();this.style.pageHeight=e.windowHeight,this.style.contentViewHeight=e.windowHeight-t.getSystemInfoSync().screenWidth/750*100},methods:{getInputMessage:function(t){this.addMessage("customer",t.content,!1),this.toRobot(t.content)},addMessage:function(t,e,s,n){this.messages.push({user:t,content:e,hasSub:s,subcontent:n})},scrollToBottom:function(){var e=this,s=t.createSelectorQuery();s.selectAll(".m-item").boundingClientRect(),s.select("#scrollview").boundingClientRect(),s.exec(function(t){e.style.mitemHeight=0,t[0].forEach(function(t){e.style.mitemHeight=e.style.mitemHeight+t.height+20}),e.style.mitemHeight>e.style.contentViewHeight&&(e.scrollTop=e.style.mitemHeight-e.style.contentViewHeight)})},toRobot:function(e){var s=this,n=this.$store.state.openid,i=this.$store.state.sessionKey;try{this.$http.post(this.websiteUrl+"/api/chatapi/api",{openid:n,sessionKey:i,info:e},function(e){1==e.data.code?(s.addMessage("home",e.data.result,!1),s.scrollToBottom()):t.showModal({content:e.data.msg,showCancel:!1})})}catch(e){this.loadingType=0,t.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}}}}}).call(e,s(1).default)},119:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(121),i=s.n(n),o=s(122);var a=function(t){s(120)},c=s(0)(i.a,o.a,a,null,null);e.default=c.exports},120:function(t,e){},121:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"chat-input",data:function(){return{inputValue:""}},methods:{startRecognize:function(){var t={},e=this;t.engine="iFly",e.inputValue="",plus.speech.startRecognize(t,function(t){console.log(t),e.inputValue+=t},function(t){console.log("语音识别失败："+t.message)})},sendMessge:function(){""==this.inputValue.trim()?this.inputValue="":(this.$emit("send-message",{type:"text",content:this.inputValue}),this.inputValue="")}}}},122:function(t,e,s){"use strict";var n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"footer"},[s("view",{staticClass:"footer-left"},[s("view",{staticClass:"uni-icon uni-icon-mic",attrs:{eventid:"o0y-0"},on:{tap:t.startRecognize}})]),s("view",{staticClass:"footer-center"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],staticClass:"input-text",attrs:{type:"text",eventid:"YA6-1"},domProps:{value:t.inputValue},on:{input:function(e){e.target.composing||(t.inputValue=e.target.value)}}})]),s("view",{staticClass:"footer-right",attrs:{eventid:"htc-2"},on:{tap:t.sendMessge}},[s("view",{attrs:{id:"msg-type"}},[t._v("发送")])])])},staticRenderFns:[]};e.a=n},123:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(125),i=s.n(n),o=s(126);var a=function(t){s(124)},c=s(0)(i.a,o.a,a,null,null);e.default=c.exports},124:function(t,e){},125:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["message","id"]}},126:function(t,e,s){"use strict";var n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"m-item",attrs:{id:"message"+t.id}},[s("view",{staticClass:"m-left"},["home"==t.message.user?s("image",{staticClass:"head_icon",attrs:{src:"http://hszt.tw186.com/uploads/img/homeHL.png"}}):t._e()]),s("view",{staticClass:"m-content"},[s("view",{staticClass:"m-content-head",class:{"m-content-head-right":"customer"==t.message.user}},[s("view",{class:"m-content-head-"+t.message.user},[t._v(t._s(t.message.content)+" ")])])]),s("view",{staticClass:"m-right"},["customer"==t.message.user?s("image",{staticClass:"head_icon",attrs:{src:"http://hszt.tw186.com/uploads/img/customerHL.png"}}):t._e()])])},staticRenderFns:[]};e.a=n},127:function(t,e,s){"use strict";var n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"uni-column"},[e("view",{staticClass:"content",style:{height:this.style.contentViewHeight+"px"},attrs:{id:"content"}},[e("scroll-view",{style:{height:this.style.contentViewHeight+"px"},attrs:{id:"scrollview","scroll-y":"true","scroll-with-animation":!0,"scroll-top":this.scrollTop}},[this._l(this.messages,function(t,s){return e("message-show",{key:s,attrs:{message:t,id:s,mpcomid:"uyU-0-"+s}})}),e("view",{attrs:{id:"bottom"}})],2)],1),e("view",{staticClass:"foot"},[e("chat-input",{attrs:{eventid:"tYu-0",mpcomid:"Fub-1"},on:{"send-message":this.getInputMessage,focus:this.inputGetFocus}})],1)])},staticRenderFns:[]};e.a=n}},[115]);