/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 05:58:14
 * @LastEditTime: 2019-09-01 20:51:43
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
  },
  wx: {
    appId: 'wx0691f1dcf6e5e231',
    appSecret: 'fa99551907e438cf97b6fc3a5ce6dc9a',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}