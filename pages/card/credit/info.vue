<template>
	<view class="uni-padding-wrap">
        	
			<view class="uni-card card_style">
				<view class="card_bank">
					
					<text>{{card.bank_name}}</text>
					<text class="card_num">{{card.credit_code}}</text>
					<text class="bank_type">信用卡</text>
				</view>
				
				<view class="uni-flex uni-row card_main">
					<view class="flex-item ls3">
						<view class="ls3-row">¥<text>{{card.line_credit}}</text></view>
						<view class="name">额度</view>
					</view>
					<view class="flex-item ls3">
						<view class="ls3-row"><text>{{card.bill_time}}</text>日</view>
						<view class="name">账单日</view>
					</view>
					<view class="flex-item ls3">
						<view class="ls3-row"><text>{{card.repay_time}}</text>日</view>
						<view class="name">还款日</view>
					</view>
				</view>
			</view>
		
		
		
		<view class="uni-card by-card by-mt-30">
			<view class="uni-card-content p15">
				<view class="hg50">
					<view class="uni-list-cell-navigate uni-navigate-right" @click="goDetailPage('/pages/card/credit/repayInfo')">
						<view class="card_info_img"><image src="../../../static/card_info_1.png"></image></view>
						<view class="title">查看计划</view>
					</view>
				</view>
				<view class="hg50">
					<view class="uni-list-cell-navigate uni-navigate-right" @click="goDetailPage('/pages/card/credit/repay')">
						<view class="card_info_img"><image src="../../../static/card_info_2.png"></image></view>
						<view class="title">定制计划</view>
					</view>
				</view>
				<view class="hg50">
					<view class="uni-list-cell-navigate uni-navigate-right bb0" @click="goDetailPage('/pages/card/credit/edit')">
						<view class="card_info_img"><image src="../../../static/card_info_3.png"></image></view>
						<view class="title">修改资料</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="uni-common-mt">
			<button type="warn" class="by-button-submit" :loading="loading" @click="delCredit">解除绑定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				credit_id:'',
				card: [],
				loading:false,
			}
		},
		onLoad(e) {
			if(e.credit_id){
				this.credit_id = e.credit_id;
			}else{
				uni.navigateBack();
			}
		},
		onShow() {
			this.getCreditCardInfo();
		},
		onBackPress() {
			uni.switchTab({
				url: '/pages/tabBar/card/card'
			})
		},
		methods: {
			goDetailPage(url) {
				const openid = this.$store.state.openid;
				if (openid === null) {
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
				} else {
					uni.navigateTo({
						url: url+'?credit_id='+this.credit_id
					})
				}
			
			},
			delCredit(){
				const that =this;
				const credit_id = this.credit_id;
				uni.showModal({
					content: "是否解绑该信用卡？",
					confirmText: "确定",
					cancelText: "取消",
					success:function(e){
						if(e.confirm){
							const openid = that.$store.state.openid;
							const sessionKey = that.$store.state.sessionKey;
							try {
								that.$http.post(that.websiteUrl+'/api/card/delCredit',{openid,sessionKey,credit_id},(res) => {
									if(res.data.code==1){
										uni.switchTab({
											url: '/pages/tabBar/card/card'
										})
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
			},
			getCreditCardInfo() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const credit_id = this.credit_id;
				try {
					this.$http.post(this.websiteUrl + '/api/card/getCreditCardInfo', {
						openid,
						sessionKey,
						credit_id
					}, (res) => {
						if (res.data.code == 1) {
							this.card = res.data.result;
							uni.setNavigationBarTitle({
								title: this.card.bank_name,
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
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.uni-card-red{
		background: linear-gradient(to right, #ff7575, #fe5950);
		border-radius: 15upx;
		color: #fff;
		min-height: 260upx;
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
	
	.mini-btn{ /* line-height: 55upx ; */ width: 120upx; height: 40upx;/* background-color: #fe5950 !important; */ background: transparent !important;
	padding: 0;
    text-align: center;
    line-height:42upx;
	margin: 10upx 20upx;
	
	}
	.mini-btn:after{border: 5upx solid #FFFFFF;}
	.linebg{background: #EEEEEE; height: 2upx; line-height: 2upx;padding:0upx; width: 90%; margin: 0 auto;opacity:0.5;}
	.pd15{ padding: 28upx 30upx;}
	
	.ls3{
		width: 33.33%;
		/* height: 140upx; */
		text-align: center;
		/* margin-top: 15upx; */
		padding: 24upx 0;
	}
	
	
		.hg50 {
			/* height: 120upx; */
			color: #333;
			font-size: 28upx;
			/* font-weight: 600; */
		}
	
		.hg50 .uni-navigate-right:after {
			font-size: 32upx;
		}
	
		.hg50 .uni-navigate-right {
			justify-content:flex-start;
			line-height: 80upx;
			border-bottom: 1upx solid #ecedef;
		}
	
		.hg50 .uni-navigate-right.bb0 {
			border-bottom: 0upx;
		}
		.hg50 .uni-list-cell-navigate {
			/* line-height: 80upx; */
			border-bottom: 2upx solid #ecedef;
			padding:10upx 20upx;
		}
		
		
	
		.uni-card.by-card {
			border-radius: 12upx;
			-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
			box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
			margin-top: 40upx;
		}
		
		.by-mt-30 {
				margin-top: 40upx;
		}
		
	.by-button-submit {
		background-color: #ffa13c;
		background: linear-gradient(left, #ffa13c, #fe8401);
		border-radius: 500px;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(254, 132, 1, 0.4);
		box-shadow: 4upx 4upx 20upx 4upx rgba(254, 132, 1, 0.4);
		margin-top: 40upx;
	}
		
		.card_info_img image{ width: 31upx; height: 31upx;    margin-top: 16upx;}
		
		.uni-card.by-card .p15 {
			padding: 0upx 16upx;
		}
		
		.hg50 .uni-navigate-right .title{
			padding-left: 30upx;
		}
		.card_info_img uni-image{width: 36upx;height: 36upx;}
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
			.bank_type{font-size: 22upx;border: 1px solid #EEEEEE;color: #999999;border-radius: 6upx;line-height: 1;padding: 0 10upx;height: 30upx;line-height: 30upx;
			margin-left: 12upx;margin-top: 8upx;}
			.card_bank{padding: 10upx 0;border-bottom: 1px solid #ECECEC;overflow: hidden;width: 100%;}
			.card_bank text{float: left;}
			.card_bank_icon{width:32upx;height:32upx;margin-right: 10upx;float: left;margin-top: 8upx;}
			.card_bank_info{padding: 20upx 0;color: #333;}
			.card_bank_info .name{color: #999999;}
			.card_bank_info .text{margin-right: 30upx;}
			.card_num{font-size: 24upx;color: #666666;margin-top: 4upx;}
			.card_main{font-size: 32upx;font-weight: 500;padding-top: 20upx;}
			.card_main .name{font-size: 24upx;color: #999;margin-top: 10upx;}
</style>
