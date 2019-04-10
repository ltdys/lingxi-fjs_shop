<template>
  <com-page>
    <com-header title="用户登录" slot="header"></com-header>
    <div class="lx-header-img">
      <img :src="userHeader" alt="">
    </div>
    <van-field
      label="帐户"
      placeholder="请输入手机号/用户名"
      clearable
      v-model="formData.phone"
      @keyup.enter.native="submit"
    >
    </van-field>
    <van-field
      label="密码"
      type="password"
      placeholder="请输入登录密码"
      clearable
      v-model="formData.pwd"
      @keyup.enter.native="submit"
    >
		</van-field>
    <div class="lx-wrap">
      <!-- <span>忘记密码?</span> -->
      <span @click="$router.push('/team/register')">立即注册</span>
      <span @click="$router.push('/team/forgetPwd')">忘记密码</span>
    </div>
    <div class="lx-btn">
      <van-button type="primary" block @click="submit" v-focus @keyup.enter="submit">登录</van-button>
    </div>
  </com-page>
</template>

<script>
  import { Toast } from "vant"
  import { login, getUserInfo } from "@/api/index.js"
  import { paramConvert } from "@/utils/stringUtil.js"
  export default {
    data () {
      return {
        userHeader: './static/images/icon/user_defu.png',
        formData: {
          phone: '',  //手机号
          pwd: ''  //密码
        },
      }
    },

    created () {
      //todo 通过id直接登录,给开发人员用
      let id = this.$route.query.id
      if (id) {
        this.$store.dispatch('setUserId', id)
        this.getUserInfo(id)
      }
    },

    methods: {
      submit () {
        if (this.formData.phone === '') {
          Toast({
            message: '手机号/用户名不能为空!',
            duration: 1500
          })
          return
        }
        if (this.formData.pwd === '') {
          Toast({
            message: '登录密码不能为空!',
            duration: 1500
          })
          return
        }
        this.login()
      },
      async login () {
        let queryParams = paramConvert(this.formData)
        let resData = await login(queryParams, this.formData)
        if (resData.status === 200 && resData.data.Success === true) {
          this.$store.dispatch('setUserId', resData.data.Data.userId)
          Toast({
            message: '登录成功!',
            duration: 1500
          })
          this.getUserInfo(resData.data.Data.userId)
        } else {
          Toast(resData.data.Msg)
        }
      },
      async getUserInfo (id) { //获取用户消息
        let self = this;
        let queryParams = paramConvert({ "uId": id })
        let resData = await getUserInfo(queryParams, { "uId": id })
        if (resData.status === 200 && resData.data.Success) {
          self.userInfo = resData.data.Data;
          self.$store.dispatch("setUserInfo", self.userInfo)
          this.$router.push('/')
        } else {
          Toast({
            message: resData.data.Msg || '获取用户信息失败',
            duration: 1500
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .lx-header-img {
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    img {
      display: block;
      width: 1.2rem;
    }
  }
  .lx-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0.3rem;
    span {
      color:#ec9300;
    }
  }
  .lx-btn {
    padding: 0rem 0.3rem;
  }
</style>


