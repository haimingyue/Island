/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 15:46:23
 * @LastEditTime: 2019-09-01 21:17:48
 * @LastEditors: Please set LastEditors
 */

const bcrypt = require('bcrypt');
const { sequelize } = require('../../core/db.js');
const { NotFound, AuthFailed } = require('../../core/http-exception');

const {Sequelize, Model} = require('sequelize');
// const {WXManager} = require('../services/wx');

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })

    if(!user) {
      throw new NotFound('用户不存在');
    }

    const correct = bcrypt.compareSync(plainPassword, user.password);
    
    if(!correct) {
      throw new AuthFailed('密码不正确')
    }
    
    return user;
  }

  static async getUserbyOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user;
  }

  static async registerUser(openid) {
    const user = User.create({
      openid
    })
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(64),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue('password', psw);
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {sequelize})

module.exports = {
  User
}
