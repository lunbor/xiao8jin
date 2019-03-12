<template>
	<view>
		<view class="news-info-bg">
			<view class="news-info-title">{{article.message}}</view>
			<view class="news-info-time">{{article.send_time}}</view>
		</view>
		<view class="article-content">
			<rich-text :nodes="htmlString"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:[],
				htmlString: "",
				m_id:''
			}
		},
		onShareAppMessage() {
			return {
				title: this.webshareTitle,
				path: '/pages/tabBar/index/index'
			}
		},
		onLoad(e) {
			if (e.m_id) {
				this.m_id = e.m_id;
			} else {
				uni.switchTab({
					url: '/pages/tabBar/user/user'
				})
			}
		},
		onShow() {
			const openid = this.$store.state.openid;
			if(openid == null){
				uni.navigateTo({
					url: '/pages/user/login/login'
				})
				return false;
			}
			this.getMessageInfo();
		},
		methods: {
			getMessageInfo() {
				try {
					const openid = this.$store.state.openid;
					const sessionKey = this.$store.state.sessionKey;
					const m_id = this.m_id;
					if(openid == null){
						return;
					}
					this.$http.post(this.websiteUrl+'/api/message/getMessageInfo',{openid,sessionKey,m_id},(res) => {
						if(res.data.code==1){
							this.article = res.data.result.article;
							this.htmlString = res.data.result.article.data.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
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
		padding: 30upx 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
		font-size: 28upx;
		color: #333333;
	}
	
	.news-info-bg{background-color: #f49e9e; height: 120upx; color: #FFFFFF; padding: 60upx 0upx 20upx 40upx;}
	.news-info-title{ font-size: 32upx; font-weight: 500;}
	.news-info-time{ font-size: 24upx;}
</style>
