(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabBar-user-user"],{"0293":function(t,e,a){"use strict";a.r(e);var i=a("9da6"),n=a("74fa");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("a0e0");var o=a("2877"),r=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"066e9aea",null);e["default"]=r.exports},"1d17":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{realtime:"",agent:{},searchIndex:3,userInfo:{nickname:"未登录",vip_name:"游客",mobile:"",head_img:"../../../static/head-no-pic.png",integral:"0",message:"0",invite:"0",repay_num:"0",z_money:"0",yestoday_money:"0",money:"0"},navlist:[{title:"交易明细",path:"/pages/user/account/account",imgSrc:"../../../static/icon4.png"},{title:"收益明细",path:"/pages/user/agent/money",imgSrc:"../../../static/icon5.png"},{title:"我的银行卡",path:"/pages/user/agent/card",imgSrc:"../../../static/icon6.png"},{title:"帮助",path:"/pages/user/agent/service",imgSrc:"../../../static/icon7.png"},{title:"商务合作",path:"/pages/user/agent/cooperation",imgSrc:"../../../static/icon8.png"},{title:"设置",path:"/pages/user/set/set",imgSrc:"../../../static/icon9.png"}]}},onLoad:function(){this.getAgentData()},onShow:function(){this.getUserData()},onHide:function(){clearTimeout(this.realtime)},onPullDownRefresh:function(){this.getUserData(),uni.stopPullDownRefresh()},onShareAppMessage:function(){return{title:this.webshareTitle,path:"/pages/tabBar/index/index"}},onNavigationBarButtonTap:function(t){},methods:{getUserData:function(){var t=this,e=this.$store.state.openid,a=this.$store.state.sessionKey;try{this.$http.post(this.websiteUrl+"/api/api/getUserData",{openid:e,sessionKey:a},function(e){if(1==e.data.code){if(t.userInfo=e.data.result.userInfo,1!=t.userInfo.is_validate){if(clearTimeout(t.realtime),uni.getStorageSync("is_tishireal"))return;uni.setStorageSync("is_tishireal",!0),t.realtime=setTimeout(function(){uni.showModal({title:"提示",content:"您还没有进行实名认证，是否立即前往认证？",success:function(t){t.confirm&&uni.navigateTo({url:"/pages/user/info/realname"})}})}.bind(t),2e3)}}else t.$store.commit("logout")})}catch(i){uni.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}},goDetailPage:function(t){clearTimeout(this.realtime);var e=this.$store.state.openid;null===e?uni.navigateTo({url:"/pages/user/login/login"}):uni.navigateTo({url:t})},getAgentData:function(){var t=this,e=this.$store.state.openid,a=this.$store.state.sessionKey;try{this.$http.post(this.websiteUrl+"/api/agent/getAgentData",{openid:e,sessionKey:a},function(e){1==e.data.code&&(t.agent=e.data.result.agent)})}catch(i){uni.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}}}};e.default=i},"74fa":function(t,e,a){"use strict";a.r(e);var i=a("1d17"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},"9da6":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"user-top-bg",staticStyle:{background:"url(../../../static/user_top_bg.png) no-repeat","background-size":"100% 100%"}},[a("v-uni-view",{staticClass:"uni-flex uni-row"},[a("v-uni-view",{staticClass:"flex-item",staticStyle:{width:"60%"}},[a("v-uni-view",{staticClass:"uni-flex uni-row uni-padding-wrap user_top",on:{click:function(e){e=t.$handleEvent(e),t.goDetailPage("/pages/user/info/info")}}},[a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"head-pic"},[a("v-uni-image",{attrs:{src:t.userInfo.head_img?t.userInfo.head_img:"../../../static/head-no-pic.png"}})],1)],1),a("v-uni-view",{staticClass:"text head-center"},[a("v-uni-view",{staticClass:"text head-nickname clearfix"},[a("v-uni-text",{staticStyle:{float:"left"}},[t._v(t._s(t.userInfo.nickname))]),t._v(t._s(t.agent.group_name))],1),a("v-uni-view",{staticClass:"text head-phone"},[t._v(t._s(t.userInfo.account))])],1)],1)],1),a("v-uni-view",{staticClass:"flex-item",staticStyle:{width:"30%"}},[a("v-uni-view",{staticClass:"agent_cash"},[a("v-uni-view",{staticClass:"uni-icon uni-icon-help fz28"}),t._v("提现规则")],1)],1),a("v-uni-view",{staticClass:"flex-item"},[a("v-uni-view",{staticClass:"text head-bottom-news",on:{click:function(e){e=t.$handleEvent(e),t.goDetailPage("/pages/user/news/news")}}},[a("v-uni-image",{staticClass:"news_img",attrs:{src:"../../../static/news.png"}})],1)],1)],1),a("v-uni-view",{staticClass:"uni-flex uni-row money_case"},[a("v-uni-view",{staticClass:"flex-item w40"},[a("v-uni-view",{staticClass:"info_name"},[t._v("我的资产(元)")]),a("v-uni-view",{staticClass:"info_number"},[t._v(t._s(t.agent.z_money))])],1),a("v-uni-view",{staticClass:"flex-item w40"},[a("v-uni-view",{staticClass:"info_name"},[t._v("昨日收益(元)")]),a("v-uni-view",{staticClass:"info_number_td"},[t._v(t._s(t.agent.yestoday_money))])],1),a("v-uni-view",{staticClass:"vip_btn",on:{click:function(e){e=t.$handleEvent(e),t.goDetailPage("/pages/user/agent/buy")}}},[a("v-uni-image",{staticClass:"vip_btnImg",attrs:{src:"../../../static/vip_btn.png"}})],1)],1),a("v-uni-view",{staticClass:"uni-card by-card ",staticStyle:{height:"160upx",margin:"0 34upx",position:"relative",bottom:"-20upx"}},[a("v-uni-view",{staticClass:"uni-flex uni-row cash_case"},[a("v-uni-view",{staticClass:"flex-item",staticStyle:{width:"70%"}},[a("v-uni-view",{staticClass:"cash_text1"},[t._v("可提现金额(元)")]),a("v-uni-view",{staticClass:"cash_text_num"},[t._v(t._s(t.agent.money))])],1),a("v-uni-view",{staticClass:"flex-item",staticStyle:{width:"30%"},on:{click:function(e){e=t.$handleEvent(e),t.goDetailPage("/pages/user/agent/cash")}}},[a("v-uni-view",{staticClass:"cash_btn"},[t._v("提现")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"uni-padding-wrap",staticStyle:{"margin-top":"90upx"}},[a("v-uni-view",{staticClass:"uni-card by-card user_card"},[a("v-uni-view",{staticClass:"uni-card-content"},[a("v-uni-view",{staticClass:"user_list"},[a("v-uni-view",{staticClass:"uni-list-cell-navigate  bb0"},[a("v-uni-image",{staticClass:"icon_img",attrs:{src:"../../../static/icon1.png"}}),a("v-uni-view",{staticClass:"title"},[t._v("推荐人"),a("v-uni-text",{staticClass:"right_txt"},[t._v(t._s(t.userInfo.recommender))])],1)],1)],1),a("v-uni-view",{staticClass:"user_list"},[a("v-uni-view",{staticClass:"uni-list-cell-navigate uni-navigate-right bb0",on:{click:function(e){e=t.$handleEvent(e),t.goDetailPage("/pages/user/info/realname")}}},[a("v-uni-image",{staticClass:"icon_img",attrs:{src:"../../../static/icon2.png"}}),a("v-uni-view",{staticClass:"title"},[t._v("实名认证"),a("v-uni-text",{staticClass:"right_txt_sm"},[t._v(t._s(t.userInfo.validate_info))])],1)],1)],1),a("v-uni-view",{staticClass:"user_list",on:{click:function(e){e=t.$handleEvent(e),t.goDetailPage("/pages/user/agent/user")}}},[a("v-uni-view",{staticClass:"uni-list-cell-navigate uni-navigate-right bb0"},[a("v-uni-image",{staticClass:"icon_img",attrs:{src:"../../../static/icon3.png"}}),a("v-uni-view",{staticClass:"title"},[t._v("我的团队")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"uni-card by-card user_card"},[a("v-uni-view",{staticClass:"uni-card-content"},t._l(t.navlist,function(e,i){return a("v-uni-view",{key:i,staticClass:"user_list"},[a("v-uni-view",{class:i==t.searchIndex?"uni-list-cell-navigate uni-navigate-right bb0":"uni-list-cell-navigate uni-navigate-right",on:{click:function(a){a=t.$handleEvent(a),t.goDetailPage(e.path)}}},[a("img",{staticClass:"icon_img",attrs:{src:e.imgSrc}}),a("v-uni-view",{staticClass:"title"},[t._v(t._s(e.title))])],1)],1)}))],1)],1)],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},a0e0:function(t,e,a){"use strict";var i=a("ffd8"),n=a.n(i);n.a},e914:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,'uni-page-body[data-v-066e9aea]{height:auto;min-height:100%;background-color:#f2f2f2}.user-top-bg[data-v-066e9aea]{width:100%;height:%?420?%;position:relative}.head-pic[data-v-066e9aea]{border-radius:50%;height:%?60?%;width:%?60?%; /*background: #fecccc; opacity: 0.8;*/overflow:hidden}.head-pic uni-image[data-v-066e9aea]{height:%?60?%;width:%?60?%;border-radius:50%}.head-bj-btn[data-v-066e9aea]{width:%?120?%}.head-bj-btn uni-image[data-v-066e9aea]{height:%?40?%;width:%?120?%;margin-top:%?30?%}.head-left[data-v-066e9aea]{width:%?130?%}.head-center[data-v-066e9aea]{/* flex: 1; */color:#fff /* font-weight: 700; */}.head-nickname[data-v-066e9aea]{font-size:%?22?%;line-height:1.4;margin-left:%?20?%;font-weight:500}.head-phone[data-v-066e9aea]{font-size:%?20?%;line-height:1.4;margin-left:%?20?%}.head-bottom[data-v-066e9aea]{height:%?124?%;margin-top:%?30?%}.head-bottom-news[data-v-066e9aea]{color:#fff;width:%?120?%;text-align:center;font-weight:500;font-size:%?36?%}.head-bottom-integral[data-v-066e9aea]{color:#fff;width:%?220?%;text-align:center;font-weight:500;font-size:%?36?%}.head-bottom-invite[data-v-066e9aea]{color:#fff;width:%?170?%;text-align:center;font-weight:500;font-size:%?36?%}.head-bottom-news .text[data-v-066e9aea]{font-weight:400;font-size:%?28?%}.head-bottom-integral .text[data-v-066e9aea]{font-weight:400;font-size:%?28?%}.head-bottom-invite .text[data-v-066e9aea]{font-weight:400;font-size:%?28?%}.user-center-icon[data-v-066e9aea]{margin:%?30?% %?0?%}.uni-row-plan[data-v-066e9aea]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;background-color:#4dc5bb;border-radius:%?15?%;height:%?180?%}.uni-row-vip[data-v-066e9aea]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;background-color:#e97070;border-radius:%?15?%;height:%?180?%}.uni-row-pd[data-v-066e9aea]{width:%?30?%}.uni-row-plan .plan-title[data-v-066e9aea]{font-size:%?34?%;line-height:%?50?%;color:#fff}.uni-row-plan .plan-btn[data-v-066e9aea]{font-size:%?24?%;display:block;line-height:%?80?%;color:#c7eae6}.uni-row-plan .plan-num[data-v-066e9aea]{font-size:%?34?%;line-height:%?50?%;color:#fff}.uni-row-vip .vip-title[data-v-066e9aea]{font-size:%?34?%;line-height:%?50?%;color:#fff}.uni-row-vip .vip-btn[data-v-066e9aea]{font-size:%?24?%;display:block;line-height:%?80?%;color:#f9dbdb}.uni-row-vip .vip-num[data-v-066e9aea]{font-size:%?34?%;line-height:%?50?%;color:#fff}.uni-row-vip .vip-num uni-image[data-v-066e9aea]{width:%?58?%;height:%?58?%;margin-top:%?0?%}.user_list[data-v-066e9aea]{height:%?92?%;color:#333;font-size:%?28?%;border-bottom:1px solid #ececec}.user_list .uni-navigate-right[data-v-066e9aea]:after{font-size:%?42?%}.user_list .uni-navigate-right[data-v-066e9aea]{line-height:%?92?%/* border-bottom: 1upx solid #ecedef; */}.user_list .uni-navigate-right.bb0[data-v-066e9aea]{border-bottom:%?0?%}.user_list .title[data-v-066e9aea]{width:90%}.user_list .uni-list-cell-navigate[data-v-066e9aea]{padding:%?24?% %?10?%}.uni-card.by-card[data-v-066e9aea]{border-radius:%?12?%;-webkit-box-shadow:%?4?% %?4?% %?20?% %?4?% rgba(0,37,174,.2);box-shadow:%?4?% %?4?% %?20?% %?4?% rgba(0,37,174,.2);margin-top:%?40?%}.by-mt-30[data-v-066e9aea]{margin-top:%?40?%}.user_top[data-v-066e9aea]{padding:%?30?% %?32?%}.news_img[data-v-066e9aea]{width:%?36?%;height:%?40?%;margin-top:%?28?%}.vip_icon[data-v-066e9aea]{width:%?110?%;height:%?34?%;float:left;margin-left:%?20?%}.clearfix[data-v-066e9aea]:after{content:"";display:block;visibility:hidden;clear:both;height:0}.money_case[data-v-066e9aea]{color:#fff;padding:%?30?% %?34?%;position:relative}.info_name[data-v-066e9aea],.info_number[data-v-066e9aea]{font-size:%?26?%}.info_number[data-v-066e9aea]{font-size:%?42?%;font-weight:600;line-height:%?60?%}.info_number_td[data-v-066e9aea]{font-size:%?36?%;line-height:%?60?%;font-weight:500}.w40[data-v-066e9aea]{width:40%}.vip_btn[data-v-066e9aea]{position:absolute;top:%?40?%;right:0}.vip_btnImg[data-v-066e9aea]{width:%?172?%;height:%?80?%}.cash_case[data-v-066e9aea]{padding:%?34?% %?30?%}.cash_btn[data-v-066e9aea]{width:%?100?%;height:%?40?%;background-color:#ffa13c;border-radius:500px;color:#fff;font-size:%?24?%;line-height:%?40?%;border:0;text-align:center;margin-top:%?24?%;float:right}.cash_text1[data-v-066e9aea]{color:#999;font-size:%?24?%}.cash_text_num[data-v-066e9aea]{color:#333;font-size:%?32?%;font-weight:600}.icon_img[data-v-066e9aea]{width:%?40?%;height:%?40?%}.user_card[data-v-066e9aea]{padding:0 %?20?%}.right_txt[data-v-066e9aea]{float:right;color:#999}.right_txt_sm[data-v-066e9aea]{padding-right:%?60?%;float:right;color:#999;line-height:%?46?%}.agent_cash[data-v-066e9aea]{font-size:%?24?%;text-align:right;color:#fff;line-height:%?100?%}body.?%PAGE?%[data-v-066e9aea]{background-color:#f2f2f2}',""])},ffd8:function(t,e,a){var i=a("e914");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("2dcfa836",i,!0,{sourceMap:!1,shadowMode:!1})}}]);