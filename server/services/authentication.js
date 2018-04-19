const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

exports.getUserToken = (user) => {
    return jwt.sign({_id: user._id}, config.secretKey, {expiresIn: '3d'});
}

//Local Strategy for email and password authentication
const localOptions = {};
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
    User.findOne({username: username})
    .then((user) => {
        if(!user)
            return done(null, false, { message: 'UserNotFound' });
        
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err, false); }

            if(!isMatch)
                return done(null, false, { message: 'BadPassword' });

            return done(null, user);
        })
    })
    .catch((err) => {
        return done(err, false);
    })
})

//JWT Strategy for JWT authentication
const jwtOptions = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
 };
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload._id)
    .then((user) => {
        if(user)
            return done(null, user);
        else
            return done(null, false);
    })
    .catch((err) => {
        return done(err, false);
    })
});

passport.use(jwtLogin);
passport.use(localLogin);

exports.requireAuth = passport.authenticate('jwt', { session: false });