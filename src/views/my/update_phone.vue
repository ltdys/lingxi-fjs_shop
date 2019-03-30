<template>
	<com-page class="myinfo">
		<com-header title="更换手机号" is-back slot="header"></com-header>
		<van-cell-group>
			<van-field label="当前手机号" v-model="userInfo.mobile" disabled></van-field>
			<van-field
				label="新手机号"
				placeholder="请输入新手机号"
				v-model="formData.newPhone"
				required
      	clearable
				:error-message="errorMsg.newPhone"></van-field>
			<van-field
				label="登录密码"
				type="password"
				placeholder="请输入登录密码"
				v-model="formData.password"
				required
      	clearable
				:error-message="errorMsg.password"></van-field>
		</van-cell-group>
    <div class="submit_buttons">
      <van-button type="primary" block @click="confirmBtn">确认绑定</van-button>
    </div>
	</com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import validator from "@/utils/validator.js"
import { updatePhone } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
import { validatePhone, validatePwd } from "@/utils/validate.js"
export default {
  mixins: [list_mixins],
  data(){
    return {
			formData: {
				newPhone: '', //新手机号
				password: '', //密码
			},
			errorMsg: {
        newPhone: "",
        password: ""
      },
			rules: {
        newPhone: [
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
				password: [
					{
						validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入密码");
              } else if (validatePwd(value)) {
                callback();
              }
            }
					}
				]
      }
    }
  },
  created () {
		this.validator = validator(this.rules, this.formData)
		this.getUserInfo()
  },
  watch: {
    newObj: {
			handler: function (val, old) {
				console.log(val)
			},
			deep: true
		}
  },
  methods: {
		confirmBtn () {
			 this.validate(error => {
				if (!error) {
					this.updatePhone()
				}
      }, this.formData)
		},
    async updatePhone () { //修改手机号
			let self = this;
			console.log('888999')
			let param = {
				id: self.userId,
				newPhone: self.formData.newPhone,
				pwd: self.formData.password
			}
			console.log(param)
			let queryParams = paramConvert(param)
			let resData = await updatePhone(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
				Toast({
					message: resData.data.Msg || '修改手机号成功',
					duration: 1500
				})
				self.$router.push('/team/login')
			} else {
				Toast({
					message: resData.data.Msg || '修改手机号失败',
					duration: 1500
				})
			}
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
  },
}
</script>

<style lang="scss">
</style>
