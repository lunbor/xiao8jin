<template>
	<view>
		<!-- <view class="agent_syph_bg" style="background-image: url(../../../static/agent_syph_bg.png); background-repeat: no-repeat; background-size: 100% 100%;">
			<view class="syph-top">
				<view class="uni-flex uni-row">
					<view class="by-flex text-c" v-for="(item,index) in list" :key="index" v-if="index<3" :class="'top-'+(index+1)">
							<view class="head-pic">
								<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'"></image>
							</view>
							<view class="ph-name">{{item.nickname}}</view>
							<view class="ph-sy">￥{{item.z_money}}</view>
					</view>
				</view>
				
			</view>
		</view> -->

		
		<view class="syph-list-bg" v-for="(item,index) in list" :key="index" v-if="index>2" style="background-image: url(../../../static/agent_syph_list_bg.png); background-repeat: no-repeat; background-size: 100% 100%;">
			<view class="syph-list" style="padding: 0 30upx;">
				<view class="uni-flex uni-row">
					<view class="text-c xuhao">
						{{index+1}}
					</view>
					<view class="text-r touxiang">
						<view class="head-pic">
							<image :src="item.head_img?item.head_img:'../../../static/head-no-pic.png'"></image>
						</view>
					</view>
					
					<view class="by-flex text-l nickname">
						<view class="fzhsy">{{item.nickname}}</view>
						<view class="fzhsy-jh">{{item.group_name}}</view>
					</view>	
						
					
					<view class="text-r money">
						<view class="fzhsy">￥<text>{{item.z_money}}</text></view>
						<view class="fzhsy-jdh">累计收益</view>
					</view>
				</view>
			</view>
		</view>
		
		

		
		<view class="syph-list-b-bg" style="background-image: url(../../../static/agent_syph_b_bg.png); background-repeat: no-repeat; background-size: 100% 100%;">
			<view class="syph-list-b">
				
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list:[],
			}
		},
		onLoad() {
			this.getAgentSyph();
		},
		onShow() {
		},
		methods: {
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
				
			}
		},
		components: {
			
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f76045;
	}
	
	.agent_user_bg{
		height: 569upx;
		width: 100%;
		color: #FFFFFF;
		line-height: 569upx;
	}
	.syph-top{height: 359upx; margin-top: 0upx; padding-top: 210upx; padding-left: 20upx; padding-right: 20upx;}
	
	.syph-list-bg{height: 130upx;
		width: 100%;
		color: #353535;
		line-height: 130upx;}
	.syph-list{height: 130upx;}
	
	.syph-list-b-bg{height: 45upx;
		width: 100%;
		color: #FFFFFF;
		line-height: 45upx;}
	.syph-list-b{height: 45upx;}
	
	
	.by-flex{
		flex: 1;
	}
	
	.text-r{
		text-align: right;
	}
	
	.text-l{
		text-align: left;
	}
	
	.text-c{
		text-align:center;
	}
	
	.top-1{padding-top: 50upx; text-align: center;}
	.top-1 .head-pic{ margin: 0 auto; border-radius:50%; height: 125upx; width: 125upx; overflow: hidden;margin-top: 20upx;}
	.top-1 .head-pic image{ width: 125upx; height: 125upx;}
	.top-1 .ph-name{ font-size: 24upx; line-height: 70upx; color: #333333;}
	.top-1 .ph-sy{font-size: 32upx; line-height: 50upx; color: #353535;}
	
	
	.top-2{padding-top: 28upx; text-align: center;}
	.top-2 .head-pic{ margin: 0 auto; border-radius:50%; height: 145upx; width: 145upx; overflow: hidden;margin-top: 20upx;}
	.top-2 .head-pic image{ width: 145upx; height: 145upx;}
	.top-2 .ph-name{ font-size: 24upx; line-height: 70upx; color: #646464;}
	.top-2 .ph-sy{font-size: 32upx; line-height: 50upx; color: #fe0e00;}
	
	
	.top-3{padding-top: 50upx; text-align: center;}
	.top-3 .head-pic{ margin: 0 auto; border-radius:50%; height: 125upx; width: 125upx; overflow: hidden;margin-top: 20upx;}
	.top-3 .head-pic image{ width: 125upx; height: 125upx;}
	.top-3 .ph-name{ font-size: 24upx; line-height: 70upx; color: #333333;}
	.top-3 .ph-sy{font-size: 32upx; line-height: 50upx; color: #353535;}
	
	

	.syph-list .head-pic{ margin: 0 auto; border-radius:50%; height: 90upx; width: 90upx; overflow: hidden;margin-top: 20upx;}
	.syph-list .head-pic image{ width: 90upx; height: 90upx;}
	
	.syph-list .xuhao{ line-height: 140upx; width: 80upx; font-size: 40upx; color: #939393;}
	.syph-list .touxiang{ width: 90upx;  margin-right: 20upx;}
	
	.syph-list .nickname{margin-top: 20upx; color: #5b5b5b;}
	
	.syph-list .money{ margin-right: 20upx;margin-top: 20upx; color: #000000;}
	
	.fzhsy-jh{color: #979797; font-size: 24upx;}
	.fzhsy-jdh{color: #979797; font-size: 24upx;}
</style>