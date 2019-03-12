<template>
	<view>
		<view class="article-content">
			<rich-text :nodes="htmlString"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				htmlString: ""
			}
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		onLoad() {
			this.getDetail();
		},
		methods: {
			getDetail() {
				try {
					this.$http.post(this.websiteUrl+'/api/api/getAbout',{},(res) => {
						if(res.data.code==1){
							this.htmlString = res.data.result.article.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
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
		}
	}
</script>

<style>
	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>
