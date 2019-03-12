<template>
	<view class="page-bg" v-bind:style="{backgroundImage:'url(' + shareImg + ')'}">
		<view class="qscode">
			<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
		</view>

		<!-- 底部 -->
		<uni-popup :show="showPopupBottom" title="分享" :queren="queren" :type="popType" v-on:hidePopup="hidePopup">
			<view class="uni-center uni-padding-wrap">
				<!-- #ifdef APP-PLUS -->
				<view class="uni-btn-v uni-common-mt" v-if="providerList.length > 0">
					<block v-for="(value,index) in providerList" :key="index">
						<button type="primary" v-if="value" :disabled="shareType === 5 && value.name !== '分享到微信好友'" @tap="share(value)">{{value.name}}</button>
					</block>
					<block><button type="primary" @tap="shareUrlapp()">复制分享链接</button></block>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="uni-btn-v uni-common-mt">
					<button type="primary" open-type="share">分享</button>
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="uni-btn-v uni-common-mt">
				     <view class="text tishipj">您可以复制下面邀请链接发送给您的好友</view>
				    <textarea class="tishitextarea" :value="href"/>
				</view>
				<!-- #endif -->
			</view>
		</uni-popup>
		<view class="share-btn-sh"><button type="default" @tap="showBottomPopup">分享</button></view>
		
		<!-- 弹出层 -->
		<view class="uni-banner" v-if="bannerShow" @tap="closeBanner">
			<view>
				<image :src="tip_img" style="width:100%;" mode="widthFix"></image>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow" @tap="closeBanner"></view>
		<!-- 弹出层 -->
	</view>


</template>
<script>
	import qrcode from '../../../components/qrcode/qrcode.vue';
	import uniPopup from '../../../components/uni-popup.vue';
	export default {
		data() {
			return {
				bannerShow:false,
				tip_img:'../../../static/guide1.png',
				shareImg: '',
				qrval: '',
				qrsize: 100,
				showPopupBottom: false,
				queren: false,
				msg: '',
				popType: 'bottom',
				shareText: this.webshareTitle,
				href: '',
				image: '',
				shareType: 1,
				providerList: []
			}
		},
		onLoad: function() {
			
			uni.getProvider({
				service: "share",
				success: (e) => {
					console.log("success", e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin',
									sort: 0
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline',
									sort: 1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '分享到新浪微博',
									id: 'sinaweibo',
									sort: 2
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq',
									sort: 3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x, y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
					uni.showModal({
						content: "获取登录通道失败",
						showCancel: false
					})
				}
			});
		},
		onReady(){
			
		},
		onShow() {
			this.getInviteData();
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		methods: {
			getInviteData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl+'/api/agent/getInviteData',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.qrval = res.data.result.shareUrl;
							this.href = res.data.result.shareUrl;
							this.shareImg = res.data.result.shareImg;
							this.image = res.data.result.shareImg;
							//console.log(this.qrval)
							if(res.data.result.is_code == 1){
								setTimeout(()=>{
									this.creatQrcode();
								}, 500);
							}
							
						}else{
							uni.showModal({
								content:res.data.msg,
								showCancel:false
							})
						}
					});
				} catch (e) {
					uni.showModal({
						content:'网络异常,请稍后重试...',
						showCancel:false
					})
				}
			},
			creatQrcode(){
				this.$refs.qrcode.creatQrcode();
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupMiddle = false;
				this.showPopupTop = false;
				this.showPopupBottom = false;
			},
			//展示底部 popup
			showBottomPopup: function() {
				//#ifdef H5
				this.bannerShow = true;
				return true;
				//#endif
				
				this.hidePopup();
				this.popType = 'bottom';
				this.showPopupBottom = true;
			},
			closeBanner: function() {
				this.bannerShow = false;
			},
			shareUrlapp: function() {
				uni.setClipboardData({
					data: this.href,
					success: function () {
						uni.showModal({
							content: "复制成功",
							showCancel: false
						})
					}
				});
			},
			async share(e) {
				console.log("分享通道:" + e.id + "； 分享类型:" + this.shareType);

				if (!this.shareText && (this.shareType === 1 || this.shareType === 0)) {
					uni.showModal({
						content: "分享内容不能为空",
						showCancel: false
					})
					return;
				}

				if (!this.image && (this.shareType === 2 || this.shareType === 0)) {
					uni.showModal({
						content: "分享图片不能为空",
						showCancel: false
					})
					return;
				}

				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : "WXSceneSession", //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						console.log("success", e);
						uni.showModal({
							content: "分享成功",
							showCancel: false
						})
					},
					fail: (e) => {
						console.log("fail", e)
						uni.showModal({
							content: e.errMsg,
							showCancel: false
						})
					},
					complete: function() {
						console.log("分享操作结束!")
					}
				}

				switch (this.shareType) {
					case 0:
						shareOPtions.summary = this.shareText;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = this.webshareTitle;
						shareOPtions.href = this.href;
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.image ? this.image :
							'http://hszt.tw186.com/uploads/img/logo.png'
						shareOPtions.title = this.webshareTitle;
						shareOPtions.miniProgram = {
							id: "gh_33446d7f7a26",
							path: "/pages/tabBar/index/index",
							webUrl: this.href,
							type: 0
						};
						break;
					default:
						break;
				}

				if (shareOPtions.type === 0 && plus.os.name === 'iOS') { //如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if (shareOPtions.type === 1 && shareOPtions.provider === 'qq') { //如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = this.href;
					shareOPtions.title = this.webshareTitle;
				}
				uni.share(shareOPtions);
			},
			radioChange(e) {
				console.log("type:" + e.detail.value);
				this.shareType = parseInt(e.detail.value);
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						this.image = res.tempFilePaths[0];
					}
				})
			},
			compress() { //压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log("开始压缩");
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => { // 可通过entry对象操作图片 
							console.log("getFile:" + JSON.stringify(file));
							if (file.size > 20480) { // 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content: "分享图片太大,需要请重新选择图片!",
										showCancel: false
									})
								});
							}
						});
					}, (e) => {
						console.log("Resolve file URL failed: " + e.message);
						uni.showModal({
							content: "分享图片太大,需要请重新选择图片!",
							showCancel: false
						})
					});
				})
			}
		},
		components: {
			qrcode,
			uniPopup
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #d8263c;
	}

	.page-bg {
		min-height: 100%;
		height: 1214upx;
		background-color: #d8263c;
		/* background: url('http://hszt.tw186.com/uploads/img/intive_bg_1.png') no-repeat; */
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.qscode {
		padding-top: 440upx; height: 200upx;
	}
	
	.share-btn-sh{ padding-top: 30upx; width: 260upx; margin: 0 auto;}
	.share-btn-sh button{ background-color: #fe5950; color: #FFFFFF; height: 80upx; line-height: 80upx;}
	
	.tishipj{ height: 50upx; line-height: 50upx; text-align: left; color: #a1a1a1;}
	.tishitextarea{ height: 100upx; line-height: 50upx;}
	
	
	/* 遮罩层 */
	.uni-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}
	
	.tip_cancel {
		text-align: center;
	}
	
	.tip_cancel image {
		width: 70upx;
		height: 123upx;
	}
	/* 弹出层形式的广告 */
	.uni-banner {
		width: 80%;
		position: fixed;
		left: 55%;
		top: 30%;
		z-index: 99;
		transform: translate(-50%, -50%);
	}
</style>
