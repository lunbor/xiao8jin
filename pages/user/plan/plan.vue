<template>
	<view>
		<view class="plan_bg" >
			<view></view>
			<view class="plan_yhze">当前应还总额(元)</view>
			<view class="plan_yhze_text">¥<text>{{planInfo.z_total_money/100}}</text></view>
			<view class="uni-flex uni-row uni-common-mt">
				<view style="flex: 1;">
					<view class="plan_yhze">当前已还总额(元)</view>
					<view class="plan_yhze_text">¥<text>{{planInfo.z_yes_money/100}}</text></view>
				</view>
				
				<view style="flex: 1;">
					<view class="plan_yhze">当前未还总额(元)</view>
					<view class="plan_yhze_text">¥<text>{{planInfo.z_no_money/100}}</text></view>
				</view>
			</view>
		</view>
		<view class="contentbg">
			<view style="padding-top: 20upx;">
				<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
				:activeColor="activeColor"></uni-segmented-control>
			</view>
				
			<view class="content" v-if="current===0">
				<view class="no-list" v-if="planInfo.creditCard.length==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				<view class="uni-card card_style md15" v-for="(card, index) in planInfo.creditCard" :key="index" >
						<view class="card_bank"><img class="card_bank_icon" src="../../../static/hx.png"><text>{{card.bank_name}}</text><text class="card_num">{{card.credit_code}}</text></view>
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
						<view  @click="goTorepay(card.credit_id)">
							<view class="btn-repay">查看</view>
						</view>	
					</view>
				</view>
				
			</view>
			
			<view class="content" v-if="current===1">
				<view class="no-list" v-if="planInfo.yes_repay.length==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				<view class=" already_plan">
					<view class=" already_plan_card" v-for="(item, index) in planInfo.yes_repay" :key="index" >
						<view class="uni-flex uni-row by-lddq">
							<view class="text">计划用卡</view>
							<view class="text info_plan">{{item.bank_name}}（{{item.credit_code}}）</view>
						</view>
						<view class="uni-flex uni-row by-lddq">
							<view class="text">计划周期</view>
							<view class="text info_plan">{{item.start_time}}至{{item.end_time}}</view>
						</view>
						<view class="uni-flex uni-row by-lddq">
							<view class="text">本期应还</view>
							<view class="text info_plan">¥{{item.total_money/100}}</view>
						</view>
						<view class="uni-flex uni-row by-lddq">
							<view class="text">本期已还</view>
							<view class="text info_plan">¥{{item.yes_money/100}}</view>
						</view>
						<view class="uni-flex uni-row by-lddq">
							<view class="text">本期待还</view>
							<view class="text info_plan">¥{{item.no_money/100}}</view>
						</view>
						<view class="uni-flex uni-row by-lddq">
							<view class="text">当前状态</view>
							<view class="text blue-text">进行中</view>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right repay-btn" @click="goRepayDetail(item.credit_id,item.pro_id)">
							查看计划详情
						</view>
					</view>
				</view>
			</view>
			
			<view class="content" v-if="current===2">
				<view class="no-list" v-if="planInfo.no_repay.length==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				<view class=" already_plan">
					<view class="already_plan_card" v-for="(item, index) in planInfo.no_repay" :key="index" >
					<view class="uni-flex uni-row by-lddq">
						<view class="text">计划用卡</view>
						<view class="text info_plan">{{item.bank_name}}（{{item.credit_code}}）</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">计划周期</view>
						<view class="text info_plan">{{item.start_time}}至{{item.end_time}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期应还</view>
						<view class="text">¥{{item.total_money/100}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期已还</view>
						<view class="text info_plan">¥{{item.yes_money/100}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期未还</view>
						<view class="text info_plan">¥{{item.no_money/100}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">当前状态</view>
						<view class="text red-text">已失败</view>
					</view>
					<view class="uni-list-cell-navigate uni-navigate-right repay-btn" @click="goRepayDetail(item.credit_id,item.pro_id)">
						查看计划详情
					</view>
				</view>
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	import uniSegmentedControl from '../../../components/uni-tab-nav.vue';
	export default {
		data() {
			return {
				planInfo:{
					z_total_money: 0,
					z_yes_money: 0,
					z_no_money: 0,
					creditCard: [],
					yes_repay: [],
					no_repay: []
				},
				items: [
					'待定计划',
					'已定计划',
					'失败计划'
				],
				current: 0,
				activeColor: '#2f7bfe',
				styleType: 'text',
			}
		},
		onLoad() {

		},
		onShow() {
			this.getPlan();
		},
		methods: {
			goRepayDetail(credit_id,pro_id){
				uni.navigateTo({
					url: '/pages/card/credit/repayDetail?credit_id='+credit_id+'&pro_id='+pro_id
				})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			goTorepay(credit_id){
				uni.navigateTo({
					url: '/pages/card/credit/info?credit_id='+credit_id
				})
			},
			getPlan() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl + '/api/repay/getPlan', {
						openid,
						sessionKey
					}, (res) => {
						if (res.data.code == 1) {
							this.planInfo = res.data.result;
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
			}
		},
		components: {
			uniSegmentedControl
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f2f2f2;
	}
	
	.plan_bg{
		/* background-color: #3082fe;
		background: linear-gradient(top, #3082fe, #32b0fd); */
		background: url(../../../static/user_top_bg.png) no-repeat;background-size: 100% 100%;
		height: 300upx;
		color: #FFFFFF;
		 padding: 30upx 50upx;
	}
	
	.plan_yhze{
		font-size: 26upx;
		font-weight: 500;
	}
	
	.plan_yhze_text text{font-size: 42upx;
		font-weight: 500;}
		
		
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
		
		.pd20 {
			padding: 28upx 30upx 0upx 30upx;
		}
		
		.by-mb-30{ margin-bottom: 30upx;}
	
		.ls3 {
			width: 33.33%;
			height: 140upx;
			text-align: center;
			margin-top: 15upx;
		}
	
		.md15 {
			margin: 30upx;
		}
	/* .content{ background-color: #f7f8fa;}	 */
	/* .contentbg{ background-color: #FFFFFF;} */
	.by-lddq{justify-content: space-between;}
	.by-lddq .text{ font-size: 26upx; font-weight: 500; line-height: 52upx; color: #777;}
	.no-list{ text-align: center; height: 260upx; padding-top: 50%;}
	.no-list image{width: 185upx; height: 60upx;}
	
	.repay-btn{ border-top: 2upx #E3E4E6 solid;font-weight: 500;line-height: 70upx;font-size: 24upx; padding: 0upx; color: #999; }
	.uni-list-cell-navigate.uni-navigate-right:after{ font-size: 42upx; font-weight:500;}
	
	.by-lddq .text.red-text{ color:#fd5950;}
	.by-lddq .text.blue-text{color:#23c6c8;}
	.by-lddq .text.huise-text{color:#aaaaaa;}
	.by-lddq .text.hex-text{color: #5809ff;}
	.already_plan{padding: 0 30upx;margin-bottom:40upx ;}
	.already_plan_card {
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		background-color: #fff;
		margin-bottom: 30upx;
		padding: 10upx 20upx 0;
	}
	.info_plan{color: #333!important;}
	.btn-repay{color: #5a91fe;font-weight: 600;text-align: center;border-top: 1px solid #ececec;padding: 8upx 0;}
	.card_style{
		background: #FFFFFF;
		border-radius: 14upx;
		color: #333;
		margin-top: 0upx;
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
		.no-list{ text-align: center; height:270upx; padding-top: 15%;}
		.no-list image{width: 374upx; height: 270upx;}
</style>
