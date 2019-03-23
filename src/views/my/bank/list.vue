<template>
	<com-page>
		<com-header title="我的银行卡" is-back slot="header"></com-header>
    
    <com-bank-list
      v-model="chosenBankId"
      :list="list"
      :switchable="switchable"
      
      @add="onAdd"
      @edit="onEdit"
      @select="$emit('select',$event)"
    >
    </com-bank-list>
	</com-page>
</template>

<script>
import BankList from '@/components/bank/list'

export default {
  props:{
    switchable:Boolean
  },
  components:{
    [BankList.name]:BankList
  },
  data() {
    return {
      chosenBankId:1,
      list:[{
        id:1,
        name:'农业银行',
        cardno:'12312321312312312312'
      }]
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/my/bank_add");
    },
    onEdit(item, index) {
      console.info(item)
      this.$router.push("/my/bank/" + item.id);
    }
  }
};
</script>


<style lang="scss">
.mt-bankitem {
  color: #fff;
  background: #fff;
  .mt-box {
    background: #48bca0;
    // background: #f67676;
  }
  // &.green .mt-box{
  //   background: #48bca0;
  // }
  // &.blue .mt-box{
  //   background: #7290e1;
  // }
  .mt-bankitem-content {
    padding: 5px 0;
  }
  &-content {
    display: flex;
  }
  &-logo {
    width: 100px;
  }
  &-info {
    flex: 1;
    .mt-bankitem-name {
      font-size: 16px;
    }
    .mt-bankitem-type {
      font-size: 12px;
    }
    .mt-bankitem-idno {
      font-size: 18px;
      margin-top: 8px;
    }
  }
  &-action {
    .mt-bankitem-button {
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
</style>

