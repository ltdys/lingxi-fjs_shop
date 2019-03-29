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
        type="number"
        placeholder="您本次提货数量"
        clearable
        v-model="formData.num"
      >
      </van-field>
      <div>您的钱包地址</div>
      <van-field
        placeholder="您的钱包地址"
        clearable
        v-model="formData.address"
      >
      </van-field>
      <div>您的帐户姓名</div>
      <van-field
        placeholder="您的帐户姓名"
        clearable
        v-model="formData.accountName"
      >
      </van-field>
    </div>
    <div class="delivery-bottom">
      <input type="checkbox" accountName="xieyi" value="" v-model="isCheck">
      我同意提货协议
    </div>
    <div class="submit_buttons">
      <van-button type="primary" block @click="submit" :disabled="!isCheck">提交审核</van-button>
    </div>
  </com-page>
</template>

<script>
  import { Toast } from "vant"
  import { pickGoods } from "@/api/index"
  import { paramConvert } from "@/utils/stringUtil.js"
  export default {
    data () {
      return {
        formData: {
          id: '',  //用户id
          num: '',  //提货数量
          address: '',  //钱包地址
          accountName: '',  //帐户姓名
          shopId: ''  //钱包地址
        },
        isCheck: false
      }
    },

    created () {
      this.formData.id = this.userId || ''
      this.formData.shopId = this.deliveryList.id || ''
    },

    computed: {
      userId: {
        get: function () {
          return this.$store.getters.getUserId
        }
      },
      deliveryList: {
        get: function () {
          return this.$store.getters.getDeliveryList
        }
      }
    },

    methods: {
      submit () {
        if (!this.isCheck) { return } 
        if (this.formData.num === '') {
          Toast({
            message: Toast('提货数量不能为空'),
            duration: 1500
          })
          return
        }
        if (this.formData.address === '') {
          Toast({
            message: Toast('钱包地址不能为空'),
            duration: 1500
          })
          return
        }
        if (this.formData.accountName === '') {
          Toast({
            message: Toast('帐户姓名不能为空'),
            duration: 1500
          })
          return
        }
        this.pickGoods()
      },
      async pickGoods () {
        let queryParams = paramConvert(this.formData)
        let resData = await pickGoods(queryParams, this.formData)
        if (resData.status === 200 && resData.data.Success) {
          Toast({
            message: Toast('提交成功'),
            duration: 1500
          })
          this.$router.push("/deal")
        } else {
          Toast(resData.data.Msg)
        }
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
  .delivery-btn-checked {
    background-color: #ec9300;
    border: 0.02rem solid #ec9300
  }
  .delivery-not-checked {
    background-color: #ccc;
    border: 0.02rem solid #ccc;
  }
</style>
  
