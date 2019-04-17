<template>
	<view class="content">
		<view class="vip_bg">
			<view class="head-pic">
				<img src="../../../static/head-no-pic.png">
			</view>
			<view class="vip_user">
				<view class="vip_nickname">{{vipInfo.nickname}}</view>
				<view class="vip_time">{{vipInfo.viptime}}</view>
			</view>
		</view>
		<view class="postage">
			<view class="vip_title">特权资费</view>
			<view class="uni-flex uni-row">
				<view class="text vip-money" v-for="(item, index) in vipInfo.vipmoney" :key="index" :class="index==0?'active':''" 
				@click="onClickNum(index,item.id)" >
					<view class="vip-money-title">{{item.title}}</view>
					<view class="vip-money-val">¥<text>{{item.val}}</text></view>
					<view class="vip-money-yj"><s>¥398</s></view>
					<view class="vip_icon"  v-if="index==0">限时特惠</view>
					<!-- <view class="vip_icon" v-if="index==1">推荐</view>
					<view class="vip_icon" v-if="index==2">尊享</view> -->
				</view>
				
			</view>
		</view>	

		<view class="vip_info">
			<view class="tq-title"></view>
			<view class="tq-center">
				<view class="uni-flex uni-row vip_info_case">
					<view class="flex-item vip_info_name">
						免费
						<view class="tip_text">(免费使用)</view>
					</view>
					<view class="flex-item vip_info_main">
						<view>还款手续费:本金：<text>78/万</text>、空卡：<text>120/万</text></view>
					</view>
				</view>
				<view class="uni-flex uni-row vip_info_case">
					<view class="flex-item vip_info_name">
						vip
						<view class="tip_text">终生298元</view>
					</view>
					<view class="flex-item vip_info_main">
						<view>还款手续费:本金：<text>68/万</text>、空卡：<text>100/万</text></view>
						<view>流水分润:本金还款10/万，空卡还款20/万, 刷卡分润5/万</view>
						<view>级差奖励40%</view>
					</view>
				</view>
				<view class="uni-flex uni-row vip_info_case">
					<view class="flex-item vip_info_name">
						小咖
						<view class="tip_text">直推10名vip</view>
					</view>
					<view class="flex-item vip_info_main">
						<view>还款手续费:本金：<text>63/万</text>、空卡：<text>95/万</text></view>
						<view>流水分润:本金还款15/万，空卡还款万25/万，刷卡分润10/万</view>
						<view>级差奖励60%</view>
					</view>
				</view>
				<view class="uni-flex uni-row vip_info_case" style="border-bottom: none;">
					<view class="flex-item vip_info_name" >
						大咖
						<view class="tip_text">直推5名小咖</view>
					</view>
					<view class="flex-item vip_info_main">
						<view>还款手续费:本金：<text>58/万</text>、空卡：<text>90/万</text></view>
						<view>流水分润:本金还款20/万，空卡还款30/万，刷卡分润15/万</view>
						<view>级差奖励73%</view>
					</view>
				</view>
			</view>
		</view>

		
		
		<view class="uni-common-mt" v-show="vipInfo.payWay === 1" style="margin: 30upx;">
			
			<view class="uni-list-cell-navigate uni-navigate-right pay_case" >
				<view class="by-sdh">付款账户<text></text></view>
				<input class="uni-input" @click="showBottomPopup" disabled="disabled"  v-model="credit_name"  placeholder="请选择付款账户" />
			</view>
			
			
			<button type="warn" class="by-button-submit" :loading="loading" @click="payAgentFee">立即升级</button>
		</view>
		
		<view v-show="vipInfo.payWay === 0" >
			<view >
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

		
		
				<!-- 底部 -->
		<uni-popup :show="showPopupBottom" :type="popType" v-on:hidePopup="hidePopup" title="请选择支付卡">
			<view class="uni-center">
					<radio-group class="uni-list" @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItems" :key="index">
							<view>
								<label class="label-2-text" :for="item.name">
									<text>{{item.value}}</text>
								</label>
							</view>
							<view>
								<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
							</view>
						</label>
					</radio-group>
					<view class="add-card-btn uni-flex uni-row" style="justify-content: center;" @click="goDetailPage('/pages/card/credit/add')">
						<view class="flex-item uni-icon uni-icon-plusempty"></view>
						<view class="flex-item add-title">添加新的信用卡</view>
					</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniSegmentedControl from '../../../components/uni-segmented-control.vue';
	import uniPopup from '../../../components/uni-popup-bank.vue';
	export default {
		components: {
			uniSegmentedControl,uniPopup
		},
		data() {
			return {
				items: [
					'微信支付',
					'支付宝',
				],
				vipInfo:{
					payWay:1,
					nickname:'',
					viptime:'',
					viptq:'',
					vippayff:'第一步:长按或截图二维码图片进行保存;<br />第二步:打开支付宝或微信，点开扫一扫;<br />第三步:点右上角从相册中选择刚保存的二维码;<br />第四步:输入购买等级资费的相应金额;<br />第五步:支付时添加备注，备注会员手机号;<br />第六步:支付完成后，等待系统充值;',
					vipmoney:[
						{
							title:'',
							val:'',
							id:'',
						},
						{
							title:'',
							val:'',
							id:'',
						},
						{
							title:'',
							val:'',
							id:'',
						}
					],
					alipay:'',
					weixin:''
				},
				current: 0,
				activeColor: '#fe5950',
				styleType: 'text',
				vipMoney:0,
				credit_name:'',
				credit_id:'',
				loading:false,
				disabled:true,
				popType: 'middle',
				showPopupBottom: false,
				radioItems:[],
				group_id:0,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getVipInfo();
		},
		onHide() {
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
			}
		},
		onBackPress() {			
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
				return true;
			}
		},
		onUnload() {			
			if (this.showPopupBottom) {
				this.showPopupBottom = false;
			}
		},
		methods: {
			payAgentFee(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const group_id = this.group_id;
				const credit_id = this.credit_id;
				if(openid == null){
					return;
				}
				
				if(credit_id == ''){
					uni.showModal({
						content: '请选择付款账户',
						showCancel: false
					});
					return;
				}
				uni.showModal({ //提醒用户更新
					title: '提示',
					content: '您确定支付相应金额，进行升级吗？',
					success: (res) => {
						if (res.confirm) {				
							const that = this;
							try {
								if(this.loading){
									return;
								}
								this.loading = true;
								this.$http.post(this.websiteUrl+'/api/agent/payAgentFee',{openid,sessionKey,group_id,credit_id},(res) => {
									if(res.data.code==1){
										if(res.data.result.url != ''){
											that.loading = false;
											uni.navigateTo({
												url: '/pages/card/web-view/web-view?url='+res.data.result.url
											})
										}else{
											uni.showModal({
												content:res.data.msg,
												showCancel:false,
												success:function() {
													that.loading = false;
													uni.navigateBack();
												}
											})
										}
									}else{
										uni.showModal({
											content:res.data.msg,
											showCancel:false,
											success:function() {
												that.loading = false;
											}
										})
									}
								});
							} catch (e) {
								uni.showModal({
									content:'网络异常,请稍后重试...',
									showCancel:false,
									success:function() {
										that.loading = false;
									}
								})
							}
							
						}
					}
				});
			
			},
			radioChange: function(e) {
				var checked = e.target.value
				var changed = {}
				for (var i = 0; i < this.radioItems.length; i++) {
					if (checked.indexOf(this.radioItems[i].name) !== -1) {
						changed['radioItems[' + i + '].checked'] = true;
						this.credit_name = this.radioItems[i].value;
					} else {
						changed['radioItems[' + i + '].checked'] = false;
					}
				}
				this.credit_id = e.detail.value;
				this.showPopupBottom = false;
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupBottom = false;
				this.showAisleBottom = false;
			},
			//展示底部 popup
			showBottomPopup: function() {
				this.hidePopup();
				this.popType = 'bottom';
				this.showPopupBottom = true;
			},
			goDetailPage(url) {
				const openid = this.$store.state.openid;
				if(openid == null){
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
					return false;
				}
				uni.navigateTo({
					url: url
				})
			},
			getVipInfo(){
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl+'/api/agent/getAgentInfo',{openid,sessionKey},(res) => {
						if(res.data.code==1){
							this.vipInfo = res.data.result;
							this.radioItems = res.data.result.creditCard;
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
			onClickNum(num,id){
				this.vipMoney = num;
				this.group_id = id;
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
		background-color: #FFFFFF;
	}
	.vip_bg{ height: 100upx; background-color: #3c3f4c;padding:  30upx;}
	.vip_user{color: #d0be9a; margin-left: 30upx;  font-size: 28upx;color: #fff;float: left;font-weight: 500;}
	.vip_time{color: #f4e4bc; font-size: 24upx;}
	.head-pic{width: 80upx;height: 80upx;border-radius: 500px;float: left;margin-top: 10upx;}
	.head-pic image{width: 80upx;height: 80upx;border-radius: 500px;}
	.head-pic img{width: 80upx;height: 80upx;border-radius: 500px;}
	.postage{margin: 30upx;margin-top: 20upx;}
	.vip_title{font-size: 32upx;font-weight: 800;color: #333;padding-bottom: 30upx; }
	.vip-money{
		border: 2upx solid #DDDDDD;
		border-radius: 12upx;
		height: 180upx;
		padding: 20upx 0 20upx;
		text-align: center;
		background-color: #FFFFFF;
		width: 31%;
		position: relative;
		display: none;
	}
	.vip-money:nth-child(2){margin: 0 3.5%;}
	.vip-money.active{
		border: 2upx solid #ebc58c;
		background-color: #fffaf2;
		display: block;
	}
	.vip_icon{width: 120upx;height: 34upx;background: url(../../../static/vip_icon.png) no-repeat;background-size: 100% 100%;position: absolute;top: -20upx;left: 0;color: #eacc9b;
	font-size: 22upx;text-align: center;line-height: 34upx;}
	.vip-money-title{color: #8d8c8a;font-size: 46upx; font-weight:900; line-height: 1;}
	.vip-money-val{color: #a57459;font-size: 32upx; font-weight: 900;}
	.vip-money-val text{font-size: 48upx;}
	.vip-money-gqval{color: #c0c0c0;font-size: 28upx; font-weight: normal;text-decoration:line-through;}
	.vip-money.active .vip-money-title{color: #8d8c8a; }
	.vip-money.active .vip-money-gqval{color: #969696;}
	.vip-money-yj{font-size: 400;font-size: 30upx;color: #888;line-height: 1;}
	.vip_title img{height: 136upx;width: 100%;}	
	.tq-title{background: url(../../../static/vip_info.png) no-repeat;background-size: 100% 100%;height: 136upx;}
	.vip_info{margin:0 30upx}
	.linebg{ margin: 30upx 0upx; height: 4upx; background-color: #ebebeb; width: 90%; margin: 0upx auto;}
	.tq-center{border:1px solid #ececec;border-top:none}
	.vip_info_case{border-bottom: 1px solid #ECECEC;}
	.vip_info_name{width: 18%;text-align: center;font-size: 26upx;border-right: 1px solid #ECECEC;padding-top: 20upx;}
	.vip_info_main{flex: 1;padding:10upx 30upx;}
	.vip_info_main uni-view{font-size: 24upx;color: #666;}
	.vip_info_main uni-view text{color: #ffa13c;}
	.by-button-submit{background-color: #efdcb2;
			background: linear-gradient(left, #efdcb2, #d5b683);
			border-radius: 500px;
			-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(215, 185, 135, 0.4);
			box-shadow: 4upx 4upx 20upx 4upx rgba(215, 185, 135, 0.4);margin: 50upx 0;} 
	.pay_case{border: 1px solid #ECECEC;border-radius: 12upx;padding: 0 30upx;}
	
	
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
	
	
	
		/* 遮罩层 */
	.uni-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}
	
	.tip_cancel {
		text-align: center;
	}
	
	.tip_cancel image {
		width: 70upx;
		height: 123upx;
	}
	
	.add-card-btn {
		font-size: 28upx;
		font-weight: 500;
		line-height: 100upx;
		height: 100upx;
	}
	
	.add-card-btn .add-title {
		line-height: 96upx;
		font-size: 28upx;
	}
	
	.uni-icon-plusempty {
		font-size: 68upx;
		line-height: 100upx;
		
	}
	.tip_text{font-size:22upx;color: #999;}
	.show{display: block;}
</style>
