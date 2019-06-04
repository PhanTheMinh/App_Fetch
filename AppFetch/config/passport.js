    var FacebookStrategy = require('passport-facebook').Strategy;
//    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var configAuth = require('./auth');
    var User = require("../models").User;

    module.exports = function (passport) {


        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });

            // Facebook login
        passport.use(new FacebookStrategy({
                clientID: configAuth.facebookAuth.clientID,
                clientSecret: configAuth.facebookAuth.clientSecret,
                callbackURL: configAuth.facebookAuth.callbackURL,
                profileFields: ['id','displayName','email','first_name','last_name','middle_name']
            },
        function (token, refreshToken, profile, done) {
                process.nextTick(function () {
                    console.log(profile);
                    User.findOne({ where : { FbId : profile.id } }, function (err, user) {
                        if (err) { return done(err); }
                        if (user) {
                            return done(null, user);
                        } else {
                            var newUser = new User();
                            newUser.create({
                                FbId : profile.id,
                                firstName : profile.name.familyName,
                                lastName : profile.name.givenName,
                                email : profile.emails[0].value
                            }, function(err){
                                if (err) throw err;
                                return  done(null, newUser);
                            });
                        }
                    });
                });
            }));
    };