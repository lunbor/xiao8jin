<template>
	<view>
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
		</view>
		<view class="contentbg">
			<view>
				<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
				:activeColor="activeColor"></uni-segmented-control>
			</view>
				
			<view class="content">
				<view class="no-list" v-if="list.length==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				<view class="list contentbg by-mb-30 " v-for="(item,index) in list" :key="index" v-if="(current===0 && item.status===0) || (current===0 && item.status===1) || (current===0 && item.status===2) || (current===1 && item.status===5) || (current===2 && item.status===4)  || (current===3 && item.status===3) || (current===4)">	
					<view class="list-item pd20 tab_box">
						<view class="list-time font-sg">提交时间: <text>{{item.ctime}}</text></view>
						<view class="list-order font-sg">计划单号: <text>{{item.order_no}}</text></view>
						<view class="list-repay-time uni-flex uni-row">
							<view class="font-sg" style="flex: 1;">开始时间: <text>{{item.start_time}}</text></view>
							<view class="font-sg" style="flex: 1;">结束时间: <text>{{item.end_time}}</text></view>
						</view>
						<view class="list-repay-money uni-flex uni-row">
							<view class="font-sg" style="flex: 1;">还款金额: <text class="red-text">¥{{item.total_money/100}}</text></view>
							<view class="font-sg" style="flex: 1;">还款形式: <text v-if="item.repay_num ===0">随机</text><text v-else>每天还款{{item.repay_num}}次</text></view>
						</view>
						<view class="list-repay-money uni-flex uni-row">
							<view class="font-sg" style="flex: 1;">还款方式: <text v-if="item.current ===0">本金还款</text><text v-else-if="item.current ===1">空卡垫资</text><text v-else-if="item.current ===2">精养卡</text></view>
							<view class="font-sg" style="flex: 1;">当前状态: <text class="blue-text" v-if="item.status ===1">执行中</text><text class="blue-text" v-else-if="item.status ===2">执行中</text><text class="hex-text" v-else-if="item.status ===3">已完成</text><text class="huise-text" v-else-if="item.status ===4">已取消</text><text class="red-text" v-else-if="item.status ===5">已失败</text><text class="huise-text" v-else>未知</text></view>
						</view>
						
						<view class="uni-list-cell-navigate uni-navigate-right repay-btn" @click="goRepayDetail(item.pro_id)">
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
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				credit_id: '',
				card: [],
				list:[],
				loading: false,
				items: [
					'进行中',
					'已失败',
					'已取消',
					'已完成',
					'全部',
				],
				current: 0,
				activeColor: '#5a91fe',
				styleType: 'text',
			}
		},
		computed: {

		},
		onLoad(e) {
			if (e.credit_id) {
				this.credit_id = e.credit_id;
			} else {
				uni.switchTab({
					url: '/pages/tabBar/card/card'
				})
			}
		},
		onShow() {
			this.getRepayInfo();
		},
		onBackPress() {
			uni.switchTab({
				url: '/pages/tabBar/card/card'
			})
		},
		methods: {
			goRepayDetail(pro_id){
				uni.navigateTo({
					url: '/pages/card/credit/repayDetail?credit_id='+this.credit_id+'&pro_id='+pro_id
				})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			getRepayInfo() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const credit_id = this.credit_id;
				try {
					this.$http.post(this.websiteUrl + '/api/repay/getRepayInfo', {
						openid,
						sessionKey,
						credit_id
					}, (res) => {
						if (res.data.code == 1) {
							this.card = res.data.result.creditCard;
							this.list = res.data.result.list;
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
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #F2F2F2;
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
		/* .content{ background-color: #f7f8fa;} */
		/* .contentbg{ background-color: #FFFFFF;} */
		.list-item .font-sg{ line-height: 60upx; font-weight: 500;font-size: 24upx;color: #999;}
		.repay-btn{ border-top: 2upx #E3E4E6 solid;font-weight: 500;line-height: 70upx;font-size: 24upx; padding: 0upx; color: #a09898; }
		.uni-list-cell-navigate.uni-navigate-right:after{ font-size: 44upx; font-weight: bold;}
		
		.red-text{ color:#fd5950;}
		.blue-text{color:#23c6c8;}
		.huise-text{color:#aaaaaa;}
		.hex-text{color: #5809ff;}
		
		.no-list{ text-align: center; height: 260upx; padding-top: 50%;}
		.no-list image{width: 185upx; height: 60upx;}
		.tab_box{margin: 30upx;background-color: #fff;border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);}
		.list-item .font-sg text{color: #666;margin-left: 10upx;}
		.red-text{color: #ff5e5e!important;font-weight: 600;}
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