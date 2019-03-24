<template>
	<view>
		<view class="my_team" v-if="no_list==1">
			<view class="my_team_info">
				<view class="uni-flex uni-row">
					<view class="flex-item name">团队总人数：<text>{{agentUserCount.usrecount}}人</text></view>
					<view class="flex-item name">直推：<text>{{agentUserCount.directCount}}人</text></view>
				</view>
				<view class="uni-flex uni-row">
					<view class="flex-item name">间推：<text>{{agentUserCount.indirect}}人</text></view>
					<view class="flex-item name">当月活跃人数：<text>{{agentUserCount.active}}人</text></view>
				</view>
			</view>
			
			<view class="my_team_lists">
				<view class="my_team_list uni-list-cell-navigate uni-navigate-right" v-for="(item,index) in list" :key="index" >
					<view class="uni-flex uni-row" style="width: 100%;">
						<view class="flex-item" style="width: 80upx;">
							<view class="head-pic">
								<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'"></image>
							</view>
						</view>
						<view class="flex-item my_team_listInfo" >
							<view class="uni-flex uni-row">
								<view class="flex-item w40">用户名：{{item.nickname}}</view>
								<view class="flex-item w30">等级：{{item.group_name}}</view>
								<view class="flex-item w30">关系：{{item.is_active}}</view>
							</view>
							<view class="uni-flex uni-row">
								<view class="flex-item w40">电话:{{item.mobile}}</view>
								<!--<view class="flex-item w60">TA的团队：68人</view>-->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	
		
		<view class="no-list" v-if="no_list==0">
			<image src="../../../static/no-list.png"></image>
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
				agentUserCount:'0',
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
			this.getAgentUserData();
		},
		onPullDownRefresh() {
			this.loadingType = 0;
			this.page = 1;
			this.list = [];
			this.is_load = 0;
			this.getAgentUserData();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.getAgentUserData();
		},
		onShow() {
		},
		methods: {
			getAgentUserData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const page = this.page;
				try {
					this.$http.post(this.websiteUrl+'/api/agent/getAgentUserData',{openid,sessionKey,page},(res) => {
						if(res.data.code==1){
							if(res.data.result.list.length>=1){
								this.list = this.list.concat(res.data.result.list);
								this.agentUserCount = res.data.result.agentUserCount;
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
		background-color: #F2F2F2;
	}
	.my_team{margin: 30upx;background-color: #fff;padding: 30upx 0;border-radius: 12upx;-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);
		box-shadow: 4upx 4upx 20upx 4upx rgba(0, 37, 174, 0.2);}
	.my_team_info{background-color: #5a91fe;padding: 20upx;border-radius: 12upx;color: #fff;margin: 0 30upx;}
	.my_team_info .flex-item{flex: 1;}
	.my_team_info .name{font-size: 24upx;}
	.my_team_info .name uni-text{font-size: 30upx;}
	.my_team_lists{padding-left: 30upx;}
	.my_team_list{padding: 30upx 0 0upx 0;}
	.my_team_listInfo{border-bottom: 1px solid #ECECEC;flex:1 ;padding-bottom: 10upx;color: #666;}
	.my_team_listInfo .flex-item{font-size: 22upx;line-height: 2;}
	.my_team_listInfo .w40{width: 40%;}
	.my_team_listInfo .w30{width: 30%;}
	.my_team_list .uni-list-cell-navigate.uni-navigate-right:after{right: 10upx;}
	.head-pic{ border-radius:50%; height: 60upx; width: 60upx; overflow: hidden;;margin-top: 12upx;}
	.head-pic image{ width: 60upx; height: 60upx;}
	.no-list{ text-align: center; height: 260upx; padding-top: 50%;}
	.no-list image{width: 185upx; height: 60upx;}
</style>