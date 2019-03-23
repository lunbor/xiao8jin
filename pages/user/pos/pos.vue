<template>
	<view class="uni-padding-wrap">
		
		<view class="uni-card by-card">
			<view class="uni-card-content">
				<view class="hg50">
					<view class="uni-list-cell-navigate">
						<view class="by-sdh">收款金额<text></text></view>
						<input class="uni-input font-max" placeholder-style="font-weight: normal;" type="digit" v-model="money"  placeholder="请输入要收款的金额" />
					</view>
				</view>
				
				<view class="hg50">
					<view class="uni-list-cell-navigate uni-navigate-right bb0">
						<view class="by-sdh">收款账户<text></text></view>
						<input class="uni-input" @click="showBottomPopup" disabled="disabled"  v-model="bank_name"  placeholder="请选择收款账户" />
					</view>
				</view>
			</view>
		</view>
		
		<view class="uni-card by-card">
			<view class="uni-card-content">
				<view class="hg50">
					<view class="uni-list-cell-navigate uni-navigate-right bb0">
						<view class="by-sdh">支付通道<text></text></view>
						<input class="uni-input" @click="showAislePopup" disabled="disabled"  v-model="aisle_name"  placeholder="请选择支付通道" />
					</view>
				</view>
			</view>
		</view>
		
		<view class="uni-common-mt">
			<button type="warn" class="by-button-submit" :loading="loading" @click="goPosStep">下一步</button>
		</view>
		
		<view class="uni-common-mt tip_btn">
			<text>*</text> 为保护账户资金安全，请仔细核对收款信息。
		</view>
		
		<!-- 底部 -->
		<uni-popup :show="showPopupBottom" :type="popType" v-on:hidePopup="hidePopup" title="请选择收款卡">
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
					<view class="add-card-btn uni-flex uni-row" style="justify-content: center;" @click="goDetailPage('/pages/card/bank/add')">
						<!-- <view class="flex-item uni-icon uni-icon-plusempty"></view> -->
						<view class="flex-item add-title">添加新的储蓄卡</view>
					</view>
			</view>
		</uni-popup>
		
		<!-- 底部 -->
		<uni-popup :show="showAisleBottom" :type="popType" v-on:hidePopup="hidePopup" title="请选择支付通道">
			<view class="uni-center">
					<radio-group class="uni-list" @change="radioChangeAisle">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in aisleItems" :key="index">
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
					<view class="add-card-btn uni-flex uni-row" style="justify-content: center;">
						<!-- <view class="flex-item uni-icon uni-icon-plusempty"></view> -->
						<view class="flex-item add-title">更多支付通道,敬请期待</view>
					</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '../../../components/uni-popup-bank.vue';
	export default {
		data() {
			return {
				money:'',
				bank_name:'',
				bankcard_id:'',
				aisle_name:'',
				block_id:'',
				popType: 'middle',
				showPopupBottom: false,
				showAisleBottom: false,
				is_validate:0,
				loading:false,
				radioItems: [],
				aisleItems: [],
			}
		},
		onLoad() {

		},
		onShow(){
			this.getPosData();
		},
		onHide() {
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
			}
			
			if (this.showAisleBottom) {
				this.showAisleBottom = false;
			}
		},
		onBackPress() {
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
				return true;
			}
			
			if (this.showAisleBottom) {
				this.showAisleBottom = false;
				return true;
			}
		},
		onUnload() {
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
			}
			
			if (this.showAisleBottom) {
				this.showAisleBottom = false;
			}
		},
		onNavigationBarButtonTap(e) {
			const openid = this.$store.state.openid;
			if(openid === null){
				uni.navigateTo({
					url: '/pages/user/login/login'
				})
				return false;
			}

			uni.navigateTo({
				url: '/pages/user/account/account'
			})
		},
		methods: {
			goPosStep(){
				
				if(this.money==''){
					uni.showModal({
						content: '请输入收款金额',
						showCancel: false
					});
					return;
				}
				
				if(this.money < 10){
					uni.showModal({
						content: '收款金额必须大于10元',
						showCancel: false
					});
					return;
				}
				
				if(this.bankcard_id=='' || this.bank_name==''){
					uni.showModal({
						content: '请收款银行卡',
						showCancel: false
					});
					return;
				}
				
				if(this.block_id=='' || this.aisle_name==''){
					uni.showModal({
						content: '请支付通道',
						showCancel: false
					});
					return;
				}
				
				uni.navigateTo({
					url: '/pages/user/pos/posStep?money='+this.money+'&bankcard_id='+this.bankcard_id+'&bank_name='+this.bank_name+'&block_id='+this.block_id+'&aisle_name='+this.aisle_name
				})
			},
			getPosData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				if(openid == null){
					return;
				}
				try {
					this.$http.post(this.websiteUrl+'/api/pay/getPosData',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.radioItems = res.data.result.bankCard;
							this.is_validate = res.data.result.is_validate;
							this.bankcard_id= res.data.result.bankcard_id;
							this.bank_name= res.data.result.bank_name;
							
							this.aisleItems = res.data.result.qxlist;
							this.block_id= res.data.result.block_id;
							this.aisle_name= res.data.result.aisle_name;
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
			radioChange: function(e) {
				var checked = e.target.value
				var changed = {}
				for (var i = 0; i < this.radioItems.length; i++) {
					if (checked.indexOf(this.radioItems[i].name) !== -1) {
						changed['radioItems[' + i + '].checked'] = true;
						this.bank_name = this.radioItems[i].value;
					} else {
						changed['radioItems[' + i + '].checked'] = false;
					}
				}
				this.bankcard_id = e.detail.value;
				this.showPopupBottom = false;
			},
			radioChangeAisle: function(e) {
				var checked = e.target.value
				var changed = {}
				for (var i = 0; i < this.aisleItems.length; i++) {
					if (checked.indexOf(this.aisleItems[i].name) !== -1) {
						changed['aisleItems[' + i + '].checked'] = true;
						this.aisle_name = this.aisleItems[i].value;
					} else {
						changed['aisleItems[' + i + '].checked'] = false;
					}
				}
				this.block_id = e.detail.value;
				this.showAisleBottom = false;
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
			//展示底部 popup
			showAislePopup: function() {
				this.hidePopup();
				this.popType = 'bottom';
				this.showAisleBottom = true;
			},
			goDetailPage(url) {
				const openid = this.$store.state.openid;
				if(openid == null){
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
					return false;
				}
				if(this.is_validate!=1){
					uni.showModal({ //提醒用户更新
						title: '提示',
						content: '您还没有进行实名认证，是否立即前往认证？',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/user/info/realname'
								})
							}
						}
					})
					return false;
				}
				uni.navigateTo({
					url: url
				})
			}
		},
		components: {
			uniPopup
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
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		padding: 0 20upx;
	}
	
	.uni-card.by-card .p15 {
		padding: 0upx 16upx;
	}
	
	.by-sdh {
		    width: 60px;
    height: 26px;
    color: #576175;
    font-weight: 600;
    margin-right: 15px;
    text-align: justify;
    font-size: 26upx;
    line-height: 26px;
	}
	
	.by-sdh text {
		display: inline-block;
		height: 0upx;
		width: 100%;
	}
	
	.hg50 .uni-navigate-right:after {
		font-size: 28upx;
	}
	
	.hg50 .uni-list-cell-navigate {
		/* line-height: 80upx; */
		border-bottom: 2upx solid #ecedef;
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
	
	.font-max{font-size: 28upx; font-weight: 700;}
	
	.uni-list-cell:after{ left: 0upx;}
	
	
	.add-card-btn {
		font-size: 28upx;
		font-weight: 500;
		line-height: 100upx;
		height: 100upx;
	}
	
	.add-card-btn .add-title {
		line-height: 100upx;
		font-size: 24upx;
		color: #999;
	}
	
	.uni-icon-plusempty {
		font-size: 68upx;
		line-height: 100upx;
		
	}
	.tip_btn{color: #a6a6a6;font-size: 24upx;line-height: 50upx;}
	.tip_btn text{color: #fd5950;}
	.uni-card{margin: 35upx 0;}
	.uni-input{padding: 0 8upx;}
	.uni-common-mt{margin-top: 16upx;}
	
</style>
