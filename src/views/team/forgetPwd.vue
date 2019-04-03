<template>
	<com-page class="myinfo">
		<com-header title="忘记密码" is-back slot="header"></com-header>
		<van-cell-group>
			<van-field
        label="手机号"
				placeholder="请输入手机号"
				v-model="formData.newPhone"
        class='icon-phone'
      	clearable
				:error-message="errorMsg.newPhone"
        @blur="oneValidate('newPhone')">
        <van-button slot="button" size="small" type="primary" :disabled="isBtnShow" @click="getAccCode">{{codeText}}</van-button>
      </van-field>
			<van-field
				label="验证码"
				placeholder="请输入验证码"
				v-model="formData.code"
      	clearable
				:error-message="errorMsg.code"
        @blur="oneValidate('code')"></van-field>
			<van-field
				label="登录密码"
				type="password"
				placeholder="请输入登录密码"
				v-model="formData.password"
      	clearable
				:error-message="errorMsg.password"
        @blur="oneValidate('password')"></van-field>
		</van-cell-group>
    <div class="submit_buttons">
      <van-button type="primary" block @click="confirmBtn">确认修改</van-button>
    </div>
	</com-page>
</template>

<script>
import { Toast } from 'vant';
import validator from "@/utils/validator.js"
import { GetSmsCode, UpdatePwdByCode } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
import { clearStorage } from "@/utils/storage.js"
import { validatePhone, validatePwd } from "@/utils/validate.js"
export default {
  data(){
    return {
			formData: {
        newPhone: '', //新手机号
        code: '', //验证码
				password: '', //密码
			},
			errorMsg: {
        newPhone: "",
        code: '',
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
        code: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入验证码");
              } else if (validatePhone(value)) {
                callback();
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
      },
      isBtnShow: true,
      codeText: '获取验证码',
      times: 90,
      timeCell: null
    }
  },
  created () {
		this.validator = validator(this.rules, this.formData)
  },
  watch: {
    formData: {
			handler: function (val, old) {
        if (val.newPhone != '' && validatePhone(val.newPhone)) {
          this.isBtnShow = false
        }
			},
			deep: true
		}
  },
  methods: {
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
    oneValidate (data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
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
    async getAccCode () {//获取验证码
      let self = this;
      let param = {
				phone: self.formData.newPhone,
			}
			console.log(param)
			let queryParams = paramConvert(param)
			let resData = await GetSmsCode(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
				Toast({
					message: resData.data.Msg || '获取验证码成功',
					duration: 1500
        })
        self.codeText = self.times + 's后重新获取'
        self.isBtnShow = true
        self.timeCell = setInterval(function () {
          if (self.times <= 0) {
            window.clearInterval(self.timeCell)
            self.timeCell = null
            self.codeText = '重新获取'
            self.times = 90
            self.isBtnShow = false
          } else {
            self.times --
            self.codeText = self.times + 's后重新获取'
            self.isBtnShow = true
          }
        },1000)
			} else {
				Toast({
					message: resData.data.Msg || '获取验证码失败',
					duration: 1500
				})
			}
    },
		confirmBtn () {
			this.validate(error => {
				if (!error) {
					this.updatePhone()
				}
      }, this.formData)
		},
    async updatePhone () { //修改密码
			let self = this;
			console.log('888999')
			let param = {
				mobile: self.formData.newPhone,
				code: self.formData.code,
				newpwd: self.formData.password
			}
			console.log(param)
			let queryParams = paramConvert(param)
			let resData = await UpdatePwdByCode(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
				Toast({
					message: resData.data.Msg || '修改密码成功',
					duration: 1500
				})
				self.$router.back()
			} else {
				Toast({
					message: resData.data.Msg || '修改密码失败',
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
