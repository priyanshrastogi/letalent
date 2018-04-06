const express = require('express');
const mongoose = require('mongoose');
const skills = require('../models/skills');

const skillRouter = express.Router();


skillRouter.post('/',(req, res, next) => {
    skills.create(req.body)
    .then((skill) => {
        res.json(skill);
    })
    .catch((err) => next(err));
});


skillRouter.get('/',(req,res,next) => {
    skills.find({})
    .then((skills) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(skills)
    },(err) => next(err))
     .catch((err) => next(err));
});

skillRouter.route('/:keyword')
.get((req,res,next)  => {
  var regexstr = new RegExp("^"+req.params.keyword);
  skills.find({"skill" : {$regex: regexstr, $options: 'i' }})
  .then((skills) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(skills);
    },(err) => next(err))
     .catch((err) => next(err));
})


module.exports = skillRouter;

