(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-agent-jyph"],{"025b":function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",[a("v-uni-view",{staticClass:"agent_syph_bg",staticStyle:{"background-image":"url(../../../static/agent_syph_bg.png)","background-repeat":"no-repeat","background-size":"100% 100%"}},[a("v-uni-view",{staticClass:"syph-top"},[a("v-uni-view",{staticClass:"uni-flex uni-row"},t._l(t.list,function(i,e){return e<3?a("v-uni-view",{key:e,staticClass:"by-flex text-c",class:"top-"+(e+1)},[a("v-uni-view",{staticClass:"head-pic"},[a("v-uni-image",{attrs:{src:i.head_img?i.head_img:"../../../static/head-no-pic.png"}})],1),a("v-uni-view",{staticClass:"ph-name"},[t._v(t._s(i.nickname))]),a("v-uni-view",{staticClass:"ph-sy"},[t._v("￥"+t._s(i.z_money))])],1):t._e()}))],1)],1),t._l(t.list,function(i,e){return e>2?a("v-uni-view",{key:e,staticClass:"syph-list-bg",staticStyle:{"background-image":"url(../../../static/agent_syph_list_bg.png)","background-repeat":"no-repeat","background-size":"100% 100%"}},[a("v-uni-view",{staticClass:"syph-list",staticStyle:{padding:"0 30upx"}},[a("v-uni-view",{staticClass:"uni-flex uni-row"},[a("v-uni-view",{staticClass:"text-c xuhao"},[t._v(t._s(e+1))]),a("v-uni-view",{staticClass:"text-r touxiang"},[a("v-uni-view",{staticClass:"head-pic"},[a("v-uni-image",{attrs:{src:i.head_img?i.head_img:"../../../static/head-no-pic.png"}})],1)],1),a("v-uni-view",{staticClass:"by-flex text-l nickname"},[a("v-uni-view",{staticClass:"fzhsy"},[t._v(t._s(i.nickname))]),a("v-uni-view",{staticClass:"fzhsy-jh"},[t._v(t._s(i.group_name))])],1),a("v-uni-view",{staticClass:"text-r money"},[a("v-uni-view",{staticClass:"fzhsy"},[t._v("￥"),a("v-uni-text",[t._v(t._s(i.z_money))])],1),a("v-uni-view",{staticClass:"fzhsy-jdh"},[t._v("累计收益")])],1)],1)],1)],1):t._e()}),a("v-uni-view",{staticClass:"syph-list-b-bg",staticStyle:{"background-image":"url(../../../static/agent_syph_b_bg.png)","background-repeat":"no-repeat","background-size":"100% 100%"}},[a("v-uni-view",{staticClass:"syph-list-b"})],1)],2)},n=[];a.d(i,"a",function(){return e}),a.d(i,"b",function(){return n})},"15d7":function(t,i,a){"use strict";a.r(i);var e=a("5569"),n=a.n(e);for(var s in e)"default"!==s&&function(t){a.d(i,t,function(){return e[t]})}(s);i["default"]=n.a},5569:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{list:[]}},onLoad:function(){this.getAgentSyph()},onShow:function(){},methods:{getAgentSyph:function(){var t=this;try{this.$http.post(this.websiteUrl+"/api/agent/getAgentSyph",{},function(i){1==i.data.code?t.list=i.data.result:uni.showModal({content:i.data.msg,showCancel:!1})})}catch(i){uni.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}}},components:{}};i.default=e},"840f":function(t,i,a){"use strict";a.r(i);var e=a("025b"),n=a("15d7");for(var s in n)"default"!==s&&function(t){a.d(i,t,function(){return n[t]})}(s);a("f4de");var d=a("2877"),o=Object(d["a"])(n["default"],e["a"],e["b"],!1,null,"8d14560c",null);i["default"]=o.exports},d53d:function(t,i,a){var e=a("d755");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("0dcc8624",e,!0,{sourceMap:!1,shadowMode:!1})},d755:function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,"uni-page-body[data-v-8d14560c]{height:auto;min-height:100%;background-color:#f76045}.agent_user_bg[data-v-8d14560c]{height:%?569?%;width:100%;color:#fff;line-height:%?569?%}.syph-top[data-v-8d14560c]{height:%?359?%;margin-top:%?0?%;padding-top:%?210?%;padding-left:%?20?%;padding-right:%?20?%}.syph-list-bg[data-v-8d14560c]{height:%?130?%;width:100%;color:#353535;line-height:%?130?%}.syph-list[data-v-8d14560c]{height:%?130?%}.syph-list-b-bg[data-v-8d14560c]{height:%?45?%;width:100%;color:#fff;line-height:%?45?%}.syph-list-b[data-v-8d14560c]{height:%?45?%}.by-flex[data-v-8d14560c]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.text-r[data-v-8d14560c]{text-align:right}.text-l[data-v-8d14560c]{text-align:left}.text-c[data-v-8d14560c]{text-align:center}.top-1[data-v-8d14560c]{padding-top:%?50?%;text-align:center}.top-1 .head-pic[data-v-8d14560c]{margin:0 auto;border-radius:50%;height:%?125?%;width:%?125?%;overflow:hidden;margin-top:%?20?%}.top-1 .head-pic uni-image[data-v-8d14560c]{width:%?125?%;height:%?125?%}.top-1 .ph-name[data-v-8d14560c]{font-size:%?24?%;line-height:%?70?%;color:#333}.top-1 .ph-sy[data-v-8d14560c]{font-size:%?32?%;line-height:%?50?%;color:#353535}.top-2[data-v-8d14560c]{padding-top:%?28?%;text-align:center}.top-2 .head-pic[data-v-8d14560c]{margin:0 auto;border-radius:50%;height:%?145?%;width:%?145?%;overflow:hidden;margin-top:%?20?%}.top-2 .head-pic uni-image[data-v-8d14560c]{width:%?145?%;height:%?145?%}.top-2 .ph-name[data-v-8d14560c]{font-size:%?24?%;line-height:%?70?%;color:#646464}.top-2 .ph-sy[data-v-8d14560c]{font-size:%?32?%;line-height:%?50?%;color:#fe0e00}.top-3[data-v-8d14560c]{padding-top:%?50?%;text-align:center}.top-3 .head-pic[data-v-8d14560c]{margin:0 auto;border-radius:50%;height:%?125?%;width:%?125?%;overflow:hidden;margin-top:%?20?%}.top-3 .head-pic uni-image[data-v-8d14560c]{width:%?125?%;height:%?125?%}.top-3 .ph-name[data-v-8d14560c]{font-size:%?24?%;line-height:%?70?%;color:#333}.top-3 .ph-sy[data-v-8d14560c]{font-size:%?32?%;line-height:%?50?%;color:#353535}.syph-list .head-pic[data-v-8d14560c]{margin:0 auto;border-radius:50%;height:%?90?%;width:%?90?%;overflow:hidden;margin-top:%?20?%}.syph-list .head-pic uni-image[data-v-8d14560c]{width:%?90?%;height:%?90?%}.syph-list .xuhao[data-v-8d14560c]{line-height:%?140?%;width:%?80?%;font-size:%?40?%;color:#939393}.syph-list .touxiang[data-v-8d14560c]{width:%?90?%;margin-right:%?20?%}.syph-list .nickname[data-v-8d14560c]{margin-top:%?20?%;color:#5b5b5b}.syph-list .money[data-v-8d14560c]{margin-right:%?20?%;margin-top:%?20?%;color:#000}.fzhsy-jh[data-v-8d14560c]{color:#979797;font-size:%?24?%}.fzhsy-jdh[data-v-8d14560c]{color:#979797;font-size:%?24?%}body.?%PAGE?%[data-v-8d14560c]{background-color:#f76045}",""])},f4de:function(t,i,a){"use strict";var e=a("d53d"),n=a.n(e);n.a}}]);