<template>
	<view>
		<view class="agent_bg">
			<view class="uni-flex uni-row">
				<view class="by-flex">
					<view class="agent_total_profit">总收益 (元)</view>
					<view class="agent_total_profit_text">{{agent.z_money}}</view>
				</view>
				<view class="by-flex">
					<view class="agent_cash" @click="showMiddlePopup"><view class="uni-icon uni-icon-help fz28"></view> 提现规则</view>
				</view>	
			</view>
			<view class="uni-triplex-row linebg"></view>
			<view class="uni-flex uni-row uni-common-mt">
				<view class="by-flex">
					可提现金额: <text>{{agent.money}}</text>元
				</view>
				<view class="by-flex text-r">
					<button class="mini-btn" type="primary" size="mini" @click="goDetailPage('/pages/user/agent/cash')">提现</button>
				</view>
			</view>
		</view>
		<view class="contentbg">
			<view class="uni-flex uni-row">
				<view class="by-flex text-c">
					<view class="agent_num">{{agent.agentUserCount}}</view>
					<view class="agent_text">我的团队</view>
				</view>
				<view class="by-flex text-c">
					<view class="agent_num">￥{{agent.user_sy}}</view>
					<view class="agent_text">用户提成</view>
				</view>
				<view class="by-flex text-c">
					<view class="agent_num">{{agent.agentCount}}</view>
					<view class="agent_text">我的代理</view>
				</view>
				<view class="by-flex text-c">
					<view class="agent_num">￥{{agent.agent_sy}}</view>
					<view class="agent_text">代理提成</view>
				</view>
			</view>
		</view>
		
		<view class="contentbg uni-common-mt">
			<view class="hg50">
				<view @click="goDetailPage('/pages/user/agent/buy')" class="uni-list-cell-navigate uni-navigate-right bb0">
					<image src="../../../static/agent_dkw.png"></image>{{agent.group_name}}
					<text class="uni-list-cell-left by-sdh">立即升级</text>
				</view>
			</view>
		</view>
		
		<view class="contentbg uni-common-mt">
			<view class="hg50" v-for="(item,index) in navlist" :key="index">
				<view @click="goDetailPage(item.path)" v-bind:class="index==searchIndex ? 'uni-list-cell-navigate uni-navigate-right bb0' : 'uni-list-cell-navigate uni-navigate-right'">
				<image :src="item.icon"></image>{{item.title}}
				</view>
			</view>
		</view>
		
		
		<view class="contentbg uni-common-mt">
			<view class="hg50" v-for="(item,index) in navlist2" :key="index">
				<view @click="goDetailPage(item.path)" v-bind:class="index==searchIndex ? 'uni-list-cell-navigate uni-navigate-right bb0' : 'uni-list-cell-navigate uni-navigate-right'">
				<image :src="item.icon"></image>{{item.title}}
				</view>
			</view>
		</view>
		
		<view class="contentbg uni-common-mt">
			<view class="hg50" v-for="(item,index) in navlist3" :key="index">
				<view @click="goDetailPage(item.path)" v-bind:class="index==searchIndex ? 'uni-list-cell-navigate uni-navigate-right bb0' : 'uni-list-cell-navigate uni-navigate-right'">
				<image :src="item.icon"></image>{{item.title}}
				</view>
			</view>
		</view>
		
		<view class="contentbg uni-common-mt uni-common-mb">
			<view class="hg50" v-for="(item,index) in navlist4" :key="index">
				<view @click="goDetailPage(item.path)" v-bind:class="index==searchIndex ? 'uni-list-cell-navigate uni-navigate-right bb0' : 'uni-list-cell-navigate uni-navigate-right'">
				<image :src="item.icon"></image>{{item.title}}
				</view>
			</view>
		</view>
		
		
		<!-- 居中 -->
		<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup" :title="tiptitle" :queren="true" :quxiao="false">
			<view class="uni-common-mt uni-helllo-text uni-center" style="text-align: left;">
				<rich-text :nodes="tipcontent"></rich-text>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '../../../components/uni-popup.vue';
	export default {
		data() {
			return {
				popType: 'middle',
				tiptitle: '提示',
				showPopupMiddle: false,
				tipcontent:'',
				agent:{},
				searchIndex: 1,
				navlist:[{
					title:"我的用户",
					path:"/pages/user/agent/user",
					icon:"../../../static/agent_user.png",
				},{
					title:"我的代理",
					path:"/pages/user/agent/share",
					icon:"../../../static/agent_share.png",
				}
				],
				navlist2:[{
					title:"收益明细",
					path:"/pages/user/agent/money",
					icon:"../../../static/agent_money.png",
				},{
					title:"提现记录",
					path:"/pages/user/agent/cashLog",
					icon:"../../../static/agent_cash.png",
				}
				],
				navlist3:[{
					title:"结算卡",
					path:"/pages/user/agent/card",
					icon:"../../../static/agent_card.png",
				},{
					title:"推广二维码",
					path:"/pages/user/agent/invite",
					icon:"../../../static/agent_qr.png",
				}
				],
				navlist4:[{
					title:"收益排行",
					path:"/pages/user/agent/jyph",
					icon:"../../../static/agent_jyph.png",
				},{
					title:"团队排行",
					path:"/pages/user/agent/tdph",
					icon:"../../../static/agent_ph.png",
				}
				],
			}
		},
		onLoad() {
			this.getAgentData();
		},
		onShow() {
		},
		methods: {
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupMiddle = false;
			},
			//展示居中 popup
			showMiddlePopup: function() {
				//this.hidePopup();
				this.popType = 'middle';
				this.showPopupMiddle = true;
			},
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
			getAgentData(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl+'/api/agent/getAgentData',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.agent = res.data.result.agent;
							this.tipcontent = res.data.result.article.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
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
			uniPopup
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f7f8fa;
	}
	
	.agent_bg{
		background-color: #fd5950;
		background: linear-gradient(top, #fd5950, #ff7575);
		height: 240upx;
		color: #FFFFFF;
		 padding: 30upx 50upx;
	}
	
	.agent_total_profit{
		font-size: 28upx;
	}
	
	.agent_total_profit_text{
		font-size: 54upx;
	}
	
	.agent_cash{
		font-size: 28upx;
		text-align: right;
	}
	
	.fz28{
		font-size: 32upx;
		margin-right: 12upx;
	}
	
	.linebg {
		background: #EEEEEE;
		height: 4upx;
		line-height: 4upx;
		padding: 0upx;
		width: 100%;
		margin: 0 auto;
		opacity: 0.5;
	}
	
	.by-flex{
		flex: 1;
	}
	
	.text-r{
		text-align: right;
	}
	
	.text-c{
		text-align:center;
	}
	.agent_num{ margin-top: 18upx;color: #fe5950; font-weight: 600;margin-bottom: 10upx;}
	.agent_text{ margin-bottom: 18upx;}
	
	.mini-btn{ line-height: 55upx ; width: 130upx; height: 55upx;background-color: #fe5950 !important; background: transparent !important; }
	.mini-btn:after{border: 5upx solid #FFFFFF;}
	
	.contentbg{ background-color: #FFFFFF;}
	
	.hg50{ height: 90upx;  color: #576175;font-size: 32upx; font-weight: 500; }
	.hg50 .uni-navigate-right:after{ font-size: 42upx;}
	.hg50 .uni-navigate-right{ line-height: 50upx;border-bottom: 1upx solid #ecedef;-webkit-justify-content:flex-start}
	.hg50 .uni-navigate-right image{ width: 40upx; height: 40upx; margin-right: 20upx;}
	.hg50 .uni-navigate-right.bb0{border-bottom: 0upx;}
	
	.by-sdh {
		font-size: 26upx;
		font-weight: normal;
		margin-left: 48%;
		color: #06a2fc;
	}
</style>