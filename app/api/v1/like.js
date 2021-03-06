/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 16:21:41
 * @LastEditTime: 2019-09-07 06:09:39
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');

const {Auth} = require('../../../middlewares/auth');
const {LikeValidator} = require('../../validators/validator');
const {
  Favor
} = require('../../models/favor');

const {success} = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/like'
})
 
// router.post('/', new Auth().m, async ctx => {
//   const v = await new LikeValidator().validate(ctx, {
//     id: 'art_id'
//   })
//   Favor.like(v.get('body.art_id'), v.get('body.type'),ctx.auth.uid)
// })

router.post('/', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx,{
      id:'art_id'
  })
  await Favor.like(
      v.get('body.art_id'), v.get('body.type'),ctx.auth.uid)
  success()
})

router.post('/cancel', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx,{
      id:'art_id'
  })
  await Favor.disLike(
      v.get('body.art_id'), v.get('body.type'),ctx.auth.uid)
  success()
})

module.exports  = router;