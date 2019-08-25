/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 14:55:34
 * @LastEditTime: 2019-08-23 05:26:30
 * @LastEditors: Please set LastEditors
 */


const Router = require('koa-router');
const requireDirectory = require('require-directory');
 
class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.initConfig();
  }
  static initConfig(path='') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config;
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