<template>
			<view>
				<view class="no-list" v-if="no_list==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				<view class="uni-padding-wrap list-view" v-if="no_list==1">
					<view class="list-item uni-flex uni-row" v-for="(item,index) in list" :key="index" @tap="goDetailPage('/pages/user/news/newsInfo?m_id='+item.message_id)">
						<view class="news-tip">
							<view class="tip-yd"></view>
						</view>
						<view style="flex: 1;">
							<view class="uni-flex uni-row uni-list-cell-navigate uni-navigate-right justify">
								<view class="news-title">{{item.message}}</view>
							</view>
							<view class="news-data">{{item.data}}</view>
							<view class="news-time">{{item.send_time}}</view>
						</view>
					</view>
				</view>
				<uni-load-more v-if="is_load==1" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</view>
</template>
<script>
	import uniLoadMore from '../../../components/uni-load-more.vue'

	export default {
		data() {
			return {
				list: [],
				page: 1,
				is_load: 0,
				no_list: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad() {
			this.getMessage();
		},
		onPullDownRefresh() {
			this.loadingType = 0;
			this.page = 1;
			this.list = [];
			this.is_load = 0;
			this.getMessage();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.getMessage();
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
			getMessage(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const page = this.page;
				try {
					this.$http.post(this.websiteUrl+'/api/message/getMessage',{openid,sessionKey,page},(res) => {
						if(res.data.code==1){
							if(res.data.result.list.length>=1){
								this.list = this.list.concat(res.data.result.list);
								this.loadingType = 0;
								this.page = this.page + 1;
								this.is_load = 1;
								this.no_list = 1;
							}else{
								this.loadingType = 2;
								if(this.page == 1){
									this.no_list = 0;
									this.is_load = 0;
								}
							}	
						}else{
							this.loadingType = 0;
							uni.showModal({
								content:res.data.msg,
								showCancel:false
							})
						}
					});
				} catch (e) {
					this.loadingType = 0;
					uni.showModal({
						content:'网络异常,请稍后重试...',
						showCancel:false
					})
				}
			}
		},
		components: {
			uniLoadMore
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f7f8fa;
	}
	
	.list-view {
		padding:0upx 0;
		width: 100%;
	}

	.list-item {
		margin: 0upx 0upx 10upx 0upx;
		height: 150upx;
		padding: 20upx 30upx;
		border-bottom: 2upx solid #eee;
		border-top: 2upx solid #eee;
		text-align: left;
		background:#FFF;
	}
	
	.justify{width: 680upx; padding: 0upx;}

	.news-title{font-size: 32upx;line-height: 50upx;font-weight: 500;}
	.news-data{width: 650upx;  height: 50upx; line-height: 50upx; overflow: hidden;text-overflow:ellipsis; font-size: 24upx;  color: #666666;white-space:nowrap}
	.news-time{width: 650upx;color: #b0b0b0; height: 50upx; line-height: 50upx;font-size: 24upx; }
	.news-tip{ width: 16upx; padding-right: 20upx; padding-top: 16upx;}
	.tip-yd{ background-color: #fe5950; border-radius: 50%; width: 16upx; height: 16upx;}
	.uni-list-cell-navigate.uni-navigate-right:after{ font-size: 40upx;line-height: 50upx;}
	
	.no-list{ text-align: center; height: 260upx; padding-top: 50%;}
	.no-list image{width: 185upx; height: 60upx;}
</style>
