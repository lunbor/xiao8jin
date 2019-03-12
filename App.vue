<script>
	export default {
		onLaunch: function () {
			//console.log('App Launch');
			//#ifdef APP-PLUS
			/* 5+环境锁定屏幕方向 */
			plus.screen.lockOrientation('portrait-primary'); //锁定
			/* 5+环境升级提示 */
			var server = this.websiteUrl+"/api/update/api"; //检查更新地址
			var req = { //升级检测数据
				"appid": plus.runtime.appid,
				"version": plus.runtime.version,
				"imei": plus.device.imei
			};
			uni.request({
				url: server,
				data: req,
				success: (res) => {
					console.log("success", res);
					if (res.statusCode == 200 && res.data.code == 1 && res.data.result.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.result.iOS : res.data.result.Android;
						uni.showModal({ //提醒用户更新
							title: '更新提示',
							content: res.data.result.content ? res.data.result.content : '是否选择更新',
							success: (res) => {
								if (res.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						})
					}
				}
			})
			//#endif
		},
		onShow: function () {
			//console.log('App Show')
		},
		onHide: function () {
			//console.log('App Hide')
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/uni.css";
	/*每个页面公共css */
</style>
