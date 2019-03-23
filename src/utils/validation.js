  /**
   * 验证类
   * @param {*} model 验证的对象
   * @param {*} fields 验证对象的规则
   */
  function Validation(model, fields) {
    this.model = model;
    this.fields = fields;
  }


  /**
   * 验证单一属性
   * @param {*} name 名称
   * @param {*} callback 成功钩子函数 try catch 抛出异常会执行errorCallback
   * @param {*} errorCallback 错误钩子函数
   */
  Validation.prototype.validateField = function (nameOrField, callback, errorCallback) {
    var field;
    if (typeof nameOrField === 'object') {
      field = nameOrField
    } else {
      for (var i = 0; i < this.fields.length; i++) {
        if (nameOrField === this.fields[i].name) {
          field = this.fields[i]
          break;
        }
      }
    }


    var value = this.model[field.name];
    var _message;
    if (validate(value, field.rules || [], function (message) {
        _message = message;
      })) {
      return createFun(callback, errorCallback).exec(value)
    } else {
      return createFun(null, errorCallback).exec(_message);
    }
  }

  /**
   * 验证所有对象属性
   * @param {*} callback 成功钩子函数
   * @param {*} errorCallback 错误钩子函数
   * @param {*} isRepeat 遇到错误是否验证到最后
   */
  Validation.prototype.validateFields = function (callback, errorCallback, isRepeat) {

    if (typeof errorCallback !== 'function') {
      isRepeat = !!errorCallback;
    }
    var errors = [];
    var errorFun = function (name) {
      return function (message) {
        errors.push({
          name: name,
          message: message
        })
      }
    }
    for (var j = 0; j < this.fields.length; j++) {

      var field = this.fields[j];
      var valid = this.validateField(field, this.noop, errorFun(field.name));
      if (!valid && !isRepeat) {
        break;
      }
    }
    if (errors.length === 0) {
      return createFun(callback, errorCallback).exec(this.model);
    } else {
      var result;
      if (isRepeat) {
        //返回object
        var result = {}
        errors.forEach(v => {
          result[v.name] = v.message
        })
      } else {
        result = errors[0]
      }
      return createFun(null, errorCallback).exec(result);
    }
  }

  /**
   * 什么都没有
   */
  Validation.prototype.noop = function () {}

  /**
   * 验证方法
   * @param {*} value 值
   * @param {*} rules 规则
   * @param {*} errorfn 错误钩子函数
   */
  function validate(value, rules, errorfn) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      var valid = validF(value, rule);
      if (!valid) {
        return createFun(null, errorfn).exec(rule.message)
      }
    }
    return true;
  }


  /**
   * 验证规则
   * @param {*} value 值
   * @param {*} rule 规则
   */
  function validF(value, rule) {

    if(rule.type === 'number'){
      if(rule.min && +value<rule.min){
        return false
      }
      if(rule.max && +value>rule.max){
        return false
      }
    }else{
      if(rule.min && value.length<rule.min){
        return false
      }
      if(rule.max && value.length>rule.max){
        return false
      }
    }


    if (rule.required && !value) {
      return false;
    }
    if (rule.type === 'tel' && !/^1[34578]\d{9}$/.test(value)) {
      return false
    }
    if (rule.validate && !rule.validate.call(null, value)) {
      return false
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return false
    }
    return true;
  }

  /**
   * 执行钩子函数
   * try catch 抛出异常会执行errorCallback
   * @param {*} callback
   * @param {*} errorCallback
   */
  function createFun(callback, errorCallback) {
    return {
      exec: function (props) {
        try {
          if (typeof callback === 'function') {
            return (callback && callback(props)) || true;
          } else {
            errorCallback && errorCallback(props);
            return false;
          }
        } catch (e) {
          errorCallback && errorCallback(e);
          return false;
        }
      }
    }
  }

Validation.validate = validate;
export default Validation
