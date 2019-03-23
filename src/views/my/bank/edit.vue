<template>
	<com-page>
		<com-header :title="bankId?'银行卡编辑':'添加银行卡'" is-back slot="header"></com-header>
    <com-bank-edit
      :bank-info="bankInfo"
      @save="onSave"
      @delete="onDelete"
      :is-saving="isSaving"
      :is-deleting="isDeleting"
      :show-delete="!!bankId"
    ></com-bank-edit>
	</com-page>
</template>

<script>
import BankEdit from "@/components/bank/edit";

export default {
  components: {
    [BankEdit.name] : BankEdit
  },
  data() {
    return {
      bankId: this.$route.params.id,
      bankInfo : {},
      isSaving:false,
      isDeleting:false,
    };
  },

  methods: {
   onSave(value) {
      this.isSaving = true
      console.info(this.isSaving);
      // this.$router.back()
    },
    onDelete() {
      this.isDeleting = true
    }
  }
};
</script>

<style lang="scss">
</style>
