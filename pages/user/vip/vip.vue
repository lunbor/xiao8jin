<template>
	<view class="content">
		<view class="vip_bg" style="background: url(../../../static/vip_bg.png);background-size: 100% 100%;">
			<view class="vip_nickname">{{vipInfo.nickname}}</view>
			<view class="vip_time">{{vipInfo.viptime}}</view>
		</view>
		<view class="vip_title">VIP会员资费</view>
		<view class="uni-flex uni-row pd10">
			<view class="text vip-money" v-for="(item, index) in vipInfo.vipmoney" :key="index" :class="vipMoney==index?'active':''" @click="onClickNum(index)">
				<view class="vip-money-title">{{item.title}}</view>
				<view class="vip-money-val">￥<text>{{item.val}}</text></view>
				<view class="vip-money-gqval">￥{{item.gqval}}</view>
			</view>
		</view>
		<view class="pd30">
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="tq-title">会员的特权</view>
					<view class="linebg"></view>
					<view class="tq-center">
						<rich-text :nodes="vipInfo.viptq"></rich-text>
					</view>
				</view>
			</view>
		</view>
		
		<view>
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
		</view>
		
		<view class="content">
			<view v-show="current === 1" class="uni-padding-wrap">
				<view class="alipay">
					<!-- #ifndef H5 -->
					<image :src="vipInfo.alipay"></image>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<img :src="vipInfo.alipay"/>
					<!-- #endif -->
				</view>
			</view>	
			
			<view v-show="current === 0" class="uni-padding-wrap">
				<view class="weixin">
					<!-- #ifndef H5 -->
					<image :src="vipInfo.weixin"></image>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<img :src="vipInfo.weixin"/>
					<view>
						长按二维码选择识别图中二维码
					</view>
					<!-- #endif -->
				</view>
			</view>	
		</view>
		
		
		<view class="pd30">
			<view class="uni-card by-card">
				<view class="uni-card-content p15">
					<view class="tq-title">支付方法</view>
					<view class="linebg"></view>
					<view class="tq-center font-sg">
						<rich-text :nodes="vipInfo.vippayff"></rich-text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="tip_btn pd30">
			<text>*</text> 如有疑问可咨询客服人员。
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '../../../components/uni-segmented-control.vue';
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					'微信支付',
					'支付宝',
				],
				vipInfo:{
					nickname:'',
					viptime:'',
					viptq:'',
					vippayff:'第一步:长按或截图二维码图片进行保存;<br />第二步:打开支付宝或微信，点开扫一扫;<br />第三步:点右上角从相册中选择刚保存的二维码;<br />第四步:输入购买会员相应金额;<br />第五步:支付时添加备注，备注会员手机号;<br />第六步:支付完成后，等待系统充值;',
					vipmoney:[
						{
							title:'',
							val:'',
							gqval:''
						},
						{
							title:'',
							val:'',
							gqval:''
						},
						{
							title:'',
							val:'',
							gqval:''
						}
					],
					alipay:'',
					weixin:''
				},
				current: 0,
				activeColor: '#fe5950',
				styleType: 'text',
				vipMoney:0
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getVipInfo();
		},
		methods: {
			getVipInfo(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl+'/api/api/getVipInfo',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.vipInfo = res.data.result;
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
			onClickNum(num){
				this.vipMoney = num;
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	}
</script>

<style>
     page {
		height: auto;
		min-height: 100%;
		background-color: #f7f8fa;
	}
	.vip_bg{ height: 176upx; padding-top: 54upx;}
	.vip_nickname{color: #d0be9a; margin-left: 180upx;  font-size: 38upx;}
	.vip_time{color: #b3a696; margin-left: 184upx; font-size: 24upx;}
	
	.vip_title{  padding: 20upx; font-size: 34upx;font-weight: 800; }
	.pd10{ padding: 0upx 10upx;}
	.vip-money{
		border: 4upx solid #ebebeb;
		border-radius: 12upx;
		margin: 0upx 10upx;
		flex: 1;height: 200upx;
		padding: 20upx 0upx 20upx 50upx;
	}
	
	.vip-money.active{
		border: 4upx solid #3e3e3e;
		background-color: #3e3e3e;
	}
	
	.vip-money-title{color: #7b7b7b;font-size: 32upx; font-weight: 800; }
	.vip-money-val{color: #6c6c6c;font-size: 28upx; font-weight: 500;}
	.vip-money-val text{color: #6c6c6c;font-size: 44upx; font-weight: 800;}
	.vip-money-gqval{color: #c0c0c0;font-size: 28upx; font-weight: normal;text-decoration:line-through;}
	
	.vip-money.active .vip-money-title{color: #d2ba8c;}
	.vip-money.active .vip-money-val{color: #d6b580;}
	.vip-money.active .vip-money-val text{color: #d6b580;}
	.vip-money.active .vip-money-gqval{color: #969696;}
	
	.uni-card.by-card {
		border-radius: 12upx;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
		box-shadow: 4upx 4upx 20upx 4upx rgba(123, 123, 123, 0.3);
	}
	
	.uni-card.by-card .p15 {
		padding: 0upx 16upx;
	}
	
	.pd30{ padding: 30upx 20upx;}
	
	.tq-title{ text-align: center; line-height: 120upx;  font-size: 36upx;   color: #d78603;}
	.linebg{ margin: 30upx 0upx; height: 4upx; background-color: #ebebeb; width: 90%; margin: 0upx auto;}
	.tq-center{ padding: 30upx 50upx;}
	
	.alipay{ text-align: center; padding: 40upx;height: 619upx;}
	.alipay image{ width: 444upx; height: 619upx;}
	.alipay img{ width: 444upx; height: 619upx;}
	
	.weixin{ text-align: center; padding: 40upx;height: 619upx;}
	.weixin image{ width: 444upx; height: 537upx;}
	.weixin img{ width: 444upx; height: 537upx;}
	.font-sg{ font-weight: normal; font-family: pingfangxi;}
	
	.red-text{ color: #fe5950;}
	.tip_btn{color: #cdd1dd; text-align: center;}
	.tip_btn text{color: #fd5950;}
</style>
