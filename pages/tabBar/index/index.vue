<template>
	<view class="main">
		<view class="main_case">
			<view class="index_head box_show">
				<view class="uni-flex uni-row index_head_top">
			        <view class="flex-item index_logo" style="width: 80%;line-height: 1;" ><img src="../../../static/index_logo.png"></view>
			        <view class="flex-item service" style="width: 20%;" @click="goDetailPage('/pages/user/agent/service')"><img src="../../../static/service.png"></view>
			    </view>
				<!-- 轮播动画 -->
				<view class="banner_box">
					<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" 
						:duration="duration" :circular="circular" :previous-margin="previousMargin" :next-margin="nextMargin"
						:indicator-active-color="afterColor" :indicator-color="beforeColor">
							<swiper-item>
								<view class="swiper-item banner_case">
									<img src="../../../static/banner1.png">
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item banner_case">
									<img src="../../../static/banner2.png">
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item banner_case">
									<img src="../../../static/banner3.png">
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<!-- 轮播动画end -->
				
				
				<view class="uni-flex uni-row operation_case">
				    <view class="flex-item" @click="goDetailPage('/pages/user/pos/pos')">
						<img src="../../../static/receivables.png" class="operation_icon">
						<view>收款</view>
					</view>
				    <view class="flex-item middle" @click="goDetailPage('/pages/card/credit/repayment')" >
						<img src="../../../static/repayment.png" class="operation_icon2">
						<view>还款</view>
					</view>
				    <view class="flex-item" @click="goDetailPage('/pages/user/agent/user')" >
						<img src="../../../static/my_team.png" class="operation_icon">
						<view>我的团队</view>
					</view>
				</view>
				<view class="uni-flex uni-row news_flash">
					<view class="flex-item news_flash_name" >
						<img src="../../../static/news_flash.png" >
					</view>
					<view class="flex-item news_list">
						<view class="news_gun">
							<view class="<strong>news_list_info</strong> uni-ellipsis" v-for="(item, index) in messageData" :key="index">{{item.nickname}}于{{item.time}}获得收益<text class="red">￥{{item.money}}</text>元</view>
						</view>
					</view>
					</view>
				</view>	
			</view>
			<view class="team_case" style="padding:20upx 30upx 0;">
				<view class="uni-flex uni-row team_list">
					<view class="flex-item handle_case" @click="goDetailPage('/pages/user/plan/plan')">
						<img src="../../../static/plan.png">
					</view>
					<view class="flex-item handle_case">
						<img src="../../../static/handle.png">
					</view>
				</view>
			</view>
			<view class="other_business">
				<view class="business_case">
					<img src="../../../static/dai.png" class='business_name'>
					<view class="business_main"  @click="setMaskShow">
						<view>贷款超市</view>
						<text>贷款10万，当天放款。贷款1000-5000可秒过</text>
					</view>
				</view>
				<view class="business_case"  @click="setMaskShow">
					<img src="../../../static/ban.png" class='business_name'>
					<view class="business_main">
						<view>办信用卡市</view>
						<text>大额用户卡，最高额度50万</text>
					</view>
				</view>
				<view class="business_case">
					<img src="../../../static/ling.png" class='business_name'>
					<view class="business_main"  @click="setMaskShow">
						<view>领取保险</view>
						<text>安全保障，无忧养卡</text>
					</view>
				</view>
			</view>
		</view>
		<view class="mask" v-show="maskShow" @click="setMaskShow">
			<view class="tip_img">
				<img src="../../../static/tip_img.png" alt="">
			</view>
		</view>
		
	</view>
