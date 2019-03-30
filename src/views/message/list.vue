<template>
	<com-page>
		<com-header title="消息列表" is-back slot="header"></com-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
      <ul class="message">
        <li class="message-item" v-for="(item,i) in messageList" :key="i" @click="$router.push('/message/' + item.id)">
          <div class="message__title">{{item.title}}</div>
          <div class="message__date">{{item.addtime}}</div>
          <div class="message__img">
            <img src="static/images/banner.png"/>
          </div>
          <div class="message__desc">{{item.text}}</div>
        </li>
      </ul>
    </van-list>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { getMsgInfo } from "@/api/index"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  data(){
    return {
      messageId: '',
      messageList: []
    }
  },
  
  created () {
    this.messageId = this.$route.query.messageId || ''
    this.getMsgInfo()
  },

  methods: {
    async getMsgInfo () {
      let queryParams = paramConvert({
        id: this.messageId
      })
      let resData = await getMsgInfo(queryParams, {
        id: this.messageId
      })
      if (resData.status === 200 && resData.data.Success) {
        this.messageList[0] = resData.data.Data
      }
    }
  }
};
</script>

<style lang="scss">
.message{
  padding: 10px;
  .message-item{
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    &+.message-item{
      margin-top:10px;
    }
  }
  &__title{
    font-size: 14px;
  }
  &__date{
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  &__img{
    img{
      width: 100%;
    }
  }
  &__desc{
    font-size: 12px;
  }
}
</style>
