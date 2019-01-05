const express = require('express')

const router = express.Router()

const conn = require('./model.js')

const moment = require('moment')


// 获取所有未删除的英雄信息
router.get('/api/getheros',(req,res) => {
    const sql = 'select * from heros where isdel = 0'
    conn.query(sql,(err,results) => {
        if(err) return res.json({err_code:1,message:'查询失败',affectedRows:0})
        res.json({err_code:0,message:results,affectedRows:0})
    })
})

// 根据Id更新指定的英雄信息
router.post('/api/updatehero',(req,res) => {
    const sql = 'update heros set ? where id = ?'
    conn.query(sql,[req.body,req.body.id],(err,results) => {
        if(err) return res.json({err_code:1,message:'更新失败',affectedRows:0})
        if(results.affectedRows !== 1) return res.json({err_code:1,message:'更新的英雄不存在',affectedRows:0})
        res.json({err_code:0,message:'更新成功',affectedRows:results.affectedRows})
    })
})

// 根据Id获取指定的英雄信息
router.get('/api/gethero',(req,res) => {
    const sql = 'select * from heros where id = ?'
    // req.query 可以获取url地址栏?后面的参数
    const id = req.query.id
    conn.query(sql,id,(err,results) => {
        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        if(results.length !== 1) return res.json({err_code:1,message:'获取的英雄不存在',affectedRows:0})
        res.json({err_code:0,message:results[0],affectedRows:results.affectedRows})
    })
})

// 根据id删除英雄
router.get('/api/delhero',(req,res) => {
    const sql = 'update heros set isdel = 1 where id = ?'
    // req.query 可以获取url地址栏?后面的参数
    const id = req.query.id
    console.log(id)
    conn.query(sql,id,(err,results) => {
        if(err) return res.json({err_code:1,message:'删除失败',affectedRows:0})
        if(results.affectedRows !== 1) return res.json({err_code:1,message:'删除的英雄不存在',affectedRows:0})
        res.json({err_code:0,message:'删除英雄成功',affectedRows:results.affectedRows})
    })
})

// 添加英雄
router.post('/api/addhero',(req,res) => {
    const sql = 'insert into heros set ?'
    // req.query 可以获取url地址栏?后面的参数
    const hero = req.body
    hero.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    conn.query(sql,hero,(err,results) => {
        if(err) return res.json({err_code:1,message:'添加失败',affectedRows:0})
        if(results.affectedRows !== 1) return res.json({err_code:1,message:'添加的英雄不存在',affectedRows:0})
        res.json({err_code:0,message:'添加英雄成功',affectedRows:results.affectedRows})
    })
})

module.exports = router