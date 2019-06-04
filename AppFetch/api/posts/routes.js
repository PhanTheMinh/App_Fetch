const express = require('express')
const postRouter = express.Router()
const Post = require('../../models').Post
const Image = require('../../models').Image
const Comment = require('../../models').Comment

// create post
postRouter.post('/newPost', async (req, res) => {
    try {
        if (req.session.authUser) {
            const postInfo = req.body
            const result = await Post.create({
                userId: postInfo.userId,
                description: postInfo.description,
                Image: [{
                    urlImage: postInfo.urlImage
                }]
            }, {
                    include: [Image]
                })

            res.status(200).json({
                success: true,
                data: result
            })
        } else {
            res.json({
                success: false,
                message: 'Please login'
            })
        }
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: (error.message || 'Internal server error')
        })
    }
})

// get all post
postRouter.get('/getAll', async (req, res) => {
    try {
        const result = await Post.findAll({
            include: [{
                model: Image,
                include: [{
                    model: Comment
                }]
            }],
        })
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: (error.message || 'Internal server error')
        })
    }
})

// get post by Id
postRouter.get('/getPostById/:postId', async (req, res) => {
    try {
        const postId = req.params.postId
        const result = await Post.findByPk(postId, {
            include: [{
                model: Image,
                include: [{
                    model: Comment
                }]
            }]
        })
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: (error.message || 'Internal server error')
        })
    }
})
module.exports = postRouter