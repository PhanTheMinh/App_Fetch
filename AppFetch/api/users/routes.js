const express = require('express')
const bcryptjs = require('bcryptjs')
const userRouter = express.Router()
const User = require('../../models').User
const passport = require('passport')

// register user
userRouter.post('/register', async (req, res) => {
    try {
        const userInfo = req.body

        const hashPassword = bcryptjs.hashSync(userInfo.password, 10)

        const result = await User.sync().then(() => {
            return User.create({
                ...userInfo,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                username: userInfo.username,
                password: hashPassword,
                email: userInfo.email,
                phone: userInfo.phone,
                gender: userInfo.gender
            })
        })
        res.status(200).json({
            success: true,
            userId: result.id
        })
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: (error.message || 'Internal server error')
        })
    }
})

// login
userRouter.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const existUser = await User.sync().then(() => {
            return User.findOne({
                where: { username: username }
            })
        })
        if (existUser) {
            // check password
            if (bcryptjs.compareSync(password, existUser.password)) {
                //save user  to session
                req.session.authUser = {
                    id: existUser.id,
                    username: existUser.username
                }
                req.session.save();

                res.status(200).json({
                    success: true,
                    message: 'Login success',
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: 'Password isnt correct',
                })
            }
        } else {
            res.status(404).json({
                success: false,
                message: 'Username not found',
            })
        }

    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: (error.message || 'Internal server error')
        })  
    }
})





// get user by id
userRouter.get('/getUserById/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        if (req.session.authUser) {
            const result = await User.findByPk(userId)
            if (!result) {
                res.status(404).json({
                    success: false,
                    message: "User not exist"
                })
            } else {
                res.status(200).json({
                    success: true,
                    data: result.username
                })
            }
        } else {
            res.json({
                success: false,
                message: "Please Login"
            })
        }
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: (error.message || 'Internal server error')
        })
    }
})


// userRouter.put('/update', async () => {
//     try {

//     } catch (error) {
//         res.status(error.status || 500).json({
//             success: false,
//             message: (error.message || 'Internal server error')
//         })
//     }
// })

module.exports = userRouter