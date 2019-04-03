<template>
  <div class="home-message" @click="$router.push('/message?messageId=' + messageId)">
    <div>
      <com-icon name="icontoutiao" size="xxlg"></com-icon>
    </div>
    <div>
      <com-icon name="iconshengyin" class="m-r"></com-icon>
      <div>{{message}}</div>
    </div>
  </div>
</template>

<script>
import { getMsg } from '@/api/index'
export default {
	data () {
		return {
			message: '',
			messageId: ''
		}
	},
	created () {
		this.getMsg()
	},
	methods: {
		async getMsg () {
			let resData = await getMsg()
			if (resData.status === 200 && resData.data.Success) {
				this.message = resData.data.Data[0].title || '暂无消息'
				this.messageId = resData.data.Data[0].id
			}
		}
	}
};
</script>

<style lang="scss">
.home-message {
  background: #F7F2EB;
  border-radius: 4px;
  height: 1rem;
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  > :nth-child(1) {
    padding-right: 0.4rem;
  }
  > :nth-child(2) {
    border-left: 1px solid rgba(234, 88, 78, 0.3);
    height: 0.4rem;
    padding-left: 0.4rem;
    color: #ea584e;
    font-size: 0.24rem;
    display: flex;
    align-items: center;
  }
}
</style>