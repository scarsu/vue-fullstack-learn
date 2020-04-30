/*
 * @Description:
 * @Author: scarsu001@gmail.com
 * @Date: 2020-04-30 09:25:01
 * @LastEditTime: 2020-04-30 13:29:55
 * @LastEditors: scarsu001@gmail.com
 */
// 数据库连接
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test').then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log(`db connected!`)
  },
  err => {
    /** handle initial connection error */
    console.log(`db connection error:${err}`)
  }
)
const dbCon = mongoose.connection
const word = dbCon.model('word', new mongoose.Schema({
  en: String,
  cn: String
}))
exports.word = word
