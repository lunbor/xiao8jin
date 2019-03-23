<template>
	<view class="uni-padding-wrap">
		<form @submit="formSubmit">
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
	
					<view class="hg50">
						<view class="uni-list-cell-navigate">
							<view class="by-sdh">信用卡号<text></text></view>
							<input class="uni-input font-max" placeholder-style="font-weight: normal;" type="number" name="credit_code" v-model="credit_card.credit_code" placeholder="请输入信用卡号" />
						</view>
					</view>
					
					<view class="hg50">
						<view class="uni-list-cell-navigate uni-navigate-right bb0">
							<view class="by-sdh">发卡银行<text></text></view>
							<input class="uni-input" @click="showSinglePicker" disabled="disabled"  name="bank_name" v-model="credit_card.bank_name" placeholder="请选择银行" />
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
							<view class="by-sdh">有效日期<text></text></view>
							<input class="uni-input" maxlength="4" disabled="disabled" @click="showSingleTwoPicker" name="credit_card.exp_date" v-model="credit_card.exp_date"
							 placeholder="格式:月年" />
							<text class="tip-text" @tap="showBanner('../../../static/wk_tip2.png')">查看示例</text>
						</view>
					</view>
					
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">CVV2码<text></text></view>
							<input class="uni-input" maxlength="3" type="number" name="safe_code" v-model="credit_card.safe_code"
							placeholder="请输入CVV2码" />
							<text class="tip-text" @tap="showBanner('../../../static/wk_tip1.png')">查看示例</text>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
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
			
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">手机号<text></text></view>
							<input class="uni-input" type="number" name="phone" v-model="credit_card.phone" placeholder="请输入银行预留手机号" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-common-mt">
				<button type="warn" class="by-button-submit" :loading="loading" @click="addCredit">提交保存</button>
			</view>
			
			<view class="uni-common-mt tip_btn">
				<text>*</text> 为保护账户资金安全，请仔细核实信用卡信息。
			</view>
		</form>

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

		<!-- 弹出层 -->
		<view class="uni-banner" v-if="bannerShow">
			<view>
				<image :src="tip_img" style="width:100%;" mode="widthFix"></image>
			</view>
			<view class="tip_cancel" @tap="closeBanner">
				<image src="../../../static/wk_tip_cancel.png"></image>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
	</view>
</template>
<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import expData from '../../../common/exp.data.js';

	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				credit_card: {
					line_credit: '',
					credit_code: '',
					exp_date: '',
					safe_code:'',
					bill_time:'',
					repay_time:'',
					phone:'',
					bank_name:'',
					bank_id:'',
					openid:'',
					sessionKey:'',
				},
				bannerShow: false,
				tip_img: '',
				loading: false,
				pickerSingleTwoArray: expData,
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				pickerSingleArray:[],
			}
		},
		onLoad() {this.bankInfo();},
		onShow() {},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		computed: {},
		methods: {
			addCredit(){
				this.credit_card.openid = this.$store.state.openid;
				this.credit_card.sessionKey = this.$store.state.sessionKey;
				const that = this;
				if(this.credit_card.credit_code==''){
					uni.showModal({
						content: '请输入信用卡号',
						showCancel: false
					});
					return;
				}
				
				if(this.credit_card.bank_name==''){
					uni.showModal({
						content: '请选择银行',
						showCancel: false
					});
					return;
				}
				
				if(this.credit_card.line_credit==''){
					uni.showModal({
						content: '请输入信用卡额度',
						showCancel: false
					});
					return;
				}
				
				if(this.credit_card.exp_date==''){
					uni.showModal({
						content: '请输入有效日期',
						showCancel: false
					});
					return;
				}
				
				if(this.credit_card.safe_code==''){
					uni.showModal({
						content: '请输入CVV2码',
						showCancel: false
					});
					return;
				}
				
// 				if(this.credit_card.bill_time==''){
// 					uni.showModal({
// 						content: '请输入账单日',
// 						showCancel: false
// 					});
// 					return; 
// 				}
// 				
// 				if(this.credit_card.repay_time==''){
// 					uni.showModal({
// 						content: '请输入还款日',
// 						showCancel: false
// 					});
// 					return;
// 				}
				
				if(this.credit_card.phone==''){
					uni.showModal({
						content: '请输入银行预留手机号',
						showCancel: false
					});
					return;
				}
				
				
				
				try {
					if(this.loading){
						return;
					}
					this.loading = true;
					
					this.$http.post(this.websiteUrl + '/api/card/addCredit', this.credit_card, (res) => {
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
			bankInfo(){
				try {
					this.$http.post(this.websiteUrl + '/api/card/bankInfo', {
					}, (res) => {
						if (res.data.code == 1) {
							this.pickerSingleArray = res.data.result;
						}
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
					})
				}
			},
			closeBanner: function() {
				this.bannerShow = false;
			},
			showBanner: function(e) {
				this.tip_img = e;
				this.bannerShow = true;
			},
			onCancel(e) {
				console.log(e)
			},
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			// 多列
			showSingleTwoPicker() {
				this.pickerValueArray = this.pickerSingleTwoArray
				this.mode = 'multiSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				if(e.value.length == 2){
						this.credit_card.exp_date = e.value[0] + '' + e.value[1];
				}else if(e.value.length == 1){
						this.credit_card.bank_id = e.value[0];
					  this.credit_card.bank_name = e.label;
				}	
			},

		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}

			if (this.bannerShow) {
				this.bannerShow = false;
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
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
		font-size: 26upx;
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
		/* line-height: 80upx; */
		border-bottom: 2upx solid #ecedef;
		padding: 20upx;
	}

	.hg50 .uni-list-cell-navigate.bb0 {
		border-bottom: 0upx;
	}

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
		background: rgba(0, 0, 0, 0.4);
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
	
	.tip_btn{color: #a6a6a6;font-size: 24upx;line-height: 50upx;}
	.tip_btn text{color: #fd5950;}
	.font-max{font-size: 28upx; font-weight: 700;}
	.uni-card{margin: 35upx 0;}
	.uni-input{padding: 0 8upx;}
	.uni-common-mt{margin-top: 16upx;}
</style>
