<template>
	<view>
		<view class="info-top-bg" style="background: url(../../../static/info-top-bg.png) no-repeat;background-size: 100% 100%;">
			<view class="uni-padding-wrap">
				<view class="info-head-pic">
					<image :src="userInfo.head_img?userInfo.head_img:'../../../static/head-no-pic.png'" :data-src="userInfo.head_img?userInfo.head_img:'../../../static/head-no-pic.png'"  @click="previewImage"></image>
				</view>
				<view class="text info-head-bj-btn" @click="chooseImage">
					<image src="../../../static/info-head-bj-btn.png"></image>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap">

			<view class="uni-card by-card">
				<view class="uni-card-content">
					<view class="hg50">
						<view @click="goDetailPage('/pages/user/info/editname?nickname='+userInfo.nickname)" class="uni-list-cell-navigate uni-navigate-right">
							昵称
							<text class="uni-list-cell-left by-sdh">{{userInfo.nickname?userInfo.nickname:'未设置'}}</text>
						</view>
					</view>
					<view class="hg50">
						<view @click="goDetailPage('/pages/user/info/editphone?mobile='+userInfo.mobile)" class="uni-list-cell-navigate uni-navigate-right">
							手机号
							<text class="uni-list-cell-left by-sdh">{{userInfo.mobile}}</text>
						</view>
					</view>
					<!--<view class="hg50">
						<view @click="goDetailPage('/pages/user/vip/vip')" class="uni-list-cell-navigate uni-navigate-right">
							会员等级
							<text class="uni-list-cell-left by-sdh">{{userInfo.vip_name}}</text>
						</view>
					</view>-->
					<view class="hg50">
						<view @click="goDetailPage('/pages/user/agent/agent')" class="uni-list-cell-navigate uni-navigate-right bb0">
							推广等级
							<text class="uni-list-cell-left by-sdh">{{userInfo.group_name}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="uni-card by-card by-mt-30">
				<view class="uni-card-content">
					<view class="hg50">
						<view @click="goDetailPage('/pages/user/info/realname')" class="uni-list-cell-navigate uni-navigate-right bb0">
							实名认证
							<text class="uni-list-cell-left by-sdh" v-if="userInfo.is_validate===0">去认证</text>
							<text class="uni-list-cell-left by-sdh" v-if="userInfo.is_validate===1">{{userInfo.realname}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imageList: [],
				userInfo: {
					nickname: "未设置",
					mobile: "未绑定",
					head_img: "../../../static/head-no-pic.png",
					vip_name: "普通会员",
					group_name:"会员",
					is_validate: 0,
					realname: "",
				}
			}
		},
		onLoad() {},
		onShow() {
			this.getUserInfoData();
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		onBackPress() {
		  uni.switchTab({
		  	url: '/pages/tabBar/user/user'
		  })
		},
		onNavigationBarButtonTap(e) {},
		methods: {
			getUserInfoData() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl + '/api/api/getUserInfoData', {
						openid,
						sessionKey
					}, (res) => {
						if (res.data.code == 1) {
							this.userInfo = res.data.result.userInfo;
							this.imageList=[this.userInfo.head_img];
						}
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
					})
				}
			},
			goDetailPage(url) {
				const openid = this.$store.state.openid;
				if (openid === null) {
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
				} else {
					uni.navigateTo({
						url: url
					})
				}

			},
			chooseImage: async function() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				uni.chooseImage({
					sizeType: ['compressed'],
					count: 1,
					success: (res) => {
						this.imageList = [];
						this.imageList = this.imageList.concat(res.tempFilePaths);
						//console.log(res.tempFilePaths)
						const index = this.imageList.length;
						if(index>=1){
							this.userInfo.head_img = this.imageList[index-1];
							const tempFilePaths = res.tempFilePaths;
							uni.showLoading()
							try{
									uni.uploadFile({
										url: this.websiteUrl + '/api/upload/uploadface', //仅为示例，非真实的接口地址
										filePath: tempFilePaths[index-1],
										name: 'file',
										formData: {
											'data': JSON.stringify({openid,sessionKey})
										},
										success: (uploadFileRes) => {
											const data = JSON.parse(uploadFileRes.data);
											uni.hideLoading();
											if(data.code == 1){
												uni.showToast({
													title: "成功"
												})
											}else{
												uni.showToast({
													title: data.msg
												})
											}
										}
									});
							}catch(e){
								uni.hideLoading();
							}
						}else{
							uni.showToast({
								title: "没有选中图片"
							})
						}
						//console.log(this.imageList)
					}
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src;
				 uni.showLoading()
				 uni.previewImage({
				 	current: current,
				 	urls: this.imageList.length>0?this.imageList:[current],
					complete:(res)=>{
						uni.hideLoading();
					}
				 })
			}
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f7f8fa;
	}

	.info-top-bg {
		width: 100%;
		height: 213upx;
		padding-top: 50upx;
	}


	.info-head-pic {
		margin: 0 auto;
		border-radius: 50%;
		height: 107upx;
		width: 107upx;
		/*background: #fecccc; opacity: 0.8;*/
		overflow: hidden;
	}

	.info-head-pic image {
		height: 107upx;
		width: 107upx;
	}


	.info-head-bj-btn {
		width: 120upx;
		margin: 0 auto;
	}

	.info-head-bj-btn image {
		height: 42upx;
		width: 122upx;
		margin-top: 20upx;
	}

	.hg50 {
		height: 120upx;
		color: #576175;
		font-size: 34upx;
		font-weight: 600;
	}

	.hg50 .uni-navigate-right:after {
		font-size: 32upx;
	}

	.hg50 .uni-navigate-right {
		line-height: 80upx;
		border-bottom: 1upx solid #ecedef;
	}

	.hg50 .uni-navigate-right.bb0 {
		border-bottom: 0upx;
	}

	.uni-card.by-card {
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
		box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
	}

	.by-mt-30 {
		margin-top: 40upx;
	}

	.by-sdh {
		font-size: 26upx;
		font-weight: normal;
	}
</style>
