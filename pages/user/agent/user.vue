<template>
	<view>
		<view class="agent_user_bg">
			<view class="agent_total_user">共<text>{{agentUserCount}}</text>人</view>
		</view>
		
		<view class="uni-flex uni-row user-list bgff">
			<view class="by-flex text-c user-row">
				用户头像
			</view>
			<view class="by-flex text-c user-row">
				用户昵称
			</view>
			<view class="by-flex text-c user-row">
				注册日期
			</view>
		</view>
		
		<view class="no-list" v-if="no_list==0">
			<image src="../../../static/no-list.png"></image>
		</view>
		<view class="list-view" v-if="no_list==1">
			
			<view class="uni-flex uni-row user-list" v-for="(item,index) in list" :key="index" v-bind:class="(index+1)%2==0 ? 'bgff' : ''">
				<view class="by-flex text-c user-row">
					<view class="head-pic">
						<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'"></image>
					</view>
				</view>
				<view class="by-flex text-c user-row">
					{{item.nickname}}
				</view>
				<view class="by-flex text-c user-row">
					{{item.create_time}}
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
		background-color: #f7f8fa;
	}
	
	.agent_user_bg{
		background-color: #fd5950;
		background: linear-gradient(top, #fd5950, #ff7575);
		height: 120upx;
		color: #FFFFFF;
		 padding: 30upx 50upx;
	}
	.agent_total_user {text-align: center;}
	.agent_total_user text{font-size: 60upx; margin: 0 14upx;}
	
	.by-flex{
		flex: 1;
	}
	
	.text-r{
		text-align: right;
	}
	
	.text-c{
		text-align:center;
	}
	
	
	.user-list{ background-color: #eeeeee; color: #7d7d7d;}
	.bgff{background-color: #FFFFFF;}
	.user-row{ line-height: 100upx; height: 100upx;}	
	.head-pic{ border-radius:50%; height: 60upx; width: 60upx; overflow: hidden;margin: 0 auto;margin-top: 20upx;}
	.head-pic image{ width: 60upx; height: 60upx;}
	
	.no-list{ text-align: center; height: 260upx; padding-top: 50%;}
	.no-list image{width: 185upx; height: 60upx;}
</style>