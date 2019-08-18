/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 05:37:05
 * @LastEditTime: 2019-08-17 14:54:57
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
var router = new Router;
router.get('/v1/book/latest', (ctx, next) => {
  ctx.body = {key: 'book' };
})

module.exports = router;