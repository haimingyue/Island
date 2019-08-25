/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 05:36:57
 * @LastEditTime: 2019-08-25 16:14:59
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
const {HttpException, ParameterException} = require('../../../core/http-exception');
const {PositiveIntegeValidator} = require('../../validators/validator.js');
const router = new Router({
  prefix: '/v1/classic'
})

const {Auth} = require('../../../middlewares/auth');
var router = new Router;
router.post('/latest',new Auth().m, async (ctx, next) => {
  const path = ctx.params;
  const query = ctx.request.query;
  const header = ctx.request.header;
  const body = ctx.request.body;
  const v = await new PositiveIntegeValidator().validate(ctx);
  const id = v.get('path.id');
  ctx.body = {key: 'classic' };
})

module.exports = router;