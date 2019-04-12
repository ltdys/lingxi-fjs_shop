<template>
	<com-page bgColor="#fff">
		<com-header title="消息详情" is-back slot="header"></com-header>

    <div class="message_detail">
      <div class="message_detail__title">{{messageObject.title}}</div>
      <div class="message_detail__date">{{messageObject.addtime}}</div>
      <div v-html="messageObject.text"></div>
    </div>
	</com-page>
</template>

<script>
import { getMsgInfo } from "@/api/index"
import { paramConvert } from "@/utils/stringUtil.js"
export default {

  data () {
    return {
      id: '',
      messageObject: {
        title: '',
        addtime: '',
        text: '',
        id: ''
      }
    }
  },

  created () {
    this.id = this.$route.params.id || ''
    this.getMsgInfo()
  },

  methods: {
    async getMsgInfo () {
      let queryParams = paramConvert({
        id: this.id
      })
      let resData = await getMsgInfo(queryParams, {
        id: this.id
      })
      console.log("resData", resData)
      if (resData.status === 200 && resData.data.Success) {
        this.messageObject = resData.data.Data
      }
    }
  }
};
</script>

<style lang="scss">
.message_detail {
  padding: 10px;
  background: #fff;
  &__title {
    font-size: 14px;
  }
  &__date {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  &__img {
    img {
      width: 100%;
    }
  }
  &__desc {
    font-size: 12px;
  }
}
</style>
