require("../../../common/manifest.js");
require("../../../common/vendor.js");
global.webpackJsonp([14],{220:function(t,e,s){"use strict";var i=a(s(2)),n=a(s(221));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},221:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(223),n=s.n(i),a=s(224);var o=function(t){s(222)},l=s(0)(n.a,a.a,o,null,null);e.default=l.exports},222:function(t,e){},223:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i,n=s(7),a=(i=n)&&i.__esModule?i:{default:i};e.default={data:function(){return{list:[],page:1,is_load:0,no_list:0,loadingType:0,contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}},onLoad:function(){this.getMessage()},onPullDownRefresh:function(){this.loadingType=0,this.page=1,this.list=[],this.is_load=0,this.getMessage(),t.stopPullDownRefresh()},onReachBottom:function(){0===this.loadingType&&(this.loadingType=1,this.getMessage())},methods:{goDetailPage:function(e){null===this.$store.state.openid?t.navigateTo({url:"/pages/user/login/login"}):t.navigateTo({url:e})},getMessage:function(){var e=this,s=this.$store.state.openid,i=this.$store.state.sessionKey,n=this.page;try{this.$http.post(this.websiteUrl+"/api/message/getMessage",{openid:s,sessionKey:i,page:n},function(s){1==s.data.code?s.data.result.list.length>=1?(e.list=e.list.concat(s.data.result.list),e.loadingType=0,e.page=e.page+1,e.is_load=1,e.no_list=1):(e.loadingType=2,1==e.page&&(e.no_list=0,e.is_load=0)):(e.loadingType=0,t.showModal({content:s.data.msg,showCancel:!1}))})}catch(e){this.loadingType=0,t.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}}},components:{uniLoadMore:a.default}}}).call(e,s(1).default)},224:function(t,e,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[0==t.no_list?s("view",{staticClass:"no-list"},[s("image",{attrs:{src:"../../../static/no-list.png"}})]):t._e(),1==t.no_list?s("view",{staticClass:"uni-padding-wrap list-view"},t._l(t.list,function(e,i){return s("view",{key:i,staticClass:"list-item uni-flex uni-row",attrs:{eventid:"Nlm-0-"+i},on:{tap:function(s){t.goDetailPage("/pages/user/news/newsInfo?m_id="+e.message_id)}}},[t._m(0,!0),s("view",{staticStyle:{flex:"1"}},[s("view",{staticClass:"uni-flex uni-row uni-list-cell-navigate uni-navigate-right justify"},[s("view",{staticClass:"news-title"},[t._v(t._s(e.message))])]),s("view",{staticClass:"news-data"},[t._v(t._s(e.data))]),s("view",{staticClass:"news-time"},[t._v(t._s(e.send_time))])])])})):t._e(),1==t.is_load?s("uni-load-more",{attrs:{loadingType:t.loadingType,contentText:t.contentText,mpcomid:"ci3-0"}}):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"news-tip"},[e("view",{staticClass:"tip-yd"})])}]};e.a=i}},[220]);