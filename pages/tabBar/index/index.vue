<template>
	<view class="uni-common-pb">
        <view class="uni-header-logo"  @click="goRepay()">
			<image src="../../../static/home_btn_bnh.png"></image>
		</view>
		<view class="uni-flex uni-row by-home-icons">
			<view class="flex-item ls4"  @click="goDetailPage('/pages/user/pos/pos')">
				<image src="../../../static/home_tab_card.png"></image>
				<view class="uni-title">刷卡收款</view>
			</view>
			<view class="flex-item ls4"  @click="goDetailPage('/pages/user/plan/plan')">
				<image src="../../../static/home_tab_zhandan.png"></image>
				<view class="uni-title">还款计划</view>
			</view>
			<view class="flex-item ls4"  @click="goDetailPage('/pages/user/invite/invite')">
				<image src="../../../static/home_tab_share.png"></image>
				<view class="uni-title">邀请好友</view>
			</view>
			<view class="flex-item ls4"  @click="goDetailPage('/pages/index/about/about')">
				<image src="../../../static/home_tab_about.png"></image>
				<view class="uni-title">关于我们</view>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-card uni-card-red" v-for="(item, index) in cardList" :key="index">
				<view class="uni-triplex-row pd15">
					<view class="uni-triplex-left lf7">{{item.bank_name}}</view>
					<view class="uni-triplex-right rg3"><button class="mini-btn" type="primary" size="mini" @click="goRepayInfo(item.credit_id)">查看</button></view>
				</view>
				<view class="uni-triplex-row linebg"></view>
				<view class="uni-flex uni-row">
					<view class="flex-item ls3">
						<view class="ls3-row">￥<text>{{item.yes_repay_money}}</text></view>
						<view>已还款</view>
					</view>
					<view class="flex-item ls3">
						<view class="ls3-row">￥<text>{{item.no_repay_money}}</text></view>
						<view>未还款</view>
					</view>
					<view class="flex-item ls3">
						<view class="ls3-row"><text>{{item.repay_day}}</text>天还款</view>
						<view>{{item.repay_date}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap by-mt-20">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" indicator-dots="true" :autoplay="autoplay" interval="2000" duration="500" indicator-color="#ffb8b8" indicator-active-color="#fe5950">
						<swiper-item v-for="(item, index) in swiperList" :key="index">
							<view class="swiper-item" @click="goWebPage(item.title,item.link_url)"><image :src="item.images"></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<view class="uni-padding-wrap"><view class="textbx"><view class="uni-icon uni-icon-info-filled"></view> 账户安全可由PICC保险公司承保</view></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				autoplay: true,
				swiperList: [],
				cardList:[],
			}
		},
		onLoad(e) {
			if(e.shareId){
				uni.setStorageSync('shareId', e.shareId);
			}
			
			if(e.agentId){
				uni.setStorageSync('agentId', e.agentId);
			}
				
			if(e.qdId){
				uni.setStorageSync('qdId', e.qdId);
			}
		    //uni.showLoading();
			//uni.showToast({title:'加载中',icon:'loading'})
			//uni.startPullDownRefresh();
		},
		onShow(){
			this.getIndexData();
		},
		onReady(){
			//setTimeout(function () {
				//uni.hideLoading();
			//}, 500);
		},
		onPullDownRefresh() {
			this.getIndexData();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		onNavigationBarButtonTap(e) {
			const openid = this.$store.state.openid;
			if(openid === null){
				uni.navigateTo({
					url: '/pages/user/login/login'
				})
				return false;
			}
		
			uni.navigateTo({
				url: '/pages/user/news/news'
			})
		},
		methods: {
			goRepay() {
				uni.switchTab({
					url: '/pages/tabBar/card/card'
				})
			},
			goRepayInfo(credit_id){
				uni.navigateTo({
					url: '/pages/card/credit/info?credit_id='+credit_id,
				})
			},
			getIndexData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl+'/api/api/getIndexData',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.swiperList = res.data.result.banner;
							this.cardList = res.data.result.cardRepay;
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
			goWebPage(title,url) {
				uni.navigateTo({
					url: '/pages/index/web-view/web-view?title='+title+'&url='+url
				})
			},
			goDetailPage(url) {
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
				
			}
		}
	}
</script>

<style>
	page{
		height: auto;
		min-height: 100%;
	}
	.uni-icon-info-filled{color:#fe5950;font-size:26upx}
	.uni-header-logo{
		height: 568upx;
	}
	.uni-header-logo image{
		width: 100%;height: 568upx;
	}
	
	.by-home-icons{ margin-top: 30upx;}
	
	.ls4 {
		width: 25%;
		height: 130upx;
		text-align: center;
	}
	
	.ls4 image {
		width: 72upx;
		height: 72upx;
	}
	
	.uni-card-red{
		background: linear-gradient(to right, #ff7575, #fe5950);
		border-radius: 15upx;
		color: #fff;
		min-height: 260upx;
		margin-top: 50upx;
		overflow: hidden;
	}
	
	.ls4 .uni-title{
	    padding: 0upx;
	}
	
	.uni-card .lf7{width: 74%; font-weight: 500;font-size: 32upx;}
	.uni-card .rg3{width: 26%;}
	
	.mini-btn{ width: 160upx; height: 55upx;background-color: #fe5950 !important; background: transparent !important; 
	
	}
	.mini-btn:after{border: 5upx solid #FFFFFF;}
	.linebg{background: #EEEEEE; height: 2upx; line-height: 2upx;padding:0upx; width: 90%; margin: 0 auto;opacity:0.5;}
	.pd15{ padding: 28upx 30upx;}
	
	.ls3{
		width: 33.33%;
		height: 140upx;
		text-align: center;
		margin-top: 15upx;
	}
	
	.ls3-row text{ font-size: 36upx; font-weight: 500;}
	
	.swiper {
		height: 220upx;
		border-radius:15upx;
	}
	.swiper-item {
		display: block;
		height: 220upx;
		line-height: 220upx;
		text-align: center;
		border-radius:15upx;
		
	}
	.swiper-item image{width: 100%; height: 220upx;}
	.by-mt-20{ margin-top: 50upx;}
	
	.textbx{
		margin:15upx 10upx;
		padding: 0 20upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #777;
		font-size: 26upx;
	}
</style>
