<template>
    <div class="com-bank">
      <div class="com-bank-list">
        <van-radio-group v-model="radio" v-if="list.length>0">
          <div class="com-bankitem" v-for="(bank,i) in list" :key="i" @click="radio = bank.id">
            <div class="com-bankitem-content">
              <!-- <div class="com-bankitem-logo"></div> -->
              <div class="com-bankitem-info">
                <div class="com-bankitem-name">{{bank.name}}</div>
                <div class="com-bankitem-type">储蓄卡</div>
                <div class="com-bankitem-idno">{{bank.cardno | card}}</div>
              </div>
              <div class="com-bankitem-action">
                <van-radio :name="bank.id" v-if="switchable"/>
                <van-button v-else size="mini"  type="warning"  @click="$emit('edit',bank)">编辑</van-button>
              </div>
            </div>
          </div>
        </van-radio-group>
      </div>
      <van-button  class="com-bank-list__add" type="primary" bottom-action 
       @click="$emit('add')">添加银行卡</van-button>
    </div>
</template>

<script>
export default {
  name: "com-bank-list",
  props: {
    switchable: true,
    value: Number | String,
    list: Array
  },
  data() {
    return {
    };
  },
  computed: {
    radio:{
      get(){
        return this.value
      },
      set(v){
        this.$emit('input',v)
      }
    }
  },
  methods: {}
};
</script>


<style lang="scss">
.com-bank {
  height: 100%;
  padding-bottom: 2rem;
  box-sizing: border-box;
  overflow: auto;
  &-list {
    padding: 15px;
    &__add {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 9999;
    }
  }
}
.com-bankitem {
  + .com-bankitem {
    margin-top: 15px;
  }
  color: #fff;
  background: #48bca0;
  padding: 15px 15px;
  border-radius: 5px;
  .com-bankitem-content {
  }
  &-content {
    display: flex;
  }
  &-logo {
    width: 100px;
  }
  &-info {
    flex: 1;
    .com-bankitem-name {
      font-size: 16px;
    }
    .com-bankitem-type {
      font-size: 12px;
    }
    .com-bankitem-idno {
      font-size: 18px;
      margin-top: 8px;
    }
  }
  &-action {
    .com-bankitem-button {
      color: #fff;
      border: none;
      background: rgba(#fff, 0.2);
      border-radius: 4px;
      padding: 4px 10px;
      line-height: 1;
      font-size: 12px;
    }
  }
}
.bank-add {
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  .bank-add-icon {
    display: inline-block;
    background: #1aad19;
    color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

