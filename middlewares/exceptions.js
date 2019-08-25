/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-18 17:21:32
 * @LastEditTime: 2019-08-22 06:39:34
 * @LastEditors: Please set LastEditors
 */
const {HttpException} = require('../core/http-exception');
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment === 'dev';

    if (!isHttpException && isDev) {
      throw error
    }
    if (error instanceof HttpException) {
      ctx.body = {
        message: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code;
    } else {
      ctx.body = {
        message: 'we made a mistake',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500;
    }
  }
}

module.exports = catchError;