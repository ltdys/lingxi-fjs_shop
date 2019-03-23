<template>
	<com-page>
		<com-header title="余额转账" is-back slot="header"></com-header>
     <template  v-if="step==1">
      <van-cell-group>
        <van-field label="收款人" input-align="right"  placeholder="账号/手机号"></van-field>
      </van-cell-group>
      <div class="submit_buttons">
        <van-button type="primary" block @click="doNext">下一步</van-button>
      </div>
    </template>
    <template v-else>
      <div class="transfer">
        <img class="transfer__avatar" src="static/images/user.png"/>
        <div>张明</div>
      </div>
      <van-cell-group>
        <van-field label="转账金额" input-align="right"  placeholder="请输入转账金额"></van-field>
        <van-cell>
          <span class="f666">您的当前余额 <span class="amount">{{1000|number}}</span> 元</span>
        </van-cell>
      </van-cell-group>
      <div class="submit_buttons">
        <van-button type="primary" block @click="doNext">确认转账</van-button>
      </div>
    </template>
	</com-page>
</template>

<script> 
export default {
  data(){
    return {
      step:1,
    }
  },
  methods: {
    doNext(){
      this.step++
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
</style>
