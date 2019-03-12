<template>
	<view>
		<view class="pos_bg">
			<view class="pos_yhze_text">￥<text>{{money}}</text></view>
			<view class="pos_yhze">收款金额</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-card by-card">
				<view class="uni-card-content">
					<view class="hg50">
						<view class="uni-list-cell-navigate">
							<view class="by-sdh">收款账户<text></text></view>
							<view class="flex-item">{{bank_name}}</view>
						</view>
					</view>
					
					<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdh">支付通道<text></text></view>
							<view class="flex-item">{{aisle_name}}</view>
						</view>
					</view>
					
				</view>
			</view>
			
			<view class="uni-card by-card">
				<view class="uni-card-content">
					<view class="hg50">
						<view class="uni-list-cell-navigate uni-navigate-right bb0">
							<view class="by-sdh">付款账户<text></text></view>
							<input class="uni-input" @click="showBottomPopup" disabled="disabled"  v-model="credit_name"  placeholder="请选择付款账户" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-card by-card" v-show="payFee!=''">
				<view class="uni-card-content">
					<view class="hg50">
						<view class="uni-list-cell-navigate">
							<view class="by-sdhrg red-text">{{payFee}}<text></text></view>
						</view>
					</view>
					<!--<view class="hg50">
						<view class="uni-list-cell-navigate bb0">
							<view class="by-sdhrg red-text">{{vipPayFee}}<text></text></view>
						</view>
					</view>-->
				</view>
			</view>
			
			
			<view class="uni-card by-card" v-if="is_area">
				<view class="uni-card-content p15 dzfont">
					<view class="hg50">
						<view class="uni-input-row by-sdhp">
							<label>自选商户地区</label>
							<switch @change="switch2Change"/>
						</view>
					</view>
					
					<view class="hg50" v-if="zx_area==1">
						<view class="uni-list-cell-navigate uni-navigate-right">
							<view class="by-sdh">省 份<text></text></view>
							<input class="uni-input" @click="showSinglePicker" disabled="disabled"  name="province_name" v-model="province_name"  placeholder="请选择省份" />
						</view>
					</view>
					
					<view class="hg50" v-if="zx_area==1">
						<view class="uni-list-cell-navigate uni-navigate-right bb0">
							<view class="by-sdh">城 市<text></text></view>
							<input class="uni-input" @click="showSinglePickerCity" disabled="disabled"  name="city_name" v-model="city_name"  placeholder="请选择城市" />
						</view>
					</view>
					
				</view>
			</view>
			
			
			<view class="uni-common-mt">
				<button type="warn" class="by-button-submit" :disabled="disabled" :loading="loading" @click="goPayMoney">立即支付</button>
			</view>
			
			<view class="uni-common-mt tip_btn">
				<text>*</text> 一般即时到账，实际到账时间和到账金额以银行为准。
			</view>
		</view>
		
		<!-- 底部 -->
		<uni-popup :show="showPopupBottom" :type="popType" v-on:hidePopup="hidePopup" title="请选择支付卡">
			<view class="uni-center">
					<radio-group class="uni-list" @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItems" :key="index">
							<view>
								<label class="label-2-text" :for="item.name">
									<text>{{item.value}}</text>
								</label>
							</view>
							<view>
								<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
							</view>
						</label>
					</radio-group>
					<view class="add-card-btn uni-flex uni-row" style="justify-content: center;" @click="goDetailPage('/pages/card/credit/add')">
						<view class="flex-item uni-icon uni-icon-plusempty"></view>
						<view class="flex-item add-title">添加新的信用卡</view>
					</view>
			</view>
		</uni-popup>
		
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		 
		 <mpvue-picker :themeColor="themeColor" ref="mpvuePickerF" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		  @onConfirm="onConfirmF" @onCancel="onCancel" :pickerValueArray="pickerValueArrayF"></mpvue-picker>
	</view>
