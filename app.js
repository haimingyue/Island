/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 05:18:50
 * @LastEditTime: 2019-08-23 06:55:08
 * @LastEditors: Please set LastEditors
 */
const Koa =require('koa');
const bodyParser = require('koa-bodyparser');
const catchError = require('./middlewares/exceptions.js');

const InitMananger = require('./core/init.js');

// 函数
const app = new Koa();  // 应用程序对象

app.use(bodyParser());
app.use(catchError);

InitMananger.initCore(app);

app.listen(3000);