<template>
	<view>
		<view class="uni-card uni-card-red md15" v-bind:style="{ background: card.color}">
			<view class="uni-triplex-row pd15">
				<view class="uni-triplex-left lf7">{{card.bank_name}}<text>{{card.credit_code}}</text></view>
				<view class="uni-triplex-right rg3"><button class="mini-btn" type="primary" size="mini">信用卡</button></view>
			</view>
			<view class="uni-triplex-row linebg"></view>
			<view class="uni-flex uni-row">
				<view class="flex-item ls3">
					<view class="ls3-row">￥<text>{{card.line_credit}}</text></view>
					<view>额度</view>
				</view>
				<view class="flex-item ls3">
					<view class="ls3-row"><text>{{card.bill_time}}</text>日</view>
					<view>账单日</view>
				</view>
				<view class="flex-item ls3">
					<view class="ls3-row"><text>{{card.repay_time}}</text>日</view>
					<view>还款日</view>
				</view>
			</view>
		</view>

		<view>
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="content pd15" v-if="current === 1">
			<view class="repay-list">
				<view class="uni-form-item uni-column">
					<view class="title">还款金额</view>
					<input class="uni-input" v-model="repay_money" type="digit" style="font-weight: 600;" placeholder-style="font-weight: normal; color:#d0d0d7;" placeholder="请输入要还款的金额,不低于1000元" />
				</view>
			</view>
			
			<view class="repay-list">
				<view class="uni-form-item uni-column">
					<view class="title">费率：{{card.dz_rate}}% + 代付费:{{card.dz_dfee}}元/笔</view>
				</view>
			</view>
			
			<view class="repay-list">
				<view class="uni-flex uni-row">
					<view class="text" style="flex: 1;">
						<view class="uni-form-item uni-column">
							<view class="title">还款开始日期</view>
							<picker mode="date" :value="start_time" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{start_time}}</view>
							</picker>
						</view>
					</view>
					<view class="text" style="flex: 1;">
						<view class="uni-form-item uni-column">
							<view class="title">还款结束日期</view>
							<picker mode="date" :value="end_time" :start="startDate" :end="endDate" @change="bindDateChange_end">
								<view class="uni-input">{{end_time}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content pd15" v-if="current === 0">
			<view class="repay-list">
				<view class="uni-form-item uni-column">
					<view class="title">还款金额</view>
					<input class="uni-input" v-model="repay_money" type="digit" style="font-weight: 600;" placeholder-style="font-weight: normal; color:#d0d0d7;" placeholder="请输入要还款的金额,不低于1000元" />
				</view>
			</view>

			<view class="repay-list">
				<view class="uni-form-item uni-column">
					<view class="title">费率：{{card.rate}}% + 代付费:{{card.dfee}}元/笔</view>
				</view>
			</view>

			<view class="repay-list">
				<view class="uni-flex uni-row">
					<view class="text" style="flex: 1;">
						<view class="uni-form-item uni-column">
							<view class="title">还款开始日期</view>
							<picker mode="date" :value="start_time" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{start_time}}</view>
							</picker>
						</view>
					</view>
					<view class="text" style="flex: 1;">
						<view class="uni-form-item uni-column">
							<view class="title">还款结束日期</view>
							<picker mode="date" :value="end_time" :start="startDate" :end="endDate" @change="bindDateChange_end">
								<view class="uni-input">{{end_time}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			
			<view class="repay-list">
				<view class="uni-flex uni-row">
					<view class="text" style="flex: 1; padding: 8upx 0upx 8upx 24upx;">
						<view class="title">请选择每天还款次数</view>
						<view class="tip-text-h">推荐每天1~2次</view>
					</view>
					<view class="text" style="flex: 1;padding: 8upx 0upx">
						<text class="repay_num" :class="repay_num==1?'active':''" @click="onClickNum(1)">1</text>
						<text class="repay_num" :class="repay_num==2?'active':''" @click="onClickNum(2)">2</text>
						<text class="repay_num" :class="repay_num==3?'active':''" @click="onClickNum(3)">3</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content pd15" v-if="current === 2">
			<view class="repay-list">
				<view class="uni-input-row">
					<label>周期消费笔数</label>
					<uni-number-box :min="1" :max="50" :value="pay_num" v-on:change="onNumberChange"></uni-number-box>
				</view>
			</view>
			
			<view class="repay-list">
				<view class="uni-input-row">
					<label>周期数<view class="uni-icon uni-icon-help-filled help-filled" @click="getTipZzj()"></view></label>
					<uni-number-box :min="1" :max="10" :value="period_num" v-on:change="onNumberChange2"></uni-number-box>
				</view>
			</view>
			
			<view class="repay-list">
				<view class="uni-input-row">
					<label>每笔最大消费金额</label>
					<uni-number-box :min="200" :max="1000" :step="100" :value="pay_money" v-on:change="onNumberChange3"></uni-number-box>
				</view>
			</view>
	
			<view class="repay-list">
				<view class="uni-form-item uni-column">
					<view class="title">费率：{{card.jyk_rate}}% + 代付费:{{card.jyk_dfee}}元/笔</view>
				</view>
			</view>
			
			<view class="repay-list">
				<view class="uni-flex uni-row">
					<view class="text" style="flex: 1;">
						<view class="uni-form-item uni-column">
							<view class="title">开始日期</view>
							<picker mode="date" :value="start_time" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{start_time}}</view>
							</picker>
						</view>
					</view>
					<view class="text" style="flex: 1;">
						<view class="uni-form-item uni-column">
							<view class="title">结束日期</view>
							<picker mode="date" :value="end_time" :start="startDate" :end="endDate" @change="bindDateChange_end">
								<view class="uni-input">{{end_time}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			
			<view class="repay-list">
				<view class="uni-input-row">
					<label>是否日期中自选</label>
					<switch @change="switch1Change"/>
				</view>
				<view class="pd10" v-show="pay_date_show">
					<text class="pay_date" v-for="(item,index) in pay_date" :key="index" :class="item.checked?'active':''" @click="onClickPayDay(index)">{{item.day}}</text>
				</view>
			</view>	
			
			
		</view>
		
		
		<view class="uni-common-mt uni-padding-wrap uni-common-mb">
			<button type="warn" class="by-button-submit" :loading="loading" @click="getRepayStep">下一步</button>
		</view>
		
		<!-- 弹出层 -->
		<view class="uni-banner" v-if="bannerShow">
			<view>
				<view class="uni-card by-card">
					<view class="uni-card-content pd15">
						<view class="tip_btn"><text>*</text> 周期消费笔数:一个周期内消费的笔数;</view>
						<view class="tip_btn"><text>*</text> 周期数:一个周期执行完消费笔数后进行还款，继续循环执行下次周期;</view>
						<view class="tip_btn"><text>*</text> 例如周期消费笔数10笔，周期数3次; 计划将消费10笔后进行一次还款，还款后继续消费10笔，以此类推；形成10（消费）+1（还款）+10（消费）+1（还款）+10（消费）+1（还款）模式</view>			
					</view>
				</view>
			</view>
			<view class="tip_cancel" @tap="closeBanner">
				<image src="../../../static/wk_tip_cancel.png"></image>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
	</view>
</template>

<script>
	import uniSegmentedControl from '../../../components/uni-segmented-control.vue';
	import uniNumberBox from '../../../components/uni-number-box.vue'
	export default {
		components: {
			uniSegmentedControl,uniNumberBox
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				items: [
					'本金还款',
					'空卡垫资',
					'精养卡',
				],
				current: 0,
				activeColor: '#fe5950',
				styleType: 'text',
				credit_id: '',
				card: [],
				loading: false,
				start_time:currentDate,
				end_time: currentDate,
				repay_num:1,
				repay_money:'',
				pay_num:10,
				period_num:1,
				pay_money:500,
				bannerShow:false,
				pay_date_show:false,
				pay_date:[],
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(e) {
			if (e.credit_id) {
				this.credit_id = e.credit_id;
			} else {
				uni.switchTab({
					url: '/pages/tabBar/card/card'
				})
			}
		},
		onShow() {
			this.getCreditCardInfo();
		},
		onBackPress() {},
		methods: {
			onNumberChange(value) {
				this.pay_num = value;
			},
			onNumberChange2(value) {
				this.period_num = value;
			},
			onNumberChange3(value) {
				this.pay_money = value;
			},
			closeBanner: function() {
				this.bannerShow = false;
			},
			getTipZzj(){
				this.bannerShow = true;
			},
			getRepayStep: function () {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const repay_money = this.repay_money;
				const current = this.current;
				const credit_id = this.credit_id;
				const repay_num = this.repay_num;
				const start_time = this.start_time;
				const end_time = this.end_time;
				
				const pay_money = this.pay_money;
				const pay_num = this.pay_num;
				const period_num = this.period_num;
				const pay_date = this.pay_date;
				if(current==2){
					if(pay_money==''){
						uni.showModal({
							content: '请输入每笔最大消费金额',
							showCancel: false
						});
						return;
					}
					//console.log(start_time.replace(/-/g,""));
					if(start_time.replace(/-/g,"") > end_time.replace(/-/g,"")){
						uni.showModal({
							content: '结束日期不能大于开始日期',
							showCancel: false
						});
						return;
					}
					
				}else{
					if(repay_money==''){
						uni.showModal({
							content: '请输入还款金额',
							showCancel: false
						});
						return;
					}
					//console.log(start_time.replace(/-/g,""));
					if(start_time.replace(/-/g,"") > end_time.replace(/-/g,"")){
						uni.showModal({
							content: '还款结束日期不能大于还款开始日期',
							showCancel: false
						});
						return;
					}
				}
				const that = this;
				try {
					if(this.loading){
						return;
					}
					this.loading = true;
					
					this.$http.post(this.websiteUrl + '/api/repay/getRepayStep', {
						openid,
						sessionKey,
						repay_money,
						current,
						credit_id,
						repay_num,
						start_time,
						end_time,
						pay_money,
						period_num,
						pay_num,
						pay_date,
					}, (res) => {
							if(res.data.code==1){
								that.loading = false;
								uni.navigateTo({
									url: '/pages/card/credit/repayStep?credit_id='+credit_id+'&temp_id='+res.data.result
								})
							}else{
								uni.showModal({
									content:res.data.msg,
									showCancel:false,
									success:function() {
										that.loading = false;
									}
								})
							}						
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false,
						success:function() {
							that.loading = false;
						}
					});
				}
			},
			switch1Change: function (e) {
				this.getDateAll(this.start_time,this.end_time);
				this.pay_date_show = e.target.value;
			},
			onClickPayDay(index){
				var items = this.pay_date;
					if(items[index].checked){
						items[index].checked = false;
					}else{
						items[index].checked = true;
					}
				this.pay_date = items;
			},
			onClickNum(num){
				this.repay_num = num;
			},
			bindDateChange: function(e) {
				this.start_time = e.target.value;
				this.getDateAll(this.start_time,this.end_time);
			},
			bindDateChange_end: function(e) {
				this.end_time = e.target.value;
				this.getDateAll(this.start_time,this.end_time);
			},
			getDateAll(begin, end) {  
			   let ab = begin.split("-");  
			   let ae = end.split("-");  
			   let db = new Date();  
			   db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);  
			   let de = new Date();  
			   de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);  
			   let unixDb = db.getTime();  
			   let unixDe = de.getTime();  
			   var items = [];
			   var date = '';
			   var i = 0;
			   for (let k = unixDb; k <= unixDe;) {  
				   date = new Date(parseInt(k));
					items[i]={
						value:this.getNewDate(date),
						checked:true,
						day:date.getDate(),
					};
					i = i + 1;
				   k = k + 24 * 60 * 60 * 1000;  
			   } 
			   this.pay_date = items;
		   },
		   getNewDate(date) {
		   	let year = date.getFullYear();
		   	let month = date.getMonth() + 1;
		   	let day = date.getDate();
		   	month = month > 9 ? month : '0' + month;
		   	day = day > 9 ? day : '0' + day;
		   	//console.log(year, month, day)
		   	return `${year}-${month}-${day}`;
		   },
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 1;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				//console.log(year, month, day)
				return `${year}-${month}-${day}`;
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			getCreditCardInfo() {
				const openid = this.$store.state.openid;
				const sessionKey = this.$store.state.sessionKey;
				const credit_id = this.credit_id;
				try {
					this.$http.post(this.websiteUrl + '/api/card/getCreditCardInfo', {
						openid,
						sessionKey,
						credit_id
					}, (res) => {
						if (res.data.code == 1) {
							this.card = res.data.result;
						}else{
							uni.showModal({
								content:res.data.msg,
								showCancel:false
							})
						}
					});
				} catch (e) {
					uni.showModal({
						content: '网络异常,请稍后重试...',
						showCancel: false
					})
				}
			},
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f7f8fa;
	}

	.content {
		background-color: #FFFFFF;
	}

	.uni-card-red {
		background: linear-gradient(to right, #ff7575, #fe5950);
		border-radius: 15upx;
		color: #fff;
		min-height: 260upx;
		margin-top: 30upx;
		overflow: hidden;
		position: relative;
	}

	.uni-card .lf7 {
		width: 74%;
		font-weight: 500;
		font-size: 32upx;
		text-align: left;
		-webkit-flex-direction: inherit;
		-ms-flex-direction: inherit;
		flex-direction: inherit;
		line-height: 60upx;
	}

	.uni-card .lf7 text {
		font-size: 28upx;
		font-weight: normal;
		line-height: 60upx;
		margin-left: 10upx;
	}

	.uni-card .rg3 {
		width: 26%;
	}



	.uni-card .lf {
		font-weight: 500;
		font-size: 32upx;
		text-align: left;
		line-height: 60upx;
	}

	.uni-card .lf text {
		font-size: 28upx;
		line-height: 40upx;
		display: block;
	}

	.uni-card .rg {
		margin-left: 20upx;
	}

	.uni-card .code-fj {
		line-height: 90upx;
		height: 90upx;
		font-size: 38upx;
		width: 100%;
		text-align: right;
		justify-content: flex-end;
	}

	.uni-card .code-fj .text {
		margin-right: 50upx;
		text-align: right;
		line-height: 105upx;
		font-size: 38upx;
	}

	.uni-card .code-fj .text.lhg50 {
		line-height: 90upx;
	}

	.mini-btn {
		line-height: 55upx;
		width: 160upx;
		height: 55upx;
		background-color: #fe5950 !important;
		background: transparent !important;

	}

	.mini-btn:after {
		border: 5upx solid #FFFFFF;
	}

	.linebg {
		background: #EEEEEE;
		height: 2upx;
		line-height: 2upx;
		padding: 0upx;
		width: 90%;
		margin: 0 auto;
		opacity: 0.5;
	}

	.pd15 {
		padding: 28upx 30upx;
	}
	
	.pd10 {
		padding: 0upx 30upx;
	}

	.ls3 {
		width: 33.33%;
		height: 140upx;
		text-align: center;
		margin-top: 15upx;
	}

	.md15 {
		margin: 30upx;
	}

	.repay-list {
		border-bottom: 2upx solid #ecedef;
		padding: 10upx 0upx;
		color: #576175;
		font-weight: 500;
	}

	.text_center {
		text-align: center;
	}
	.red-text{color:#fd5950;}
	
	.by-button-submit{
		background-color:#fd5950;
		background: linear-gradient(left, #ff7575, #fd5950);
	}
	.tip-text-h{ font-size: 26upx; color: #d0d0d7; line-height: 50upx;}
	.repay_num{ display: inline-block; margin-right: 24upx; width: 80upx; height: 80upx;line-height: 80upx; border-radius: 50%; border: 2upx solid #e3e4e6; text-align: center; color: #576175; font-size: 32upx; font-weight: 500;}
	.repay_num.active{background-color: #fe5950;color: #FFFFFF;border: 2upx solid #fe5950;}
	
	.pay_date{ margin-bottom: 14upx; display: inline-block; margin-right: 14upx; width: 60upx; height: 60upx;line-height: 60upx; border-radius: 50%; border: 2upx solid #e3e4e6; text-align: center; color: #576175; font-size: 32upx; font-weight: 500;}
	.pay_date.active{background-color: #fe5950;color: #FFFFFF;border: 2upx solid #fe5950;}
	
	
	.help-filled{color: #fd5950; font-size: 32upx;}
	
	/* 遮罩层 */
	.uni-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}
	
	.tip_cancel {
		text-align: center;
	}
	
	.tip_cancel image {
		width: 70upx;
		height: 123upx;
	}
	
	/* 弹出层形式的广告 */
	.uni-banner {
		width: 80%;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 99;
		transform: translate(-50%, -50%);
	}
	.tip_btn text{color: #fd5950;}
	.queren-btn{background:#fe5950; width: 200upx; height: 80upx; line-height: 80upx; font-size: 28upx; margin: 30upx auto; margin-bottom: 0upx;}
</style>