</template>
<script>
	import uniPopup from '../../../components/uni-popup-bank.vue';
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvuePickerF from '../../../components/mpvue-picker/mpvuePicker.vue';
	export default {
		data() {
			return {
				money:'',
				bank_name:'',
				bankcard_id:'',
				aisle_name:'',
				block_id:'',
				credit_name:'',
				credit_id:'',
				loading:false,
				disabled:true,
				popType: 'middle',
				showPopupBottom: false,
				radioItems:[],
				payFee:'',
				vipPayFee:'',
				is_area:0,
				zx_area:0,
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				pickerSingleArray:[],
				province:'',
				province_name:'',
				city:'',
				city_name:'',
				pickerValueArrayF:[],
				pickerSingleArrayF:[],
			}
		},
		onLoad(e) {
			if(e.money > 0 ){
				this.money = e.money;
				this.bank_name = e.bank_name;
				this.bankcard_id = e.bankcard_id;
				this.aisle_name = e.aisle_name;
				this.block_id = e.block_id;
			}else{
				uni.switchTab({
					url: '/pages/tabBar/index/index'
				})
			}
		},
		onShow() {
			this.getPosStepData();
		},
		onHide() {
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
			}
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
			
			if (this.$refs.mpvuePickerF.showPicker) {
				this.$refs.mpvuePickerF.pickerCancel();
				return true;
			}
			
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
			
			if (this.$refs.mpvuePickerF.showPicker) {
				this.$refs.mpvuePickerF.pickerCancel();
				return true;
			}
			
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
			}
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		methods: {
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			showSinglePickerCity() {
				this.pickerValueArrayF = this.pickerSingleArrayF
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePickerF.show()
			},
			onConfirm(e) {
					this.province = e.value[0];
					this.province_name = e.label;
					this.city = '';
					this.city_name = '';
					this.getCity(e.value[0]);
			},
			onConfirmF(e) {
					this.city = e.value[0];
					this.city_name = e.label;
			},
			onCancel(e) {
				console.log(e)
			},
			switch2Change: function (e) {
				if(e.target.value){
					this.province = '';
					this.province_name = '';
					this.city = '';
					this.city_name = '';
					this.getProvince();
					this.zx_area = 1;
				}else{
					this.zx_area = 0;
				}
				
			},
			getProvince: function () {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const block_id =  this.block_id;
				try {
					uni.showLoading();
					this.$http.post(this.websiteUrl + '/api/pay/getProvince', {
						openid,
						sessionKey,
						block_id
					}, (res) => {
						uni.hideLoading();
						if (res.data.code == 1) {
							this.pickerSingleArray = res.data.result;
						}else{
							uni.showModal({
								content: res.data.msg,
								showCancel: false
							});
						}
					});
				} catch (e) {
					uni.hideLoading();
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
					});
				}
			},
			getCity: function (province) {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const block_id = this.block_id;
				try {
					uni.showLoading();
					this.$http.post(this.websiteUrl + '/api/pay/getCity', {
						openid,
						sessionKey,
						province,
						block_id,
					}, (res) => {
						uni.hideLoading();
						if (res.data.code == 1) {
							this.pickerSingleArrayF = res.data.result;
						}else{
							uni.showModal({
								content: res.data.msg,
								showCancel: false
							});
						}
					});
				} catch (e) {
					uni.hideLoading();
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
					});
				}
			},
			goPayMoney(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const money = this.money;
				const bankcard_id = this.bankcard_id;
				const block_id = this.block_id;
				const credit_id = this.credit_id;
				
				const province = this.province;
				const city = this.city;
				const zx_area = this.zx_area;
				if(openid == null){
					return;
				}
				const that = this;
				try {
					if(this.loading){
						return;
					}
					this.loading = true;
					this.$http.post(this.websiteUrl+'/api/pay/goPayMoney',{openid,sessionKey,money,bankcard_id,block_id,credit_id,province,city,zx_area},(res) => {
						if(res.data.code==1){
							if(res.data.result.url != ''){
								that.loading = false;
								uni.navigateTo({
									url: '/pages/card/web-view/web-view?url='+res.data.result.url
								})
							}else{
								uni.showModal({
									content:res.data.msg,
									showCancel:false,
									success:function() {
										that.loading = false;
										uni.switchTab({
											url: '/pages/tabBar/index/index'
										})
									}
								})
							}
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
			},
			getPosStepData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const money = this.money;
				const bankcard_id = this.bankcard_id;
				const block_id = this.block_id;
				
				if(openid == null){
					return;
				}
				try {
					this.$http.post(this.websiteUrl+'/api/pay/getPosStepData',{openid,sessionKey,money,bankcard_id,block_id},(res) => {
						if(res.data.code==1){
							this.radioItems = res.data.result.creditCard;
							this.is_area = res.data.result.is_area;
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
			getPosFee(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const money = this.money;
				const bankcard_id = this.bankcard_id;
				const block_id = this.block_id;
				const credit_id = this.credit_id;
				if(openid == null){
					return;
				}
				try {
					this.$http.post(this.websiteUrl+'/api/pay/getPosFee',{openid,sessionKey,money,bankcard_id,block_id,credit_id},(res) => {
						if(res.data.code==1){
							this.payFee = res.data.result.payFee;
							this.vipPayFee = res.data.result.vipPayFee;
							this.disabled = false;
						}else{
							this.disabled = true;
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
			radioChange: function(e) {
				var checked = e.target.value
				var changed = {}
				for (var i = 0; i < this.radioItems.length; i++) {
					if (checked.indexOf(this.radioItems[i].name) !== -1) {
						changed['radioItems[' + i + '].checked'] = true;
						this.credit_name = this.radioItems[i].value;
					} else {
						changed['radioItems[' + i + '].checked'] = false;
					}
				}
				this.credit_id = e.detail.value;
				this.showPopupBottom = false;
				this.getPosFee();
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupBottom = false;
				this.showAisleBottom = false;
			},
			//展示底部 popup
			showBottomPopup: function() {
				this.hidePopup();
				this.popType = 'bottom';
				this.showPopupBottom = true;
			},
			goDetailPage(url) {
				const openid = this.$store.state.openid;
				if(openid == null){
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
					return false;
				}
				uni.navigateTo({
					url: url
				})
			}
		},
		components: {
			uniPopup,mpvuePicker,mpvuePickerF
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f7f8fa;
	}
	
	.pos_bg{
		background-color: #fd5950;
		background: linear-gradient(top, #fd5950, #ff7575);
		height: 160upx;
		color: #FFFFFF;
		 padding: 40upx 50upx;
		 text-align: center;
	}
	
	.pos_yhze{
		font-size: 24upx;
		font-weight: 500;
	}
	
	.pos_yhze_text text{font-size: 54upx;
		font-weight: 500;}
	
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
	
	.by-button-submit{
		background-color:#fd5950;
		background: linear-gradient(left, #ff7575, #fd5950);
	}
	
	.by-button-submit[disabled]{
		background-color:#DDDDDD;
		background: linear-gradient(left, #DDDDDD, #DDDDDD);
		color: #b2b2bd;
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
	
	.tip_btn{color: #cdd1dd;}
	.tip_btn text{color: #fd5950;}
	.font-max{font-size: 28upx; font-weight: 700;}
	
		.uni-list-cell:after{ left: 0upx;}
	
	
	.add-card-btn {
		font-size: 28upx;
		font-weight: 500;
		line-height: 100upx;
		height: 100upx;
	}
	
	.add-card-btn .add-title {
		line-height: 96upx;
		font-size: 28upx;
	}
	
	.uni-icon-plusempty {
		font-size: 68upx;
		line-height: 100upx;
		
	}
	
	.by-sdhrg{
		color: #576175;
		font-size: 24upx;font-weight: 700;font-weight: 500;
	}
	
	.red-text{color: #fe5950;font-weight: 500;}
	
	.by-sdhp{ border-bottom: 2upx solid #dddddd;}
	.dzfont {font-weight: 600;    color: #576175;}
	
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
	
</style>