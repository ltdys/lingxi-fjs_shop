<template>
	<com-page class="myinfo">
		<com-header title="个人资料" is-back slot="header"></com-header>
		<van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png">
			<van-cell title="头像" is-link class="zl-cell">
				<img class="myinfo__avatar" :src="userInfo.icon | userImg" onerror="onerror=null;this.src='static/images/icon/user_defu.png'"/>
			</van-cell>
		</van-uploader>
		<van-field label="姓名" v-model="userInfo.realname" input-align="right" placeholder="请输入姓名"></van-field>
		<van-cell title="会员账号" :value="userInfo.userName"></van-cell>
		<van-cell title="手机号" :value="userInfo.mobile" is-link @click.native="$router.push('/my/update_phone')"></van-cell>
		<van-cell title="会员等级" :value="userInfo.userLevel | vipLevel"></van-cell> 
		<van-cell title="邀请码" :value="userInfo.userName"></van-cell>
		<van-field label="身份证号" v-model="userInfo.card" input-align="right" placeholder="请输入身份证号"></van-field>
		<van-cell title="银行账号" is-link to="/my/bank?id=1"></van-cell>
		<van-cell title="收货地址" is-link to="/my/address?id=1"></van-cell>
		<!-- <van-field label="支付宝账号" input-align="right"></van-field> -->
		<!-- <van-field label="微信账号" input-align="right"></van-field> -->
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="isBtnShow" @click="confireBtn">保存</van-button>
    </div>

		<div class="myinfo__load" v-show="isLoading">
		  <van-loading type="spinner"/>
		</div>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { Toast, Loading } from "vant";
import { updInfo } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
	mixins: [list_mixins],
	data () {
		return {
			id: '', //用户id
			oldCard: '', //旧的身份证号
			oldIcon: '', //旧的头像
			oldName: '', //旧的名称
			isBtnShow: true,
			cardError: true,
			cardErrorMessage: '请输入身份证号',
			isLoading: false
		}
	},
	created () {
		this.id = this.$store.getters.getUserId
		this.getUserInfo()
		this.oldCard = JSON.parse(this.userInfo).card
		this.oldIcon = JSON.parse(this.userInfo).icon
		this.oldName = JSON.parse(this.userInfo).realname
	},
	mounted () {

	},
	watch: {
		userInfo: {
			handler: function (val, old) {
				let self = this;
				if (val.icon != self.oldIcon || val.card != self.oldCard || val.realname != self.oldName) {
					self.isBtnShow = false;
				} else {
					self.isBtnShow = true;
				}
				// let card = val.card === null ? '' : val.card.toUpperCase()
				// if (val.card == '') {
				// 	self.cardError = true;
				// } else if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(card))) {
				// 	self.cardError = true;
				// } else {
				// 	self.cardError = false;
				// 	if (val.icon != self.oldIcon || val.card != self.oldCard || val.realname != self.oldName) {
				// 		self.isBtnShow = false;
				// 	} else {
				// 		self.isBtnShow = true;
				// 	}
				// }
			},
			deep: true
		}
	},
	methods: {
		onCopy () { //复制成功
			Toast({
				message: '复制成功',
				duration: 1500
			})
		},
		onError () { //复制失败
		
		},
		onRead (v) { //图片切换
			console.log(v)
			let self = this;
			self.userInfo.icon = v.content
			// self.isBtnShow = false
		},
		async confireBtn () { // 保存个人用户信息
			let self = this;
			self.isLoading = true
			let param = {
        // id: self.userId,
        // realname: self.userInfo.realname,
        icon: encodeURIComponent(self.userInfo.icon),
        // card: self.userInfo.card,
			}
			let params = {
        id: self.userId,
        realname: self.userInfo.realname,
        card: self.userInfo.card,
			}
			// self.$axios({
			// 	method: 'post',
			// 	url: '/UpdInfo' + paramConvert(params),
			// 	data: {
			// 		icon: self.userInfo.icon
			// 	},
			// 	headers: {
			// 		'Content-Type':'application/x-www-form-urlencoded'
			// 	}
			// })
			// .then((res)=>{
			// 	console.log(res)
			// })
			let queryParams = paramConvert(params)
			let resData = await updInfo(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        Toast.success({
					message: '修改个人资料成功',
					duration: 1500
				})
				self.isLoading = false
        // console.log('保存个人用户信息',resData)
			} else {
				Toast({
					message: resData.data.Msg,
					duration: 1500
				})
				self.isLoading = true
			}
		},
	}
}
</script>

<style lang="scss">
.myinfo{
  &__avatar{
    border-radius: 50%;
    height: 30px;
		width: 30px;
		vertical-align: middle;
  }
	.zl-cell{
		display: flex;
    align-items: center;
	}
	&__load {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
