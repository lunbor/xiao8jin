<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
    export default {
		data() {
			return {
				url:""
			}
		},
		onLoad(e){
			if(e.url){
				this.url = e.url;
				uni.setNavigationBarTitle({
					title: e.title
				});
			}
		},
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '/pages/tabBar/index/index'
			})
		},
	}
</script>

<style>

</style>
