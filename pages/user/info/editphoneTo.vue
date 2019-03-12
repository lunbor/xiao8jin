<template>
	<view>
		<view class="by-bg-title">验证码将发送至{{mobile}}</view>
		<view class="uni-padding-wrap">	
			<view class="uni-card by-card">
				<view class="uni-card-content">
					<view class="uni-form-item uni-column">
						<view class="with-fun">
							<input class="uni-input" type="number" placeholder="请填入验证码"  v-model="smsCode"/>
							<view class="text by-dj-btn" :class="is_sms?'':'active'" @click="sendSMS">{{inputClearValue}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-common-mt">
				<button type="warn" class="by-button-submit" :loading="loading" @click="verification">下一步</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				inputClearValue: "发送验证码",
				mobile:"",
				loading:false,
				is_sms:true,
				Loop:'',
				downtime:60,
				verifyCode:'',
				smsCode:''
			}
		},
		onLoad(e) {
			if(e.mobile){
				this.mobile = e.mobile;
			}else{
				uni.navigateTo({
					url: '/pages/user/info/info'
				})
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
			verification: function (e) {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const verifyCode = this.verifyCode;
				const smsCode = this.smsCode;
				const that = this;
				try {
					if(this.loading){
						return;
					}
					this.loading = true;
					
					this.$http.post(this.websiteUrl + '/api/api/verification', {
						openid,
						sessionKey,
						verifyCode,
						smsCode
					}, (res) => {
						if (res.data.code == 1) {
							uni.navigateTo({
								url: '/pages/user/info/editPhoneToyz?toverifyCode='+res.data.result
							})
						}else{
							uni.showModal({
								content: res.data.msg,
								showCancel: false,
								success:function() {
									that.loading = false;
								}
							})
						}
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
				
			},
			sendSMS: function (e) {
				if(this.is_sms){
					this.is_sms = false;
					const openid = this.$store.state.openid;
					const sessionKey = this.$store.state.sessionKey;
					const is_user = 1;
					try {
						this.$http.post(this.websiteUrl + '/api/api/sendSMS', {
							openid,
							sessionKey,
							is_user
						}, (res) => {
							if (res.data.code == 1) {
								this.downtime =60;
								this.dateDown();
								this.verifyCode = res.data.result;
							}else{
								uni.showModal({
									content: res.data.msg,
									showCancel: false
								})
								this.is_sms = true;
							}
						});
					} catch (e) {
						uni.showModal({
							content: '网络异常,请稍后重试...',
							showCancel: false
						})
						this.is_sms = true;
					}	
				}	
			},
			dateDown: function () {
				const that = this;
				this.inputClearValue='重新发送('+this.downtime+')';
				this.Loop = setInterval(function() {
					if(that.downtime == 0){
						that.inputClearValue='发送验证码';
						that.is_sms = true;
						clearInterval(that.Loop);
						return;
					}
					that.downtime--;
					that.inputClearValue='重新发送('+this.downtime+')';
				}.bind(this), 1000);
				if(this.is_sms){
					clearInterval(this.Loop);
				}
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
				try {
					if(this.loading){
						return;
					}
					this.loading = true;
					const that = this;
					this.$http.post(this.websiteUrl + '/api/api/setNickname', {
						openid,
						sessionKey,
						nickname
					}, (res) => {
						uni.showToast({
							title: res.data.msg,
							success:function() {
								that.loading = false;
							}
						})
						
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
					});
					this.loading = false;
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
	.by-bg-title{background-color: #2e2e2e; color: #FFFFFF; height: 90upx; line-height: 90upx;  padding-left: 30upx;}
	.uni-card.by-card {
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
		box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
	}
	.by-dj-btn{ color: #666666; border: 2upx #d7d5d5 solid; padding: 14upx 20upx;height: 30upx; line-height: 30upx; border-radius: 12upx; margin-top: 10upx; margin-right: 15upx;}
	.by-dj-btn.active{order: 2upx #f7f8fa solid;color:#d7d5d5;}
	.by-button-submit{
		background-color:#fd5950;
		background: linear-gradient(left, #ff7575, #fd5950);
	}
</style>