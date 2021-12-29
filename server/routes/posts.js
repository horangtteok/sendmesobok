const express = require('express');
const router = express.Router();
const { Post } = require('../models/Post')

//=================================
//             post
//=================================

// api
router.post('/getposts', (req, res) => {

    // mongoDB에서 favorite 숫자를 가져오기
    Post.find({ "userid": req.body.userId })
        .exec((err, info) => { // query를 돌려 err, info 받음
            if (err) return res.status(400).send(err) // err 발생 시, client에 error 보냄
            // 프론트에 다시 숫자 정보 보내주기
            return res.status(200).json({ success: true, posts: info }) // 200: 성공을 의미
        })
})

router.post('/send', (req, res) => {
    
    const post = new Post(req.body)
    
    post.save((err, doc) => {
        if(err) return res.status(400).send(err) // error
        return res.status(200).json({ success:true }) // 성공
    }) // posts doc에 저장
    
})

module.exports = router;
