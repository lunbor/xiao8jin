<template>
	<view>
		<view class="rank_top" >
			<view style="padding: 0 140upx;">
				<uni-segmented-control :current="currentTop" :values="topBar" v-on:clickItem="onClickItemTop" :styleType="styleTypeTop"
				:activeColor="activeColorTop"></uni-segmented-control>
			</view>

		</view>
		<view class="content" v-if="currentTop===0">
				<view class="rank_case">
				<view class="rank_box">
					<view class="my_header"><img src="../../../static/head.png" alt=""></view>
					<view class="my_name"><!-- 罗哈哈 --></view>
					<view class="rank_num"><!-- 目前排名：<text>第38名</text> --></view>
					<view>
						<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
						:activeColor="activeColor"></uni-segmented-control>
					</view>
					<view class="content" v-if="current===0">
						<view class="rank_list" v-for="(item,index) in list" :key="index" v-if="index<3">
							<view class="uni-flex uni-row">
								<view class="flex-item" style="width: 65%;">
									<view class="number_case" style="font-size: 42upx;color: #e4393c;font-weight: 900;margin-top: 10upx;">
										{{index+1}}
									</view>
									<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'" class="rank_headed"></image>
									<view class="user_info">
										<view>{{item.nickname}}</view>
										<view class="text_style">等级：{{item.group_name}}</view>
									</view>
								</view>
								<view class="flex-item user_money" style="flex: 1;">
									<view>¥{{item.z_money}}</view>
									<view class="text_style">累计收益</view>
								</view>
							</view>
						</view>
						<view class="rank_list" v-for="(item,index) in list" :key="index" v-if="index>2">
							<view class="uni-flex uni-row">
								<view class="flex-item" style="width: 65%;">
									<view class="number_case">
										{{index+1}}
									</view>
									<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'" class="rank_headed"></image>
									<view class="user_info">
										<view>{{item.nickname}}</view>
										<view class="text_style">等级：{{item.group_name}}</view>
									</view>
								</view>
								<view class="flex-item user_money" style="flex: 1;">
									<view>¥{{item.z_money}}</view>
									<view class="text_style">累计收益</view>
								</view>
							</view>
						</view>
					</view>
					<view class="content" v-if="current===1">
						<view class="rank_list" v-for="(item,index) in list" :key="index" v-if="index<3">
							<view class="uni-flex uni-row">
								<view class="flex-item" style="width: 65%;">
									<img src="../../../static/rank1.png" class="rank_icon">
									<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'" class="rank_headed"></image>
									<view class="user_info">
										<view>{{item.nickname}}</view>
										<view class="text_style">等级：{{item.group_name}}2</view>
									</view>
								</view>
								<view class="flex-item user_money" style="flex: 1;">
									<view>¥{{item.z_money}}</view>
									<view class="text_style">累计收益</view>
								</view>
							</view>
						</view>
						<view class="rank_list" v-for="(item,index) in list" :key="index" v-if="index>2">
							<view class="uni-flex uni-row">
								<view class="flex-item" style="width: 65%;">
									<view class="number_case">
										{{index+1}}
									</view>
									<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'" class="rank_headed"></image>
									<view class="user_info">
										<view>{{item.nickname}}</view>
										<view class="text_style">等级：{{item.group_name}}</view>
									</view>
								</view>
								<view class="flex-item user_money" style="flex: 1;">
									<view>¥{{item.z_money}}</view>
									<view class="text_style">累计收益</view>
								</view>
							</view>
						</view>
					</view>
					<view class="content" v-if="current===2">
						<view class="rank_list" v-for="(item,index) in list" :key="index" v-if="index<3">
							<view class="uni-flex uni-row">
								<view class="flex-item" style="width: 65%;">
									<img src="../../../static/rank1.png" class="rank_icon">
									<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'" class="rank_headed"></image>
									<view class="user_info">
										<view>{{item.nickname}}</view>
										<view class="text_style">等级：{{item.group_name}}3</view>
									</view>
								</view>
								<view class="flex-item user_money" style="flex: 1;">
									<view>¥{{item.z_money}}</view>
									<view class="text_style">累计收益</view>
								</view>
							</view>
						</view>
						<view class="rank_list" v-for="(item,index) in list" :key="index" v-if="index>2">
							<view class="uni-flex uni-row">
								<view class="flex-item" style="width: 65%;">
									<view class="number_case">
										{{index+1}}
									</view>
									<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'" class="rank_headed"></image>
									<view class="user_info">
										<view>{{item.nickname}}</view>
										<view class="text_style">等级：{{item.group_name}}</view>
									</view>
								</view>
								<view class="flex-item user_money" style="flex: 1;">
									<view>¥{{item.z_money}}</view>
									<view class="text_style">累计收益</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
				
		</view>
		<view class="content" v-if="currentTop===1">
					<view class="rank_case">
				<view class="rank_box">
					<view class="my_header"><img src="../../../static/head.png" alt=""></view>
					<view class="my_name"><!-- 罗哈哈的团队 --></view>
					<view class="rank_num"><!-- 目前排名：<text>第12名</text> --></view>
					<view>
						<uni-segmented-control :current="currentTeam" :values="items" v-on:clickItem="onClickItemTeam" :styleType="styleType"
						:activeColor="activeColor"></uni-segmented-control>
					</view>
					<view class="content" v-if="currentTeam===0">
						<view class="rank_list" v-for="(item,index) in listTeam" :key="index" v-if="index<3">
							<view class="uni-flex uni-row">
								<view class="flex-item" style="width: 65%;">
									<view class="number_case" style="font-size: 42upx;color: #e4393c;font-weight: 900;margin-top: 10upx;">
										{{index+1}}
									</view>
									<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'" class="rank_headed"></image>
									<view class="user_info">
										<view>{{item.nickname}}</view>
										<view class="text_style">等级：{{item.group_name}}</view>
									</view>
								</view>
								<view class="flex-item user_money" style="flex: 1;">
									<view>{{item.usercount}}</view>
									<view class="text_style">累计推广</view>
								</view>
							</view>
						</view>
						<view class="rank_list" v-for="(item,index) in listTeam" :key="index" v-if="index>2">
							<view class="uni-flex uni-row">
								<view class="flex-item" style="width: 65%;">
									<view class="number_case">
										{{index+1}}
									</view>
									<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'" class="rank_headed"></image>
									<view class="user_info">
										<view>{{item.nickname}}</view>
										<view class="text_style">等级：{{item.group_name}}</view>
									</view>
								</view>
								<view class="flex-item user_money" style="flex: 1;">
									<view>{{item.usercount}}</view>
									<view class="text_style">累计推广</view>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="content" v-if="currentTeam===1">
						周榜
					</view>
					<view class="content" v-if="currentTeam===2">
						总榜
					</view> -->
				</view>
				
				
			</view>
				
		</view>

	</view>
