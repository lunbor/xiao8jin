<template>
	<view>
		<view>
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="content">
			<view v-show="current === 0" class="uni-padding-wrap">
				<view class="card-no-add" v-if="creditCard.length==0">
					<image src="../../../static/card-no-add.png"></image>
					<view class="add-card-btn uni-flex uni-row" style="justify-content: center;" @click="onAddCredit('/pages/card/credit/add')">
						<view class="flex-item uni-icon uni-icon-plusempty"></view>
						<view class="flex-item add-title">添加新的信用卡</view>
					</view>
				</view>

				<view class="uni-card uni-card-red" v-for="(item, index) in creditCard" :key="index" v-bind:style="{ background: item.color}">
					<view class="uni-triplex-row pd15">
						<view class="uni-triplex-left lf7">{{item.bank_name}}<text>{{item.credit_code}}</text></view>
						<view class="uni-triplex-right rg3"><button class="mini-btn" type="primary" size="mini" v-if="item.is_repay === 1" @click="goTorepay(item.credit_id)">去还款</button><button class="mini-btn" type="primary" size="mini" v-else>查看</button></view>
					</view>
					<view class="uni-triplex-row linebg"></view>
					<view class="uni-flex uni-row">
						<view class="flex-item ls3">
							<view class="ls3-row">￥<text>{{item.line_credit}}</text></view>
							<view>额度</view>
						</view>
						<view class="flex-item ls3">
							<view class="ls3-row"><text>{{item.bill_time}}</text>日</view>
							<view>账单日</view>
						</view>
						<view class="flex-item ls3">
							<view class="ls3-row"><text>{{item.repay_time}}</text>日</view>
							<view>还款日</view>
						</view>
					</view>
					<view v-show="item.is_repay === 1" @click="goTorepay(item.credit_id)">
						<view class="uni-flex uni-row btn-repay-bg"></view>
						<view class="uni-flex uni-row btn-repay">立即还款</view>
					</view>	
				</view>
			</view>
			<view v-show="current === 1" class="uni-padding-wrap">
				<view class="card-no-add" v-if="bankCard.length==0">
					<image src="../../../static/card-no-add.png"></image>
					<view class="add-card-btn uni-flex uni-row" style="justify-content: center;" @click="goDetailPage('/pages/card/bank/add')">
						<view class="flex-item uni-icon uni-icon-plusempty"></view>
						<view class="flex-item add-title">添加新的储蓄卡</view>
					</view>
				</view>
				
				<view class="uni-card uni-card-red" v-for="(item, index) in bankCard" :key="index" v-bind:style="{ background: item.color}">
					<view class="uni-triplex-row pd15">
						<view class="text lf">{{item.bank_name}}<text>{{item.name}}</text></view>
						<view class="text rg"><button class="mini-btn" type="primary" size="mini">储蓄卡</button></view>
						<view class="text rg" style="flex: 1; text-align: right;"><button class="mini-btn" type="primary" size="mini" @click="delBank(item.bankcard_id)">解绑</button></view>
					</view>
					<view class="uni-triplex-row linebg"></view>
					<view class="uni-flex uni-row  code-fj">
						<view class="text">***</view>
						<view class="text">****</view>
						<view class="text">****</view>
						<view class="text lhg50">{{item.bank_code}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 居中 -->
		<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup" :title="tiptitle" :queren="true" :quxiao="false">
			<view class="uni-common-mt uni-helllo-text uni-center" style="text-align: left;">
				<rich-text :nodes="tipcontent"></rich-text>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniSegmentedControl from '../../../components/uni-segmented-control.vue';
	import uniPopup from '../../../components/uni-popup.vue';
	export default {
		data() {
			return {
				items: [
					'信用卡',
					'储蓄卡',
				],
				current: 0,
				activeColor: '#fe5950',
				styleType: 'text',
				creditCard: [],
				bankCard: [],
				Loop:'',
				popType: 'middle',
				tiptitle: '提示',
				showPopupMiddle: false,
				tipcontent:'',
				is_validate:'',
			}
		},
		onLoad() {
			//uni.startPullDownRefresh();
		},
		onShow(){
			this.getCardData();
		},
		onPullDownRefresh() {
			clearTimeout(this.Loop);
			this.getCardData();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
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
			if(this.current==0){
				this.onAddCredit();
			}else if(this.current==1){
				uni.navigateTo({
					url: '/pages/card/bank/add'
				})
			}
		},
		components: {
			uniSegmentedControl,uniPopup
		},
		methods: {
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupMiddle = false;
				uni.navigateTo({
					url: '/pages/card/credit/add'
				})
			},
			//展示居中 popup
			showMiddlePopup: function() {
				//this.hidePopup();
				this.popType = 'middle';
				this.showPopupMiddle = true;
			},
			onAddCredit(){
				const openid = this.$store.state.openid;
				if(openid === null){
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
				if(this.bankCard.length==0){
					uni.showModal({
						content:'需要先绑定储蓄卡！',
						showCancel:true,
						success:function(e){	
							if(e.confirm){
								uni.navigateTo({
									url: '/pages/card/bank/add'
								})
							}
						}
					})
				}else{
					if(this.creditCard.length==0){
						this.tiptitle = '绑卡须知';
						this.showMiddlePopup();
					}else{
						uni.navigateTo({
							url: '/pages/card/credit/add'
						})
					}
				}
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
			}, 
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			getCardData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				if(openid == null){
					return;
				}
				try {
					this.$http.post(this.websiteUrl+'/api/api/getCardData',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.bankCard = res.data.result.bankCard;
							this.creditCard = res.data.result.creditCard;
							this.is_validate = res.data.result.is_validate;
							this.tipcontent = res.data.result.article.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
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
			delCredit(credit_id){
				clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
				const that =this;
				this.Loop = setTimeout(function() {
					uni.showModal({
						content: "是否删除该信用卡？",
						confirmText: "确定",
						cancelText: "取消",
						success:function(e){
							if(e.confirm){
								clearTimeout(that.Loop);
								const openid = that.$store.state.openid;
								const sessionKey = that.$store.state.sessionKey;
								try {
									that.$http.post(that.websiteUrl+'/api/card/delCredit',{openid,sessionKey,credit_id},(res) => {
										if(res.data.code==1){
											that.getCardData();
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
							}
						}
					})
				}.bind(this), 2000);
			},
			delCreditAct(credit_id){
				
			},
			delBank(bankcard_id){
				//clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
				const that =this;
				//this.Loop = setTimeout(function() {
					uni.showModal({
						content: "是否删除该储蓄卡？",
						confirmText: "确定",
						cancelText: "取消",
						success:function(e){
							if(e.confirm){
								//clearTimeout(that.Loop);
								const openid = that.$store.state.openid;
								const sessionKey = that.$store.state.sessionKey;
								try {
									that.$http.post(that.websiteUrl+'/api/card/delBank',{openid,sessionKey,bankcard_id},(res) => {
										if(res.data.code==1){
											that.getCardData();
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
							}
						}
					})
				//}.bind(this), 2000);
			},
			cleartime(credit_id) {
				// 这个方法主要是用来将每次手指移出之后将计时器清零
				clearTimeout(this.Loop);
			},
			goTorepay(credit_id){
				uni.navigateTo({
					url: '/pages/card/credit/info?credit_id='+credit_id
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.content .card-no-add {
		margin-top: 140upx;
	}

	.content .card-no-add image {
		width: 260upx;
		height: 260upx;
	}

	.color-tag {
		width: 50upx;
		height: 50upx;
	}

	.add-card-btn {
		color: #b2b6c2;
		font-size: 32upx;
		font-weight: 500;
		margin-top: 86upx;
		line-height: 100upx;
		height: 100upx;
		background-color: #fafafa;
		border: 2upx #999999 solid;
		border-radius: 10upx;
	}
	
	.add-card-btn .add-title {
		line-height: 96upx;
		font-size: 32upx;
	}

	.uni-icon-plusempty {
		font-size: 88upx;
		color: #9097a9;
		line-height: 100upx;
		
	}
	
	
	.uni-card-red{
		background: linear-gradient(to right, #ff7575, #fe5950);
		border-radius: 15upx;
		color: #fff;
		min-height: 260upx;
		margin-top: 50upx;
		overflow: hidden;
		position: relative;
	}
	
	.uni-card .lf7{width: 74%; font-weight: 500;font-size: 32upx; text-align: left;    -webkit-flex-direction: inherit;
    -ms-flex-direction: inherit;
    flex-direction: inherit;line-height: 60upx;}
	.uni-card .lf7 text{font-size: 28upx;font-weight:normal; line-height: 60upx; margin-left: 10upx;}
	.uni-card .rg3{width: 26%;}
	
	
	
	.uni-card .lf{ font-weight: 500;font-size: 32upx; text-align: left; line-height: 60upx;}
	.uni-card .lf text{font-size: 28upx;line-height: 40upx;display: block;}
	.uni-card .rg{ margin-left: 20upx;}
	.uni-card .code-fj{line-height: 90upx; height: 90upx; font-size: 38upx; width: 100%;text-align: right;justify-content: flex-end;}
	.uni-card .code-fj .text{ margin-right: 50upx; text-align: right;line-height: 105upx;font-size: 38upx; }
	.uni-card .code-fj .text.lhg50{ line-height: 90upx; }
	
	.mini-btn{ line-height: 55upx ; width: 160upx; height: 55upx;background-color: #fe5950 !important; background: transparent !important; 
	
	}
	.mini-btn:after{border: 5upx solid #FFFFFF;}
	.linebg{background: #EEEEEE; height: 2upx; line-height: 2upx;padding:0upx; width: 90%; margin: 0 auto;opacity:0.5;}
	.pd15{ padding: 28upx 30upx;}
	
	.ls3{
		width: 33.33%;
		height: 140upx;
		text-align: center;
		margin-top: 15upx;
	}
	
	.ls3-row text{ font-size: 36upx; font-weight: 500;}
	
	.btn-repay-bg{ text-align: center; width: 100%;opacity:0.5; background-color: #666666; color: #fff; height: 80upx; line-height: 80upx; margin: 0 auto; }
	.btn-repay{margin: 0 auto;color: #fff; position: absolute;left: 42%;bottom: 18upx;}
</style>
