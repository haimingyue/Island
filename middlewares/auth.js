/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:08:08
 * @LastEditTime: 2019-08-25 16:10:06
 * @LastEditors: Please set LastEditors
 */

const basicAuth = require('basic-token');
class Auth {
  constructor () {
    
  }

  get m() {
    return async (ctx, next) => {
      const token = basicAuth(ctx.req);

      ctx.body = token;
    }
  }
}

module.exports = {
  Auth
}