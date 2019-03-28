<template>
	<com-page>
		<com-header title="余额转账" is-back slot="header"></com-header>
     <template  v-if="step==1">
      <van-cell-group>
        <van-field label="收款人" input-align="right" placeholder="账号/手机号" v-model="accountPhone"></van-field>
      </van-cell-group>
      <div class="submit_buttons">
        <van-button type="primary" block :disabled="rechargeShow" @click="getUserByPhone">下一步</van-button>
      </div>
    </template>
    <template v-else>
      <div class="transfer">
        <img class="transfer__avatar" :src="userInfo.icon | userImg" onerror="onerror=null;this.src='static/images/icon/user_defu.png'"/>
        <div>{{ realname }}</div>
      </div>
      <van-cell-group>
        <van-field label="转账金额" input-align="right" placeholder="请输入转账金额" v-model="transferNum"></van-field>
        <van-cell>
          <span class="f666">您的当前余额 <span class="amount">{{ userInfo.price | number }}</span> 元</span>
        </van-cell>
      </van-cell-group>
      <div class="submit_buttons">
        <van-button type="primary" block :disabled="autoTransfer" @click="balanceTransfer">确认转账</van-button>
      </div>
    </template>
	</com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import { getUserByPhone, balanceTransfer } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  data(){
    return {
      step:1,
      accountPhone: null, //收款人账号或者手机号
      rechargeShow: true, //下一步显示状态
      realname: '', //收款人姓名
      transferNum: null, //转账金额
      autoTransfer: true, //确认转账显示状态
    }
  },
  created () {
    this.getUserInfo()
  },
  watch: {
    accountPhone:{
      handler: function (val, old) {
        if (val == null || val == '') {
					this.rechargeShow = true
				} else {
					this.rechargeShow = false
				}
      },
      deep: true
    },
    transferNum:{
      handler: function (val, old) {
        if (val == null || val == '') {
					this.autoTransfer = true
				} else {
					this.autoTransfer = false
				}
      },
      deep: true
    }
  },
  methods: {
    async getUserByPhone () { //根据手机号获取用户信息
      let self = this;
			let param = {
				tjrPhone: self.accountPhone
			}
			let queryParams = paramConvert(param)
			let resData = await getUserByPhone(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        console.log("根据手机号获取用户信息",resData.data.Data)
        self.realname = resData.data.Data.realname
				self.step++
			} else {
				Toast({
					message: resData.data.Msg,
					duration: 1500
				})
			}
		},
    async balanceTransfer(){
      let self = this;
			let param = {
        id: self.userId,
        skusername: self.accountPhone,
        skrname: self.realname,
        price: Number(self.transferNum)
      }
			let queryParams = paramConvert(param)
			let resData = await balanceTransfer(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        console.log("转账成功",resData.data.Data)
        Toast.success({
					message: '转账成功',
					duration: 1500
        });
        self.$router.push('/my')
			} else {
				Toast({
					message: resData.data.Msg,
					duration: 1500
				})
			}
    }
  },
}
</script>

<style lang="scss">
.transfer{
  text-align: center; 
  padding: 20px;
  &__avatar{
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}
.f666{
  font-size: 12px;
}
</style>
