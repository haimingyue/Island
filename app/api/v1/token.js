/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 06:25:22
 * @LastEditTime: 2019-08-25 15:38:10
 * @LastEditors: Please set LastEditors
 */
const {TokenValidator} = require('../../validators/validator');
const Router = require('koa-router');
const {LoginType} = require('../../lib/enum');
const {User} = require('../../models/user');
const {ParameterException} = require('../../../core/http-exception');
const {generateToken} = require('../../../core/util');
const router = new Router({
  prefix: '/v1/token'
})
router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx);
  let token;
  switch (v.get('body.type')) {
    case LoginType.USER_EAMIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:

      break;
    
    default: 
      throw new ParameterException('没有响应的处理函数');
      break;
  }
  ctx.body = {
    token
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return token = generateToken(user.id, 2)
}

module.exports = router