</template>
<script>
	import uniSegmentedControl from '../../../components/uni-tab-nav.vue';
	export default {
		data() {
			return {
				items: [
					//'日榜',
					//'周榜',
					//'总榜'
				],
				current: 0,
				activeColor: '#2f7bfe',
				styleType: 'text',
				list:[],
				topBar: [
					'个人排行榜',
					'团队排行榜',
				],
				currentTop:0,
				styleTypeTop:'text',
				activeColorTop:"#fff",
				listTeam:[],
				currentTeam:0
			}
		},
		onLoad() {
			this.getAgentSyph();
			this.getAgentTdph();
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			onClickItemTop(index) {
				if (this.currentTop !== index) {
					this.currentTop = index;
				}
			},
			onClickItemTeam(index) {
				if (this.currentTeam !== index) {
					this.currentTeam = index;
				}
			},
			// 个人排行
			getAgentSyph(){
				try {
					this.$http.post(this.websiteUrl+'/api/agent/getAgentSyph',{},(res) => {
						if(res.data.code==1){
							this.list = res.data.result;
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
			// 团队排行
			getAgentTdph(){
				try {
					this.$http.post(this.websiteUrl+'/api/agent/getAgentTdph',{},(res) => {
						if(res.data.code==1){
							this.listTeam = res.data.result;
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
		},
		components: {
			uniSegmentedControl
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.rank_top{
		background: url(../../../static/rank_banner.png) no-repeat;background-size: 100% 100%;;
		height: 428upx;
		width: 100%;
		color: #FFFFFF;
	}
	.rank_head{height:88upx;line-height: 88upx;}
	.rank_banner{width: 100%;}
	.rank_banner uni-image{width: 100%;height: 300upx;}
	.rank_case{padding: 0 20upx;position: relative;top: -60upx;}
	.rank_box{background-color: #fff;border-radius: 12upx;padding: 16upx;}
	.my_header{width: 140upx;height: 140upx;padding: 10upx;border-radius: 500px;overflow: hidden;background-color: #fff;position: absolute;left: 50%;margin-left: -70upx;top: -70upx;}
	.my_header img{width: 140upx;height: 140upx;border-radius: 500px;}
	.my_name{font-size: 26upx;color: #333;text-align: center;margin-top: 70upx;}
	.rank_num{font-size: 22upx;color: #999;text-align: center;}
	.rank_num text{font-size: 28upx;color: #ff5e5e;font-weight: 500;}
	.rank_list {border-bottom: 1px solid #ECECEC;padding: 20upx 16upx ;}
	.rank_icon{width: 46upx;height: 54upx;position: absolute;top: -16px;left: 22px;z-index: 100;}
	.rank_headed{width: 88upx;height: 88upx;float: left;margin-left: 12upx;border-radius: 500px;}
	.user_info{font-size: 24upx;color: #333;float: left;margin-left: 12upx;}
	.user_money{font-size: 30upx;font-weight: 600;color: #ffa13c;text-align: right;}
	.text_style{font-size: 22upx;color: #999;font-weight: 400;}
	.number_case{width: 46upx;float: left;margin-top: 20upx;text-align: center;color: #999;}
</style>

