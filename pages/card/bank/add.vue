<template>
	<view class="uni-padding-wrap">
		<form @submit="formSubmit">
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					
					<view class="hg50">
						<view class="uni-list-cell-navigate">
							<view class="by-sdh">银行卡号<text></text></view>
							<input class="uni-input font-max" placeholder-style="font-weight: normal;" type="number" name="bank_code" v-model="bank_card.bank_code" placeholder="请输入银行卡号" />
						</view>
					</view>
					
					<view class="hg50">
						<view class="uni-list-cell-navigate uni-navigate-right bb0">
							<view class="by-sdh">发卡银行<text></text></view>
							<input class="uni-input" @click="showSinglePicker" disabled="disabled"  name="bank_name" v-model="bank_card.bank_name" placeholder="请选择银行" />
						</view>
					</view>

					
				</view>
			</view>

			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="hg50">
						<view class="uni-list-cell-navigate uni-navigate-right">
							<view class="by-sdh">开户省市<text></text></view>
							<input class="uni-input" disabled="disabled" @click="showMulLinkageThreePicker" placeholder="请选择省市" v-model="bank_card.address"/>
						</view>
					</view>

					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">开户支行<text></text></view>
							<input class="uni-input" name="bank_child" v-model="bank_card.bank_child" placeholder="请输入开户支行名称" />
						</view>
					</view>
					
				</view>
			</view>
			
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">手机号<text></text></view>
							<input class="uni-input" type="number" name="phone" v-model="bank_card.phone" placeholder="请输入银行预留手机号" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-common-mt">
				<button type="warn" class="by-button-submit" :loading="loading" @click="addBank">提交保存</button>
			</view>
			
			<view class="uni-common-mt tip_btn">
				<text>*</text> 为保护账户资金安全，请仔细核实银行卡信息，相关信息可咨询发卡行客服电话。
			</view>
		</form>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		@onConfirm="onConfirmbank" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		@onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>
<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'

	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				bank_card: {
					bank_code: '',
					bank_id:'',
					bank_name:'',
					phone:'',
					address:'',
					bank_child:'',
					provin:'',
					city:'',
					area:'',
					openid:'',
					sessionKey:'',
				},
				loading: false,
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 0],
				pickerSingleArray:[],
				pickerValueDefault: [0],
				pickerValueArray:[],
				mode: '',
				deepLength: 1,
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
			addBank(){
				//console.log(this.bank_card)
					this.bank_card.openid = this.$store.state.openid;
					this.bank_card.sessionKey = this.$store.state.sessionKey;
					const that = this;
					if(this.bank_card.bank_code==''){
						uni.showModal({
							content: '请输入银行卡号',
							showCancel: false
						});
						return;
					}
					
					if(this.bank_card.bank_name==''){
						uni.showModal({
							content: '请选择银行',
							showCancel: false
						});
						return;
					}
					
					if(this.bank_card.address==''){
						uni.showModal({
							content: '请选择省市',
							showCancel: false
						});
						return;
					}
					
					if(this.bank_card.bank_child==''){
						uni.showModal({
							content: '请输入支行名称',
							showCancel: false
						});
						return;
					}
					
					if(this.bank_card.phone==''){
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
						
						this.$http.post(this.websiteUrl + '/api/card/addBank', this.bank_card, (res) => {
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
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirmbank(e){
				if(e.value.length == 1){
					this.bank_card.bank_id = e.value[0];
					this.bank_card.bank_name = e.label;
				}
			},
			onConfirm(e) { 
				this.bank_card.provin = e.provinceCode;
				this.bank_card.city = e.cityCode;
				this.bank_card.area = e.areaCode;
				this.bank_card.address = e.label;
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},

		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
			
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}
			
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
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
		border-bottom: 2upx solid #ecedef;
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
	
	.tip_btn{color: #cdd1dd;}
	.tip_btn text{color: #fd5950;}
	.font-max{font-size: 28upx; font-weight: 700;}
</style>
