<template>
	<view class="uni-padding-wrap">
		<view class="cash_tx"  @click="goDetailPage('/pages/user/agent/cashLog')">提现记录</view>
		<form @submit="formSubmit">
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">可用金额<text></text></view>
							<input class="uni-input font-max"  disabled="disabled" placeholder-style="font-weight: normal;"  name="yes_money" v-model="yes_money"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">提现金额<text></text></view>
							<input class="uni-input font-max"  placeholder-style="font-weight: normal;" type="digit" name="money" v-model="money" placeholder="请输入提现金额" />
						</view>
					</view>
					
					
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">结算卡<text></text></view>
							<input class="uni-input font-max"  disabled="disabled" placeholder-style="font-weight: normal;"  name="bank_code" v-model="bank_code"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">手续费<text></text></view>
							<input class="uni-input font-max"  disabled="disabled" placeholder-style="font-weight: normal;"  name="cashfee" v-model="cashFee"/>
						</view>
					</view>
				</view>
			</view>
						
			<view class="uni-common-mt">
				<button type="warn" class="by-button-submit" :disabled="disabled" :loading="loading" @click="addCash">提 交</button>
			</view>
			
			<view class="uni-common-mt tip_btn">
				<text>*</text> 提交成功后，请等待平台审核。
			</view>
		</form>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				disabled:true,
				money:'',
				bank_code:'',
				loading: false,
				cashFee:'',
				yes_money:'',
			}
		},
		onLoad() {this.getCashData();},
		onShow() {},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		computed: {},
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
			
			},
			addCash(){
					const that = this;
					const openid = this.$store.state.openid;
					const sessionKey = this.$store.state.sessionKey;
					const money = this.money;
					if(this.money==''){
						uni.showModal({
							content: '请输入提现金额',
							showCancel: false
						});
						return;
					}
					
					try {
						if(this.loading){
							return;
						}
						this.loading = true;
						
						this.$http.post(this.websiteUrl + '/api/agent/addCash', {money,openid,sessionKey}, (res) => {
							if(res.data.code==1){
								uni.showModal({
									content:res.data.msg,
									showCancel:false,
									success:function() {
										that.loading = false;
										uni.navigateBack();
									}
								})
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
							content: '网络异常,请稍后重试...',
							showCancel: false,
							success:function() {
								that.loading = false;
							}
						});
					}
					
					
			},
			getCashData(){
				try {
					const openid = this.$store.state.openid;
					const sessionKey = this.$store.state.sessionKey;
					this.$http.post(this.websiteUrl + '/api/agent/getCashData', {openid,sessionKey
					}, (res) => {
						if (res.data.code == 1) {
							this.bank_code = res.data.result.agent.bank_name+'(尾号'+res.data.result.agent.bank_code+')';
							this.cashFee =  res.data.result.agent.cashFee;
							this.yes_money = res.data.result.agent.yes_money;
							if(res.data.result.agent.bank_code!=''){
								this.disabled =false;
							}
						}else{
							uni.showModal({
								content: res.data.msg,
								showCancel: false
							})
							
						}
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
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
		background-color: #f2f2f2;
	}

	.uni-card.by-card {
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
	}

	.uni-card.by-card .p15 {
		padding: 0upx 16upx;
	}

	.by-sdh {
		width: 120upx;
		height: 52upx;
		color: #576175;
		font-weight: 600;
		margin-right: 30upx;
		text-align: justify;
		font-size: 24upx;
		line-height: 52upx;
	}

	.by-sdh text {
		display: inline-block;
		height: 0upx;
		width: 100%;
	}

	.hg50 .uni-navigate-right:after {
		font-size: 32upx;
	}

	.hg50 .uni-list-cell-navigate {
		line-height: 80upx;
		border-bottom: 2upx solid #ecedef;
	}

	/* .hg50 .uni-list-cell-navigate.bb0 {
		border-bottom: 0upx;
	} */

	.by-button-submit {
		background-color: #32b0fd;
		background: linear-gradient(left, #32b0fd, #097ede);
		border-radius: 500px;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
		box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
	}
	.tip-text {
		color: #fd5950;
	}

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
		left: 50%;
		top: 50%;
		z-index: 99;
		transform: translate(-50%, -50%);
	}
	
	
	.font-max{font-size: 28upx; /* font-weight: 700; */}
	.tip_btn{color: #a6a6a6;font-size: 24upx;line-height: 50upx;}
	.tip_btn text{color: #fd5950;}
	.uni-card{margin: 35upx 0;}
	.uni-input{padding: 0 8upx;}
	.uni-common-mt{margin-top: 16upx;}
	.cash_tx{position: relative;top: -60upx;left: 85%;color: #2f7bfe;z-index: 1000;width: 160upx;height: 0;}
</style>
