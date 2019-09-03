/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 05:36:57
 * @LastEditTime: 2019-09-03 06:40:00
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
const {HttpException, ParameterException} = require('../../../core/http-exception');
const {PositiveIntegeValidator} = require('../../validators/validator.js');
const {Flow} = require('../../models/flow');
const {Art} = require('../../models/art');
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
  art.setDataValue('index', flow.index);
  ctx.body = art;
})

module.exports = router;