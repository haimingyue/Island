/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 14:55:34
 * @LastEditTime: 2019-08-17 15:01:43
 * @LastEditors: Please set LastEditors
 */


const Router = require('koa-router');
const requireDirectory = require('require-directory');
 
class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
  }
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api/v1`
    requireDirectory(module, apiDirectory, {visit: whenLoadModules});
    function whenLoadModules (obj) {
      if(obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }
}

module.exports = InitManager;