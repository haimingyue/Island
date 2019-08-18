/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 05:36:57
 * @LastEditTime: 2019-08-18 05:39:10
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
var router = new Router;
router.post('/v1/classic/latest', (ctx, next) => {
  const path = ctx.params;
  const query = ctx.request.query;
  const header = ctx.request.header;
  const body = ctx.request.body;
  console.log(body)
  ctx.body = {key: 'classic' };
})

module.exports = router;