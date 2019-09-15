/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 06:25:22
 * @LastEditTime: 2019-09-06 16:40:58
 * @LastEditors: Please set LastEditors
 */
const {TokenValidator,
  NotEmptyValidator} = require('../../validators/validator');
const Router = require('koa-router');
const {LoginType} = require('../../lib/enum');
const {User} = require('../../models/user');
const {ParameterException} = require('../../../core/http-exception');
const {generateToken} = require('../../../core/util');
const {WXManager} = require('../../services/wx');
const {Auth} = require('../../../middlewares/auth')
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
      token = await WXManager.codeToToken(v.get('body.account'));
      break;
    
    default: 
      throw new ParameterException('没有响应的处理函数');
      break;
  }
  ctx.body = {
    token
  }
})

router.post('/verify', async (ctx) => {
  //
  const v = await new NotEmptyValidator().validate(ctx);
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valide: result
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return token = generateToken(user.id, 2)
}

module.exports = router