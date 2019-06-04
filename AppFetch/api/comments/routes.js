const express = require('express')
const commentRouter = express.Router()
const Comment = require('../../models').Comment

// create comment
commentRouter.post('/:imageId/newComment', async (req, res) => {
    try {
        if (req.session.authUser){
            const imageId = req.params.imageId
            const commentInfo = req.body
            const result = await Comment.create({
                imageId: imageId,
                userId : commentInfo.userId,
                content: commentInfo.content
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

module.exports = commentRouter