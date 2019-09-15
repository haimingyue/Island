/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 05:36:57
 * @LastEditTime: 2019-09-08 08:41:27
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
const {HttpException, ParameterException, NotFound} = require('../../../core/http-exception');
const {PositiveIntegeValidator} = require('../../validators/validator.js');
const {Flow} = require('@models/flow');
const {Art} = require('../../models/art');
const {Favor} = require('../../models/favor');
const router = new Router({
  prefix: '/v1/classic'
})

const {Auth} = require('../../../middlewares/auth');
router.get('/latest', new Auth().m, async (ctx, next) => {
  // index = 8
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ],
    // where: {
    //   index: 8
    // }
  })
  const art = await Art.getData(flow.art_id, flow.type);
  // const newData = {
    
  // } 
  // art.dataValues.index = flow.index;
  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeLatest);
  ctx.body = art;
})

router.get('/:index/next', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegeValidator().validate(ctx, {
    id: 'index'
  })

  const index = v.get('path.index');

  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  })

  if(!flow) {
    throw new NotFound()
  }

  const art = await Art.getData(flow.art_id, flow.type);
  const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeNext);
  ctx.body = art;
})


router.get('/:index/previous', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegeValidator().validate(ctx, {
    id: 'index'
  })

  const index = v.get('path.index');

  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })

  if(!flow) {
    throw new NotFound()
  }

  const art = await Art.getData(flow.art_id, flow.type);
  const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likePrevious);
  ctx.body = art;
})



module.exports = router;