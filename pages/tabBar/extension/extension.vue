<template>
    <view class="extension_case">
		<view class="extension_title">分享二维码</view>
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper"  :interval="interval" 
					:duration="duration" :previousMargin="previousMargin"  :circular="circular">
                        <swiper-item>
                            <view class="swiper-item share_banner">
								<img src="../../../static/share1.png" >
								<view class="code"><img  src="../../../static/code.png" class="code_img"></view>
							</view>
                        </swiper-item>
                        <swiper-item>
                            <view class="swiper-item share_banner">
								<img src="../../../static/share2.png">
								<view class="code2"><img  src="../../../static/code.png" class="code_img"></view>
							</view>
                        </swiper-item>
                        <swiper-item>
                            <view class="swiper-item share_banner">
								<img src="../../../static/share3.png">
								<view class="code3"><img  src="../../../static/code.png" class="code_img"></view>
							</view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
		<view class="share_btn">
			<button class="btn" @click="setMaskShow">立即分享</button>
		</view>
		<view class="mask" v-show="maskShow" >
			<view class="share_case">
				<view class="share_caseTitle">分享到</view>
				<view class="uni-flex uni-row share_icon">
					<view class="flex-item">
						<view><img src="../../../static/share_icon1.png"></view>
						<view class="text">微信</view>
					</view>
					<view class="flex-item">
						<view><img src="../../../static/share_icon2.png"></view>
						<view class="text">朋友圈</view>
					</view>
					<view class="flex-item">
						<view><img src="../../../static/share_icon3.png"></view>
						<view class="text">QQ好友</view>
					</view>
					<view class="flex-item">
						<view><img src="../../../static/share_icon4.png"></view>
						<view class="text">复制链接</view>
					</view>
				</view>
				<view class="share_caseNo"><a href="javascript:;" @click="setMaskShow">取消</a></view>
			</view>
		</view>
    </view>
</template>
<script>
	export default {
    data() {
        return {
            // autoplay: true,
            interval: 2000,
            duration: 1000,
			previousMargin:140+'upx',
			// nextMmargin:140+'upx',
			circular:true,
			maskShow: false,
        }
    },
	methods: {
		setMaskShow(){
		    this.maskShow = !this.maskShow;
		},
	}
}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #FFFFFF;
	}
	.extension_title{height: 88upx;line-height: 88upx;text-align: center;color: #FFFFFF;font-size: 32upx;
	margin-bottom: 60upx;font-weight: 600;}
	.extension_case{background:url(../../../static/extension_bg.png)no-repeat;background-size: 100% 100%;width: 100%;
	height: 870upx;}
	.share_banner{position: relative;}
	.share_banner img{width: 450upx;height: 800upx;}
	.swiper{height: 800upx!important;}
	.share_btn{padding: 80upx;}
	.share_btn .btn{width: 100%;height: 88upx;background-color: #ff8b03;
		background: linear-gradient(left, #ff8b03, #ffa842);
		border-radius: 500px;
		-webkit-box-shadow: 4upx 4upx 20upx 4upx rgba(255, 146, 17, 0.2);
		box-shadow: 4upx 4upx 20upx 4upx rgba(255, 146, 17, 0.2);color: #FFFFFF;font-size: 32upx;line-height: 88upx;
		border:0}
		.code_img{width:90upx!important;height: 90upx!important;}
		.code{position: absolute;bottom: 210upx;left: 32%;}
		.code2{position: absolute;bottom: 74upx;left: 31%;}
		.code3{position: absolute;bottom: 186upx;left: 32.5%;}
		.mask{width: 100%;height: 100%;background: rgba(0,0,0,0.4);position: fixed;left: 0;bottom:0;z-index: 2000;}
		.share_case{width: 96%;height: 360upx;background-color: #fff;position: absolute;bottom: 1%;left: 2%;border-radius: 12upx;padding: 20upx 0;}
		.share_caseTitle{font-size: 28upx;font-weight: 600;text-align:center;}
		.share_icon{padding:40upx 30upx;}
		.share_icon .flex-item img{width: 90upx;height: 90upx;}
		.share_icon .flex-item{flex: 1;text-align:center ;font-size: 22upx;color: #333;}
		.share_icon .flex-item .text{font-size: 22upx;}
		.share_caseNo{padding: 0 30upx;}
		.share_caseNo a{width: 100%;height: 74upx;border:1px solid #ddd;text-align: center;line-height: 72upx;background-color:#fff;font-size: 28upx;
		border-radius: 500px;display: inline-block;color: #333;text-decoration: none;}
</style>
