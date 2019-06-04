const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const expressSession = require('express-session')

var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport')(passport); 
const userRouter = require('./api/users/routes')
const postRouter = require('./api/posts/routes')
const commentRouter = require('./api/comments/routes')
const followRouter = require('./api/follows/routes')

const TimoApp = async () => {
    try {
        // init app
        const app = express()
        const sequelize = new Sequelize('postgres://postgres:23041997@localhost:5432/my_db', {logging: false})
        await sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.')
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err)
            })
        // using middlewares + routers
        app.use(expressSession({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
          }))
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())

        app.use(passport.initialize());
        app.use(passport.session());
        app.set('view engine', 'ejs'); 

        app.use(flash()); 
        
        require('./app/routes.js')(app, passport); 
        app.use('/api/users', userRouter)
        app.use('/api/posts', postRouter)
        app.use('/api/comments', commentRouter)
        app.use('/api/follows', followRouter)

        // start server
        await app.listen(process.env.PORT || 3000)
            console.log(`Server listen on PORT ${process.env.PORT || 3000} ...`)
            } catch (error) {
            console.log('Error happen: ', error)
            }
        }

TimoApp()