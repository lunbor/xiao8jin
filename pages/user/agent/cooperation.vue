<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="uni-card by-card">
				<view class="uni-card-content">
					<view class="hg50" >
						<view @tap="makePhoneCall" class="uni-list-cell-navigate uni-navigate-right">
							招商电话
							<text class="uni-list-cell-left by-sdh">{{userInfo.telphone}}</text>
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
		font-size:32upx;
		padding: 0 20upx;
		line-height: 180upx;
		height: 180upx;
	}

	.hg50 .uni-navigate-right:after {
		font-size:32upx;
	}

	.uni-list-cell-navigate{line-height: 180upx;height: 180upx;font-size:48upx;}

	.uni-card{
			border-radius: 12upx;
			-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
			box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		}

	
</style>
