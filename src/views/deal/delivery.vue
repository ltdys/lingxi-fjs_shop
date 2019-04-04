<template>
  <com-page>
    <com-header title="我要提货" is-back slot="header"></com-header>
    <div class="delivery-top">
      <div class="delivery-left">
        <div>{{this.deliveryList.title}}</div>
        <div>
          <span class="fa-stack-14x fa-color-333">套餐数量</span>
          <span class="fa-stack-17x fa-color-222"> {{this.deliveryList.GMSL}} </span>
          <span class="fa-stack-14x fa-color-333">张</span>
        </div>
        <div class="tip-color">注意: 兑换功能不能反向操作</div>
      </div>
      <div class="delivery-right">
        <van-button round size="small" type="default" @click="selectType">
          <div class="yu_e_btn">
            <span class="yu_e_btn__span">{{ currentType }}</span>
            <van-icon :name="iconName" />
          </div>
        </van-button>
      </div>
    </div>
    <div class="delivery-middle">
      <div>{{currentObj.numTitle}}</div>
      <van-field
        type="number"
        :placeholder="currentObj.numPlace"
        clearable
        v-model="formData.num"
      >
      </van-field>
      <div>{{currentObj.addTitle}}</div>
      <van-field
        :placeholder="currentObj.addPlace"
        clearable
        v-model="formData.address"
      >
      </van-field>
      <div>{{currentObj.nameTitle}}</div>
      <van-field
        :placeholder="currentObj.namePlace"
        clearable
        v-model="formData.accountName"
      >
      </van-field>
    </div>
    <div class="delivery-bottom">
      <input type="checkbox" accountName="xieyi" value="" v-model="isCheck">
      {{currentObj.deal}}
    </div>
    <div class="submit_buttons">
      <van-button type="primary" block @click="submit" :disabled="!isCheck">提交审核</van-button>
    </div>
    <van-popup v-model="datePopShow" position="bottom">
      <!-- <van-picker :columns="types" @change="typeChange" /> -->
      <van-picker
        show-toolbar
        :columns="types"
        @cancel="typeCancel"
        @confirm="typeChange"
      />
    </van-popup>
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
        isCheck: false,
        currentType: '提货',
        iconName: 'arrow-down', //选择图标
        types: ['提货', '寄卖'],
        datePopShow: false,
        currentObj: {
          numTitle: '您本次提货数量',
          numPlace: '您本次提货数量',
          addTitle: '您的收货地址',
          addPlace: '您的收货地址',
          nameTitle: '您的帐户姓名',
          namePlace: '您的帐户姓名',
          deal: '我同意提货协议'
        }
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

    watch: {
      currentType: {
        handler: function (val, old) {
          if (val == '提货') {
            this.currentObj.numTitle = '您本次提货数量'
            this.currentObj.numPlace = '您本次提货数量'
            this.currentObj.addTitle = '您的收货地址'
            this.currentObj.addPlace = '您的收货地址'
            this.currentObj.nameTitle = '您的帐户姓名'
            this.currentObj.namePlace = '您的帐户姓名'
            this.currentObj.deal = '我同意提货协议'
          } else if (val == '寄卖') {
            this.currentObj.numTitle = '您本次寄卖数量'
            this.currentObj.numPlace = '您本次寄卖数量'
            this.currentObj.addTitle = '您的寄卖地址'
            this.currentObj.addPlace = '您的寄卖地址'
            this.currentObj.nameTitle = '您的寄卖账号姓名'
            this.currentObj.namePlace = '您的寄卖账号姓名'
            this.currentObj.deal = '我同意寄卖协议'
          }
        },
        deep: true
      }
    },

    methods: {
      typeCancel () { //取消
        this.datePopShow = false
      },
      typeChange (value, index) { //方式切换
        let self = this;
        self.currentType = value
        self.datePopShow = false
      },
      selectType () { // 提货方式
        let self = this;
        self.datePopShow = true
      },
      submit () {
        if (!this.isCheck) { return } 
        if (this.formData.num === '') {
          Toast({
            message: ('提货数量不能为空'),
            duration: 1500
          })
          return
        }
        if (this.formData.address === '') {
          Toast({
            message: ('钱包地址不能为空'),
            duration: 1500
          })
          return
        }
        if (this.formData.accountName === '') {
          Toast({
            message: ('帐户姓名不能为空'),
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
            message: ('提交成功'),
            duration: 1500
          })
          this.$router.push("/deal")
        } else {
          Toast({
            message: resData.data.Msg,
            duration: 1500
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .delivery-top {
    display: flex;
    justify-content: center;
    padding: 15px;
    div:nth-child(1),div:nth-child(2) {
      padding-bottom: 15px;
    }
    .delivery-left{
      width: 60%;
    }
    .delivery-right{
      width: 40%;
      text-align: right;
    }
  }
  .delivery-middle {
    background: #fff;
    div {
      padding: 10px 15px;
    }
  }
  .delivery-bottom {
    vertical-align: middle;
    padding: 30px 15px 0 15px;
    font-size: 15px;
    input {
      width: 15px;
      height: 15px;
      vertical-align: middle;
    }
  }
  .delivery-btn-checked {
    background-color: #ec9300;
    border: 0.02rem solid #ec9300
  }
  .delivery-not-checked {
    background-color: #ccc;
    border: 0.02rem solid #ccc;
  }
  .yu_e_btn{
    display: flex;
    align-items: center;
    align-content: center;
  }
</style>
  
