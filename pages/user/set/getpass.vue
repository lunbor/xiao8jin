<template>
	<view>
		<view class="by-bg-title">验证码将发送至{{mobile}}</view>
		<view class="uni-padding-wrap uni-common-pb">
			<form @submit="formSubmit">
				<view class="uni-card by-card">
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
				</view>
				<view class="uni-btn-v">
						<button class="modify_btn" formType="submit" :loading="loading" type="warn">修改密码</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				mobile:'',
				showPassword: true,
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
		onLoad(e) {
			if(e.mobile){
				this.mobile = e.mobile;
			}else{
				uni.navigateTo({
					url: '/pages/user/set/set'
				})
			}
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
			formSubmit: function (e) {
				const password = e.detail.value.password;
				const smsCode = e.detail.value.smsCode;
				const verifyCode = this.verifyCode;
				
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
					const openid = this.$store.state.openid;
					const sessionKey = this.$store.state.sessionKey;
					this.$http.post(this.websiteUrl+'/api/api/uppassword',{openid,sessionKey,password,smsCode,verifyCode},(res) => {
						if(res.data.code==1){
							uni.showModal({
								content:res.data.msg,
								showCancel:false,
								success:()=>{
									this.$store.commit('logout');
									uni.reLaunch({
										url: '/pages/tabBar/user/user'
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
					const openid = this.$store.state.openid;
					const sessionKey = this.$store.state.sessionKey;
					const is_user = 1;
					const getPass = 1;
					try {
						this.$http.post(this.websiteUrl + '/api/api/sendSMS', {
							openid,
							sessionKey,
							is_user,
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
		background-color: #F2F2F2;
		color: #989898;
	}
	.by-bg-title{/* background-color: #f4f4f4; */color: #333; height: 120upx; line-height: 120upx;  padding-left: 56upx;}
	.by-dj-btn{ color: #666666; border: 2upx #d7d5d5 solid; padding: 14upx 20upx;height: 30upx; line-height: 30upx; border-radius: 500px; 
	margin-top: 20upx; margin-right: 15upx;font-size: 26upx;}
	.by-dj-btn.active{order: 2upx #f7f8fa solid;color:#d7d5d5;}
	
	.uni-btn-v  button{ background-color: #ff4444;}
	
	.with-fun.by-login-input{ border-bottom: 2upx #ececec solid; height: 98upx; line-height: 98upx; font-size: 28upx;}
	.by-login-input .uni-input{height: 60upx; line-height: 60upx;font-size: 28upx;}
	.by-login-input input{height: 60upx; line-height: 60upx;font-size: 32upx;}
	.clause{ margin-top: 127upx; text-align: center; color: #999999; font-weight: 500;}
	.clause text{ color: #fe5950;}
	
	.uni-card{
			border-radius: 12upx;
			-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
			box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
			margin: 0;
			padding: 0 20upx;
		}
		.modify_btn{
			background-color: #32b0fd;
			background: linear-gradient(left, #32b0fd, #097ede);
			border-radius: 500px;
			-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
			box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
			margin-top: 50upx;
		}
		.uni-form-item{padding: 0;}
</style>