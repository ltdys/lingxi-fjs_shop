<template>
	<com-page>
		<com-header :title="addressId?'编辑地址':'新增地址'" is-back slot="header"></com-header>
    <van-address-edit
      :address-info="currentAddress"
      :area-list="areaList"
      :show-delete="!!addressId"
      show-set-default
      @save="setAddAddress"
      @delete="onDelete"
      @change-area="changeArea"
      :is-saving="isSaving"
      :is-deleting="isDeleting"
    />
	</com-page>
</template>

<script>
import { Toast, AddressEdit } from "vant";
import areaList from "./area";
import { list_mixins } from "@/mixins";
import { setAddAddress } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  components: {
    [AddressEdit.name]: AddressEdit
  },
  data() {
    return {
      addressId: this.$route.params.id,
      areaList,
      isSaving:false,
      isDeleting:false,
      selectAdd: [], //选中的地址
      ProvinceCode: '', //选中的省编码
      CityCode: '', //选中的市编码
      DistrictCode: '', //选中的行政区编码
    };
  },
  computed: {
    currentAddress: {
      get: function () {
        return this.$store.getters.getCurrentAddress
      }
    }
  },
  mounted() {
    console.info(this.currentAddress);
  },
  methods: {
    changeArea (values) {
      this.selectAdd = values
      this.ProvinceCode = values[0].code
      this.CityCode = values[1].code
      if (values[2] == undefined) {
        this.DistrictCode = values[2]
      } else {
        this.DistrictCode = values[2].code
      }
    },
    async setAddAddress (value) { //新增银行卡
      let self = this;
      this.isSaving = true
      let param = {
        id: self.userId,
        Mobile: value.tel,
        ProvinceCode: self.ProvinceCode,
        CityCode: self.CityCode,
        DistrictCode: self.DistrictCode,
        AddressName: value.addressDetail,
        AccountName: value.name
      }
      console.log('参数',param)
      console.log('内容',value)
			let queryParams = paramConvert(param)
			let resData = await setAddAddress(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        Toast.success({
					message: '新增地址成功',
					duration: 1500
        });
        this.isSaving = false
        self.$router.back()
        console.log('新增地址',resData.data.Data)
			} else {
        Toast({
					message: resData.data.Msg || '新增地址失败',
					duration: 1500
				})
      }
    },
    onSave(value) {
      let self = this;
      console.log(value)
      this.isSaving = true
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
