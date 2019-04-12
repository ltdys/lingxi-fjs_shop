<template>
	<com-page>
		<com-header title="消息列表" is-back slot="header"></com-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
      <ul class="message">
        <li class="message-item" v-for="(item,i) in messageList" :key="i" @click="$router.push('/message/' + item.id)">
          <div class="message__title">{{item.title}}</div>
          <div class="message__date">{{item.addtime}}</div>
          <!-- <div v-html="item.text"></div> -->
        </li>
      </ul>
    </van-list>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { getMyMsgList } from "@/api/index"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  data(){
    return {
      id: this.$store.getters.getUserId,
      messageList: []
    }
  },
  
  created () {
    this.getMyMsgList()
  },

  methods: {
    async getMyMsgList () {
      let queryParams = paramConvert({
        id: this.id
      })
      let resData = await getMyMsgList(queryParams, {
        id: this.id
      })
      if (resData.status === 200 && resData.data.Success) {
        this.messageList = resData.data.Data
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
