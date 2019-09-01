/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:08:08
 * @LastEditTime: 2019-09-01 21:39:01
 * @LastEditors: Please set LastEditors
 */

const basicAuth = require('basic-auth');
const {Forbbiden} = require('../core/http-exception');
const jwt = require('jsonwebtoken');
class Auth {
  constructor (level) {
    // level用来代表api的权限级别
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.Super = 32;
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      let msg = 'token不合法'
      if(!userToken || !userToken.name) {
        throw new Forbbiden(msg);
      }
      try {
        var decode = jwt.verify(userToken.name, global.config.security.securetKey)
      } catch (error) {
        // token 不合法
        // token 过期Error
        if(error.name === 'TokenExpiredErrpr') {
          msg = 'token 过期'
        }
        throw new Forbbiden(msg);
      }

      if(decode.scope < this.level) {
        msg = '权限不足';
        throw new Forbbiden(msg);
      }
      // ctx.body = token;
      // 保存uid。scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next();
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.securetKey)
      return true;
    } catch (error) {
      return false;
    }
    
  }
}

module.exports = {
  Auth
}