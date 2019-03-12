<template>
	<view class="uni-padding-wrap">
		<view class="uni-card by-card">
			<view class="uni-card-content">
				<view class="uni-form-item uni-column">
					<view class="with-fun">
						<input class="uni-input" placeholder="请填入昵称" :value="inputClearValue" @input="bindClearInput" />
						<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-common-mt">
			<button type="warn" class="by-button-submit" :loading="loading" @click="setNickname">提交保存</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showClearIcon: false,
				inputClearValue: "",
				loading:false
			}
		},
		onLoad(e) {
			if(e.nickname){
				this.inputClearValue = e.nickname;
				this.showClearIcon = true;
			}
		},
		onShow() {
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		methods: {
			bindClearInput: function (e) {
				this.inputClearValue = e.target.value;
				if (e.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function () {
				this.inputClearValue = "";
				this.showClearIcon = false;
			},
			setNickname: function () {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const nickname = this.inputClearValue;
				if(nickname==''){
					uni.showModal({
						content: '请填写昵称',
						showCancel: false
					});
					return;
				}
				const that = this;
				try {
					if(this.loading){
						return;
					}
					this.loading = true;
					
					this.$http.post(this.websiteUrl + '/api/api/setNickname', {
						openid,
						sessionKey,
						nickname
					}, (res) => {
						uni.showModal({
							content:res.data.msg,
							showCancel:false,
							success:function() {
								that.loading = false;
							}
						})
						
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false,
						success:function() {
							that.loading = false;
						}
					});
				}
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
	.uni-card.by-card {
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
		box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
	}
	.by-button-submit{
		background-color:#fd5950;
		background: linear-gradient(left, #ff7575, #fd5950);
	}
</style>
