<template>
	<view>
		<view class="card_title">
			<view class="card_title_name">还款</view>
		</view>
	
		<view class="content">
			<view class="uni-padding-wrap" style="width: 100%;">
				<view class="card_addCase">
					 <view class="uni-flex uni-row">
				        <view class="flex-item" style="width: 80%;padding-left: 30upx;">
							<img class="card_icon" src="../../../static/card_icon.png">
							<text class="card_name">信用卡管理</text>
						</view>
				        <view class="flex-item" style="width: 20%; padding-right: 30upx;" @click="onAddCredit('/pages/card/credit/add')"><img style="float: right;" class="card_icon" src="../../../static/add_btn.png"></view>
				    </view>
				</view>
				<view class="uni-padding-wrap" style="margin-top: 110upx;">
					<view class="card-no-add" v-if="creditCard.length==0">
						<image src="../../../static/card-no-add.png"></image>
						<view  class="add_card">你现在什么都不绑定，一般情况下是不能还款的，<br>二般情况下你获得了大红包我们也不能咔嚓一下打到你的账户</view>
						<view class="add-card-btn uni-flex uni-row" style="justify-content: center;" @click="onAddCredit('/pages/card/credit/add')">
							<view class="flex-item "></view>
							<view class="flex-item add-title">添加新的信用卡</view>
						</view>
					</view>
					
					<view class="uni-card card_style" v-for="(item, index) in creditCard" :key="index">
						<view class="card_bank"><text>{{item.bank_name}}</text><text class="card_num">{{item.credit_code}}</text></view>
						<view class="uni-flex uni-row card_main">
							<view class="flex-item ls3">
								<view class="ls3-row">¥<text>{{item.line_credit}}</text></view>
								<view class="name">额度</view>
							</view>
							<view class="flex-item ls3">
								<view class="ls3-row"><text>{{item.bill_time}}</text>日</view>
								<view class="name">账单日</view>
							</view>
							<view class="flex-item ls3">
								<view class="ls3-row"><text>{{item.repay_time}}</text>日</view>
								<view class="name">还款日</view>
							</view>
						</view>
						<view v-show="item.is_repay === 1" @click="goTorepay(item.credit_id)">
							<view class="btn-repay">立即还款</view>
						</view>	
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
				creditCard: [],
				// bankCard: [],
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
	page{background-color: #f2f2f2;}
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;	
		margin-top:100upx;
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
		background-color: #32b0fd;
		background: linear-gradient(left, #32b0fd, #097ede);
		border-radius: 500px;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
		box-shadow: 4upx 4upx 20upx 4upx rgba(50, 176, 253, 0.4);
		height: 88upx;
		margin-top: 50upx;
	}
	
	.add-card-btn .add-title {
		line-height: 88upx;
		font-size: 32upx;
		color: #fff;
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
		/* min-height: 260upx; */
		margin-top: 30upx;
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
	.mini-btn{ line-height: 55upx ; width: 160upx; height: 55upx;/* background-color: #fe5950 !important; background: transparent !importa */}
	.mini-btn:after{border: 5upx solid #FFFFFF;}
	/* .linebg{background: #EEEEEE; height: 2upx; line-height: 2upx;padding:0upx; width: 90%; margin: 0 auto;opacity:0.5;} */
	.pd15{ padding: 28upx 30upx;}
	.ls3{
		width: 33.33%;
		/* height: 140upx; */
		text-align: center;
		/* margin-top: 15upx; */
		padding: 24upx 0;
	}
	/* .ls3-row text{ font-size: 36upx; font-weight: 500;} */
	/* .btn-repay-bg{ text-align: center; width: 100%;opacity:0.5; background-color: #666666; color: #fff; height: 80upx; line-height: 80upx; margin: 0 auto; } */
	.btn-repay{color: #5a91fe;font-weight: 600;text-align: center;border-top: 1px solid #ececec;padding: 8upx 0;}
	.content .card-no-add uni-image{width: 360upx;height: 310upx;}
	.add_card{font-size: 22upx;color: #999;text-align: center;line-height: 50upx;margin-top: 30upx;}
	.card_title{background-color: #fff;padding-bottom: 30upx;position: fixed;top: 0;left: 0;width: 100%;z-index: 2000;}
	.card_title_name{padding: 20upx 30upx 0;font-size: 40upx;color: #333;font-weight: 900;}
	.card_addCase{background-color: #fff;/* margin-top: 20upx; */padding: 10upx 0upx;line-height:68upx ;width: 100%;position: fixed;left: 0;z-index: 2000;
	border-top: 1px solid #f2f2f2;-webkit-box-shadow: 0upx 10upx 10upx rgba(0, 37, 174, 0.1);
		box-shadow: 0upx 10upx 10upx rgba(0, 37, 174, 0.1);}
	.card_icon{width: 40upx;height: 40upx;float: left;margin-top: 4upx;}
	.card_name{font-size: 28upx;line-height: 48upx;margin-left: 20upx;float: left;}
	.card_style{
		background: #FFFFFF;
		border-radius: 14upx;
		color: #333;
		margin-top: 30upx;
		position: relative;
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		text-align: left;
		padding:4px 30upx;
		}
		.bank_type{font-size: 22upx;border: 1px solid #ececec;color: #999999;border-radius: 6upx;line-height: 1;padding: 0 10upx;height: 30upx;line-height: 30upx;margin-left: 12upx;
		margin-top: 10upx;}
		.card_bank{padding: 10upx 0;border-bottom: 1px solid #ECECEC;overflow: hidden;}
		.card_bank text{float: left;}
		.card_bank_icon{width:32upx;height:32upx;margin-right: 10upx;float: left;margin-top: 8upx;}
		.card_bank_info{padding: 20upx 0;color: #333;}
		.card_bank_info .name{color: #999999;}
		.card_bank_info .text{margin-right: 30upx;}
		.untying_btn{width: 100upx;height: 100upx;background-color: rgba(255,161,60,0.2);border-radius: 500px;color: #FFFFFF;text-align: center;padding: 16upx;float: right;}
		.untying_btn text{width: 100upx;height:100upx;background-color: rgba(255,161,60,1);border-radius: 500px;display: inline-block;}
		.card_num{font-size: 24upx;color: #666666;margin-top: 4upx;}
		.card_main{font-size: 32upx;font-weight: 500;padding-top: 20upx;}
		.card_main .name{font-size: 24upx;color: #999;margin-top: 10upx;}
</style>
