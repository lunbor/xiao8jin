<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide"></view>
		<view :class="['uni-popup','uni-popup-'+type]" v-show="show">
			<view class="title uni-flex uni-row">
				<view class="text" style="width: 80upx;"></view>
				<view class="text" style="flex: 1;">{{title}}</view>
				<view class="text" style="width: 80upx;" @click="hide"><text class="uni-icon uni-icon-closeempty"></text></view>
			</view>
			<view class="by-content">
				{{msg}}
				<slot></slot>
			</view>
			
			<view class="by-button uni-flex uni-row" v-if="queren">
				<view class="text" v-if="quxiao" @click="hide"><button type='warn' class="mini-btn quxiao-btn">取消</button></view>
				<view class="text" v-if="queren" @click="hide"><button type='warn' class="mini-btn queren-btn">确定</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			queren: {
				type: Boolean,
				default: true
			},
			quxiao: {
				type: Boolean,
				default: false
			},
			show: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				//top - 顶部， middle - 居中, bottom - 底部
				default: 'middle',
			},
			msg: {
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: "提示"
			}
		},
		data() {
			let offsetTop = 0;
			//#ifdef H5
			offsetTop = 44;
			//#endif
			return {
				offsetTop: offsetTop
			}
		},
		methods: {
			hide: function() {
				this.$emit('hidePopup');
			}
		}
	}
</script>
<style>
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.uni-popup {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.uni-popup-middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 640upx;
		min-height: 380upx;
		border-radius: 30upx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		
	}
	.uni-popup-middle .title{ background-color: #f4f4f4; height: 110upx; border-bottom: 2upx solid #e1e1e1; width: 100%; text-align: center;
		color: #595d68;  line-height: 110upx; justify-content:center;
	}
	
	.uni-popup-middle .title .text{line-height: 110upx;  font-size: 32upx;}
	.uni-popup-middle .uni-icon-closeempty{line-height: 110upx;  font-size: 82upx;}
	.uni-popup-middle .by-content{ text-align: left; padding: 20upx; color: #0f0f0f;overflow:scroll; max-height: 500upx;min-height: 80upx;}
	.uni-popup-middle .by-button{ padding:25upx 0; justify-content: center;}
	.uni-popup-middle .mini-btn{ width: 248upx;}
	.uni-popup-middle .quxiao-btn{background:#fff; margin-right: 10upx; color: #576175; border-color: #e1e1e1;}
	.uni-popup-middle .queren-btn{background:#fe5950; margin-left: 10upx;}

	.uni-popup-top {
		top: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.uni-popup-bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 30upx 0upx;
		text-align: center;
	}
</style>
