const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

module.exports = function(app) {
    let ExtractJwt = passportJWT.ExtractJwt;
    let JwtStrategy = passportJWT.Strategy;

    let jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = 'phanminh';

    let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
        console.log('payload received: ' + jwt_payload);
        let user = getUser({ id: jwt_payload.id});

        if (user) {
            next(null, user);
        } else {
                next(null, false);
            }

       /* User.findOne({ where : { id : jwt_payload.id }}).then(function(user){
            if (user) {
               next(null, user);
            } else {
               next(null, false);
            }
        }) */
        
});

        passport.use(strategy);
    }