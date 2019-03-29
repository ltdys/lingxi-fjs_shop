<template>
	<com-page>
		<com-header title="收货地址" is-back slot="header"></com-header>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :switchable="switchable"
      @add="onAdd"
      @edit="onEdit"
      @select="backAddress"
    />
	</com-page>
</template>

<script>
import areaList from "./area";
import { AddressList, Toast } from "vant";
import { list_mixins } from "@/mixins";
import { getMyAddress } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  // props:{
  //   switchable:{
  //     type:Boolean,
  //     default:false
  //   }
  // },
  components: {
    [AddressList.name]: AddressList
  },
  data() {
    return {
      chosenAddressId: "", //当前选中的地址id
      switchable: false, //是否显示选择按钮
      list: [],
    };
  },
  created () {
    let isShow = this.$route.query.id
    if (isShow == 1) {
      this.switchable = false;
    } else if (isShow == 2) {
      this.switchable = true
    }
    this.getMyAddress()
    console.log(areaList.province_list)
  },
  methods: {
    async getMyAddress () { //获取地址列表
      let self = this;
      let param = {
        id: self.userId,
      }
			let queryParams = paramConvert(param)
			let resData = await getMyAddress(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        let list = resData.data.Data;
        self.list = []
        list.forEach((item, index) => {
          let obj = {
            id: item.AddressId,
            name: item.AccountName,
            tel: item.Mobile,
            address: self.buildAddress(item)
          }
          self.list.push(obj)
        })
        console.log('获取地址列表',list)
        console.log(resData)
			}
    },
    buildAddress (item) {
      let province = areaList.province_list
      let city = areaList.city_list
      let county = areaList.county_list
      let address = ''
      if (item.ProvinceCode != null && province.hasOwnProperty(item.ProvinceCode)) {
        address += province[item.ProvinceCode]
      }
      if (item.CityCode != null && city.hasOwnProperty(item.CityCode)) {
        address += city[item.CityCode]
      }
      if (item.DistrictCode != null && county.hasOwnProperty(item.DistrictCode)) {
        address += county[item.DistrictCode]
      }
      address += item.AddressName
      return address
    },
    onAdd() {
      // 
      this.$router.push("/my/address_add");
    },
    onEdit(item, index) {
      Toast({
        message: '暂不支持修改地址',
        duration: 1500
      })
      // this.$store.dispatch('setCurrentAddress', item)
      // this.$router.push("/my/address/" + item.id);
    },
    backAddress (Address) { //选择当前地址
      let self = this;
      console.log(Address)
      let queryId = self.$route.query.id
      if (queryId == 2) {
        this.$store.dispatch('setCurrentAddress', Address)
        this.$router.back();
      }
    },
  }
};
</script>

<style lang="scss">
</style>
