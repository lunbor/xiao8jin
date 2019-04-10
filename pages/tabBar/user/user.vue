<template>
	<view>
		<view class="user-top-bg" style="background: url(../../../static/user_top_bg.png) no-repeat;background-size: 100% 100%;">
			 <view class="uni-flex uni-row">
                <view class="flex-item" style="width: 60%;">
					<view class="uni-flex uni-row uni-padding-wrap user_top" @click="goDetailPage('/pages/user/info/info')">
						<view class="text">
							<view class="head-pic">
								<image :src="userInfo.head_img?userInfo.head_img:'../../../static/head-no-pic.png'"></image>
							</view>
						</view>
						<view class="text head-center">
							<!-- vip等级 -->
							<!-- <view class="text head-nickname clearfix"><text style="float: left;">{{userInfo.nickname}}</text>
							 &emsp;{{agent.group_name}}</view> -->
							 <view class="text head-nickname clearfix">
							 	<text style="float: left;">{{userInfo.nickname}}</text> 
							 	<view class="vip_icon">{{agent.group_name}}</view>
							 </view>
							<view class="text head-phone">{{userInfo.account}}</view>
							
						</view>
					</view>
				</view>
				 <view class="flex-item" style="width: 30%;">
					<view class="agent_cash" ><view class="uni-icon uni-icon-help fz28"></view> 提现规则</view>
				</view>
                <view class="flex-item">
					<view class="text head-bottom-news" @click="goDetailPage('/pages/user/news/news')">
						<image src="../../../static/news.png" class="news_img"></image>
					</view>
				</view>
            </view>
			 <view class="uni-flex uni-row money_case" >
                <view class="flex-item w40">
					<view class="info_name">我的资产(元)</view>
					<view class="info_number">{{agent.z_money}}</view>
				</view>
                <view class="flex-item w40">
					<view class="info_name">昨日收益(元)</view>
					<view class="info_number_td">{{agent.yestoday_money}}</view>
				</view>
				<view class="vip_btn"   @click="goDetailPage('/pages/user/agent/buy')"><image src="../../../static/vip_btn.png" class="vip_btnImg"></image></view>
            </view>
		
			<view class="uni-card by-card " style="height: 160upx;margin: 0 34upx;position: relative;bottom: -20upx;">
				 <view class="uni-flex uni-row cash_case" >
				    <view class="flex-item" style="width: 70%">
						<view class="cash_text1">可提现金额(元)</view>	
						<view class="cash_text_num">{{agent.money}}</view>	
					</view>
				    <view class="flex-item" style="width: 30%" @click="goDetailPage('/pages/user/agent/cash')">
						<view  class="cash_btn">提现</view>
					</view>
				</view>
			</view>
		</view>

		<view class="uni-padding-wrap" style="margin-top: 78upx;">
		
			 <view class="uni-card by-card user_card">
			 	<view class="uni-card-content">
			 		<view class="user_list" >
			 			<view class="uni-list-cell-navigate  bb0">
			 				<image src="../../../static/icon1.png" class="icon_img"></image>
			 				<view class="title">推荐人 <text class="right_txt">{{userInfo.recommender}}</text></view>
			 			</view>
			 		</view>
					<view class="user_list" >
						<view class="uni-list-cell-navigate uni-navigate-right bb0" @click="goDetailPage('/pages/user/info/realname')">
							<image src="../../../static/icon2.png" class="icon_img"></image>
							<view class="title">实名认证<text class="right_txt_sm">{{userInfo.validate_info}}</text></view>
						</view>
					</view>
					<view class="user_list" @click="goDetailPage('/pages/user/agent/user')">
						<view class="uni-list-cell-navigate uni-navigate-right bb0">
							<image src="../../../static/icon3.png" class="icon_img"></image>
							<view class="title">我的团队</view>
						</view>
					</view>
			 	</view>
			 </view>
			<view class="uni-card by-card user_card">
				<view class="uni-card-content">
					<view class="user_list" v-for="(item,index) in navlist" :key="index">
						<view @click="goDetailPage(item.path)" v-bind:class="index==searchIndex ? 'uni-list-cell-navigate uni-navigate-right bb0' : 'uni-list-cell-navigate uni-navigate-right'">
							 <img class="icon_img"  :src="item.imgSrc">
							<view class="title">{{item.title}}</view>
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
				realtime:'',
				agent:{},
				//#ifdef H5
				searchIndex: 3,
				//#endif
				//#ifndef H5
				// searchIndex: 2,
				//#endif
				userInfo:{
					nickname:"未登录",
					vip_name:'游客',
					mobile:"",
					head_img:"../../../static/head-no-pic.png",
					integral:"0",
					message:"0",
					invite:"0",
					repay_num:"0",
					z_money:"0",
					yestoday_money:"0",
					money:"0",
					
				},
				navlist:[{
					title:"交易明细",
					path:"/pages/user/account/account",
					imgSrc:'../../../static/icon4.png',
				},{
					title:"收益明细",
					path:"/pages/user/agent/money",
					imgSrc:'../../../static/icon5.png',
				},{
					title:"我的结算卡",
						path:"/pages/user/agent/card",
					imgSrc:'../../../static/icon6.png',
				},{
					title:"帮助",
					path:"/pages/user/agent/service",
					imgSrc:'../../../static/icon7.png',
				},{
					title:"商务合作",
					path:"/pages/user/agent/cooperation",
					imgSrc:'../../../static/icon8.png',
				},{
					title:"设置",
					path:"/pages/user/set/set",
					imgSrc:'../../../static/icon9.png',
				},],
				
			}
		},
		onLoad() {
			this.getAgentData();
		},
		onShow(){
			this.getUserData();
		},
		onHide(){
			clearTimeout(this.realtime);
		},
		onPullDownRefresh() {
			this.getUserData();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		onNavigationBarButtonTap(e) {
		},
		methods: {
			getUserData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl+'/api/api/getUserData',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.userInfo = res.data.result.userInfo;
							if(this.userInfo.is_validate != 1){
								clearTimeout(this.realtime);
								if(uni.getStorageSync('is_tishireal')){return;}
								uni.setStorageSync('is_tishireal', true);
								this.realtime = setTimeout(function() {
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
								}.bind(this), 2000);
							}
						}else{
							this.$store.commit('logout')
						}
						
					});
				} catch (e) {
					uni.showModal({
						content:'网络异常,请稍后重试...',
						showCancel:false
					})
					//uni.stopPullDownRefresh();
				}
			},
			goDetailPage(url) {
				clearTimeout(this.realtime);
				const openid = this.$store.state.openid;
				if(openid === null){
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
				}else{
					uni.navigateTo({
						url: url
					})
				}
				
			},
			getAgentData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl+'/api/agent/getAgentData',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.agent = res.data.result.agent;
							// this.tipcontent = res.data.result.article.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
						}else{
							/* uni.showModal({
								content:res.data.msg,
								showCancel:false
							}) */
						}
					});
				} catch (e) {
					uni.showModal({
						content:'网络异常,请稍后重试...',
						showCancel:false
					})
				}
			},
		}
	}
