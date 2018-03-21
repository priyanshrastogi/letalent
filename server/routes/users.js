var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var crypto = require('crypto');
var User = require('../models/user');
var UserProfile = require('../models/userProfile');
var UserActivationToken = require('../models/userActivationToken');
var ResetPasswordToken = require('../models/resetPasswordToken');
var authenticate = require('../authenticate');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({})
    .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.post('/signup', (req,res,next) => {
  User.register(new User({username: req.body.username, name: req.body.name, email: req.body.email, userType: req.body.userType}), req.body.password,
  (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err})
    }
    else {
      UserProfile.create({ user: user._id })
      .then(
        crypto.randomBytes(32, (err, buff) => {
          const token = buff.toString('hex');
          UserActivationToken.create({ token, user: user._id })
          .then(
            passport.authenticate('local')(req, res, () => {
              var token = authenticate.getToken({ _id: req.user._id });
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({ success: true, token: token, user: { _id: user._id, name: user.name, username: user.username, userType: user.userType } });
              //Send Mail
          }))
        })
      );
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, user: { _id: req.user._id, name: req.user.name, username: req.user.username, userType: req.user.userType }});
});

router.get('/activate/:activationToken', (req, res) =>{
   UserActivationToken.findOne({token: req.params.activationToken})//finding the token
  .then((tokenObj) => {
    if(tokenObj) {
      UserProfile.findOneAndUpdate({user: tokenObj.user}, {activatedAccount: true}, {new: true})//userprofile ki user field with useractivationtoken ki user field
      .then((userProfile) => {
        UserActivationToken.findOneAndRemove({_id: tokenObj._id})
        .then(() => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({status: "Account Activated"});
        });
      });
    }
    else {
      err = new Error('Activation token not found');
      err.status = 404;
      return next(err);
    }
  },(err) => next(err))
   .catch((err) => next(err));
});

router.post('/forgotpassword/:username' , (req, res) => {
  User.findOne({username: req.params.username})
  .then((user) => {
    if(user) {
      crypto.randomBytes(32, (err, buff) => {
        const token = buff.toString('hex');
        ResetPasswordToken.create({ token, user: user._id })
        .then(() => {
          //Mail Reset Password Link
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({status: "Reset Password Link Sent"});
        });
      })
    }
    else {
      err = new Error('User not found');
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
});


router.get('/resetpassword/:resetpasswordtoken',(req,res)=>{//to check if token actually exists
  resetPasswordToken.findOne({token:req.params.resetpasswordtoken})
  .then((tokenObj)=>{
     if(tokenObj){
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json("Suck it");
     }
    else{
      err = new Error('Not found');
      err.status = 404;
      return next(err);
    }
  },(err) => next(err))
  .catch((err) => next(err));
});

router.post('/resetpassword/:resetpasswordtoken',(req,res)=>{
  resetPasswordToken.findOne({token:req.params.resetpasswordtoken})
  .then((tokenObj)=>{
  if(tokenObj){
  UserProfile.findOne({user: tokenObj.user})
  .then((sanitizedUser)=>{
    sanitizedUser.setPassword(req.body.password, function(){
            sanitizedUser.save();
            res.status(200);
            res.json({message: 'password reset successful'});
        });
  },(err) => next(err))
}
else{
  err = new Error('Not found');
  err.status = 404;
  return next(err);
 }
},(err) => next(err))
  .catch((err) => next(err));
});


router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router;
