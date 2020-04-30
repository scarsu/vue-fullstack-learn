/*
 * @Description: app server
 * @Author: scarsu001@gmail.com
 * @Date: 2020-04-30 08:37:36
 * @LastEditTime: 2020-04-30 13:55:20
 * @LastEditors: scarsu001@gmail.com
 */

const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// 启动
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// 路由
app.use('/', routes)

// 服务端启动
