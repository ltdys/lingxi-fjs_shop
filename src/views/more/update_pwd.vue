<template>
	<com-page class="myinfo">
		<com-header title="修改登录密码" is-back slot="header"></com-header>
		<van-cell-group>
			<van-field
				label="旧密码"
				placeholder="请输入旧密码"
				v-model="formData.oldPwd"
				required
      	clearable
				@keyup.enter.native="confirmBtn"
				:error-message="errorMsg.oldPwd"></van-field>
			<van-field
				label="新密码"
				type="password"
				placeholder="请输入新密码"
				v-model="formData.newPwd"
				required
      	clearable
				@keyup.enter.native="confirmBtn"
				:error-message="errorMsg.newPwd"></van-field>
      <van-field
				label="确认新密码"
				placeholder="请再次输入新密码"
				v-model="formData.newNextPwd"
				required
      	clearable
				@keyup.enter.native="confirmBtn"
				:error-message="errorMsg.newNextPwd"></van-field>
		</van-cell-group>
    <div class="submit_buttons">
      <van-button type="primary" block @click="confirmBtn" v-focus @keyup.enter="confirmBtn">修改密码</van-button>
    </div>
	</com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import validator from "@/utils/validator.js"
import { updatePwd } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
import { clearStorage } from "@/utils/storage.js"
import { validatePhone, validatePwd } from "@/utils/validate.js"
export default {
  mixins: [list_mixins],
  data(){
    return {
			formData: {
				oldPwd: '', //旧密码
				newPwd: '', //新密码
				newNextPwd: '', //确认密码
			},
			errorMsg: {
        oldPwd: "",
        newPwd: "",
        newNextPwd: "",
      },
			rules: {
        oldPwd: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入旧密码");
              } else if (validatePhone(value)) {
                callback();
              }
            }
          }
        ],
				newPwd: [
					{
						validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入新密码");
              } else if (validatePwd(value)) {
                callback();
              } else {
                callback("密码以字母开头，只能包含字母、数字和下划线,长度在6-18之间");
              }
            }
					}
        ],
        newNextPwd: [
					{
						validator: (rule, value, callback) => {
              if (!value) {
                callback("请再次输入新密码");
              } else if (validatePwd(value)) {
                callback();
              } else {
                callback("密码以字母开头，只能包含字母、数字和下划线,长度在6-18之间");
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
          if (this.formData.newPwd != this.formData.newNextPwd) {
            this.errorMsg.newNextPwd = '两次输入的新密码不一致'
            return
          } else {
            this.updatePassWork()
          }
				}
      }, this.formData)
		},
    async updatePassWork () { //修改密码
			let self = this;
			console.log('需要提供修改密码接口')
			let param = {
				id: self.userId,
				newpwd: self.formData.newPwd,
				pwd: self.formData.oldPwd
			}
			console.log(param)
			let queryParams = paramConvert(param)
			let resData = await updatePwd(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
				Toast({
					message: resData.data.Msg || '修改密码成功',
					duration: 1500
				})
				
				self.$store.dispatch('setClearAll', '')
				clearStorage()
				self.$router.push('/team/login')
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
