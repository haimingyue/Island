/*
 * @Description: In User Settings Edit
 
 * @Author: your name
 * @Date: 2019-09-04 06:09:07
 * @LastEditTime: 2019-09-08 07:25:48
 * @LastEditors: Please set LastEditors
 */
const {sequelize} = require('../../core/db');

const {
  Sequelize,
  Model 
} = require('sequelize')

const {
  LikeError,
  DisLikeError
} = require('../../core/http-exception');

const {Art} = require('./art');

class Favor extends Model {
  // 业务表
  static async like(art_id, type, uid) {
    // 1. fav表增加一条记录
    // 2. 修改classic fav_nums 的数据
    // 数据库的事物，可以保证数据的一致性
    // 数据库事务是不是一定要加？
    // ACID 原子性 一致性 隔离性 持久性
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if(favor) {
      throw new LikeError();
    }
    return sequelize.transaction(async t => {
      await Favor.create({
        art_id, 
        type,
        uid
      }, {transaction: t})
      //对用户的点赞字段 +1
      const art = await Art.getData(art_id, type, false);
      await art.increment('fav_nums', {by: 1, transaction: t})
    })
  }
  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if(!favor) {
      throw new DisLikeError();
    }
    return sequelize.transaction(async t => {
      await favor.destroy({
        force: true,
        transaction: t
      })
      //对用户的点赞字段 +1
      const art = await Art.getData(art_id, type, false);
      await art.decrement('fav_nums', {by: 1, transaction: t})
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    return favor ? true : false;
  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}