<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide"></view>
		<view class="uni-popup uni-popup-bottom" v-show="show">
			<view class="title">
				{{title}}
			</view>
			<view class="by-content">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: "请选择"
			},
			type: {
				type: String,
				//top - 顶部， middle - 居中, bottom - 底部
				default: 'middle',
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

	.uni-popup-bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 0upx 0upx 0upx 0upx;
		text-align: left;
	}
	
	.uni-popup-bottom .title{ line-height: 100upx; height: 100upx; padding-left: 30upx; font-size: 32upx; font-weight: 500;}

	
</style>