</script>

<style>
	page{
		height: auto;
		min-height: 100%;
		background-color: #f2f2f2;
	}
	
	.user-top-bg{  width: 100%; height: 420upx;position: relative;}
	.head-pic{ border-radius:50%; height: 60upx; width: 60upx; /*background: #fecccc; opacity: 0.8;*/ overflow: hidden;}
	.head-pic image{ height: 60upx; width: 60upx;border-radius:50%;}
	.head-bj-btn{width: 120upx;}
	.head-bj-btn image{ height: 40upx; width: 120upx; margin-top: 30upx;}
	
	.head-left{ width: 130upx;}
	.head-center{/* flex: 1; */color: #FFFFFF; /* font-weight: 700; */}
	
	.head-nickname{font-size: 22upx;line-height: 1.4;margin-left: 20upx;font-weight: 500;}
	.head-phone{font-size: 20upx;line-height: 1.4;margin-left: 20upx;}
	
	.head-bottom{ height: 124upx; margin-top: 30upx;}
	.head-bottom-news{color: #FFFFFF; width: 120upx; text-align: center;font-weight: 500;font-size: 36upx;}
	.head-bottom-integral{color: #FFFFFF; width: 220upx;text-align: center;font-weight: 500;font-size: 36upx;}
	.head-bottom-invite{color: #FFFFFF;  width: 170upx;text-align: center;font-weight: 500;font-size: 36upx;}
	
	.head-bottom-news .text{font-weight: normal; font-size: 28upx;}
	.head-bottom-integral .text{font-weight: normal; font-size: 28upx;}
	.head-bottom-invite .text{font-weight: normal; font-size: 28upx;}
	
	.user-center-icon{ margin: 30upx 0upx;}
	.uni-row-plan{flex: 1;background-color: #4dc5bb;border-radius: 15upx; height: 180upx;}
	.uni-row-vip{flex: 1;background-color: #e97070;border-radius: 15upx; height: 180upx;}
	.uni-row-pd{width: 30upx;}
	
	.uni-row-plan .plan-title{font-size: 34upx; line-height: 50upx; color: #FFFFFF;}
	.uni-row-plan .plan-btn{font-size: 24upx; display: block;line-height: 80upx;color: #c7eae6;}
	.uni-row-plan .plan-num{font-size: 34upx;line-height: 50upx;color: #FFFFFF;}
	
	.uni-row-vip .vip-title{font-size: 34upx; line-height: 50upx; color: #FFFFFF;}
	.uni-row-vip .vip-btn{font-size: 24upx; display: block;line-height: 80upx;color: #f9dbdb;}
	.uni-row-vip .vip-num{font-size: 34upx;line-height: 50upx;color: #FFFFFF;}
	
	.uni-row-vip .vip-num image{width: 58upx; height: 58upx;  margin-top: 0upx;}
	
	.user_list{ height: 92upx;  color: #333;font-size: 28upx; border-bottom: 1px solid #ECECEC; }
	.user_list .uni-navigate-right:after{ font-size: 42upx;}
	.user_list .uni-navigate-right{ line-height: 92upx;/* border-bottom: 1upx solid #ecedef; */}
	.user_list .uni-navigate-right.bb0{border-bottom: 0upx;}
	.user_list .title{width: 90%;}
	.user_list .uni-list-cell-navigate{padding: 24upx 10upx;}
		.uni-card.by-card {
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		margin-top: 40upx;
	}
	.by-mt-30{ margin-top: 40upx;}
	
	.user_top{padding: 30upx 32upx;}
	.news_img{width: 36upx;height: 40upx;margin-top: 28upx;}
	.vip_icon{width: 110upx;height: 34upx;float: left;margin-left: 20upx;}
	.clearfix:after{
			content:"";
			display:block;
			visibility:hidden;
			clear:both;
			height:0;
			}
	.money_case{color: #fff;padding: 30upx 34upx;position: relative;height: 100upx;}
	.info_name,.info_number{font-size: 26upx;}
	.info_number{font-size: 42upx;font-weight: 600;line-height: 60upx;}
	.info_number_td{font-size: 36upx;line-height: 60upx;font-weight: 500;}
	.w40{width: 40%;}
	.vip_btn{position: absolute;top:40upx;right: 0;}
	.vip_btnImg{width: 172upx;height: 80upx;}
	.cash_case{padding:34upx 30upx;}
	.cash_btn{width: 100upx;height: 40upx;background-color: #ffa13c;border-radius: 500px;color: #fff;font-size: 24upx;line-height: 40upx;border:0;text-align: center;
	margin-top: 24upx;float: right;}
	.cash_text1{color: #999;font-size: 24upx;}
	.cash_text_num{color: #333;font-size: 32upx;font-weight: 600;}
	.icon_img{width: 40upx;height: 40upx;}
	.user_card{padding: 0 20upx;}
	.right_txt{float: right;color: #999;}
	.right_txt_sm{padding-right: 60upx;float: right;color: #999;line-height: 46upx;}
	.agent_cash{font-size: 24upx;text-align: right;color: #fff;line-height: 100upx;}
	.vip_icon{width: 100upx;height: 36upx;float: left;margin-left: 20upx;background: url(../../../static/vip2.png) no-repeat center;background-size: 100% 100%;font-size: 14upx;
	text-align: center;line-height: 36upx;font-weight: 600;padding-left: 10px;}
</style>

