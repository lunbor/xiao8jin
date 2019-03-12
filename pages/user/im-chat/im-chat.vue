<template>
	<view class="uni-column">
		<view class="content" id="content" :style="{height:style.contentViewHeight+'px'}">
			<scroll-view id="scrollview" scroll-y="true" :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true"
			    :scroll-top="scrollTop">
				<message-show v-for="(message,index) in messages" :key="index" :message="message" :id="index"></message-show>
				<view id="bottom"></view>
			</scroll-view>
		</view>
		<view class="foot">
			<chat-input @send-message="getInputMessage" @focus="inputGetFocus"></chat-input>
		</view>
	</view>
</template>

<script>
	import chatInput from '../../../components/im-chat/chatinput.vue';
	import messageShow from '../../../components/im-chat/messageshow.vue';

	export default {
		data() {
			return {
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
				},
				scrollTop: 0,
				messages: [{
					user: 'home',
					type: 'head', //input,content 
					content: '你好!'
				}]
			}
		},
		components: {
			chatInput,
			messageShow
		},
		onLoad: function () {
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
		},
		methods: {
			getInputMessage: function (message) { //获取子组件的输入数据
				// console.log(message);
				this.addMessage('customer', message.content, false);
				this.toRobot(message.content);
			},
			addMessage: function (user, content, hasSub, subcontent) {
				var that = this;
				that.messages.push({
					user: user,
					content: content,
					hasSub: hasSub,
					subcontent: subcontent
				});
			},
			scrollToBottom: function () {
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();

				query.exec(function (res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function (rect) {
						// console.info(rect.height);
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});

					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				});
			},
			toRobot: function (info) {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				try {
					this.$http.post(this.websiteUrl+'/api/chatapi/api',{openid,sessionKey,info},(res) => {
						if(res.data.code==1){
							this.addMessage('home', res.data.result, false);
							this.scrollToBottom();	
						}else{
							uni.showModal({
								content:res.data.msg,
								showCancel:false
							})
						}
					});
				} catch (e) {
					this.loadingType = 0;
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
	.uni-column {
		display: flex;
		flex-direction: column;
	}

	.content {

		display: flex;
		flex: 1;
		margin-bottom: 100upx;
	}

	.foot {
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: 0upx;
		overflow: hidden;
	}
</style>
