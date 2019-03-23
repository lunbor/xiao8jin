<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="uni-card by-card">
				<view class="uni-card-content">
					<view class="hg50" >
						<view @tap="makePhoneCall" class="uni-list-cell-navigate uni-navigate-right">
							客服电话
							<text class="uni-list-cell-left by-sdh">{{userInfo.telphone}}</text>
						</view>
					</view>
						<view class="hg50" >
						<view @tap="makePhoneCall" class="uni-list-cell-navigate  " >
							微信
							<text class="uni-list-cell-left by-sdh">123456</text>
						</view>
					</view>
					<view class="hg50" >
						<view @tap="makePhoneCall" class="uni-list-cell-navigate " style="border-bottom: 0;">
							QQ
							<text class="uni-list-cell-left by-sdh">123456</text>
						</view>
					</view>
				
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo: {
					telphone:'17790270662',
				},
			}
		},
		methods: {
			makePhoneCall: function () {
				uni.makePhoneCall({
					phoneNumber: this.userInfo.telphone,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},		
		}
	}

</script>
<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #F2F2F2;
	}

	.hg50 {
		color: #576175;
		font-size:24upx;
		padding: 0 20upx;
	}

	.hg50 .uni-navigate-right:after {
		font-size: 28upx;
	}

	.uni-list-cell-navigate{border-bottom: 2upx solid #ececec;}

	.uni-card{
			border-radius: 12upx;
			-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
			box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		}

	
</style>
