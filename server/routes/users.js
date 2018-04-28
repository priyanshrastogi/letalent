var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var crypto = require('crypto');
var User = require('../models/user');
var UserProfile = require('../models/userProfile');
var UserActivationToken = require('../models/userActivationToken');
var ResetPasswordToken = require('../models/resetPasswordToken');
var Wallet = require('../models/wallet');
var authentication = require('../services/authentication');
var mailer = require('../services/mailer');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  UserProfile.find({}).populate('user','name email userType')
    .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.put('/', authentication.requireAuth, (req, res, next) => {
  UserProfile.findOneAndUpdate({user: req.user._id}, { $set: req.body }, { new: true }).populate('user','name email userType')
  .then(user => {
    res.json(user);
  })
  .catch(err => { return next(err) });
})

router.post('/signup', (req,res,next) => {
  User.findOne({email: req.body.email})
  .then((user) => {
    if (user) {
      return res.status(400).send({error: "EmailAlreadyExists"});
    }
    User.findOne({ username: req.body.username })
    .then((user) => {
    if (user) {
      return res.status(400).send({ error: "UsernameAlreadyExists" });
    }
    User.create(req.body)
    .then((user) => {
    UserProfile.create({ user: user._id, username: user.username })
    .then(
    crypto.randomBytes(32, (err, buff) => {
      const token = buff.toString('hex');
      UserActivationToken.create({ token, user: user._id })
      .then(() => {
      res.json({ success: true, token: authentication.getUserToken(user), user: { _id: user._id, name: user.name, username: user.username, userType: user.userType, email: user.email } });
      if(user.userType == 'work'){
        var link = `http://localhost:8000/users/activate/${token}`;
        mailer.sendActivationMail(user.email,user.name,link);
      }
      else{
        var link = `http://localhost:8000/users/activate/${token}`;
        mailer.sendActivation2Mail(user.email,user.name,link);
      }
      }).catch((err) => { return next(err) });
    })).catch((err) => { return next(err) });
    }).catch((err) => { return next(err) });
    }).catch((err) => { return next(err) });
  }).catch((err) => { return next(err) });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.status(401).send(info); }
    console.log(user);
    res.json({ token: authentication.getUserToken(user), user: { _id: user._id, name: user.name, username: user.username, userType: user.userType }});
  })(req, res, next);
});

router.get('/wallet', authentication.requireAuth, (req, res, next) => {
  Wallet.findOne({user: req.user._id})
  .then(wallet => {
    res.json(wallet);
  })
})

router.get('/activate/:activationToken', (req, res, next) =>{
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

router.post('/forgotpassword/:email' , (req, res, next) => {
  User.findOne({email: req.params.email})
  .then((user) => {
    if(user) {
      crypto.randomBytes(32, (err, buff) => {
        const token = buff.toString('hex');
        ResetPasswordToken.create({ token, user: user._id })
        .then((tokenObj) => {
          //Mail Reset Password Link
          const link = `http://localhost:8000/users/resetpassword/${token}`;
          mailer.sendForgotPasswordMail(req.params.email,link);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({status: "Reset password link sent"});
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

router.get('/resetpassword/:resetpasswordtoken',(req,res,next)=>{//to check if token actually exists and open forgot password page
  ResetPasswordToken.findOne({token:req.params.resetpasswordtoken})
  .then((tokenObj)=>{
     if(tokenObj){
       res.statusCode = 200;
       res.end();
     }
    else{
      err = new Error('Not found');
      err.status = 404;
      return next(err);
    }
  })
  .catch((err) => next(err));
});

router.post('/resetpassword/:resetpasswordtoken',(req,res,next)=>{
  ResetPasswordToken.findOne({token:req.params.resetpasswordtoken})
  .then((tokenObj)=>{
  if(tokenObj){
  User.findById(tokenObj.user)
  .then((user)=>{
    if(user!=null) {
      user.password = req.body.password;
      user.save();
      res.status(200).json({success: true});
    }
    else{
      err = new Error('Not found');
      err.status = 404;
      return next(err);
    }
  })
  .catch((err) => next(err));
  }})
});

router.get('/education', authentication.requireAuth, (req, res, next) => {
  UserProfile.findOne({user: req.user._id})
  .then((userprofile) => {
    if (userprofile!= null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(userprofile.education);
        }
        else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/education', authentication.requireAuth, (req, res, next) => {
  UserProfile.findOne({user: req.user._id})
  .then((userprofile) => {
    if (userprofile!= null) {
        userprofile.education.unshift(req.body);
        userprofile.save()
        .then((userprofile) => {
          User.findById(userprofile.user).select('name email userType')
          .then(user => {
            userprofile.user = user;
            res.json(userprofile);
          })
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

router.get('/projects', authentication.requireAuth, (req, res, next) => {
  UserProfile.findOne({ user: req.user._id})
  .then((userprofile) => {
    if (userprofile!= null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(userprofile.projects);
        }
        else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/projects', authentication.requireAuth, (req, res, next) => {
  UserProfile.findOne({ user: req.user._id})
  .then((userprofile) => {
    if (userprofile!= null) {
        userprofile.projects.unshift(req.body);
        userprofile.save()
        .then((userprofile) => {
          User.findById(userprofile.user).select('name email userType')
          .then(user => {
            userprofile.user = user;
            res.json(userprofile);
          })
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

router.get('/workexperience', authentication.requireAuth, (req, res, next) => {
  UserProfile.findOne({user: req.user._id})
  .then((userprofile) => {
    if (userprofile!= null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(userprofile.workExperience);
        }
        else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/workexperience', authentication.requireAuth, (req, res, next) => {
  UserProfile.findOne({user: req.user._id} )
  .then((userprofile) => {
    if (userprofile!= null) {
        userprofile.workExperience.unshift(req.body);
        userprofile.save()
        .then((userprofile) => {
          User.findById(userprofile.user).select('name email userType')
          .then(user => {
            userprofile.user = user;
            res.json(userprofile);
          })
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

router.get('/:username', (req, res, next) => {
  UserProfile.findOne({username: req.params.username}).populate('user', 'name email userType')
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router;
