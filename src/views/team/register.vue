<template>
  <com-page>
    <com-header title="注册会员" is-back slot="header"></com-header>
    <van-cell title="推荐人账号" :value="this.formData.tjrPhone"></van-cell>
    <van-cell title="推荐人姓名" :value="this.userInfo.userName"></van-cell>
    <van-field
      class="m-t"
      type="tel"
      label="手机号"
      placeholder="请输入手机号"
      required
      clearable
      v-model="formData.phone"
      :error-message="errorMsg.phone"
    ></van-field>
    <van-field
      label="密码"
      type="password"
      placeholder="请输入密码"
      required
      clearable
      v-model="formData.pwd"
			:error-message="errorMsg.pwd"
    >
		</van-field>
    <van-field
      label="姓名"
      placeholder="请输入姓名"
      required
      clearable
      v-model="formData.name"
      :error-message="errorMsg.name"
    >
		</van-field>
    <van-field
		  label="身份证号"
			required
			clearable
			placeholder="请输入身份证号"
			v-model="formData.card"
			:error-message="errorMsg.card">
		</van-field>
    <div class="submit_buttons">
      <van-button type="primary" block @click="submit">立即注册</van-button>
    </div>
  </com-page>
</template>

<script>
import validator from "@/utils/validator.js"
import { validatePhone, validateIdCard, validatePwd } from "@/utils/validate.js"
import { Toast } from "vant"
import { register } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
import { list_mixins } from "@/mixins";
export default {
  mixins: [list_mixins],

  data() {
    return {
      formData: {
        tjrPhone: "", //推荐人手机号
        phone: "", //手机号
        name: "", //名称
        pwd: "", //密码
        card: "" //身份证号码
      },
      errorMsg: {
        phone: "",
        pwd: "",
        name: "",
        card: ""
      },
      rules: {
				name: [
					{ required: true, message: '请输入姓名' }
				],
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入手机号码");
              } else if (validatePhone(value)) {
                callback();
              } else {
                callback("请输入正确的手机号码");
              }
            }
          }
				],
				card: [
					{
						validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入身份证号");
              } else if (validateIdCard(value)) {
                callback();
              } else {
                callback("请输入正确的身份证号");
              }
            }
					}
				],
				pwd: [
					{
						validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入密码");
              } else if (validatePwd(value)) {
                callback();
              } else {
                callback("密码以字母开头，只能包含字母、数字和下划线,长度在6-18之间");
              }
            }
					}
				]
      }
    };
  },

  created() {
    this.formData.tjrPhone = this.userInfo.mobile
    this.validator = validator(this.rules, this.formData)
  },

  methods: {
    submit () {
      this.validate(error => {
				if (!error) {
					this.register()
				}
      }, this.formData)
    },
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
        callback && callback(errors, fields);
      }, data);
    },
    resetField(attrs) {
      attrs = !attrs
        ? Object.keys(this.errorMsg)
        : Array.isArray(attrs)
        ? attrs
        : [attrs];
      attrs.forEach(attr => {
        this.errorMsg[attr] = "";
      });
		},
		async register () {
			let queryParams = paramConvert(this.formData)
			let resData = await register(queryParams, this.formData)
			if (resData.status === 200 && resData.data.Success) {
        Toast({
          message: Toast('注册成功'),
          duration: 1500
        })
				this.$router.push('/team/myteam')
			} else {
				Toast(resData.data.Msg)
			}
		}
  }
};
</script>

<style lang="scss">
</style>
