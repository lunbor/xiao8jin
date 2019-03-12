require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([32],{192:function(t,e,i){"use strict";var s=n(i(2)),a=n(i(193));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(a.default))},193:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(195),a=i.n(s),n=i(196);var c=function(t){i(194)},l=i(0)(a.a,n.a,c,null,null);e.default=l.exports},194:function(t,e){},195:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{credit_id:"",temp_id:"",card:[],loading:!1,show:!0,repayTemp:[],bannerShow:!1}},computed:{},onLoad:function(e){e.credit_id&&e.temp_id?(this.credit_id=e.credit_id,this.temp_id=e.temp_id):t.switchTab({url:"/pages/tabBar/card/card"})},onShow:function(){this.getRepayTemp()},onBackPress:function(){},methods:{goDetailPage:function(e){t.navigateTo({url:e})},closeBanner:function(){this.bannerShow=!1},getTipZzj:function(){this.bannerShow=!0},submitRepayStep:function(){var e=this.$store.state.openid,i=this.$store.state.sessionKey,s=this.temp_id,a=this.credit_id,n=this;try{if(this.loading)return;this.loading=!0,this.$http.post(this.websiteUrl+"/api/repay/submitRepayStep",{openid:e,sessionKey:i,temp_id:s,credit_id:a},function(e){1==e.data.code?""!=e.data.result.url?(n.loading=!1,t.navigateTo({url:"/pages/card/web-view/web-view?url="+e.data.result.url})):t.showModal({content:e.data.msg,showCancel:!1,success:function(){n.loading=!1,t.navigateTo({url:"/pages/card/credit/repayInfo?credit_id="+n.credit_id})}}):t.showModal({content:e.data.msg,showCancel:!1,success:function(){n.loading=!1}})})}catch(e){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1,success:function(){n.loading=!1}})}},getRepayTemp:function(){var e=this,i=this.$store.state.openid,s=this.$store.state.sessionKey,a=this.credit_id,n=this.temp_id;try{this.$http.post(this.websiteUrl+"/api/repay/getRepayTemp",{openid:i,sessionKey:s,credit_id:a,temp_id:n},function(i){1==i.data.code?(e.card=i.data.result.creditCard,e.repayTemp=i.data.result.repayTemp.temp_body):t.showModal({content:i.data.msg,showCancel:!1})})}catch(e){t.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}},trigerCollapse:function(){this.show=!this.show}}}}).call(e,i(1).default)},196:function(t,e,i){"use strict";var s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",[i("view",{staticClass:"uni-card uni-card-red md15",style:{background:t.card.color}},[i("view",{staticClass:"uni-triplex-row pd15"},[i("view",{staticClass:"uni-triplex-left lf7"},[t._v(t._s(t.card.bank_name)),i("text",[t._v(t._s(t.card.credit_code))])]),i("view",{staticClass:"uni-triplex-right rg3"},[i("button",{staticClass:"mini-btn",attrs:{type:"primary",size:"mini"}},[t._v("信用卡")])],1)]),i("view",{staticClass:"uni-triplex-row linebg"}),i("view",{staticClass:"uni-flex uni-row"},[i("view",{staticClass:"flex-item ls3"},[i("view",{staticClass:"ls3-row"},[t._v("￥"),i("text",[t._v(t._s(t.card.line_credit))])]),i("view",[t._v("额度")])]),i("view",{staticClass:"flex-item ls3"},[i("view",{staticClass:"ls3-row"},[i("text",[t._v(t._s(t.card.bill_time))]),t._v("日")]),i("view",[t._v("账单日")])]),i("view",{staticClass:"flex-item ls3"},[i("view",{staticClass:"ls3-row"},[i("text",[t._v(t._s(t.card.repay_time))]),t._v("日")]),i("view",[t._v("还款日")])])])]),i("view",{staticClass:"uni-padding-wrap"},[i("view",{staticClass:"uni-card by-card"},[i("view",{staticClass:"uni-card-content p15"},[i("view",{staticClass:"repay_title"},[t._v("还款金额：￥"),i("text",[t._v(t._s(t.repayTemp.total/100))])]),i("view",{staticClass:"uni-timeline",staticStyle:{padding:"30upx 20upx","background-color":"#fff"}},t._l(t.repayTemp.list,function(e,s){return 2==e.type?i("view",{key:s,staticClass:"uni-timeline-item",class:1==s?"uni-timeline-first-item":s==t.repayTemp.list.length-1?"uni-timeline-last-item":""},[i("view",{staticClass:"uni-timeline-item-keynode"},[t._v(t._s(e.chtime))]),i("view",{staticClass:"uni-timeline-item-divider"}),i("view",{staticClass:"uni-timeline-item-content"},[i("view",{staticClass:"uni-flex uni-row"},[i("view",{staticClass:"text list-money"},[t._v("￥"),i("text",[t._v(t._s(e.money/100))])]),i("view",{staticClass:"text list-type"},[t._v("还款")])])])]):t._e()}))])]),i("view",{staticClass:"uni-card by-card"},[i("view",{staticClass:"uni-card-content p15"},[i("view",{staticClass:"uni-list-cell uni-collapse"},[i("view",{staticClass:"uni-list-cell-navigate uni-navigate-bottom repay-mx",class:t.show?"uni-active":""},[i("view",{staticClass:"text"},[i("view",{staticClass:"uni-icon uni-icon-help-filled help-filled",attrs:{eventid:"3Yi-0"},on:{click:function(e){t.getTipZzj()}}}),t._v("周转金："),i("text",[t._v("￥"+t._s(t.repayTemp.minMoney/100))])]),i("view",{staticClass:"uni-list-cell-left",attrs:{eventid:"7BH-1"},on:{click:function(e){t.trigerCollapse()}}},[t._v("明细")])]),i("view",{staticClass:"uni-collapse-content",class:t.show?"uni-active mt15":""},[i("view",{staticClass:"uni-flex uni-row repay-fee",staticStyle:{"justify-content":"space-between"}},[i("view",{staticClass:"text uni-list-cell-left"},[t._v("还款金额")]),i("view",{staticClass:"text uni-list-cell-left"},[t._v("￥"+t._s(t.repayTemp.total/100))])]),i("view",{staticClass:"uni-flex uni-row repay-fee",staticStyle:{"justify-content":"space-between"}},[i("view",{staticClass:"text uni-list-cell-left"},[t._v("还款手续费")]),i("view",{staticClass:"text uni-list-cell-left"},[t._v("￥"+t._s(t.repayTemp.sMoney/100))])]),i("view",{staticClass:"uni-flex uni-row repay-fee",staticStyle:{"justify-content":"space-between"}},[i("view",{staticClass:"text uni-list-cell-left"},[t._v("还款次数费")]),i("view",{staticClass:"text uni-list-cell-left"},[t._v("￥"+t._s(t.repayTemp.payNum))])])])])])])]),i("view",{staticClass:"uni-common-mt uni-padding-wrap uni-common-mb"},[i("button",{staticClass:"by-button-submit",attrs:{type:"warn",loading:t.loading,eventid:"TEc-2"},on:{click:t.submitRepayStep}},[t._v("提交计划")])],1),t.bannerShow?i("view",{staticClass:"uni-banner"},[i("view",[i("view",{staticClass:"uni-card by-card"},[i("view",{staticClass:"uni-card-content pd15"},[t._m(0),t._m(1),t._m(2),t._m(3),t._m(4),i("view",{staticClass:"text"},[i("button",{staticClass:"queren-btn",attrs:{type:"warn",eventid:"YaX-3"},on:{click:function(e){t.goDetailPage("/pages/user/vip/vip")}}},[t._v("立即办理")])],1)])])]),i("view",{staticClass:"tip_cancel",attrs:{eventid:"XJj-4"},on:{tap:t.closeBanner}},[i("image",{attrs:{src:"../../../static/wk_tip_cancel.png"}})])]):t._e(),t.bannerShow?i("view",{staticClass:"uni-mask"}):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"tip_btn"},[e("text",[this._v("*")]),this._v(" 周转金:信用卡需要预留的额度;")])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"tip_btn"},[e("text",[this._v("*")]),this._v(" 平台收取的手续费=还款手续费+还款次数费;")])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"tip_btn"},[e("text",[this._v("*")]),this._v(" 若中途还款失败，平台只收取已经交易成功部分的手续费;")])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"tip_btn"},[e("text",[this._v("*")]),this._v(" 信用卡额度不足周转金金额，会导致还款计划失败;")])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"tip_btn"},[e("text",[this._v("* 办理VIP年费会员并且积分达1000以上可享受平台垫资周转金服务;")])])}]};e.a=s}},[192]);