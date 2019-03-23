(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/login/reg"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!F:/wamp64/www/xiao8jin/pages/user/login/reg.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













































var _uniPopup = _interopRequireDefault(__webpack_require__(/*! ../../../components/uni-popup.vue */ "F:\\wamp64\\www\\xiao8jin\\components\\uni-popup.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  data: function data() {
    return {
      showPassword: true,
      showClearIcon: false,
      inputClearValue: "",
      loading: false,
      popType: 'middle',
      tiptitle: '提示',
      showPopupMiddle: false,
      tipcontent: '',
      is_sms: true,
      Loop: '',
      downtime: 60,
      verifyCode: '',
      smsCode: '',
      fsbtn: '发送验证码' };

  },
  onLoad: function onLoad() {

  },
  onPullDownRefresh: function onPullDownRefresh() {
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: this.webshareTitle,
      path: '/pages/tabBar/index/index' };

  },
  onNavigationBarButtonTap: function onNavigationBarButtonTap(e) {
  },
  methods: {
    goDetailPage: function goDetailPage(url) {
      uni.navigateTo({
        url: url });

    },
    //统一的关闭popup方法
    hidePopup: function hidePopup() {
      this.showPopupMiddle = false;
      this.showPopupTop = false;
      this.showPopupBottom = false;
    },
    //展示居中 popup
    showMiddlePopup: function showMiddlePopup() {
      this.hidePopup();
      this.popType = 'middle';
      this.showPopupMiddle = true;
    },
    changePassword: function changePassword() {
      this.showPassword = !this.showPassword;
    },
    bindClearInput: function bindClearInput(e) {
      this.inputClearValue = e.target.value;
      if (e.target.value.length > 0) {
        this.showClearIcon = true;
      } else {
        this.showClearIcon = false;
      }
    },
    clearIcon: function clearIcon() {
      this.inputClearValue = "";
      this.showClearIcon = false;
    },
    formSubmit: function formSubmit(e) {var _this = this;
      var phone = e.detail.value.account;
      var password = e.detail.value.password;
      var smsCode = e.detail.value.smsCode;
      var verifyCode = this.verifyCode;
      var shareId = uni.getStorageSync('shareId');
      var agentId = uni.getStorageSync('agentId');
      var qdId = uni.getStorageSync('qdId');
      if (phone === '') {
        uni.showModal({
          content: '请填写手机号',
          showCancel: false });

        return false;
      }

      if (smsCode === '') {
        uni.showModal({
          content: '请填写验证码',
          showCancel: false });

        return false;
      }

      if (verifyCode === '') {
        uni.showModal({
          content: '请先获取验证码',
          showCancel: false });

        return false;
      }

      if (password === '') {
        uni.showModal({
          content: '请填写6~18位字符新密码',
          showCancel: false });

        return false;
      }
      var that = this;
      try {
        this.$http.post(this.websiteUrl + '/api/api/reg', { phone: phone, password: password, smsCode: smsCode, verifyCode: verifyCode, shareId: shareId, agentId: agentId, qdId: qdId }, function (res) {
          if (res.data.code == 1) {
            uni.showModal({
              content: res.data.msg,
              showCancel: false,
              success: function success() {
                _this.$store.dispatch('apiLogin', { openid: res.data.result.token, sessionKey: res.data.result.session_id });
                uni.switchTab({
                  url: '/pages/tabBar/user/user' });

              } });


            //uni.navigateBack();
          } else {
            uni.showModal({
              content: res.data.msg,
              showCancel: false,
              success: function success() {
                that.loading = false;
              } });

          }
        });
      } catch (e) {
        uni.showModal({
          content: '网络异常,请稍后重试...',
          showCancel: false,
          success: function success() {
            that.loading = false;
          } });

      }

      //console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
    },
    getClause: function getClause() {var _this2 = this;
      try {
        this.$http.post(this.websiteUrl + '/api/api/getClause', {}, function (res) {
          if (res.data.code == 1) {
            _this2.tiptitle = '隐私条款';
            _this2.tipcontent = res.data.result.article.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
            _this2.showMiddlePopup();
          } else {
            uni.showModal({
              content: res.data.msg,
              showCancel: false });

          }
        });
      } catch (e) {
        uni.showModal({
          content: '网络异常,请稍后重试...',
          showCancel: false });

      }
    },
    sendSMS: function sendSMS(e) {var _this3 = this;
      if (this.is_sms) {
        this.is_sms = false;
        var phone = this.inputClearValue;
        if (phone === '') {
          uni.showModal({
            content: '请填写手机号',
            showCancel: false });

          return false;
        }
        try {
          this.$http.post(this.websiteUrl + '/api/api/sendSMS', {
            phone: phone },
          function (res) {
            if (res.data.code == 1) {
              _this3.downtime = 60;
              _this3.dateDown();
              _this3.verifyCode = res.data.result;
            } else {
              uni.showModal({
                content: res.data.msg,
                showCancel: false });

              _this3.is_sms = true;
            }
          });
        } catch (e) {
          uni.showModal({
            content: '网络异常,请稍后重试...',
            showCancel: false });

          this.is_sms = true;
        }
      }
    },
    dateDown: function dateDown() {
      var that = this;
      this.fsbtn = '重新发送(' + this.downtime + ')';
      this.Loop = setInterval(function () {
        if (that.downtime == 0) {
          that.fsbtn = '发送验证码';
          that.is_sms = true;
          clearInterval(that.Loop);
          return;
        }
        that.downtime--;
        that.fsbtn = '重新发送(' + this.downtime + ')';
      }.bind(this), 1000);
      if (this.is_sms) {
        clearInterval(this.Loop);
      }
    } },

  components: {
    uniPopup: _uniPopup.default } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!F:/wamp64/www/xiao8jin/pages/user/login/reg.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=template&id=a8befe62&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!F:/wamp64/www/xiao8jin/pages/user/login/reg.vue?vue&type=template&id=a8befe62& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: "uni-common-pb" },
    [
      _vm._m(0),
      _c(
        "view",
        { staticClass: "uni-padding-wrap" },
        [
          _c(
            "form",
            {
              attrs: { eventid: "3d91522e-6" },
              on: { submit: _vm.formSubmit }
            },
            [
              _c("view", { staticClass: "uni-form-item uni-column" }, [
                _c("view", { staticClass: "with-fun by-login-input" }, [
                  _c("input", {
                    staticClass: "uni-input",
                    attrs: {
                      type: "number",
                      name: "account",
                      placeholder: "请填写手机号",
                      value: _vm.inputClearValue,
                      eventid: "3d91522e-0"
                    },
                    on: { input: _vm.bindClearInput }
                  }),
                  _vm.showClearIcon
                    ? _c("view", {
                        staticClass: "uni-icon uni-icon-clear",
                        attrs: { eventid: "3d91522e-1" },
                        on: { click: _vm.clearIcon }
                      })
                    : _vm._e()
                ])
              ]),
              _c("view", { staticClass: "uni-form-item uni-column" }, [
                _c("view", { staticClass: "with-fun by-login-input" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.smsCode,
                        expression: "smsCode"
                      }
                    ],
                    staticClass: "uni-input",
                    attrs: {
                      type: "number",
                      name: "smsCode",
                      placeholder: "请填入验证码",
                      eventid: "3d91522e-2"
                    },
                    domProps: { value: _vm.smsCode },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.smsCode = $event.target.value
                      }
                    }
                  }),
                  _c(
                    "view",
                    {
                      staticClass: "text by-dj-btn",
                      class: _vm.is_sms ? "" : "active",
                      attrs: { eventid: "3d91522e-3" },
                      on: { click: _vm.sendSMS }
                    },
                    [_vm._v(_vm._s(_vm.fsbtn))]
                  )
                ])
              ]),
              _c("view", { staticClass: "uni-form-item uni-column" }, [
                _c("view", { staticClass: "with-fun by-login-input" }, [
                  _c("input", {
                    staticClass: "uni-input",
                    attrs: {
                      placeholder: "请填写6~18位字符密码",
                      name: "password",
                      password: _vm.showPassword
                    }
                  }),
                  _c("view", {
                    staticClass: "uni-icon uni-icon-eye",
                    class: [!_vm.showPassword ? "uni-active" : ""],
                    attrs: { eventid: "3d91522e-4" },
                    on: { click: _vm.changePassword }
                  })
                ])
              ]),
              _c(
                "view",
                { staticClass: "uni-btn-v" },
                [
                  _c(
                    "button",
                    {
                      attrs: {
                        formType: "submit",
                        loading: _vm.loading,
                        type: "warn"
                      }
                    },
                    [_vm._v("注 册")]
                  )
                ],
                1
              ),
              _c("view", { staticClass: "text clause" }, [
                _vm._v("点击注册即表示您同意"),
                _c(
                  "text",
                  {
                    attrs: { eventid: "3d91522e-5" },
                    on: { click: _vm.getClause }
                  },
                  [_vm._v("《隐私条例和服务条款》")]
                )
              ])
            ]
          )
        ],
        1
      ),
      _c(
        "uni-popup",
        {
          attrs: {
            show: _vm.showPopupMiddle,
            type: _vm.popType,
            title: _vm.tiptitle,
            queren: true,
            quxiao: true,
            eventid: "3d91522e-7",
            mpcomid: "3d91522e-1"
          },
          on: { hidePopup: _vm.hidePopup }
        },
        [
          _c(
            "view",
            {
              staticClass: "uni-common-mt uni-helllo-text uni-center",
              staticStyle: { "text-align": "left" }
            },
            [
              _c("rich-text", {
                attrs: { nodes: _vm.tipcontent, mpcomid: "3d91522e-0" }
              })
            ],
            1
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "uni-login-logo" }, [
      _c("image", { attrs: { src: "../../../static/login-logo.png" } })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\main.js?{\"page\":\"pages%2Fuser%2Flogin%2Freg\"}":
/*!****************************************************************************!*\
  !*** F:/wamp64/www/xiao8jin/main.js?{"page":"pages%2Fuser%2Flogin%2Freg"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "F:\\wamp64\\www\\xiao8jin\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _reg = _interopRequireDefault(__webpack_require__(/*! ./pages/user/login/reg.vue */ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_reg.default));

/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue":
/*!*******************************************************!*\
  !*** F:/wamp64/www/xiao8jin/pages/user/login/reg.vue ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reg_vue_vue_type_template_id_a8befe62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reg.vue?vue&type=template&id=a8befe62& */ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=template&id=a8befe62&");
/* harmony import */ var _reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reg.vue?vue&type=script&lang=js& */ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _reg_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reg.vue?vue&type=style&index=0&lang=css& */ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _reg_vue_vue_type_template_id_a8befe62___WEBPACK_IMPORTED_MODULE_0__["render"],
  _reg_vue_vue_type_template_id_a8befe62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "F:/wamp64/www/xiao8jin/pages/user/login/reg.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** F:/wamp64/www/xiao8jin/pages/user/login/reg.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./reg.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=script&lang=js&");
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************!*\
  !*** F:/wamp64/www/xiao8jin/pages/user/login/reg.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./reg.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=template&id=a8befe62&":
/*!**************************************************************************************!*\
  !*** F:/wamp64/www/xiao8jin/pages/user/login/reg.vue?vue&type=template&id=a8befe62& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_template_id_a8befe62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./reg.vue?vue&type=template&id=a8befe62& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\login\\reg.vue?vue&type=template&id=a8befe62&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_template_id_a8befe62___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_reg_vue_vue_type_template_id_a8befe62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["F:\\wamp64\\www\\xiao8jin\\main.js?{\"page\":\"pages%2Fuser%2Flogin%2Freg\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/login/reg.js.map