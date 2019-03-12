<template>
	<view>
		<view class="uni-card uni-card-red md15" v-bind:style="{ background: card.color}">
			<view class="uni-triplex-row pd15">
				<view class="uni-triplex-left lf7">{{card.bank_name}}<text>{{card.credit_code}}</text></view>
				<view class="uni-triplex-right rg3"><button class="mini-btn" type="primary" size="mini">信用卡</button></view>
			</view>
			<view class="uni-triplex-row linebg"></view>
			<view class="uni-flex uni-row">
				<view class="flex-item ls3">
					<view class="ls3-row">￥<text>{{card.line_credit}}</text></view>
					<view>额度</view>
				</view>
				<view class="flex-item ls3">
					<view class="ls3-row"><text>{{card.bill_time}}</text>日</view>
					<view>账单日</view>
				</view>
				<view class="flex-item ls3">
					<view class="ls3-row"><text>{{card.repay_time}}</text>日</view>
					<view>还款日</view>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-card by-card">
				<view class="uni-card-content p15" v-if="repayTemp.current==2">
					<view class="list-item" v-for="(item,index) in repayTemp.list" :key="index" >
						<view class="uni-flex uni-row justify">
							<view class="text left-text">
								<view class="text log-title" v-if="item.type==2">还款</view>
								<view class="text log-title" v-else-if="item.type==1">消费</view>
								<view class="text log-time">{{item.chtime}}</view>
							</view>
							<view class="text right-text">
								<view class="text log-money">￥{{item.money/100}}</view>
								<view class="text log-balance" v-if="item.type==1">
									<text v-if="item.mcc_p_name!=''">行业：{{item.mcc_p_name}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-card-content p15" v-if="repayTemp.current!=2">
					<view class="repay_title">还款金额：￥<text>{{repayTemp.total/100}}</text></view>
					<view class="uni-timeline" style="padding: 30upx 20upx;background-color: #fff;">
						<view class="uni-timeline-item" :class="index==1?'uni-timeline-first-item':index==repayTemp.list.length-1?'uni-timeline-last-item':''" v-for="(item,index) in repayTemp.list" :key="index" v-if="item.type==2">
							<view class="uni-timeline-item-keynode">{{item.chtime}}</view>
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<view class="uni-flex uni-row">
									<view class="text list-money">￥<text>{{item.money/100}}</text></view>
									<view class="text list-type" v-if="item.type==2">还款</view>
									<view class="text list-type" v-else-if="item.type==1">消费</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="uni-list-cell uni-collapse">
						<view class="uni-list-cell-navigate uni-navigate-bottom repay-mx" :class="show ? 'uni-active' : ''">
							<view class="text"><view class="uni-icon uni-icon-help-filled help-filled" @click="getTipZzj()"></view>周转金：<text v-if="repayTemp.current==1">￥{{(repayTemp.minMoney-repayTemp.maxExpen)/100}}</text><text v-else>￥{{repayTemp.minMoney/100}}</text></view>
							<view class="uni-list-cell-left" @click="trigerCollapse()">明细</view>
						</view>
						<view class="uni-collapse-content" :class="show ? 'uni-active mt15' : ''">
							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">还款金额</view>
								<view class="text uni-list-cell-left">￥{{repayTemp.total/100}}</view>
							</view>
							
							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">还款手续费</view>
								<view class="text uni-list-cell-left">￥{{repayTemp.sMoney/100}}</view>
							</view>
							
							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">还款次数费</view>
								<view class="text uni-list-cell-left">￥{{repayTemp.payNum}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
			<view class="uni-card by-card" v-if="repayTemp.current==1">
				<view class="uni-card-content p15 dzfont">	
					<view class="hg50" >
						<view class="uni-input-row">
							<label>提供垫资本金</label>
							<text>￥{{repayTemp.maxExpen/100}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-card by-card">
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
		</view>
		
		<view class="uni-common-mt uni-padding-wrap uni-common-mb">
			<button type="warn" class="by-button-submit" :loading="loading" @click="submitRepayStep">提交计划</button>
		</view>
		
		<!-- 弹出层 -->
		<view class="uni-banner" v-if="bannerShow">
			<view>
				<view class="uni-card by-card">
					<view class="uni-card-content pd15">
						<view class="tip_btn"><text>*</text> 周转金:信用卡需要预留的额度;</view>
						<view class="tip_btn"><text>*</text> 平台收取的手续费=还款手续费+还款次数费;</view>
						<view class="tip_btn"><text>*</text> 若中途还款失败，平台只收取已经交易成功部分的手续费;</view>
						<view class="tip_btn"><text>*</text> 信用卡额度不足周转金金额，会导致还款计划失败;</view>
						<!--<view class="tip_btn"><text>* 办理VIP年费会员并且积分达1000以上可享受平台垫资周转金服务;</text></view>
						<view class="text"><button type='warn' class="queren-btn"  @click="goDetailPage('/pages/user/vip/vip')">立即办理</button></view>-->
						
					</view>
				</view>
			</view>
			<view class="tip_cancel" @tap="closeBanner">
				<image src="../../../static/wk_tip_cancel.png"></image>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
		
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		 
		 <mpvue-picker :themeColor="themeColor" ref="mpvuePickerF" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		  @onConfirm="onConfirmF" @onCancel="onCancel" :pickerValueArray="pickerValueArrayF"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvuePickerF from '../../../components/mpvue-picker/mpvuePicker.vue';
	export default {
		components: {
			mpvuePicker,mpvuePickerF
		},
		data() {
			return {
				credit_id: '',
				temp_id:'',
				card: [],
				loading: false,
				show:true,
				repayTemp:[],
				bannerShow:false,
				is_dz:0,
				dz_fee:0,
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
		computed: {

		},
		onLoad(e) {
			if (e.credit_id && e.temp_id) {
				this.credit_id = e.credit_id;
				this.temp_id = e.temp_id;
			} else {
				uni.switchTab({
					url: '/pages/tabBar/card/card'
				})
			}
		},
		onShow() {
			this.getRepayTemp();
		},
		onBackPress() {},
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
			goDetailPage(url) {
				uni.navigateTo({
						url: url
				})
			},
			closeBanner: function() {
				this.bannerShow = false;
			},
			getTipZzj(){
				this.bannerShow = true;
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
				const current = this.repayTemp.current;
				try {
					uni.showLoading();
					this.$http.post(this.websiteUrl + '/api/repay/getProvince', {
						openid,
						sessionKey,
						current
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
				const current = this.repayTemp.current;
				try {
					uni.showLoading();
					this.$http.post(this.websiteUrl + '/api/repay/getCity', {
						openid,
						sessionKey,
						province,
						current,
						
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
			submitRepayStep: function () {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const temp_id = this.temp_id;
				const credit_id = this.credit_id;
				const is_dz = this.is_dz;
				const that = this;
				
				const province = this.province;
				const city = this.city;
				const zx_area = this.zx_area;

				try {
					if(this.loading){
						return;
					}
					this.loading = true;
					
					this.$http.post(this.websiteUrl + '/api/repay/submitRepayStep', {
						openid,
						sessionKey,
						temp_id,
						credit_id,
						is_dz,
						province,
						city,
						zx_area
					}, (res) => {
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
											uni.navigateTo({
												url: '/pages/card/credit/repayInfo?credit_id='+that.credit_id
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
						content: '网络异常,请稍后重试...',
						showCancel: false,
						success:function() {
							that.loading = false;
						}
					});
				}
			},
			getRepayTemp() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const credit_id = this.credit_id;
				const temp_id = this.temp_id;
				try {
					this.$http.post(this.websiteUrl + '/api/repay/getRepayTemp', {
						openid,
						sessionKey,
						credit_id,
						temp_id
					}, (res) => {
						if (res.data.code == 1) {
							this.card = res.data.result.creditCard;
							this.repayTemp = res.data.result.repayTemp.temp_body;
							if(res.data.result.repayTemp.temp_body.current == 1){
								this.is_dz = 1;
							}
							this.dz_fee = res.data.result.dz_fee;
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
			trigerCollapse() {
				this.show = !this.show;
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

			if (this.show) {
				this.show = false;
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}
			
			if (this.$refs.mpvuePickerF.showPicker) {
				this.$refs.mpvuePickerF.pickerCancel()
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
	
	.uni-card-red {
			background: linear-gradient(to right, #ff7575, #fe5950);
			border-radius: 15upx;
			color: #fff;
			min-height: 260upx;
			margin-top: 30upx;
			overflow: hidden;
			position: relative;
		}
	
		.uni-card .lf7 {
			width: 74%;
			font-weight: 500;
			font-size: 32upx;
			text-align: left;
			-webkit-flex-direction: inherit;
			-ms-flex-direction: inherit;
			flex-direction: inherit;
			line-height: 60upx;
		}
	
		.uni-card .lf7 text {
			font-size: 28upx;
			font-weight: normal;
			line-height: 60upx;
			margin-left: 10upx;
		}
	
		.uni-card .rg3 {
			width: 26%;
		}
	
	
	
		.uni-card .lf {
			font-weight: 500;
			font-size: 32upx;
			text-align: left;
			line-height: 60upx;
		}
	
		.uni-card .lf text {
			font-size: 28upx;
			line-height: 40upx;
			display: block;
		}
	
		.uni-card .rg {
			margin-left: 20upx;
		}
	
		.uni-card .code-fj {
			line-height: 90upx;
			height: 90upx;
			font-size: 38upx;
			width: 100%;
			text-align: right;
			justify-content: flex-end;
		}
	
		.uni-card .code-fj .text {
			margin-right: 50upx;
			text-align: right;
			line-height: 105upx;
			font-size: 38upx;
		}
	
		.uni-card .code-fj .text.lhg50 {
			line-height: 90upx;
		}
	
		.mini-btn {
			line-height: 55upx;
			width: 160upx;
			height: 55upx;
			background-color: #fe5950 !important;
			background: transparent !important;
	
		}
	
		.mini-btn:after {
			border: 5upx solid #FFFFFF;
		}
	
		.linebg {
			background: #EEEEEE;
			height: 2upx;
			line-height: 2upx;
			padding: 0upx;
			width: 90%;
			margin: 0 auto;
			opacity: 0.5;
		}
	
		.pd15 {
			padding: 28upx 30upx;
		}
	
		.ls3 {
			width: 33.33%;
			height: 140upx;
			text-align: center;
			margin-top: 15upx;
		}
	
		.md15 {
			margin: 30upx;
		}
		
		.uni-card.by-card {
			border-radius: 12upx;
			-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
			box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
			overflow: hidden;
		}
		.repay_title text{font-size: 40upx; font-weight: 500;}
		.repay_title{ padding-left: 34upx; color: #FFFFFF; height: 115upx; line-height: 115upx; background-color: #dbc89f;}
		
		
		.uni-timeline-item .uni-timeline-item-divider{background-color: #e7c896;}
		.uni-timeline-item .uni-timeline-item-keynode {width: 200upx; line-height: 50upx; text-align: left;}
		.list-money{ text-align: center; color: #fe5d55; font-weight: 600;width: 200upx; line-height: 80upx;}
		.list-money text{ font-size: 36upx; font-weight: 600;}
		.repay-mx .uni-list-cell-left{ font-weight: normal;}
		.mt15 {
			margin-top: 30upx;
		}
		.list-type{width: 180upx;text-align: right;color: #576175;font-size: 32upx; font-weight: 600;line-height: 80upx}
		.repay-mx{height: 100upx; line-height: 100upx; color: #576175;font-weight: 600;}
		.repay-mx .text text{ font-size: 36upx; color: #fe4040;}
		.uni-list-cell-navigate.uni-active{ background-color: #FFFFFF; border-bottom: 2upx solid #ecedef;}
		.repay-fee{ height: 80upx; line-height: 80upx; color: #576175;font-weight: 600;}
		
		.by-button-submit{
			background-color:#fd5950;
			background: linear-gradient(left, #ff7575, #fd5950);
		}
		

		.tip_btn text{color: #fd5950;}
		
		.help-filled{color: #fd5950; font-size: 32upx;}
		.by-sdhp{ border-bottom: 2upx solid #dddddd;}
		.dzfont {font-weight: 600;    color: #576175;}
		
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
		
		.queren-btn{background:#fe5950; width: 200upx; height: 80upx; line-height: 80upx; font-size: 28upx; margin: 30upx auto; margin-bottom: 0upx;}
		
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
		
		
		.list-item {
			padding: 16upx 30upx;
			height: 96upx;
			line-height: 96upx;
			border-bottom: 2upx solid #eee;
			text-align: center;
		}
		
		.justify{justify-content: space-between;}
		.justify .left-text{ text-align: left;}
		.justify .right-text{ text-align: right;}
		
		.log-title{font-size: 28upx; color: #333333;font-weight: 600;}
		.log-time{font-size: 24upx; color: #888888;}
		.log-money{font-size: 28upx; color: #ff3e31;font-weight: 600;}
		.log-balance{font-size: 24upx; color: #666666;}
		
</style>