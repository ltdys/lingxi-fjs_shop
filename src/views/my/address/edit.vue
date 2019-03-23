<template>
	<com-page>
		<com-header :title="addressId?'编辑地址':'新增地址'" is-back slot="header"></com-header>
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      :show-delete="!!addressId"
      show-set-default
      @save="onSave"
      @delete="onDelete"
      :is-saving="isSaving"
      :is-deleting="isDeleting"
    />
	</com-page>
</template>

<script>
import { AddressEdit } from "vant";
import areaList from "./area";

export default {
  components: {
    [AddressEdit.name]: AddressEdit
  },
  data() {
    return {
      addressId: this.$route.params.id,
      areaList,
      isSaving:false,
      isDeleting:false,
      addressInfo:{
        addressDetail: "匆匆nanian",
        areaCode: "210102",
        isDefault: true,
        name: "匆匆",
        tel: "15800804609",
      }
    };
  },
  methods: {
    onSave(value) {
      this.isSaving = true
      console.info(this.addressInfo,value);
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
