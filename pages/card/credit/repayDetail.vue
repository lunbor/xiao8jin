<template>
	<view>		
		<view class="contentbg">	
			<view class="content">
				<view class="list contentbg by-mb-30">	
					<view class="list-item pd20">
						<view class="list-time font-sg">提交时间: <text>{{repayDetail.ctime}}</text></view>
						<view class="list-order font-sg">计划单号: <text>{{repayDetail.order_no}}</text></view>
						<view class="list-repay-time uni-flex uni-row">
							<view class="font-sg" style="flex: 1;">开始时间: <text>{{repayDetail.start_time}}</text></view>
							<view class="font-sg" style="flex: 1;">结束时间: <text>{{repayDetail.end_time}}</text></view>
						</view>
						<view class="list-repay-money uni-flex uni-row">
							<view class="font-sg" style="flex: 1;">还款金额: <text class="red-text">￥{{repayDetail.total_money/100}}</text></view>
							<view class="font-sg" style="flex: 1;">还款形式: <text v-if="repayDetail.repay_num ===0">随机</text><text v-else>每天还款{{repayDetail.repay_num}}次</text></view>
						</view>
						<view class="list-repay-money uni-flex uni-row">
							<view class="font-sg" style="flex: 1;">已还款金额: <text>￥{{repayDetail.yes_money/100}}</text></view>
							<view class="font-sg" style="flex: 1;">已消费金额: <text>￥{{repayDetail.pay_money/100}}</text></view>
						</view>
						<view class="list-repay-money uni-flex uni-row">
							<view class="font-sg" style="flex: 1;">已扣手续费: <text>￥{{repayDetail.yes_fee/100}}</text></view>
							<view class="font-sg" style="flex: 1;">当前状态: <text class="blue-text" v-if="repayDetail.status ===1">执行中</text><text class="blue-text" v-else-if="repayDetail.status ===2">执行中</text><text class="hex-text" v-else-if="repayDetail.status ===3">已完成</text><text class="huise-text" v-else-if="repayDetail.status ===4">已取消</text><text class="red-text" v-else-if="repayDetail.status ===5">已失败</text><text class="huise-text" v-else>未知</text></view>
						</view>
						
						<view class="list-time font-sg red-text" v-show="repayDetail.repayBak!=''">{{repayDetail.repayBak}}</view>
					</view>
					
				</view>
			</view>
			
			<view class="content pt30">
				<view class="list contentbg">	
					<view class="title-time"><view class="title-time-btn">执行时间</view></view>
					
					<view style="padding: 0upx 20upx 30upx 20upx;" v-if="repayDetail.current==2">
						<view class="list-itemdd" v-for="(item,index) in repayList" :key="index">
							<view class="uni-flex uni-row justify">
								<view class="text left-text">
									<view class="text log-title" v-if="item.type==2">还款</view>
									<view class="text log-title" v-else-if="item.type==1">消费-{{item.mcc_p_name}}</view>
									<view class="text log-time">{{item.exechtime}}</view>
								</view>
								<view class="text right-text">
									<view class="text log-money">￥{{item.money/100}}</view>
									<view class="text log-balance" v-if="item.type==1 && item.status ===1">待完成</view>
									<view class="text log-balance hex-text" v-if="item.type==1 && item.status ===2">已完成</view>
									<view class="text log-balance red-text" v-if="item.type==1 && item.status ===3">已失败</view>
									<view class="text log-balance huise-text" v-if="item.type==1 && item.status ===4">已取消</view>
									
									<view class="text log-balance" v-if="item.type==2 && item.status ===1">待还款</view>
									<view class="text log-balance hex-text" v-if="item.type==2 && item.status ===2">已还款</view>
									<view class="text log-balance red-text" v-if="item.type==2 && item.status ===3">已失败</view>
									<view class="text log-balance huise-text" v-if="item.type==2 && item.status ===4">已取消</view>
								</view>
							</view>
						</view>
					</view>
					
					<view class="uni-timeline" style="padding: 0upx 20upx 30upx 20upx;" v-if="repayDetail.current!=2">
						
						<view class="uni-timeline-item" :class="index==1?'uni-timeline-first-item':index==repayList.length-1?'uni-timeline-last-item':''" v-for="(item,index) in repayList" :key="index" v-if="item.type==2">
							<view class="uni-timeline-item-keynode">{{item.exechtime}}</view>
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<view class="uni-flex uni-row">
									<view class="text list-money">￥<text>{{item.money/100}}</text></view>
									<view class="text list-type" v-if="item.status ===1">待还款</view>
									<view class="text list-type hex-text" v-if="item.status ===2">已还款</view>
									<view class="text list-type red-text" v-if="item.status ===3">已失败</view>
									<view class="text list-type huise-text" v-if="item.status ===4">已取消</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="content pt30">
				<view class="list contentbg">

							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">周转金</view>
								<view class="text uni-list-cell-left red-text" v-if="repayDetail.current==1">￥{{(repayDetail.min_money-repayDetail.max_expen)/100}}</view>
								<view class="text uni-list-cell-left red-text" v-else>￥{{repayDetail.min_money/100}}</view>
							</view>
							
							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">还款手续费</view>
								<view class="text uni-list-cell-left">￥{{repayDetail.serve_money/100}}</view>
							</view>
							
							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">还款次数费</view>
								<view class="text uni-list-cell-left">￥{{repayDetail.day_money/100}}</view>
							</view>
							
							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;" v-if="repayDetail.current==1">
								<view class="text uni-list-cell-left">垫资本金</view>
								<view class="text uni-list-cell-left">￥{{repayDetail.max_expen/100}}</view>
							</view>
				</view>
			</view>
			
			
		</view>
		
		<view class="uni-common-mt uni-padding-wrap uni-common-mb">
			<button type="warn" class="by-button-submit" :loading="loading" @click="delRepay" v-if="repayDetail.status==1 || repayDetail.status==2">取消计划</button>
			<button type="warn" disabled="true"  v-else>
				<text v-if="repayDetail.status ===3">已完成</text><text v-else-if="repayDetail.status ===4">已取消</text><text v-else-if="repayDetail.status ===5">已失败</text><text v-else>未知</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				credit_id: '',
				pro_id: '',
				card: [],
				repayList: [],
				repayDetail:[],
				loading: false,
			}
		},
		computed: {

		},
		onLoad(e) {
			if (e.credit_id && e.pro_id) {
				this.credit_id = e.credit_id;
				this.pro_id = e.pro_id;
			} else {
				uni.switchTab({
					url: '/pages/tabBar/card/card'
				})
			}
		},
		onShow() {
			this.getRepayDetail();
		},
		onBackPress() {},
		methods: {
			delRepay(){
				uni.showModal({
					content: "是否确定取消计划？",
					confirmText: "确定",
					cancelText: "取消",
					success:(e)=>{
						if(e.confirm){
							const openid = this.$store.state.openid;
							const sessionKey = this.$store.state.sessionKey;
							const credit_id = this.credit_id;
							const pro_id = this.pro_id;
							const that = this;
							try {
								if(this.loading){
									return;
								}
								this.loading = true;
								this.$http.post(this.websiteUrl + '/api/repay/delRepay', {
									openid,
									sessionKey,
									credit_id,
									pro_id
								}, (res) => {
									if (res.data.code == 1) {
										uni.showModal({
											content:res.data.msg,
											showCancel:false,
											success:function() {
												that.loading = false;
												that.getRepayDetail();
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
								})
							}
						}
					}
				});
			},
			getRepayDetail() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const credit_id = this.credit_id;
				const pro_id = this.pro_id;
				try {
					this.$http.post(this.websiteUrl + '/api/repay/getRepayDetail', {
						openid,
						sessionKey,
						credit_id,
						pro_id
					}, (res) => {
						if (res.data.code == 1) {
							this.card = res.data.result.creditCard;
							this.repayDetail = res.data.result.repayDetail;
							this.repayList = res.data.result.repayList;
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
		background-color: #f7f8fa;
	}
		
		.pt30{ padding-top: 30upx;}
		.pd20 {
			padding: 28upx 30upx 0upx 30upx;
		}
		
		.by-mb-30{ margin-bottom: 30upx;}

		.content{ background-color: #f7f8fa;}
		.contentbg{ background-color: #FFFFFF;}
		.list-item .font-sg{ line-height: 80upx; font-weight: 500;font-size: 28upx;}
		
		
		
		
		
		.uni-timeline-item .uni-timeline-item-divider{background-color: #e7c896;}
		.uni-timeline-item .uni-timeline-item-keynode {width: 200upx; line-height: 50upx; text-align: left;}
		.list-money{ text-align: center; color: #fe5d55; font-weight: 600;width: 200upx; line-height: 80upx;}
		.list-money text{ font-size: 36upx; font-weight: 600;}
		.mt15 {
			margin-top: 30upx;
		}
		.list-type{width: 180upx;text-align: right;color: #576175;font-size: 32upx; font-weight: 600;line-height: 80upx}
		

		
		.repay-fee{ height: 100upx; line-height: 100upx; color: #576175;font-weight: 600;border-bottom: 2upx solid #ecedef;}
		.repay-fee .uni-list-cell-left{ height: 100upx; line-height: 100upx;}
		.title-time{ padding-top: 30upx;}
		.title-time-btn{ height: 70upx; line-height: 70upx; text-align: center; border-top-right-radius: 50upx; border-bottom-right-radius: 50upx; background-color: #fe5950; width: 180upx; color: #FFFFFF; }
		.by-button-submit{
			background-color:#fd5950;
			background: linear-gradient(left, #ff7575, #fd5950);
		}
		
		.list-itemdd {
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
		
		.red-text{ color:#fd5950;}
		.blue-text{color:#23c6c8;}
		.huise-text{color:#aaaaaa;}
		.hex-text{color: #5809ff;}
		
</style>