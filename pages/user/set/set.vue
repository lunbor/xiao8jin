<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="uni-card by-card">
				<view class="uni-card-content">
					<view class="hg50">
						<view @click="goDetailPage('/pages/user/set/getpass?mobile='+userInfo.mobile)" class="uni-list-cell-navigate uni-navigate-right">
							修改登录密码
						</view>
					</view>
					<view class="hg50">
						<view @click="goDetailPage('/pages/user/info/realname')" class="uni-list-cell-navigate uni-navigate-right">
							实名认证
							<text class="uni-list-cell-left by-sdh" v-if="userInfo.is_validate===0">去认证</text>
							<text class="uni-list-cell-left by-sdh" v-if="userInfo.is_validate===1">{{userInfo.realname}}</text>
						</view>
					</view>
					<view class="hg50">
						<view @click="goDetailPage('/pages/index/about/about')" class="uni-list-cell-navigate uni-navigate-right">
							关于我们
						</view>
					</view>
					<!-- #ifdef APP-PLUS -->
					<view class="hg50">
						<view @click="goDetailPage('/platforms/app-plus/feedback/feedback')" class="uni-list-cell-navigate uni-navigate-right">
							问题反馈
						</view>
					</view>
					<!-- #endif -->
					<view class="hg50">
						<view @tap="makePhoneCall" class="uni-list-cell-navigate uni-navigate-right bb0">
							客服电话
							<text class="uni-list-cell-left by-sdh">{{userInfo.telphone}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="uni-card by-card by-mt-30">
				<view class="uni-card-content">
					<view class="hg50">
						<view class="uni-list-cell-navigate uni-navigate-right bb0" @tap="checkVersion">
							当前版本
							<text class="uni-list-cell-left by-sdh">{{version}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- #endif -->
			
			<view class="uni-common-mt">
				<button type="warn" class="by-button-submit" @click="logoutUser">退出登录</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo: {
					nickname: "未设置",
					mobile: "未绑定",
					head_img: "../../../static/head-no-pic.png",
					vip_name: "普通会员",
					is_validate: 0,
					realname: "",
					telphone:'000-00000000',
				},
				//#ifdef APP-PLUS
				version:plus.runtime.version,
				//#endif
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
				uni.navigateTo({
					url: url
				})
			},
			makePhoneCall: function () {
				uni.makePhoneCall({
					phoneNumber: this.userInfo.telphone,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			logoutUser: function(){
				this.$store.commit('logout');
				uni.reLaunch({
					url: '/pages/tabBar/index/index'
				})
			},
			checkVersion: function(){
				//#ifdef APP-PLUS
				/* 5+环境锁定屏幕方向 */
				plus.screen.lockOrientation('portrait-primary'); //锁定
				/* 5+环境升级提示 */
				var server = this.websiteUrl+"/api/update/api"; //检查更新地址
				var req = { //升级检测数据
					"appid": plus.runtime.appid,
					"version": plus.runtime.version,
					"imei": plus.device.imei
				};
				uni.request({
					url: server,
					data: req,
					success: (res) => {
						console.log("success", res);
						if (res.statusCode == 200 && res.data.code == 1 && res.data.result.isUpdate) {
							let openUrl = plus.os.name === 'iOS' ? res.data.result.iOS : res.data.result.Android;
							uni.showModal({ //提醒用户更新
								title: '更新提示',
								content: res.data.result.content ? res.data.result.content : '是否选择更新',
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(openUrl);
									}
								}
							})
						}else{
							uni.showModal({
								content:'当前是最新版本',
								showCancel:false
							})
						}
					}
				})
				//#endif
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
	
	.by-button-submit{
		background-color:#fd5950;
		background: linear-gradient(left, #ff7575, #fd5950);
	}
</style>
