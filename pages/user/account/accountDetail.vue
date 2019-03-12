<template>
	<view>		
		<view class="contentbg">	
			<view class="content">
				<view class="list contentbg by-mb-30">	
					<view class="list-item pd20">
						<view class="list-time font-sg">支付通道: <text>{{accountDetail.title}}</text></view>
						<view class="list-time font-sg">提交时间: <text>{{accountDetail.ctime}}</text></view>
						<view class="list-order font-sg">交易单号: <text>{{accountDetail.order_no}}</text></view>
						<view class="list-order font-sg">付款账户: <text>{{accountDetail.credit_code}}</text></view>
						<view class="list-order font-sg">收款账户: <text>{{accountDetail.bank_card}}</text></view>
						<view class="list-time font-sg" >交易备注: <text class="red-text">{{accountDetail.dscInc}}</text></view>
					</view>
					
				</view>
			</view>
			
			<view class="content pt30">
				<view class="list contentbg">

							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">收款金额</view>
								<view class="text uni-list-cell-left red-text">￥{{accountDetail.money}}</view>
							</view>
							
							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">手续费</view>
								<view class="text uni-list-cell-left">￥{{accountDetail.fee}}</view>
							</view>
							
							<view class="uni-flex uni-row repay-fee" style="justify-content: space-between;">
								<view class="text uni-list-cell-left">代付费</view>
								<view class="text uni-list-cell-left">￥{{accountDetail.mercfee}}</view>
							</view>
				</view>
			</view>
			
			
		</view>
		
		<view class="uni-common-mt uni-padding-wrap uni-common-mb">
			<button type="warn" disabled="true">
				<text>{{accountDetail.dsc}}</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				get_id: '',
				accountDetail:[],
			}
		},
		computed: {

		},
		onLoad(e) {
			if (e.get_id) {
				this.get_id = e.get_id;
			} else {
				uni.navigateTo({
					url: '/pages/user/account/account'
				})
			}
		},
		onShow() {
			this.getAccountDetail();
		},
		onBackPress() {},
		methods: {
			getAccountDetail() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const get_id = this.get_id;
				try {
					this.$http.post(this.websiteUrl + '/api/api/getAccountDetail', {
						openid,
						sessionKey,
						get_id
					}, (res) => {
						if (res.data.code == 1) {
							this.accountDetail = res.data.result.accountDetail;
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
		
		.red-text{ color:#fd5950;}
		.repay-fee{ height: 100upx; line-height: 100upx; color: #576175;font-weight: 600;border-bottom: 2upx solid #ecedef;}
		.repay-fee .uni-list-cell-left{ height: 100upx; line-height: 100upx;}
		.by-button-submit{
			background-color:#fd5950;
			background: linear-gradient(left, #ff7575, #fd5950);
		}
</style>