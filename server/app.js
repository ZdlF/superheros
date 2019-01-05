// 创建服务器
const express = require('express')
const app = express()

//导入cors模块
const cors = require('cors')
app.use(cors())

// 导入body-parser模块
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

// 引入router模块
const router = require('./router.js')
app.use(router)

app.listen(5000,() => {
    console.log('http://127.0.0.1:5000')
})