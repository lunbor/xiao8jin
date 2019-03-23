<template>
	<view>
		<view class="uni-padding-wrap">
			<view>
				<view class="no-list" v-if="no_list==0">
					<image src="../../../static/no-list.png"></image>
				</view>
				<view class="list-view" v-if="no_list==1">
					<view class="list-item" v-for="(item,index) in list" :key="index">
						<view class="uni-flex uni-row justify" >
							<view class="text left-text">
								<view class="text log-title">{{item.bank_name}}</view>
								<view class="text log-tail">尾号({{item.bank_code}})</view>
							</view>
							<view class="text right-text">
								<view class="text log-money">{{item.money}}</view>
								<view class="text log-balance">{{item.status}}</view>
							</view>
						</view>
					</view>
				</view>
				<uni-load-more v-if="is_load==1" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</view>
		</view>
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
			this.getAgentCashLogData();
		},
		onPullDownRefresh() {
			this.loadingType = 0;
			this.page = 1;
			this.list = [];
			this.is_load = 0;
			this.getAgentCashLogData();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			this.getAgentCashLogData();
		},
		methods: {
			getAgentCashLogData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const page = this.page;
				try {
					this.$http.post(this.websiteUrl+'/api/agent/getAgentCashLogData',{openid,sessionKey,page},(res) => {
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
		background-color: #FFFFFF;
	}
	
	.list-view {
		padding:10upx 0;
	}

	.list-item {
		margin: 20upx 0;
		/* height: 140upx; */
		/* line-height: 140upx; */
		width: 100%;
		border-bottom: 2upx solid #eee;
		text-align: center;
	}
	
	.justify{justify-content: space-between;}
	.justify .left-text{ text-align: left;}
	.justify .right-text{ text-align: right;}
	
	.log-title{font-size: 36upx; color: #333333;}
	.log-tail{font-size: 28upx; color: #888888;}
	.log-time{font-size: 28upx; color: #888888;}
	.log-money{font-size: 32upx; color: #ff3e31;font-weight: 600;}
	.log-balance{font-size: 28upx; color: #666666;}
	.log-status{font-size: 28upx; color: #44c055;}
	.log-status .log-icon{font-size: 38upx;}
	.log-status.red{color: #ff3e31;}
	.log-status.blue{color: rgb(134, 134, 255);}
	
	.no-list{ text-align: center; height: 260upx; padding-top: 50%;}
	.no-list image{width: 185upx; height: 60upx;}
</style>
