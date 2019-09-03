/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 05:23:28
 * @LastEditTime: 2019-09-03 06:06:19
 * @LastEditors: Please set LastEditors
 */
const { sequelize } = require('../../core/db');

const {
  Sequelize,
  Model
} = require('sequelize');

class Flow extends Model {
  
}

Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'flow'
})

module.exports = {
  Flow
}