/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 06:21:04
 * @LastEditTime: 2019-08-25 06:48:28
 * @LastEditors: Please set LastEditors
 */
function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true;
    }
  }
  return false;
}

const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EAMIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
}


const ArtType = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENCE: 300,
  BOOK: 400,
  isThisType
}

module.exports = {
  LoginType,
  ArtType
}