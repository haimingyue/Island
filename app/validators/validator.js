/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:42:11
 * @LastEditTime: 2019-09-01 21:28:14
 * @LastEditors: Please set LastEditors
 */
const { LinValidator, Rule } = require('../../core/lin-validator-v2');
const { User } = require('../models/user');
const { LoginType } = require('../lib/enum');

console.log(LinValidator)
console.log(Rule)
class PositiveIntegeValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '必须是正整数', {min: 1})
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      new Rule('isLength', '6-32', {min: 6, max: 32}),
      new Rule('matches', '不符合规则', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称4-32', {min: 4, max: 32}),
    ]
  }

  validatorPassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if(user) {
      throw new Error('email 已经存在')
    }
  }
}


class TokenValidator extends LinValidator {
  
  constructor () {

    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {min: 4, max: 32})
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '不符合密码规则', {min: 6, max: 128})
    ]
  }

  validateLoginType(vals) {
    if(!vals.body.type) {
      throw new Error('type 必须')
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type 参数不正确')
    }
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', {min: 1})
    ]
  }
}

module.exports = {
  PositiveIntegeValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator
}