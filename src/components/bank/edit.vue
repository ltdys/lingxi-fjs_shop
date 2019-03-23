<template>
  <div class="bank-edit">
      <van-cell-group>
        <van-field label="银行名称" placeholder="请输入银行名称" v-model="form.name"></van-field>
        <van-field label="银行卡号" placeholder="请输入银行卡号" v-model="form.cardNo"></van-field>
      </van-cell-group>
      <h6 class="bank-edit__tip">* 需本人银行卡号</h6>
      <div class="submit_buttons">
        <van-button type="danger" block @click="onSave" :loading="isSaving">保存</van-button>
        <van-button class="m-t-lar" block @click="onDelete" v-if="showDelete" :loading="isDeleting">删除</van-button>
      </div>
  </div>
</template>

<script>
export default {
  name: "com-bank-edit",
  props: {
    isSaving: Boolean,
    isDeleting: Boolean,
    showDelete:Boolean,
    bankInfo: {
      type: Object,
      default: () => ({
        name: "",
        cardNo: ""
      })
    },
    // error
  },
  data() {
    return {
      form: { ...this.bankInfo }
    };
  },
  watch: {
    bankInfo() {
      this.form = { ...this.bankInfo };
    }
  },
  methods: {
    onSave() {
      this.$emit("save", this.form);
    },
    onDelete() {
      this.$emit("delete");
    }
  }
};
</script>


<style lang="scss">
.bank-edit {
  &__tip {
    color: #f44;
    padding: 5px 15px;
  }
}
</style>

