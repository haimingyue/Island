/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 05:12:56
 * @LastEditTime: 2019-09-03 06:33:15
 * @LastEditors: Please set LastEditors
 */
const { sequelize } = require('../../core/db');

const {
  Sequelize,
  Model
} = require('sequelize');

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model {
  
}

Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})

class Sentence extends Model {
  
}

Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})

const musicFields = Object.assign({url: Sequelize.STRING}, classicFields);

class Music extends Model {
  
}

Music.init(musicFields, {
  sequelize,
  tableName: 'music'
})

module.exports = {
  Music,
  Movie,
  Sentence
}