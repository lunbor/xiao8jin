<template>
	<view>
		<view class="user-top-bg" style="background: url(../../../static/user_top_bg.png) no-repeat;background-size: 100% 100%;">
			<view class="uni-flex uni-row uni-padding-wrap" @click="goDetailPage('/pages/user/info/info')">
				<view class="text head-left">
					<view class="head-pic">
						<image :src="userInfo.head_img?userInfo.head_img:'../../../static/head-no-pic.png'"></image>
					</view>
				</view>
				<view class="text head-center">
					<view class="text head-nickname">{{userInfo.nickname}}</view>
					<view class="text head-phone">{{userInfo.vip_name}}</view>
				</view>
				<view class="text head-bj-btn">
					<image src="../../../static/head-bj-btn.png"></image>
				</view>
			</view>
			<view class="uni-flex uni-row uni-padding-wrap head-bottom">
				<view class="text head-bottom-news" @click="goDetailPage('/pages/user/news/news')">{{userInfo.message}}<view class="text">消息</view></view>
				<view class="text head-bottom-integral" @click="goDetailPage('/pages/user/integral/integral')">{{userInfo.integral}}<view class="text">积分</view></view>
				<view class="text head-bottom-invite" @click="goDetailPage('/pages/user/invite/invite')">{{userInfo.invite}}<view class="text">邀请好友</view></view>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="user-center-icon">
				<view class="uni-flex uni-row">
					<view class="text uni-row-plan uni-triplex-row" @click="goDetailPage('/pages/user/plan/plan')">
						<view class="text plan-title uni-triplex-left">我的计划<view class="text plan-btn">查看</view></view>
						<view class="text plan-num uni-triplex-right">({{userInfo.repay_num}})</view>
					</view>
					<view class="text uni-row-pd"></view>
					<!--<view class="text uni-row-vip uni-triplex-row" @click="goDetailPage('/pages/user/vip/vip')">
						<view class="text vip-title uni-triplex-left">会员专享<view class="text vip-btn">查看</view></view>
						<view class="text vip-num uni-triplex-right"><image src="../../../static/user-vip.png"></image></view>
					</view>-->
					<view class="text uni-row-vip uni-triplex-row" @click="goDetailPage('/pages/user/agent/agent')">
						<view class="text vip-title uni-triplex-left">推广中心<view class="text vip-btn">查看</view></view>
						<view class="text vip-num uni-triplex-right"><image src="../../../static/user_agent.png"></image></view>
					</view>
				</view>
			</view>
			
			<view class="uni-card by-card">
				<view class="uni-card-content">
					<view class="hg50" v-for="(item,index) in navlist" :key="index">
						<view @click="goDetailPage(item.path)" v-bind:class="index==searchIndex ? 'uni-list-cell-navigate uni-navigate-right bb0' : 'uni-list-cell-navigate uni-navigate-right'">
						{{item.title}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-card by-card by-mt-30">
				<view class="uni-card-content">
					<view class="hg50" v-for="(item,index) in setlist" :key="index">
						<view class="uni-list-cell-navigate uni-navigate-right bb0" @click="goDetailPage(item.path)">
						{{item.title}}
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
				//#ifdef H5
				searchIndex: 3,
				//#endif
				//#ifndef H5
				searchIndex: 2,
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
				},
				navlist:[{
					title:"交易明细",
					path:"/pages/user/account/account",
				},{
					title:"邀请好友",
					path:"/pages/user/invite/invite",
				},{
					title:"在线客服",
					path:"/pages/user/im-chat/im-chat",
				},
				//#ifdef H5
				{
					title:"APP下载",
					path:'/pages/index/web-view/web-view?title=APP下载&url='+this.websiteUrl+'/index/index/download',
				},
				//#endif
				],
				setlist:[{
					title:"设置",
					path:"/pages/user/set/set",
				}],
			}
		},
		onLoad() {
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
		}
	}
</script>

<style>
	page{
		height: auto;
		min-height: 100%;
		background-color: #f7f8fa;
	}
	
	.user-top-bg{  width: 100%; height: 263upx;}
	.head-pic{ border-radius:50%; height: 107upx; width: 107upx; /*background: #fecccc; opacity: 0.8;*/ overflow: hidden;}
	.head-pic image{ height: 107upx; width: 107upx;}
	.head-bj-btn{width: 120upx;}
	.head-bj-btn image{ height: 40upx; width: 120upx; margin-top: 30upx;}
	
	.head-left{ width: 130upx;}
	.head-center{flex: 1; color: #FFFFFF; font-weight: 700;}
	
	.head-nickname{font-size: 34upx;}
	.head-phone{font-size: 24upx;}
	
	.head-bottom{ height: 124upx; margin-top: 30upx;}
	.head-bottom-news{color: #FFFFFF; width: 120upx; text-align: center;font-weight: 600;font-size: 36upx;}
	.head-bottom-integral{color: #FFFFFF; width: 220upx;text-align: center;font-weight: 600;font-size: 36upx;}
	.head-bottom-invite{color: #FFFFFF;  width: 170upx;text-align: center;font-weight: 600;font-size: 36upx;}
	
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
	
	.hg50{ height: 120upx;  color: #576175;font-size: 34upx; font-weight: 600; }
	.hg50 .uni-navigate-right:after{ font-size: 52upx;}
	.hg50 .uni-navigate-right{ line-height: 80upx;border-bottom: 1upx solid #ecedef;}
	.hg50 .uni-navigate-right.bb0{border-bottom: 0upx;}
	.uni-card.by-card{
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
        box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
	}
	.by-mt-30{ margin-top: 40upx;}
</style>
