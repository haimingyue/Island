/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 06:50:24
 * @LastEditTime: 2019-09-01 21:09:58
 * @LastEditors: Please set LastEditors
 */

const util = require('util');
const {wx} = require('../../config/config');
const {AuthFailed} = require('../../core/http-exception');
const {User} = require('../models/user')
const {Auth} = require('../../middlewares/auth');
const {generateToken} = require('../../core/util');
const axios = require('axios');
class WXManager {
  constructor() {
    
  }

  static async codeToToken (code) {
    // code 码 ， 前端生成，发给后端。再调用微信的服务，然后微信返回一个openId,用来表示小程序用户。
    // 小程序登录方式没有显示的注册的过程

    // 把code作为参数发送给微信。
    // code appid appsecret

    const url = util.format(wx.loginUrl, wx.appId,wx.appSecret,code);
    console.log('url', url)
    const result = await axios.get(url);
    let abc = result.status !== 200
    if(result.status !== 200) {
      throw new AuthFailed('openid 获取失败')
    } 
    if(result.data.errcode) {
      throw new AuthFailed('openid 获取失败' + result.data.errmsg)
    }
    //openid	string	用户唯一标识
    //session_key	string	会话密钥
    //unionid	string	用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回，详见 UnionID 机制说明。
    let user = await User.getUserbyOpenid(result.data.openid);

    if(!user) {
      user = await User.registerUser(result.data.openid);
    }

    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}