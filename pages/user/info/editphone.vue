<template>
	<view class="uni-padding-wrap">
		<view class="uni-common-mt">
			<view class="by-editphone" style="background-image: url(../../../static/edit-phone-bg.png);">
				<view class="text by-editphone-text">{{mobile}}</view>
			</view>
		</view>
		<view class="uni-common-mt">
			<button type="warn" class="by-button-submit" :loading="loading" @click="goDetailPage('/pages/user/info/editphoneTo?mobile='+mobile)">下一步</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loading: false,
				mobile: ''
			}
		},
		onLoad(e) {
			if (e.mobile) {
				this.mobile = e.mobile;
			}
		},
		onShow() {},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		methods: {
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

			}
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #F2F2F2;
	}

	.by-editphone {
		margin-top: 120upx;
		width: 100%;
		height: 375upx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.by-editphone-text {
		padding-top: 225upx;
		margin-left: 180upx;
		font-size: 32upx;
		font-weight: 600;
	}

	.by-button-submit {
		background-color: #32b0fd;
		background: linear-gradient(left, #32b0fd, #097ede);
		border-radius: 500px;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
		box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
	}
</style>
