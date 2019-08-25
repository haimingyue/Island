/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 06:13:06
 * @LastEditTime: 2019-08-24 06:15:42
 * @LastEditors: Please set LastEditors
 */
const {Success} = require('../../core/http-exception');

function success(msg, errorCode) {
  throw new Success(msg, errorCode)
}

module.exports = {
  success
}