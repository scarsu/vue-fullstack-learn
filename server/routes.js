/*
 * @Description: express server router
 * @Author: scarsu001@gmail.com
 * @Date: 2020-04-30 09:05:25
 * @LastEditTime: 2020-04-30 16:15:13
 * @LastEditors: scarsu001@gmail.com
 */
const express = require('express')
let Word = require('./db').word

const router = express.Router()

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

router.route('/api/words')
  .get((req, res) => {
    const query = req.query.s
    const reg = new RegExp(query, 'i')
    Word.find({
      $or: [
        {en: {$regex: reg}},
        {cn: {$regex: reg}}
      ]
    }, function (err, docs) {
      if (!err) res.json(docs)
    })
  })
  .post((req, res) => {
    if (!req.body || !req.body.en || !req.body.cn) {
      console.log('cant save empty words ' + new Date())
      res.json({success: false, message: 'cant save empty words  '})
      return
    }
    let query = {en: req.body.en}
    Word.count(query).then(count => {
      if (count >= 1) {
        console.log(query.en + ': create failed,word existed ' + new Date())
        res.json({success: false, message: 'create failed,word existed '})
      } else {
        var wordTmp = new Word({
          en: req.body.en,
          cn: req.body.cn
        })
        wordTmp.save().then(docs => {
          console.log('word ' + req.body.en + ' created success' + docs)
          res.json({
            success: true,
            message: 'word ' + req.body.en + ' created success',
            docs
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err + new Date())
      res.json({success: false, message: err})
    })
  })
  .delete((req, res, next) => {
    let query = {_id: req.query.id}
    Word.deleteOne(query).then(() => {
      res.json({
        success: true,
        message: `delete success`
      })
      console.log(`${req.query.id} delete success`)
    }).catch(err => {
      console.log(err + new Date())
      res.json({success: false, message: err})
    })
  })

router.get('/api', (req, res, next) => {
  res.json({})
})

router.get('*', (req, res, next) => {
  res.send('hello world')
  next()
})
module.exports = router
