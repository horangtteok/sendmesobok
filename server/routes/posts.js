const express = require('express');
const router = express.Router();
const { Post } = require('../models/Post')

//=================================
//             post
//=================================

// api
router.post('/getposts', (req, res) => {

    Post.find({ "userid": req.body.userId })
        .exec((err, posts) => { // query를 돌려 err, info 받음
            if (err) return res.status(400).send(err) // err 발생 시, client에 error 보냄

            let securedPost = [];
            for (var i=0; i < posts.length; i++){
                const post = new Post({
                    userid: posts[i].userid,
                    name: posts[i].name,
                    message: "메시지는 설날에 확인할 수 있어요!",
                    deco: posts[i].deco,
                })
                securedPost.push(post)
            }
            
            return res.status(200).json({ success: true, posts: securedPost }) // 200: 성공을 의미
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
