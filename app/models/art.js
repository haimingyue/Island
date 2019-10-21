/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 06:20:57
 * @LastEditTime: 2019-09-08 07:25:18
 * @LastEditors: Please set LastEditors
 */
const {
  Movie,
  Music,
  Sentence
} = require('../models/classic');

const {
  Op
} = require('sequelize')

const {
  flatten
} = require('lodash')
class Art {

  static async getList(artInfoList) {
    // in
    // [ids]
    // 3种不同的art
    // 3次in查询

    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }

    for (let artInfo of artInfoList) {
      // artInfo.type artInfo.art_id
      artInfoObj[artInfo.type].push(artInfo.art_id);

    }
    const arts = [];
    for (let key in artInfoObj) {
      const ids = artInfoObj[key];
      if (ids.length === 0) {
        continue
      }
      // type
      key = parseInt(key);
      arts.push(await Art._getListByType(ids, key));
    }
    return flatten(arts);
  }

  static async _getListByType(ids, type) {
    let arts = null;
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
    const scope = 'bh';
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findOne(finder);
        break;
      case 200:
        arts = await Music.scope(scope).findOne(finder);
        break;
      case 300:
        arts = await Sentence.scope(scope).findOne(finder);
        break;
      case 400:
        // art = await Movie.findOne(finder);        
        break;
      default:
        break;
    }

    return arts;
  }


  static async getData(art_id, type, useScope = true) {
    const finder = {
      where: {
        id: art_id
      }
    }
    let art = null;
    const scope = useScope ? 'bh' : null;
    switch (type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder);
        break;
      case 200:
        art = await Music.scope(scope).findOne(finder);
        break;
      case 300:
        art = await Sentence.scope(scope).findOne(finder);
        break;
      case 400:
        // art = await Movie.findOne(finder);        
        break;
      default:
        break;
    }

    return art;
  }
}

module.exports = {
  Art
}