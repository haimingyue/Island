/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 05:58:14
 * @LastEditTime: 2019-08-25 16:03:03
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  environment: 'dev',
  database: {
    dbName: '7yue',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'd6905295'
  },
  security: {
    securetKey: 'abcdef',
    expriseIn: 60*60*24*30
  }
}