(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/agent/service"],{"2a85":function(t,e,a){"use strict";var n=a("bcbb"),s=a.n(n);s.a},"4caf":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("view",{staticClass:"uni-padding-wrap"},[a("view",{staticClass:"uni-card by-card"},[a("view",{staticClass:"uni-card-content"},[a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"043a2a26-0"},on:{tap:t.makePhoneCall}},[t._v("客服电话"),a("text",{staticClass:"uni-list-cell-left by-sdh"},[t._v(t._s(t.userInfo.telphone))])])]),a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate  ",attrs:{eventid:"043a2a26-1"},on:{tap:t.makePhoneCall}},[t._v("微信"),a("text",{staticClass:"uni-list-cell-left by-sdh"},[t._v("123456")])])]),a("view",{staticClass:"hg50"},[a("view",{staticClass:"uni-list-cell-navigate ",staticStyle:{"border-bottom":"0"},attrs:{eventid:"043a2a26-2"},on:{tap:t.makePhoneCall}},[t._v("QQ"),a("text",{staticClass:"uni-list-cell-left by-sdh"},[t._v("123456")])])])])])])])},s=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return s})},"4cfe":function(t,e,a){"use strict";a.r(e);var n=a("4caf"),s=a("e8a8");for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);a("2a85");var l=a("2877"),c=Object(l["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},8633:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{userInfo:{telphone:"17790270662"}}},methods:{makePhoneCall:function(){t.makePhoneCall({phoneNumber:this.userInfo.telphone,success:function(){console.log("成功拨打电话")}})}}};e.default=a}).call(this,a("649d")["default"])},"92f4":function(t,e,a){"use strict";a("a8bc");var n=i(a("b0ce")),s=i(a("4cfe"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(s.default))},bcbb:function(t,e,a){},e8a8:function(t,e,a){"use strict";a.r(e);var n=a("8633"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=s.a}},[["92f4","common/runtime","common/vendor"]]]);