</template>
<script>
	export default {
    data() {
        return {
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
			circular:true,
			previousMargin:16+'px',
			nextMargin:16+'px',
			beforeColor: "#dddddd",//指示点颜色
			afterColor: "#5f9df1",//当前选中的指示点颜色
			maskShow: false,
			messageData:[],
			myTeamInfo:{}
        }		
    },
	onShow(){
		this.getMessageData();
		this.getMyTeamInfo();
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
					url: url
				})
			}
		},		
		 setMaskShow(){
            this.maskShow = !this.maskShow;
        },
		getMyTeamInfo() {
			const openid = this.$store.state.openid;
			const sessionKey = this.$store.state.sessionKey;
			if(openid == null){
				return;
			}
			try {
				this.$http.post(this.websiteUrl+'/api/agent/getMyAgentTeam',{openid,sessionKey},(res) => {
					if(res.data.code==1){
						this.myTeamInfo = res.data.result;
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
		getMessageData()
		{
			const openid = this.$store.state.openid;
			const sessionKey = this.$store.state.sessionKey;
			/* if(openid == null){
				return;
			} */
			try {
				this.$http.post(this.websiteUrl+'/api/message/getAccountLogList',{openid,sessionKey},(res) => {
					if(res.data.code==1){
						this.messageData = res.data.result.list;
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
}
</script>

<style>
	page{
		height: auto;
		min-height: 100%;
		background-color: #F2F2F2;
	}
	.box_show{
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(36, 158, 242, 0.1);
		box-shadow: 4upx 4upx 20upx 4upx rgba(36, 158, 242, 0.1);
	}
	.index_head{background-color: #fff;}
	.index_logo img{width: 217upx;height: 56upx;}
	.service img{width: 44upx;height: 44upx;}
	.service{text-align: right;}
	.index_head_top{padding: 30upx 30upx 20upx;}
	.operation_icon{width: 55upx;height: 61upx;}
	.operation_icon2{width: 61upx;height: 61upx;}
	.operation_case{padding: 24upx 30upx 34upx;}
	.operation_case .flex-item{width: 32%;background-color: #fff;border-radius: 8upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(13, 43, 153, 0.15);
		box-shadow: 4upx 4upx 20upx 4upx rgba(13, 43, 153, 0.15);text-align: center;padding: 20upx 0 4upx;font-size: 24upx;color: #0d2b99;
		line-height: 1.3;
		}
		.middle{margin: 0 2%;}
		.news_flash_name{width: 90upx;border-right: 1px solid #ececec;}
		.news_flash_name img{width: 65upx;height: 78upx;}
		.news_list{padding-left: 20upx;height: 100upx;width: 85%; height: 100upx;white-space: nowrap; overflow: hidden;color: #666;}
		.news_list .news_list_name{font-size: 22upx;color: #666;color: #00b38a;border:1px solid #00b38a;border-radius:6upx ;
		padding: 0 4upx;margin-right: 6upx;}
		.news_list_info{font-size: 26upx;color: #666;line-height: 50upx;}
		.news_list .red{color: red;font-weight: 600;}
		.news_flash{height: 100upx;padding: 0 30upx;}
		.team_case{background-color: #fff;padding: 20upx 30upx;margin-top: 20upx;}
		.team_name{width: 200upx;height: 44upx;}
		.team_list uni-view{flex:1}
		.team_list uni-view{flex:1;font-size: 28upx;color: #333;text-align: center;}
		.team_title{color: #999;font-size: 24upx;}
		.handle_case img{width: 330upx;height: 170upx;}
		.other_business{padding: 20upx 30upx 0;}
		.business_case{padding-left: 40upx;position: relative;margin-bottom: 20upx;}
		.business_main{background-color: #fff;border-radius: 12upx;padding: 16upx 60upx;font-size: 26upx;color: #333;font-weight: 500;}
		.business_name{width: 80upx;height: 80upx;position: absolute;left: 0;top: 50%;margin-top: -40upx;}
		.business_main text{font-size: 22upx;color: #999;margin-top: 24upx;}
		.banner_case{width: 680upx;height: 340upx;}
		.banner_box{padding-bottom: 20upx;}
		.banner_case img{width: 100%;height: 100%;}
		 .banner_box uni-swiper{height: 360upx;}
		uni-swiper .uni-swiper-dots{bottom: 30px;}
		.mask{width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: fixed;left: 0;top:0;z-index: 2000;}
		.tip_img img{width: 450upx;height: 410upx;position: absolute;left: 50%;top: 35%;margin-left:-225upx ;}
		.news_gun{animation: myMove 10s linear infinite;animation-fill-mode: forwards;} 
		  /*文字停顿滚动*/
		@keyframes myMove {
		    0% {
		        transform: translateY(0);
		    }
		   
		    20% {
		        transform: translateY(-30px);
		    }
		 
		    40% {
		        transform: translateY(-60px);
		    }
		 
		    60% {
		        transform: translateY(-90px);
		    }
		 
		    80% {
		        transform: translateY(-120px);
		    }
		  
		    100% {
		        transform: translateY(-150px);
		    }
		}
</style>
