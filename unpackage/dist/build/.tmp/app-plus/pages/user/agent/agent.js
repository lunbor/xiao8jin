(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/agent/agent"],{"0aa2":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("a4ce"));function n(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{popType:"middle",tiptitle:"提示",showPopupMiddle:!1,tipcontent:"",agent:{},searchIndex:1,navlist:[{title:"我的用户",path:"/pages/user/agent/user",icon:"../../../static/agent_user.png"},{title:"我的代理",path:"/pages/user/agent/share",icon:"../../../static/agent_share.png"}],navlist2:[{title:"收益明细",path:"/pages/user/agent/money",icon:"../../../static/agent_money.png"},{title:"提现记录",path:"/pages/user/agent/cashLog",icon:"../../../static/agent_cash.png"}],navlist3:[{title:"结算卡",path:"/pages/user/agent/card",icon:"../../../static/agent_card.png"},{title:"推广二维码",path:"/pages/user/agent/invite",icon:"../../../static/agent_qr.png"}],navlist4:[{title:"收益排行",path:"/pages/user/agent/jyph",icon:"../../../static/agent_jyph.png"},{title:"团队排行",path:"/pages/user/agent/tdph",icon:"../../../static/agent_ph.png"}]}},onLoad:function(){this.getAgentData()},onShow:function(){},methods:{hidePopup:function(){this.showPopupMiddle=!1},showMiddlePopup:function(){this.popType="middle",this.showPopupMiddle=!0},goDetailPage:function(e){var a=this.$store.state.openid;null===a?t.navigateTo({url:"/pages/user/login/login"}):t.navigateTo({url:e})},getAgentData:function(){var e=this,a=this.$store.state.openid,i=this.$store.state.sessionKey;try{this.$http.post(this.websiteUrl+"/api/agent/getAgentData",{openid:a,sessionKey:i},function(a){1==a.data.code?(e.agent=a.data.result.agent,e.tipcontent=a.data.result.article.content.replace(/\\/g,"").replace(/<img/g,'<img style="display:none;"')):t.showModal({content:a.data.msg,showCancel:!1})})}catch(n){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}}},components:{uniPopup:i.default}};e.default=s}).call(this,a("649d")["default"])},"0c21":function(t,e,a){"use strict";a.r(e);var i=a("0aa2"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},2142:function(t,e,a){"use strict";a("a8bc");var i=s(a("b0ce")),n=s(a("92b1"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},4015:function(t,e,a){"use strict";var i=a("7cd8"),n=a.n(i);n.a},6928:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("view",{staticClass:"agent_bg"},[a("view",{staticClass:"uni-flex uni-row"},[a("view",{staticClass:"by-flex"},[a("view",{staticClass:"agent_total_profit"},[t._v("总收益 (元)")]),a("view",{staticClass:"agent_total_profit_text"},[t._v(t._s(t.agent.z_money))])]),t._m(0)]),a("view",{staticClass:"uni-triplex-row linebg"}),a("view",{staticClass:"uni-flex uni-row uni-common-mt"},[a("view",{staticClass:"by-flex"},[t._v("可提现金额:"),a("text",[t._v(t._s(t.agent.money))]),t._v("元")]),a("view",{staticClass:"by-flex text-r"},[a("button",{staticClass:"mini-btn",attrs:{type:"primary",size:"mini",eventid:"f81c6294-0"},on:{click:function(e){t.goDetailPage("/pages/user/agent/cash")}}},[t._v("提现")])],1)])]),a("view",{staticClass:"contentbg"},[a("view",{staticClass:"uni-flex uni-row"},[a("view",{staticClass:"by-flex text-c"},[a("view",{staticClass:"agent_num"},[t._v(t._s(t.agent.agentUserCount))]),a("view",{staticClass:"agent_text"},[t._v("我的团队")])]),a("view",{staticClass:"by-flex text-c"},[a("view",{staticClass:"agent_num"},[t._v("￥"+t._s(t.agent.user_sy))]),a("view",{staticClass:"agent_text"},[t._v("用户提成")])]),a("view",{staticClass:"by-flex text-c"},[a("view",{staticClass:"agent_num"},[t._v(t._s(t.agent.agentCount))]),a("view",{staticClass:"agent_text"},[t._v("我的代理")])]),a("view",{staticClass:"by-flex text-c"},[a("view",{staticClass:"agent_num"},[t._v("￥"+t._s(t.agent.agent_sy))]),a("view",{staticClass:"agent_text"},[t._v("代理提成")])])])]),a("view",{staticClass:"contentbg uni-common-mt"},[a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate uni-navigate-right bb0",attrs:{eventid:"f81c6294-1"},on:{click:function(e){t.goDetailPage("/pages/user/agent/buy")}}},[a("image",{attrs:{src:"../../../static/agent_dkw.png"}}),t._v(t._s(t.agent.group_name)),a("text",{staticClass:"uni-list-cell-left by-sdh"},[t._v("立即升级")])])])]),a("view",{staticClass:"contentbg uni-common-mt"},t._l(t.navlist,function(e,i){return a("view",{key:i,staticClass:"hg50"},[a("view",{class:i==t.searchIndex?"uni-list-cell-navigate uni-navigate-right bb0":"uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"f81c6294-2-"+i},on:{click:function(a){t.goDetailPage(e.path)}}},[a("image",{attrs:{src:e.icon}}),t._v(t._s(e.title))])])})),a("view",{staticClass:"contentbg uni-common-mt"},t._l(t.navlist2,function(e,i){return a("view",{key:i,staticClass:"hg50"},[a("view",{class:i==t.searchIndex?"uni-list-cell-navigate uni-navigate-right bb0":"uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"f81c6294-3-"+i},on:{click:function(a){t.goDetailPage(e.path)}}},[a("image",{attrs:{src:e.icon}}),t._v(t._s(e.title))])])})),a("view",{staticClass:"contentbg uni-common-mt"},t._l(t.navlist3,function(e,i){return a("view",{key:i,staticClass:"hg50"},[a("view",{class:i==t.searchIndex?"uni-list-cell-navigate uni-navigate-right bb0":"uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"f81c6294-4-"+i},on:{click:function(a){t.goDetailPage(e.path)}}},[a("image",{attrs:{src:e.icon}}),t._v(t._s(e.title))])])})),a("view",{staticClass:"contentbg uni-common-mt uni-common-mb"},t._l(t.navlist4,function(e,i){return a("view",{key:i,staticClass:"hg50"},[a("view",{class:i==t.searchIndex?"uni-list-cell-navigate uni-navigate-right bb0":"uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"f81c6294-5-"+i},on:{click:function(a){t.goDetailPage(e.path)}}},[a("image",{attrs:{src:e.icon}}),t._v(t._s(e.title))])])})),a("uni-popup",{attrs:{show:t.showPopupMiddle,type:t.popType,title:t.tiptitle,queren:!0,quxiao:!1,eventid:"f81c6294-6",mpcomid:"f81c6294-1"},on:{hidePopup:t.hidePopup}},[a("view",{staticClass:"uni-common-mt uni-helllo-text uni-center",staticStyle:{"text-align":"left"}},[a("rich-text",{attrs:{nodes:t.tipcontent,mpcomid:"f81c6294-0"}})],1)])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"by-flex"},[a("view",{staticClass:"agent_cash"},[a("view",{staticClass:"uni-icon uni-icon-help fz28"}),t._v("提现规则")])])}];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},"7cd8":function(t,e,a){},"92b1":function(t,e,a){"use strict";a.r(e);var i=a("6928"),n=a("0c21");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("4015");var c=a("2877"),l=Object(c["a"])(n["default"],i["a"],i["b"],!1,null,null,null);e["default"]=l.exports}},[["2142","common/runtime","common/vendor"]]]);