<template>
	<view class="segmented-control">
		<view v-for="(item, index) in values" class="segmented-control-item" :class="styleType" :key="index"  @click="onClick(index)">
			<text :style="index === currentIndex ? activeStyle : itemStyle">{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'segmented-control',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return [];
				}
			},
			activeColor: {
				type: String,
				default: '#007aff'
			},
			styleType: {
				type: String,
				default: 'button'
			}
		},
		data() {
			return {
				currentIndex: this.current
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val;
				}
			}
		},
		computed: {
			wrapStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `border:0;`;
						break;
					default:
						styleString = `border-color: ${this.activeColor}`;
						break;
				}
				return styleString;
			},
			itemStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `color:#000;border-left:0;`;
						break;
					default:
						styleString = `color:#fff;background:${this.activeColor};`;
						break;
				}
				return styleString;
			},
			activeStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `color:#fff;background:${this.activeColor};`;
						break;
					default:
						styleString = `color:#fff;background:${this.activeColor};`;
						break;
				}
				return styleString;
			}
		},
		methods: {
			onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index;
					this.$emit('clickItem', index);
				}
			}
		},
	}
</script>


<style>
	.segmented-control {
		/* display: flex; */
		/* flex-direction: row; */
		/* justify-content: center; */
		width: 100%;
		font-size: 28upx;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
		/* border-bottom:2upx solid #EEEEEE; */
		padding: 16upx 30upx 0;
		/* font-weight: 600; */
	}

	.segmented-control.button {
		border: 2upx solid;
	}

	.segmented-control.text {
		border: 0;
		border-radius: 0upx;
	}


	.segmented-control-item {
		/* flex: 1; */
		text-align: center;
		/* line-height: 120upx; */
		box-sizing: border-box;
		/* font-size: 32upx; */
		/* font-weight: 600; */
		width:160upx ;
		float: left;
	}
	.segmented-control-item text{padding-bottom: 10upx;border-radius: 500px;display: inline-block;width: 160upx;
	/* font-weight: 600; */font-size: 26upx;padding:6upx;} 

	.segmented-control-item.button {
		border-left: 1upx solid;
	}

	.segmented-control-item.text {
		border-left: 0;
	}

	.segmented-control-item:first-child {
		border-left-width: 0;
	}
</style>
