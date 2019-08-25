/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-18 05:47:06
 * @LastEditTime: 2019-08-26 06:03:06
 * @LastEditors: Please set LastEditors
 */
class HttpException extends Error {
  constructor(msg='服务器错误', code=400, errorCode=10001) {
    super()
    this.code = code;
    this.msg = msg;
    this.errorCode = errorCode;
  }
}
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '参数错误';
    this.errorCode = errorCode || 10000;
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 201;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || 0;
  }
}


class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 404;
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10000;
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 404;
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || 10004;
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 403;
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 10006;
  }

}
module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden
}