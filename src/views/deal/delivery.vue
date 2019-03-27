<template>
  <com-page>
    <com-header title="我要提货" is-back slot="header"></com-header>
    <div class="delivery-top">
      <div>{{this.deliveryList.title}}</div>
      <div>
        <span class="fa-stack-14x fa-color-333">当前数量</span>
        <span class="fa-stack-17x fa-color-222"> {{this.deliveryList.CCSL}} </span>
        <span class="fa-stack-14x fa-color-333">张</span>
      </div>
      <div class="tip-color">注意: 兑换功能不能反向操作</div>
    </div>
    <div class="delivery-middle">
      <div>本次提货数量</div>
      <van-field
        placeholder="您本次提货数量"
        clearable
        v-model="formData.deliveryNum"
      >
      </van-field>
      <div>您的钱包地址</div>
      <van-field
        placeholder="您的钱包地址"
        clearable
        v-model="formData.deliveryNum"
      >
      </van-field>
      <div>您的帐户姓名</div>
      <van-field
        placeholder="您的帐户姓名"
        clearable
        v-model="formData.deliveryNum"
      >
      </van-field>
    </div>
    <div class="delivery-bottom">
      <input type="checkbox" name="xieyi" value="">
      我同意提货协议
    </div>
    <div class="submit_buttons">
      <van-button type="primary" block @click="submit">提交审核</van-button>
    </div>
  </com-page>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
          deliveryNum: '',  //提货数量
          walletAddress: '',  //钱包地址
          name: ''  //帐户姓名
        }
      }
    },

    computed: {
      deliveryList: {
        get: function () {
          return this.$store.getters.getDeliveryList
        }
      }
    },

    methods: {
      submit () {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .delivery-top {
    padding: 15px;
    div:nth-child(1),div:nth-child(2) {
      padding-bottom: 15px;
    }
  }
  .delivery-middle {
    background: #fff;
    div {
      padding: 10px 15px;
    }
  }
  .delivery-bottom {
    padding: 30px 15px 0 15px;
  }
</style>
  
