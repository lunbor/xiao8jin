<template>
	<view>
		<view class="top-jd" v-show="progress>0">
			<progress :percent="progress" />
		</view>
		<view style="overflow: scroll; height: 0upx; width: 100%;">
		<canvas class="canvas-element"  canvas-id="canvas"  :style="{width: cwidth, height: cheight}"></canvas>
		</view>
		<view v-show="cardInfo.is_validate===1">
			<view class="realname-yes">
				<view class="yes-img"><image src="../../../static/realname-yes.png"></image></view>
				<view  class="uni-list-cell-navigate bt-color">
					姓名
					<text class="uni-list-cell-left by-sdh">{{cardInfo.realname}}</text>
				</view>
				
				<view  class="uni-list-cell-navigate bt-color">
					身份证号11111
					<text class="uni-list-cell-left by-sdh">{{cardInfo.card}}</text>
				</view>
		    </view>
		</view>
		<view v-show="cardInfo.is_validate===0">
			<view class="card_img_bg">
				<view class="card_tip">请上传本人有效期内的身份证照片，享受更多权益</view>
				<view class="uni-flex uni-row" style="justify-content: center;">
					<view class="text card_img">
						<image src="../../../static/card_a_sl.png"></image>
					</view>
					<view class="text flex-w20">
					</view>
					<view class="text card_img"  @click="chooseImage">
						<image :src="cardInfo.card_img_a?cardInfo.card_img_a:'../../../static/card_a.png'"></image>
					</view>
				</view>

				<view class="uni-flex uni-row" style="justify-content: center;">
					<view class="text card_img">
						<image src="../../../static/card_b_sl.png"></image>
					</view>
					<view class="text flex-w20">
					</view>
					<view class="text card_img"  @click="chooseImageB">
						<image :src="cardInfo.card_img_b?cardInfo.card_img_b:'../../../static/card_b.png'"></image>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<view class="upload-tip">
					<view class="upload-tip-title">身份证照片要求:</view>
					<view class="upload-tip-center">
						<view>必须本人的有效身份证，与基本信息一致</view>
						<view>照片确保身份证边框完整，字体清晰，亮度均匀</view>
						<view>照片要求4M以内，支持jpg/jpeg/png格式</view>
						<view>若识别信息有误，可手动修改身份信息</view>
					</view>
				</view>
				<view class="uni-card by-card">
					<view class="uni-card-content">
						<view class="uni-form-item uni-column by-border-bottom">
							<view class="with-fun">
								<view class="by-sdhf">真实姓名<text></text></view>
								<input class="uni-input"  maxlength="20" placeholder="" v-model="cardInfo.realname" />
							</view>
						</view>
						<view class="uni-form-item uni-column">
							<view class="with-fun">
								<view class="by-sdhf">身份证号<text></text></view>
								<input class="uni-input" type="idcard" placeholder="" v-model="cardInfo.card" />
							</view>
						</view>
					</view>
				</view>

				<view class="by-mt-30 by-mb-30">
					<button type="warn" :disabled="cardInfo.is_validate===1?true:false" class="by-button-submit" :loading="loading" @click="addIdCard">提交认证</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var context = null;
	export default {
		data() {
			return {
				cardInfo: {
					realname: '',
					is_validate: '',
					card: '',
					card_img_a: '../../../static/card_a.png',
					card_img_b: '../../../static/card_b.png',
				},
				loading: false,
				card_a: [],
				card_b: [],
				card_a_data: '',
				card_b_data: '',
				progress:0,
				cwidth:'1000px',
				cheight:'1000px',
			}
		},
		onReady: function () {
			context = uni.createCanvasContext('canvas')
		},
		onLoad() {
			this.getIdCard();
		},
		onShow() {
			
		},
		methods: {
			getIdCard: function() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl + '/api/api/getIdCard', {
						openid,
						sessionKey,
					}, (res) => {
						if (res.data.code == 1) {
							this.cardInfo = res.data.result.cardInfo;
							if(this.cardInfo.card == null){
								this.cardInfo.card = '';
							}
							
							if(this.cardInfo.realname == null){
								this.cardInfo.realname = '';
							}
						}else{
							uni.showModal({
								content: res.data.msg,
								showCancel: false
							});
						}
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
					});
				}
			},
			addIdCard: function() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const realname = this.cardInfo.realname;
				const card = this.cardInfo.card;
				const card_a_data = this.card_a_data;
				const card_b_data = this.card_b_data;
				if (realname == '') {
					uni.showModal({
						content: '请填写真实姓名',
						showCancel: false
					});
					return;
				}
				if (card == '') {
					uni.showModal({
						content: '请填写身份证号码',
						showCancel: false
					});
					return;
				}
				if (card_a_data == '') {
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
				}
				const that = this;
				try {
					if (this.loading) {
						return;
					}
					this.loading = true;

					this.$http.post(this.websiteUrl + '/api/api/addIdCard', {
						openid,
						sessionKey,
						realname,
						card,
						card_a_data,
						card_b_data,
					}, (res) => {
						uni.showModal({
							content: res.data.msg,
							showCancel: false,
							success: function() {
								that.loading = false;
								//uni.navigateBack();
								uni.redirectTo({
									url: '/pages/user/info/realname'
								});
							}
						})

					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false,
						success: function() {
							that.loading = false;
						}
					});
				}
			},
			upFile:function(img,side) {
					const that = this;
					const openid = this.$store.state.openid;
					const sessionKey = this.$store.state.sessionKey;
					
					const uploadTask = uni.uploadFile({
						url: this.websiteUrl + '/api/upload/uploadcard', //仅为示例，非真实的接口地址
						filePath: img,
						name: 'file',
						formData: {
							'data': JSON.stringify({
								openid,
								sessionKey,
								side
							})
						},
						success: (uploadFileRes) => {
							const data = JSON.parse(uploadFileRes.data);
							uni.hideLoading();
							if (data.code == 1) {
								if(side == 'front'){
									if(data.result.juhe == 1){
										//三方识别
										if(data.result.juhedata.error_code == 0){
											that.card_a_data = data.result.img_url;
											//that.cardInfo.card_img_a = data.result.card_img;
											that.cardInfo.realname = data.result.juhedata.result.realname;
											that.cardInfo.card = data.result.juhedata.result.idcard;
											uni.showToast({
												title: "成功"
											})
										}else{
											uni.showModal({
												content: data.result.juhedata.reason,
												showCancel: false
											});
										}
									}else{
										that.card_a_data = data.result.img_url;
										uni.showToast({
											title: "成功"
										})
									}
								}else{
									if(data.result.juhe == 1){
										//三方识别
										if(data.result.juhedata.error_code == 0){
											that.card_b_data  = data.result.img_url;
											//that.cardInfo.card_img_b = data.result.card_img;
											uni.showToast({
												title: "成功"
											})
										}else{
											uni.showModal({
												content: data.result.juhedata.reason,
												showCancel: false
											});
										}
									}else{
										that.card_b_data = data.result.img_url;
										uni.showToast({
											title: "成功"
										})
									}
								}
							} else {
								uni.showToast({
									title: data.msg
								})
							}
						},
						fail: (e) => {
							console.log(e);
							uni.hideLoading();
							uni.showToast({
								title: "上传失败",
							})
				
						},
						complete:(e) => {
							that.progress = 0;
						}
					});
					
					uploadTask.onProgressUpdate((res) => {
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
			resethb: function () {
				//context.clearRect(0, 0, this.cwidth, this.cheight);
				//context.draw()
			},
			chooseImage: async function() {
				const that = this;
				that.progress = 0;
				uni.chooseImage({
					sizeType: ['compressed'],
					sourceType: ['camera'],
					count: 1,
					success: (res) => {
						this.card_a = [];
						this.card_a = this.card_a.concat(res.tempFilePaths);
						//console.log(res.tempFilePaths)
						const index = this.card_a.length;
						if (index >= 1) {
							this.cardInfo.card_img_a = this.card_a[index - 1];
							const tempFilePaths = res.tempFilePaths;
							const side = 'front';
							uni.showLoading({title:'识别中...'});
							try {
								uni.getImageInfo({
									src: tempFilePaths[index - 1],
									success:  (image)=> {
										//console.log(image.width);
										//console.log(image.height);
										that.resethb();
										if(image.width > 1000){
											that.cwidth = (image.width/7)+'px';
											that.cheight = (image.height/7)+'px';
											context.drawImage(tempFilePaths[index - 1], 0, 0,image.width/7,image.height/7);
											context.draw(false,function(){
												uni.canvasToTempFilePath({
													canvasId: 'canvas',
													success: function (g) {
														that.upFile(g.tempFilePath,side);
													},
													fail: function (err) {
														console.error(JSON.stringify(err))
														uni.hideLoading();
														uni.showToast({
															title: "图片压缩失败",
														})
													}
												})
											});
											
											//setTimeout(,3000);
										}else{
											that.upFile(tempFilePaths[index - 1],side);
										}
										
									}
								});
							
								//console.log(res);
								return;
								
							} catch (e) {
								uni.hideLoading();
							}
						} else {
							uni.showToast({
								title: "没有选中图片"
							})
						}
					}
				})
			},
			chooseImageB: async function() {
				const that = this;
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				that.progress = 0;
				uni.chooseImage({
					sizeType: ['compressed'],
					sourceType: ['camera'],
					count: 1,
					success: (res) => {
						this.card_b = [];
						this.card_b = this.card_b.concat(res.tempFilePaths);
						//console.log(res.tempFilePaths)
						const index = this.card_b.length;
						if (index >= 1) {
							this.cardInfo.card_img_b = this.card_b[index - 1];
							const tempFilePaths = res.tempFilePaths;
							const side = 'back';
							uni.showLoading({title:'识别中...'});
							try {
								uni.getImageInfo({
									src: tempFilePaths[index - 1],
									success:  (image)=> {
										//console.log(image.width);
										//console.log(image.height);
										that.resethb();
										if(image.width > 1000){
											that.cwidth = (image.width/7)+'px';
											that.cheight = (image.height/7)+'px';
											context.drawImage(tempFilePaths[index - 1], 0, 0,image.width/7,image.height/7);
											context.draw(false,function(){
												uni.canvasToTempFilePath({
													canvasId: 'canvas',
													success: function (g) {
														that.upFile(g.tempFilePath,side);
													},
													fail: function (err) {
														console.error(JSON.stringify(err))
														uni.hideLoading();
														uni.showToast({
															title: "图片压缩失败",
														})
													}
												})
											});
											
										}else{
											that.upFile(tempFilePaths[index - 1],side);
										}
										
									}
								});
															
								//console.log(res);
								return;
							} catch (e) {
								uni.hideLoading();
							}
						} else {
							uni.showToast({
								title: "没有选中图片"
							})
						}
					}
				})
			},
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f7f8fa;
	}
	
	.canvas-element {
		width: 100%;
		height: auto;
		background-color: #ffffff;
	}

	.uni-card.by-card {
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
		box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
	}

	.by-border-bottom {
		border-bottom: 2upx solid #ecedef;
	}

	.card_img_bg {
		background-color: #FFFFFF;
		/* background-color: #3369ff; */
		height: 590upx;
		padding: 30upx 55upx;
	}

	.card_tip {
		color: #989898;
		/* color: #9eb9ff; */
	}

	.flex-w20 {
		width: 40upx;
	}

	.card_img {
		text-align: center;
		padding-top: 30upx;
	}

	.card_img image {
		width: 302upx;
		height: 222upx;
		margin: 0 auto;
	}

	.by-mt-30 {
		margin-top: 40upx;
	}

	.by-dj-btn {
		color: #666666;
		border: 2upx #d7d5d5 solid;
		padding: 14upx 20upx;
		height: 30upx;
		line-height: 30upx;
		border-radius: 12upx;
		margin-top: 10upx;
		margin-right: 15upx;
	}

	.by-dj-btn.active {
		order: 2upx #f7f8fa solid;
		color: #d7d5d5;
	}

	.by-button-submit {
		background-color: #fd5950;
		background: linear-gradient(left, #ff7575, #fd5950);
	}
	
	.by-button-submit[disabled]{
		background-color: #eeeeee;
		background: linear-gradient(left, #d2d2d2, #d2d2d2);
	}

	.upload-tip {
		padding-top: 10upx;
	}

	.upload-tip-title {
		color: #3a3939;
		border-bottom: 2upx solid #e0e0e0;
		line-height: 80upx;
		font-size: 32upx;
	}

	.upload-tip-center {
		color: #b4b2b2;
		font-size: 28upx;
	}

	.by-mb-30 {
		padding-bottom: 30upx;
	}
	
	.realname-yes { background-color: #FFFFFF; height: 600upx; text-align: center; padding-top: 70upx;border-bottom: 2upx #e2e2e2 solid;}
	.realname-yes .yes-img{ padding-bottom: 40upx;}
	.realname-yes .yes-img image{ width: 317upx; height: 355upx;}
	.realname-yes .bt-color{border-top: 2upx #e2e2e2 solid;}
		
		.by-sdhf {
			width: 120upx;
			height: 52upx;
			line-height: 80upx;
			color: #576175;
			font-weight: 600;
			margin-right: 20upx;
			margin-left: 20upx;
			text-align: justify;
		}
	
		.by-sdhf text {
			display: inline-block;
			height: 0upx;
			width: 100%;
		}
		
		.top-jd{
			top: 0;
			left: 0;
			width: 100%;
			text-align: center;
			position: absolute;
		}
</style>
