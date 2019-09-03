/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 06:20:57
 * @LastEditTime: 2019-09-03 06:32:13
 * @LastEditors: Please set LastEditors
 */
const {
  Movie,
  Music,
  Sentence
} = require('../models/classic');

class Art {
  static async getData(art_id, type) {
    const finder = {
      where: {
        id: art_id
      }
    }
    let art = null;
    switch (type) {
      case 100:
        art = await Movie.findOne(finder);
        break;
      case 200:
        art = await Music.findOne(finder);
        break;
      case 300:
        art = await Sentence.findOne(finder);
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