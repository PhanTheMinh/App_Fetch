const express = require('express')
const followRouter = express.Router()
const Follow = require('../../models').Follow

// create follow
followRouter.post('/newFollow', async (req, res) => {
    try {
        if (req.session.authUser) {
            const followInfo = req.body
            const result = await Follow.findAll({
                where: { userId: followInfo.userId, userId_follow: followInfo.userId_follow }
            })
            if (result == '') {
                const newFollow = await Follow.create({
                    userId: followInfo.userId,
                    userId_follow: followInfo.userId_follow
                })
                res.status(200).json({
                    success: true,
                    data: newFollow
                })
            } else {
                res.json({
                    success: false,
                    message: "userId_follow exist"
                })
            }
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

// unfollow
followRouter.post('/unfollow', async (req, res) => {
    try {
        if (req.session.authUser) {
            const followInfo = req.body
            const result = await Follow.findAll({
                where: { userId: followInfo.userId, userId_follow: followInfo.userId_follow }
            })
            const condition = { where: { userId: followInfo.userId, userId_follow: followInfo.userId_follow } }
            if (result == '') {
                res.status(200).json({
                    success: false,
                    message: "userId_follow not exist"
                })
            } else {
                await Follow.destroy(condition)
                res.json({
                    success: true,
                    message: "Done"
                })
            }
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

// get all follow
followRouter.get('/getAllFollow/:userId', async (req, res) => {
    try {
        if (req.session.authUser) {
            const userId = req.params.userId
            const result = await Follow.findAll({ where: { userId: userId } })
            if (result != '') {
                res.status(200).json({
                    success: true,
                    data: result
                })
            } else {
                res.json({
                    message: "no follower"
                })
            }
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

module.exports = followRouter