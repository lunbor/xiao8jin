<template>
	<view class="uni-common-pb bg_img_case" style="background: url(../../../static/bg_img.png) no-repeat;background-size: 100% 100%;">
		<view class="uni-login-logo">
			<image src="../../../static/login-logo.png"></image>
		</view>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="with-fun by-login-input">
						<image src="../../../static/phone.png" style="width: 29upx;height: 39upx;margin-top: 24upx;"></image>
						<input class="uni-input" type="number" name="account"  placeholder="请填写手机号" :value="inputClearValue" @input="bindClearInput" />
						<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
					</view>
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="with-fun by-login-input">
						<image src="../../../static/code.png" class="icon_size"></image>
						<input class="uni-input" type="number" name="smsCode" placeholder="请填入验证码"  v-model="smsCode"/>
						<view class="text by-dj-btn" :class="is_sms?'':'active'" @click="sendSMS">{{fsbtn}}</view>
					</view>
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="with-fun by-login-input">
						<image src="../../../static/password.png" class="icon_size"></image>
						<input class="uni-input" placeholder="请填写6~18位字符密码" name="password" :password="showPassword" />
						<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
					</view>
				</view>
					<view class="uni-form-item uni-column">
					<view class="with-fun by-login-input">
						<image src="../../../static/tell.png" class="icon_size"></image>
						<input class="uni-input" placeholder="请输邀请人手机号" />
					</view>
				</view>
				<view class="uni-btn-v">
					<button class="login_btn" formType="submit" :loading="loading" type="warn">注 册</button>
				</view>
				
				<view class="text clause">
					点击注册即表示您同意<text @click="getClause">《隐私条例和服务条款》</text>
				</view>
			</form>
		</view>
		
		<!-- 居中 -->
		<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup" :title="tiptitle" :queren="true" :quxiao="true">
			<view class="uni-common-mt uni-helllo-text uni-center" style="text-align: left;">
				<rich-text :nodes="tipcontent"></rich-text>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '../../../components/uni-popup.vue';
	export default {
		data() {
			return {
				showPassword: true,
				showClearIcon: false,
				inputClearValue: "",
				loading:false,
				popType: 'middle',
				tiptitle: '提示',
				showPopupMiddle: false,
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
				const shareId = uni.getStorageSync('shareId');
				const agentId = uni.getStorageSync('agentId');
				const qdId = uni.getStorageSync('qdId');
				if(phone ==='' ){
					uni.showModal({
						content:'请填写手机号',
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
					this.$http.post(this.websiteUrl+'/api/api/reg',{phone,password,smsCode,verifyCode,shareId,agentId,qdId},(res) => {
						if(res.data.code==1){
							uni.showModal({
								content:res.data.msg,
								showCancel:false,
								success:()=>{
									this.$store.dispatch('apiLogin',{openid:res.data.result.token,sessionKey:res.data.result.session_id});
									uni.switchTab({
										url: '/pages/tabBar/user/user'
									});
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
			getClause() {
				try {
					this.$http.post(this.websiteUrl+'/api/api/getClause',{},(res) => {
						if(res.data.code==1){
							this.tiptitle = '隐私条款';
							this.tipcontent = res.data.result.article.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
							this.showMiddlePopup();
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
					try {
						this.$http.post(this.websiteUrl + '/api/api/sendSMS', {
							phone
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
			uniPopup
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
	
	.by-dj-btn{ color: #666666; border: 2upx #d7d5d5 solid; padding: 14upx 20upx;height: 30upx; line-height: 30upx; border-radius: 500px; margin-top: 10upx; 
	margin-right: 15upx;font-size: 26upx;}
	.by-dj-btn.active{order: 2upx #f7f8fa solid;color:#d7d5d5;}
	
	.uni-login-logo{ text-align: center; height: 390upx; vertical-align: middle; }
	.uni-login-logo image{ width: 320upx; height: 320upx; margin: 0 auto; margin-top: 87upx;}
	.uni-btn-v  button{ background-color: #ff4444;}
	
	.with-fun.by-login-input{ border-bottom: 2upx #ececec solid; height: 98upx; line-height: 98upx; font-size: 28upx;}
	.by-login-input .uni-input{height: 60upx; line-height: 60upx;font-size: 28upx;}
	.by-login-input input{height: 60upx; line-height: 60upx;font-size: 28upx;}
	.clause{ margin-top: 40upx; text-align: center; color: #999999; font-weight: 500;font-size: 24upx;}
	.clause text{ color: #fe5950;}
	.login_btn {
		background-color: #32b0fd;
		background: linear-gradient(left, #32b0fd, #097ede);
		border-radius: 500px;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
		box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
	}
	.icon_size{width: 36upx;height: 36upx;margin-top: 30upx;}
	.bg_img{width: 100%;height: 264upx;position: absolute;bottom: 0;left: 0;}
	.bg_img_case{position: fixed;top:0;left: 0;height: 100%;width: 100%;}
</style>
