(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-news-news"],{"325c":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".load-more[data-v-f7d5bfdc]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.loading-img[data-v-f7d5bfdc]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-f7d5bfdc]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-f7d5bfdc]{position:absolute}.load1[data-v-f7d5bfdc],.load2[data-v-f7d5bfdc],.load3[data-v-f7d5bfdc]{height:24px;width:24px}.load2[data-v-f7d5bfdc]{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-f7d5bfdc]{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-f7d5bfdc]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-f7d5bfdc 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-f7d5bfdc]:first-child{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-f7d5bfdc]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-f7d5bfdc]:nth-child(3){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-f7d5bfdc]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-f7d5bfdc]:first-child{-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-f7d5bfdc]:first-child{-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-f7d5bfdc]:first-child{-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-f7d5bfdc]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-f7d5bfdc]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-f7d5bfdc]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-f7d5bfdc]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-f7d5bfdc]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-f7d5bfdc]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-f7d5bfdc]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-f7d5bfdc]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-f7d5bfdc]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-f7d5bfdc{0%{opacity:1}to{opacity:.2}}",""])},"32ce":function(t,e,i){"use strict";i.r(e);var a=i("c5eb"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},3452:function(t,e,i){var a=i("6c36");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("5491b3a4",a,!0,{sourceMap:!1,shadowMode:!1})},"41bb":function(t,e,i){"use strict";var a=i("3452"),n=i.n(a);n.a},"658f":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=a},6720:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[0==t.no_list?i("v-uni-view",{staticClass:"no-list"},[i("v-uni-image",{attrs:{src:"../../../static/no-list.png"}})],1):t._e(),1==t.no_list?i("v-uni-view",{staticClass:"uni-padding-wrap list-view"},t._l(t.list,function(e,a){return i("v-uni-view",{key:a,staticClass:"list-item uni-flex uni-row",on:{click:function(i){i=t.$handleEvent(i),t.goDetailPage("/pages/user/news/newsInfo?m_id="+e.message_id)}}},[i("v-uni-view",{staticClass:"news-tip"},[i("v-uni-view",{staticClass:"tip-yd"})],1),i("v-uni-view",{staticStyle:{flex:"1"}},[i("v-uni-view",{staticClass:"uni-flex uni-row uni-list-cell-navigate uni-navigate-right justify"},[i("v-uni-view",{staticClass:"news-title"},[t._v(t._s(e.message))])],1),i("v-uni-view",{staticClass:"news-data"},[t._v(t._s(e.data))]),i("v-uni-view",{staticClass:"news-time"},[t._v(t._s(e.send_time))])],1)],1)})):t._e(),1==t.is_load?i("uni-load-more",{attrs:{loadingType:t.loadingType,contentText:t.contentText}}):t._e()],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"6c36":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-a0eb2768]{height:auto;min-height:100%;background-color:#f7f8fa}.list-view[data-v-a0eb2768]{padding:%?0?% 0;width:100%}.list-item[data-v-a0eb2768]{margin:%?0?% %?0?% %?10?% %?0?%;height:%?150?%;padding:%?20?% %?30?%;border-bottom:%?2?% solid #eee;border-top:%?2?% solid #eee;text-align:left;background:#fff}.justify[data-v-a0eb2768]{width:%?680?%;padding:%?0?%}.news-title[data-v-a0eb2768]{font-size:%?32?%;line-height:%?50?%;font-weight:500}.news-data[data-v-a0eb2768]{width:%?650?%;height:%?50?%;line-height:%?50?%;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;font-size:%?24?%;color:#666;white-space:nowrap}.news-time[data-v-a0eb2768]{width:%?650?%;color:#b0b0b0;height:%?50?%;line-height:%?50?%;font-size:%?24?%}.news-tip[data-v-a0eb2768]{width:%?16?%;padding-right:%?20?%;padding-top:%?16?%}.tip-yd[data-v-a0eb2768]{background-color:#fe5950;border-radius:50%;width:%?16?%;height:%?16?%}.uni-list-cell-navigate.uni-navigate-right[data-v-a0eb2768]:after{font-size:%?40?%;line-height:%?50?%}.no-list[data-v-a0eb2768]{text-align:center;height:%?260?%;padding-top:50%}.no-list uni-image[data-v-a0eb2768]{width:%?185?%;height:%?60?%}body.?%PAGE?%[data-v-a0eb2768]{background-color:#f7f8fa}",""])},"85c6":function(t,e,i){"use strict";var a=i("9b85"),n=i.n(a);n.a},"9b85":function(t,e,i){var a=i("325c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("284a6e48",a,!0,{sourceMap:!1,shadowMode:!1})},"9c3f":function(t,e,i){"use strict";i.r(e);var a=i("6720"),n=i("32ce");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("41bb");var d=i("2877"),s=Object(d["a"])(n["default"],a["a"],a["b"],!1,null,"a0eb2768",null);e["default"]=s.exports},"9cb5":function(t,e,i){"use strict";i.r(e);var a=i("e6de"),n=i("f706");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("85c6");var d=i("2877"),s=Object(d["a"])(n["default"],a["a"],a["b"],!1,null,"f7d5bfdc",null);e["default"]=s.exports},c5eb:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("9cb5"));function n(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{list:[],page:1,is_load:0,no_list:0,loadingType:0,contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}},onLoad:function(){this.getMessage()},onPullDownRefresh:function(){this.loadingType=0,this.page=1,this.list=[],this.is_load=0,this.getMessage(),uni.stopPullDownRefresh()},onReachBottom:function(){0===this.loadingType&&(this.loadingType=1,this.getMessage())},methods:{goDetailPage:function(t){var e=this.$store.state.openid;null===e?uni.navigateTo({url:"/pages/user/login/login"}):uni.navigateTo({url:t})},getMessage:function(){var t=this,e=this.$store.state.openid,i=this.$store.state.sessionKey,a=this.page;try{this.$http.post(this.websiteUrl+"/api/message/getMessage",{openid:e,sessionKey:i,page:a},function(e){1==e.data.code?e.data.result.list.length>=1?(t.list=t.list.concat(e.data.result.list),t.loadingType=0,t.page=t.page+1,t.is_load=1,t.no_list=1):(t.loadingType=2,1==t.page&&(t.no_list=0,t.is_load=0)):(t.loadingType=0,uni.showModal({content:e.data.msg,showCancel:!1}))})}catch(n){this.loadingType=0,uni.showModal({content:"网络异常,请稍后重试...",showCancel:!1})}}},components:{uniLoadMore:a.default}};e.default=o},e6de:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"load-more"},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.loadingType&&t.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[i("v-uni-view",{staticClass:"load1"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1),i("v-uni-view",{staticClass:"load2"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1),i("v-uni-view",{staticClass:"load3"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1)],1),i("v-uni-text",{staticClass:"loading-text",style:{color:t.color}},[t._v(t._s(0===t.loadingType?t.contentText.contentdown:1===t.loadingType?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},f706:function(t,e,i){"use strict";i.r(e);var a=i("658f"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a}}]);