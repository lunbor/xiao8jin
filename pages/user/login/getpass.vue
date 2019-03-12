<template>
	<view class="uni-common-pb">
		<view class="uni-login-logo">
			<image src="../../../static/login-logo.png"></image>
		</view>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="with-fun by-login-input">
						<input class="uni-input" type="number" name="account"  placeholder="请填写注册的手机号" :value="inputClearValue" @input="bindClearInput" />
						<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
					</view>
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="with-fun by-login-input">
						<input class="uni-input" type="number" name="smsCode" placeholder="请填入验证码"  v-model="smsCode"/>
						<view class="text by-dj-btn" :class="is_sms?'':'active'" @click="sendSMS">{{fsbtn}}</view>
					</view>
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="with-fun by-login-input">
						<input class="uni-input" placeholder="请填写6~18位字符新密码" name="password" :password="showPassword" />
						<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button formType="submit" :loading="loading" type="warn">修改密码</button>
				</view>
				

			</form>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showPassword: true,
				showClearIcon: false,
				inputClearValue: "",
				loading:false,
				tipcontent:'',
				is_sms:true,
				Loop:'',
				downtime:60,
				verifyCode:'',
				smsCode:'',
				fsbtn:'发送验证码'
			}
		},
		onLoad() {

		},
		onPullDownRefresh() {
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		onNavigationBarButtonTap(e) {
		},
		methods: {
			goDetailPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupMiddle = false;
				this.showPopupTop = false;
				this.showPopupBottom = false;
			},
			//展示居中 popup
			showMiddlePopup: function() {
				this.hidePopup();
				this.popType = 'middle';
				this.showPopupMiddle = true;
			},
			changePassword: function () {
				this.showPassword = !this.showPassword;
			},
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
			formSubmit: function (e) {
				const phone = e.detail.value.account;
				const password = e.detail.value.password;
				const smsCode = e.detail.value.smsCode;
				const verifyCode = this.verifyCode;
				if(phone ==='' ){
					uni.showModal({
						content:'请填写注册的手机号',
						showCancel:false
					})
					return false;
				}
				
				if(smsCode ==='' ){
					uni.showModal({
						content:'请填写验证码',
						showCancel:false
					})
					return false;
				}
				
				if(verifyCode ==='' ){
					uni.showModal({
						content:'请先获取验证码',
						showCancel:false
					})
					return false;
				}
				
				if(password ==='' ){
					uni.showModal({
						content:'请填写6~18位字符新密码',
						showCancel:false,
					})
					return false;
				}
				const that = this;
				try {
					this.$http.post(this.websiteUrl+'/api/api/getpassword',{phone,password,smsCode,verifyCode},(res) => {
						if(res.data.code==1){
							uni.showModal({
								content:res.data.msg,
								showCancel:false,
								success:()=>{
									uni.navigateTo({
										url: '/pages/user/login/login'
									})
								}
							})
							
							//uni.navigateBack();
						}else{
							uni.showModal({
								content:res.data.msg,
								showCancel:false,
								success:function() {
									that.loading = false;
								}
							})
						}
					});
				} catch (e) {
					uni.showModal({
						content:'网络异常,请稍后重试...',
						showCancel:false,
						success:function() {
							that.loading = false;
						}
					})
				}
				
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			sendSMS: function (e) {
				if(this.is_sms){
					this.is_sms = false;
					const phone = this.inputClearValue;
					if(phone ==='' ){
						uni.showModal({
							content:'请填写手机号',
							showCancel:false
						})
						return false;
					}
					const getPass = 1;
					try {
						this.$http.post(this.websiteUrl + '/api/api/sendSMS', {
							phone,
							getPass
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
				this.fsbtn='重新发送('+this.downtime+')';
				this.Loop = setInterval(function() {
					if(that.downtime == 0){
						that.fsbtn='发送验证码';
						that.is_sms = true;
						clearInterval(that.Loop);
						return;
					}
					that.downtime--;
					that.fsbtn='重新发送('+this.downtime+')';
				}.bind(this), 1000);
				if(this.is_sms){
					clearInterval(this.Loop);
				}
			}
		},
		components: {
			
		}
	}
</script>

<style>
	page{
		height: auto;
		min-height: 100%;
		background-color: #FFFFFF;
		color: #989898;
	}
	
	.by-dj-btn{ color: #666666; border: 2upx #d7d5d5 solid; padding: 14upx 20upx;height: 30upx; line-height: 30upx; border-radius: 12upx; margin-top: 10upx; margin-right: 15upx;}
	.by-dj-btn.active{order: 2upx #f7f8fa solid;color:#d7d5d5;}
	
	.uni-login-logo{ text-align: center; height: 390upx; vertical-align: middle; }
	.uni-login-logo image{ width: 350upx; height: 225upx; margin: 0 auto; margin-top: 87upx;}
	.uni-btn-v  button{ background-color: #ff4444;}
	
	.with-fun.by-login-input{ border-bottom: 2upx #dddddd solid; height: 110upx; line-height: 110upx; font-size: 32upx;}
	.by-login-input .uni-input{height: 60upx; line-height: 60upx;font-size: 32upx;}
	.by-login-input input{height: 60upx; line-height: 60upx;font-size: 32upx;}
	.clause{ margin-top: 127upx; text-align: center; color: #999999; font-weight: 500;}
	.clause text{ color: #fe5950;}
</style>