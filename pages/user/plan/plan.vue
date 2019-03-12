<template>
	<view>
		<view class="plan_bg">
			<view class="plan_yhze">当前应还总额</view>
			<view class="plan_yhze_text">￥<text>{{planInfo.z_total_money/100}}</text></view>
			<view class="uni-flex uni-row uni-common-mt">
				<view style="flex: 1;">
					<view class="plan_yhze">当前已还总额</view>
					<view class="plan_yhze_text">￥<text>{{planInfo.z_yes_money/100}}</text></view>
				</view>
				
				<view style="flex: 1;">
					<view class="plan_yhze">当前未还总额</view>
					<view class="plan_yhze_text">￥<text>{{planInfo.z_no_money/100}}</text></view>
				</view>
			</view>
		</view>
		<view class="contentbg">
			<view>
				<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
				:activeColor="activeColor"></uni-segmented-control>
			</view>
				
			<view class="content" v-if="current===0">
				<view class="no-list" v-if="planInfo.creditCard.length==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				
				<view class="uni-card uni-card-red md15" v-for="(card, index) in planInfo.creditCard" :key="index" v-bind:style="{ background: card.color}">
					<view class="uni-triplex-row pd15">
						<view class="uni-triplex-left lf7">{{card.bank_name}}<text>{{card.credit_code}}</text></view>
						<view class="uni-triplex-right rg3" @click="goTorepay(card.credit_id)"><button class="mini-btn" type="primary" size="mini">查看</button></view>
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
			</view>
			
			<view class="content" v-if="current===1">
				<view class="no-list" v-if="planInfo.yes_repay.length==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				<view class="uni-padding-wrap contentbg uni-common-mt" v-for="(item, index) in planInfo.yes_repay" :key="index" >
					<view class="uni-flex uni-row by-lddq">
						<view class="text">计划用卡</view>
						<view class="text">{{item.bank_name}}（{{item.credit_code}}）</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">计划周期</view>
						<view class="text">{{item.start_time}}至{{item.end_time}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期应还</view>
						<view class="text">￥{{item.total_money/100}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期已还</view>
						<view class="text">￥{{item.yes_money/100}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期待还</view>
						<view class="text">￥{{item.no_money/100}}</view>
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
			
			<view class="content" v-if="current===2">
				<view class="no-list" v-if="planInfo.no_repay.length==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				<view class="uni-padding-wrap contentbg uni-common-mt" v-for="(item, index) in planInfo.no_repay" :key="index" >
					<view class="uni-flex uni-row by-lddq">
						<view class="text">计划用卡</view>
						<view class="text">{{item.bank_name}}（{{item.credit_code}}）</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">计划周期</view>
						<view class="text">{{item.start_time}}至{{item.end_time}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期应还</view>
						<view class="text">￥{{item.total_money/100}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期已还</view>
						<view class="text">￥{{item.yes_money/100}}</view>
					</view>
					<view class="uni-flex uni-row by-lddq">
						<view class="text">本期未还</view>
						<view class="text">￥{{item.no_money/100}}</view>
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
				activeColor: '#fe5950',
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
		background-color: #f7f8fa;
	}
	
	.plan_bg{
		background-color: #fd5950;
		background: linear-gradient(top, #fd5950, #ff7575);
		height: 300upx;
		color: #FFFFFF;
		 padding: 30upx 50upx;
	}
	
	.plan_yhze{
		font-size: 32upx;
		font-weight: 500;
	}
	
	.plan_yhze_text text{font-size: 44upx;
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
	.content{ background-color: #f7f8fa;}	
	.contentbg{ background-color: #FFFFFF;}
	.by-lddq{justify-content: space-between;}
	.by-lddq .text{ font-size: 24upx; font-weight: 500; line-height: 60upx; color: #0c0c0c;}
	.no-list{ text-align: center; height: 260upx; padding-top: 50%;}
	.no-list image{width: 185upx; height: 60upx;}
	
	.repay-btn{ border-top: 2upx #E3E4E6 solid;font-weight: 500;line-height: 70upx;font-size: 24upx; padding: 0upx; color: #a09898; }
	.uni-list-cell-navigate.uni-navigate-right:after{ font-size: 44upx; font-weight: bold;}
	
	.by-lddq .text.red-text{ color:#fd5950;}
	.by-lddq .text.blue-text{color:#23c6c8;}
	.by-lddq .text.huise-text{color:#aaaaaa;}
	.by-lddq .text.hex-text{color: #5809ff;}
</style>
