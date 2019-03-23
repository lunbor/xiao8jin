<template>
    <view class="extension_case">
        <view class="uni-padding-wrap">
            <view class="page-section swiper" style="padding-top: 80upx;">
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
			<button class="btn">立即分享</button>
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
        }
    },
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
	uni-swiper{height: 800upx;}
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
</style>
