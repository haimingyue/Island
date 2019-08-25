/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 14:22:24
 * @LastEditTime: 2019-08-25 07:08:40
 * @LastEditors: Please set LastEditors
 */
const Sequelize = require('sequelize');
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database;

const sequelize = new Sequelize(dbName,user,password, {
  // 指定数据库类型
  dialect:'mysql',
  host,
  port,
  logging:true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at',
    underscored: true
  } 
})

sequelize.sync({
  force:false
})

module.exports = {
  sequelize, 
  tableName: 'user'
}