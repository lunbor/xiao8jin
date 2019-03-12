<template>
	<view class="uni-padding-wrap">
		<form @submit="formSubmit">
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="hg50">
						<view class="uni-list-cell-navigate">
							<view class="by-sdh">信用卡号<text></text></view>
							{{credit_card.bank_name}}{{credit_card.credit_code}}
						</view>
					</view>
				</view>
			</view>

			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="hg50">
						<view class="uni-list-cell-navigate">
							<view class="by-sdh">信用额度<text></text></view>
							<input class="uni-input" maxlength="10" type="digit" name="line_credit" v-model="credit_card.line_credit" placeholder="请输入信用卡额度" />
						</view>
					</view>
					
					<view class="hg50">
						<view class="uni-list-cell-navigate">
							<view class="by-sdh">账单日<text></text></view>
							<input class="uni-input" maxlength="2" type="number" name="bill_time" v-model="credit_card.bill_time" placeholder="请输入账单日(选填)" />
						</view>
					</view>
					
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">还款日<text></text></view>
							<input class="uni-input" maxlength="2" type="number" name="repay_time" v-model="credit_card.repay_time" placeholder="请输入还款日(选填)" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-common-mt">
				<button type="warn" class="by-button-submit" :loading="loading" @click="editCredit">提交保存</button>
			</view>
			
			<view class="uni-common-mt tip_btn">
				<text>*</text> 目前只支持修改以上信息,若有其他信息需要修改,可解绑信用卡后重新添加。
			</view>
		</form>

		
	</view>
</template>
<script>


	export default {
		data() {
			return {
				credit_card: {
					credit_id: '',
					line_credit: '',
					credit_code: '',
					bank_name: '',
					bill_time:'',
					repay_time:'',
				},
				loading:false
			}
		},
		onLoad(e) {
			if (e.credit_id) {
				this.credit_card.credit_id = e.credit_id;
			} else {
				uni.switchTab({
					url: '/pages/tabBar/card/card'
				})
			}
		},
		onShow() {this.getCardInfo();},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		computed: {},
		methods: {
			getCardInfo(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const credit_id = this.credit_card.credit_id;
				try {
					this.$http.post(this.websiteUrl + '/api/card/getCreditCardInfo', {
						openid,
						sessionKey,
						credit_id
					}, (res) => {
						if (res.data.code == 1) {
							this.credit_card = res.data.result;
						}else{
							uni.showModal({
								content:res.data.msg,
								showCancel:false
							})
						}
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
					})
				}
				
			},
			editCredit(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const credit_id = this.credit_card.credit_id;
				const bill_time =this.credit_card.bill_time;
				const line_credit =this.credit_card.line_credit;
				const repay_time =this.credit_card.repay_time;
				
				const that = this;
				
				if(line_credit==''){
					uni.showModal({
						content: '请输入信用卡额度',
						showCancel: false
					});
					return;
				}
				
				try {
					if(this.loading){
						return;
					}
					this.loading = true;
					
					this.$http.post(this.websiteUrl + '/api/card/editCredit', {
						openid,
						sessionKey,
						credit_id,
						line_credit,
						bill_time,
						repay_time
					}, (res) => {
						if(res.data.code==1){
							uni.showModal({
								content: res.data.msg,
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

		},
		onBackPress() {
			
		},
		onUnload() {
			
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
		border-bottom: 1upx solid #ecedef;
	}

	.hg50 .uni-list-cell-navigate.bb0 {
		border-bottom: 0upx;
	}

	.by-button-submit {
		background-color: #fd5950;
		background: linear-gradient(left, #ff7575, #fd5950);
	}

	.tip-text {
		color: #fd5950;
	}

	
	
	.tip_btn{color: #cdd1dd;}
	.tip_btn text{color: #fd5950;}
	.font-max{font-size: 28upx; font-weight: 700;}
</style>
