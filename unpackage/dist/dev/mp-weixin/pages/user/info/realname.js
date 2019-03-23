(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/user/info/realname"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!F:/wamp64/www/xiao8jin/pages/user/info/realname.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}









































































var context = null;var _default =
{
  data: function data() {
    return {
      cardInfo: {
        realname: '',
        is_validate: '',
        card: '',
        card_img_a: '../../../static/card_a.png',
        card_img_b: '../../../static/card_b.png' },

      loading: false,
      card_a: [],
      card_b: [],
      card_a_data: '',
      card_b_data: '',
      progress: 0,
      cwidth: '1000px',
      cheight: '1000px' };

  },
  onReady: function onReady() {
    context = uni.createCanvasContext('canvas');
  },
  onLoad: function onLoad() {
    this.getIdCard();
  },
  onShow: function onShow() {

  },
  methods: {
    getIdCard: function getIdCard() {var _this = this;
      var openid = this.$store.state.openid;
      var sessionKey = this.$store.state.sessionKey;
      try {
        this.$http.post(this.websiteUrl + '/api/api/getIdCard', {
          openid: openid,
          sessionKey: sessionKey },
        function (res) {
          if (res.data.code == 1) {
            _this.cardInfo = res.data.result.cardInfo;
            if (_this.cardInfo.card == null) {
              _this.cardInfo.card = '';
            }

            if (_this.cardInfo.realname == null) {
              _this.cardInfo.realname = '';
            }
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
    addIdCard: function addIdCard() {
      var openid = this.$store.state.openid;
      var sessionKey = this.$store.state.sessionKey;
      var realname = this.cardInfo.realname;
      var card = this.cardInfo.card;
      //const card_a_data = this.card_a_data;
      //const card_b_data = this.card_b_data;
      if (realname == '') {
        uni.showModal({
          content: '请填写真实姓名',
          showCancel: false });

        return;
      }
      if (card == '') {
        uni.showModal({
          content: '请填写身份证号码',
          showCancel: false });

        return;
      }
      /*if (card_a_data == '') {
        	uni.showModal({
        		content: '请上传身份证正面',
        		showCancel: false
        	});
        	return;
        }
        if (card_b_data == '') {
        	uni.showModal({
        		content: '请上传身份证反面',
        		showCancel: false
        	});
        	return;
        }*/
      var that = this;
      try {
        if (this.loading) {
          return;
        }
        this.loading = true;

        this.$http.post(this.websiteUrl + '/api/api/addIdCard', {
          openid: openid,
          sessionKey: sessionKey,
          realname: realname,
          card: card
          //card_a_data,
          //card_b_data,
        }, function (res) {
          uni.showModal({
            content: res.data.msg,
            showCancel: false,
            success: function success() {
              that.loading = false;
              //uni.navigateBack();
              uni.redirectTo({
                url: '/pages/user/info/realname' });

            } });


        });
      } catch (e) {
        uni.showModal({
          content: '网络异常,请稍后重试...',
          showCancel: false,
          success: function success() {
            that.loading = false;
          } });

      }
    },
    upFile: function upFile(img, side) {
      var that = this;
      var openid = this.$store.state.openid;
      var sessionKey = this.$store.state.sessionKey;

      var uploadTask = uni.uploadFile({
        url: this.websiteUrl + '/api/upload/uploadcard', //仅为示例，非真实的接口地址
        filePath: img,
        name: 'file',
        formData: {
          'data': JSON.stringify({
            openid: openid,
            sessionKey: sessionKey,
            side: side }) },


        success: function success(uploadFileRes) {
          var data = JSON.parse(uploadFileRes.data);
          uni.hideLoading();
          if (data.code == 1) {
            if (side == 'front') {
              if (data.result.juhe == 1) {
                //三方识别
                if (data.result.juhedata.error_code == 0) {
                  that.card_a_data = data.result.img_url;
                  //that.cardInfo.card_img_a = data.result.card_img;
                  that.cardInfo.realname = data.result.juhedata.result.realname;
                  that.cardInfo.card = data.result.juhedata.result.idcard;
                  uni.showToast({
                    title: "成功" });

                } else {
                  uni.showModal({
                    content: data.result.juhedata.reason,
                    showCancel: false });

                }
              } else {
                that.card_a_data = data.result.img_url;
                uni.showToast({
                  title: "成功" });

              }
            } else {
              if (data.result.juhe == 1) {
                //三方识别
                if (data.result.juhedata.error_code == 0) {
                  that.card_b_data = data.result.img_url;
                  //that.cardInfo.card_img_b = data.result.card_img;
                  uni.showToast({
                    title: "成功" });

                } else {
                  uni.showModal({
                    content: data.result.juhedata.reason,
                    showCancel: false });

                }
              } else {
                that.card_b_data = data.result.img_url;
                uni.showToast({
                  title: "成功" });

              }
            }
          } else {
            uni.showToast({
              title: data.msg });

          }
        },
        fail: function fail(e) {
          console.log(e);
          uni.hideLoading();
          uni.showToast({
            title: "上传失败" });


        },
        complete: function complete(e) {
          that.progress = 0;
        } });


      uploadTask.onProgressUpdate(function (res) {
        that.progress = res.progress;
        //console.log('上传进度' + res.progress);
        //console.log('已经上传的数据长度' + res.totalBytesSent);
        //console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

        // 测试条件，取消上传任务。
        //if (res.progress > 50) {
        //uploadTask.abort();
        //}
      });
    },
    resethb: function resethb() {
      //context.clearRect(0, 0, this.cwidth, this.cheight);
      //context.draw()
    },
    chooseImage: function () {var _chooseImage = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this2 = this;var that;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                that = this;
                that.progress = 0;
                uni.chooseImage({
                  sizeType: ['compressed'],
                  sourceType: ['camera'],
                  count: 1,
                  success: function success(res) {
                    _this2.card_a = [];
                    _this2.card_a = _this2.card_a.concat(res.tempFilePaths);
                    //console.log(res.tempFilePaths)
                    var index = _this2.card_a.length;
                    if (index >= 1) {
                      _this2.cardInfo.card_img_a = _this2.card_a[index - 1];
                      var tempFilePaths = res.tempFilePaths;
                      var side = 'front';
                      uni.showLoading({ title: '识别中...' });
                      try {
                        uni.getImageInfo({
                          src: tempFilePaths[index - 1],
                          success: function success(image) {
                            //console.log(image.width);
                            //console.log(image.height);
                            that.resethb();
                            if (image.width > 1000) {
                              that.cwidth = image.width / 7 + 'px';
                              that.cheight = image.height / 7 + 'px';
                              context.drawImage(tempFilePaths[index - 1], 0, 0, image.width / 7, image.height / 7);
                              context.draw(false, function () {
                                uni.canvasToTempFilePath({
                                  canvasId: 'canvas',
                                  success: function success(g) {
                                    that.upFile(g.tempFilePath, side);
                                  },
                                  fail: function fail(err) {
                                    console.error(JSON.stringify(err));
                                    uni.hideLoading();
                                    uni.showToast({
                                      title: "图片压缩失败" });

                                  } });

                              });

                              //setTimeout(,3000);
                            } else {
                              that.upFile(tempFilePaths[index - 1], side);
                            }

                          } });


                        //console.log(res);
                        return;

                      } catch (e) {
                        uni.hideLoading();
                      }
                    } else {
                      uni.showToast({
                        title: "没有选中图片" });

                    }
                  } });case 3:case "end":return _context.stop();}}}, _callee, this);}));function chooseImage() {return _chooseImage.apply(this, arguments);}return chooseImage;}(),


    chooseImageB: function () {var _chooseImageB = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var _this3 = this;var that, openid, sessionKey;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                that = this;
                openid = this.$store.state.openid;
                sessionKey = this.$store.state.sessionKey;
                that.progress = 0;
                uni.chooseImage({
                  sizeType: ['compressed'],
                  sourceType: ['camera'],
                  count: 1,
                  success: function success(res) {
                    _this3.card_b = [];
                    _this3.card_b = _this3.card_b.concat(res.tempFilePaths);
                    //console.log(res.tempFilePaths)
                    var index = _this3.card_b.length;
                    if (index >= 1) {
                      _this3.cardInfo.card_img_b = _this3.card_b[index - 1];
                      var tempFilePaths = res.tempFilePaths;
                      var side = 'back';
                      uni.showLoading({ title: '识别中...' });
                      try {
                        uni.getImageInfo({
                          src: tempFilePaths[index - 1],
                          success: function success(image) {
                            //console.log(image.width);
                            //console.log(image.height);
                            that.resethb();
                            if (image.width > 1000) {
                              that.cwidth = image.width / 7 + 'px';
                              that.cheight = image.height / 7 + 'px';
                              context.drawImage(tempFilePaths[index - 1], 0, 0, image.width / 7, image.height / 7);
                              context.draw(false, function () {
                                uni.canvasToTempFilePath({
                                  canvasId: 'canvas',
                                  success: function success(g) {
                                    that.upFile(g.tempFilePath, side);
                                  },
                                  fail: function fail(err) {
                                    console.error(JSON.stringify(err));
                                    uni.hideLoading();
                                    uni.showToast({
                                      title: "图片压缩失败" });

                                  } });

                              });

                            } else {
                              that.upFile(tempFilePaths[index - 1], side);
                            }

                          } });


                        //console.log(res);
                        return;
                      } catch (e) {
                        uni.hideLoading();
                      }
                    } else {
                      uni.showToast({
                        title: "没有选中图片" });

                    }
                  } });case 5:case "end":return _context2.stop();}}}, _callee2, this);}));function chooseImageB() {return _chooseImageB.apply(this, arguments);}return chooseImageB;}() } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!F:/wamp64/www/xiao8jin/pages/user/info/realname.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=template&id=7a38a2cb&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!F:/wamp64/www/xiao8jin/pages/user/info/realname.vue?vue&type=template&id=7a38a2cb& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("view", [
    _c(
      "view",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.progress > 0,
            expression: "progress>0"
          }
        ],
        staticClass: "top-jd"
      },
      [_c("progress", { attrs: { percent: _vm.progress } })],
      1
    ),
    _c(
      "view",
      { staticStyle: { overflow: "scroll", height: "0rpx", width: "100%" } },
      [
        _c("canvas", {
          staticClass: "canvas-element",
          style: { width: _vm.cwidth, height: _vm.cheight },
          attrs: { "canvas-id": "canvas" }
        })
      ]
    ),
    _c(
      "view",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.cardInfo.is_validate === 1,
            expression: "cardInfo.is_validate===1"
          }
        ]
      },
      [
        _c("view", { staticClass: "realname-yes" }, [
          _vm._m(0),
          _c("view", { staticClass: "uni-list-cell-navigate bt-color" }, [
            _vm._v("姓名"),
            _c("text", { staticClass: "uni-list-cell-left by-sdh" }, [
              _vm._v(_vm._s(_vm.cardInfo.realname))
            ])
          ]),
          _c("view", { staticClass: "uni-list-cell-navigate bt-color" }, [
            _vm._v("身份证号"),
            _c("text", { staticClass: "uni-list-cell-left by-sdh" }, [
              _vm._v(_vm._s(_vm.cardInfo.card))
            ])
          ])
        ])
      ]
    ),
    _c(
      "view",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.cardInfo.is_validate === 0,
            expression: "cardInfo.is_validate===0"
          }
        ]
      },
      [
        _c(
          "view",
          { staticClass: "card_img_bg", staticStyle: { display: "none" } },
          [
            _c("view", { staticClass: "card_tip" }, [
              _vm._v("请上传本人有效期内的身份证照片，享受更多权益")
            ]),
            _c(
              "view",
              {
                staticClass: "uni-flex uni-row",
                staticStyle: { "justify-content": "center" }
              },
              [
                _vm._m(1),
                _c("view", { staticClass: "text flex-w20" }),
                _c(
                  "view",
                  {
                    staticClass: "text card_img",
                    attrs: { eventid: "f5d42436-0" },
                    on: { click: _vm.chooseImage }
                  },
                  [
                    _c("image", {
                      attrs: {
                        src: _vm.cardInfo.card_img_a
                          ? _vm.cardInfo.card_img_a
                          : "../../../static/card_a.png"
                      }
                    })
                  ]
                )
              ]
            ),
            _c(
              "view",
              {
                staticClass: "uni-flex uni-row",
                staticStyle: { "justify-content": "center" }
              },
              [
                _vm._m(2),
                _c("view", { staticClass: "text flex-w20" }),
                _c(
                  "view",
                  {
                    staticClass: "text card_img",
                    attrs: { eventid: "f5d42436-1" },
                    on: { click: _vm.chooseImageB }
                  },
                  [
                    _c("image", {
                      attrs: {
                        src: _vm.cardInfo.card_img_b
                          ? _vm.cardInfo.card_img_b
                          : "../../../static/card_b.png"
                      }
                    })
                  ]
                )
              ]
            )
          ]
        ),
        _c("view", { staticClass: "uni-padding-wrap" }, [
          _c("view", { staticClass: "uni-card by-card" }, [
            _c("view", { staticClass: "uni-card-content" }, [
              _c(
                "view",
                { staticClass: "uni-form-item uni-column by-border-bottom" },
                [
                  _c("view", { staticClass: "with-fun" }, [
                    _vm._m(3),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.cardInfo.realname,
                          expression: "cardInfo.realname"
                        }
                      ],
                      staticClass: "uni-input",
                      attrs: {
                        maxlength: "20",
                        placeholder: "",
                        eventid: "f5d42436-2"
                      },
                      domProps: { value: _vm.cardInfo.realname },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.cardInfo.realname = $event.target.value
                        }
                      }
                    })
                  ])
                ]
              ),
              _c("view", { staticClass: "uni-form-item uni-column" }, [
                _c("view", { staticClass: "with-fun" }, [
                  _vm._m(4),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.cardInfo.card,
                        expression: "cardInfo.card"
                      }
                    ],
                    staticClass: "uni-input",
                    attrs: {
                      type: "idcard",
                      placeholder: "",
                      eventid: "f5d42436-3"
                    },
                    domProps: { value: _vm.cardInfo.card },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.cardInfo.card = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ])
          ]),
          _c(
            "view",
            { staticClass: "by-mt-30 by-mb-30" },
            [
              _c(
                "button",
                {
                  staticClass: "by-button-submit",
                  attrs: {
                    type: "warn",
                    disabled: _vm.cardInfo.is_validate === 1 ? true : false,
                    loading: _vm.loading,
                    eventid: "f5d42436-4"
                  },
                  on: { click: _vm.addIdCard }
                },
                [_vm._v("提交认证")]
              )
            ],
            1
          )
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "yes-img" }, [
      _c("image", { attrs: { src: "../../../static/realname-yes.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "text card_img" }, [
      _c("image", { attrs: { src: "../../../static/card_a_sl.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "text card_img" }, [
      _c("image", { attrs: { src: "../../../static/card_b_sl.png" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "by-sdhf" }, [
      _vm._v("真实姓名"),
      _c("text")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "by-sdhf" }, [
      _vm._v("身份证号"),
      _c("text")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\main.js?{\"page\":\"pages%2Fuser%2Finfo%2Frealname\"}":
/*!********************************************************************************!*\
  !*** F:/wamp64/www/xiao8jin/main.js?{"page":"pages%2Fuser%2Finfo%2Frealname"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "F:\\wamp64\\www\\xiao8jin\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _realname = _interopRequireDefault(__webpack_require__(/*! ./pages/user/info/realname.vue */ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_realname.default));

/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue":
/*!***********************************************************!*\
  !*** F:/wamp64/www/xiao8jin/pages/user/info/realname.vue ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _realname_vue_vue_type_template_id_7a38a2cb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./realname.vue?vue&type=template&id=7a38a2cb& */ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=template&id=7a38a2cb&");
/* harmony import */ var _realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./realname.vue?vue&type=script&lang=js& */ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _realname_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./realname.vue?vue&type=style&index=0&lang=css& */ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _realname_vue_vue_type_template_id_7a38a2cb___WEBPACK_IMPORTED_MODULE_0__["render"],
  _realname_vue_vue_type_template_id_7a38a2cb___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "F:/wamp64/www/xiao8jin/pages/user/info/realname.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** F:/wamp64/www/xiao8jin/pages/user/info/realname.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./realname.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=script&lang=js&");
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************!*\
  !*** F:/wamp64/www/xiao8jin/pages/user/info/realname.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./realname.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=template&id=7a38a2cb&":
/*!******************************************************************************************!*\
  !*** F:/wamp64/www/xiao8jin/pages/user/info/realname.vue?vue&type=template&id=7a38a2cb& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_template_id_7a38a2cb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./realname.vue?vue&type=template&id=7a38a2cb& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\wamp64\\www\\xiao8jin\\pages\\user\\info\\realname.vue?vue&type=template&id=7a38a2cb&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_template_id_7a38a2cb___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_realname_vue_vue_type_template_id_7a38a2cb___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["F:\\wamp64\\www\\xiao8jin\\main.js?{\"page\":\"pages%2Fuser%2Finfo%2Frealname\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/info/realname.js.map