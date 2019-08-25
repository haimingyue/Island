/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 05:59:22
 * @LastEditTime: 2019-08-24 06:17:45
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
const {User} = require('../../models/user');
const {success} = require('../../lib/helper');

const {RegisterValidator} = require('../../validators/validator');

const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx);
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }
  console.log('user',user)
  await User.create(user);
  
  success();
})

module.exports = router;