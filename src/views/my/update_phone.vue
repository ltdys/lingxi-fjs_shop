<template>
	<com-page class="myinfo">
		<com-header title="更换手机号" is-back slot="header"></com-header>
		<van-cell title="当前手机号" :value="userInfo.mobile"></van-cell>
		<van-field label="新手机号" input-align="right" placeholder="请输入新手机号" v-model="newObj.newPhone" clearable error></van-field>
		<van-field label="登录密码" input-align="right" type="password" clearable placeholder="请输入登录密码" v-model="newObj.password" error></van-field>
    <div class="submit_buttons">
      <van-button type="primary" block @click="updatePhone">确认绑定</van-button>
    </div>
	</com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import { updatePhone } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  data(){
    return {
			newObj: {
				newPhone: '', //新手机号
				password: '', //密码
			}
			
    }
  },
  created () {
		this.getUserInfo()
  },
  watch: {
    
  },
  methods: {
    async updatePhone () { //修改手机号
      let self = this;
			// let param = {
			// 	tjrPhone: self.accountPhone
			// }
			// let queryParams = paramConvert(param)
			// let resData = await getUserByPhone(queryParams, param)
      // if (resData.status === 200 && resData.data.Success) {
      //   console.log("根据手机号获取用户信息",resData.data.Data)
      //   self.realname = resData.data.Data.realname
			// 	self.step++
			// } else {
			// 	Toast({
			// 		message: resData.data.Msg,
			// 		duration: 1500
			// 	})
			// }
		},
  },
}
</script>

<style lang="scss">
</style>
