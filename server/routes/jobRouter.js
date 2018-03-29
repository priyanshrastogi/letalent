const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Jobs = require('../models/job');

var authenticate = require('../authenticate');
const jobRouter = express.Router();

jobRouter.use(bodyParser.json());

jobRouter.get('/:from-:to',(req,res,next) => {
    Jobs.find({skip: req.params.from, limit: req.params.to})
    .then((jobs) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(jobs)
    },(err) => next(err))
     .catch((err) => next(err));
});


jobRouter.post('/',authenticate.verifyUser,(req, res, next) => {
    Jobs.create(req.body)
    .then((job) => {
        if (job != null) {
            req.body.postedBy = req.user._id;//user's ID matches the id of the comment's author
            job.save()
            .then((job) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(job);
            }, (err) => next(err));
        }
        else {
            err = new Error('Job not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


jobRouter.route('/:jobId')
.get((req,res,next)  => {
  Jobs.findById(req.params.jobId)
  .then((job) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job);
    },(err) => next(err))
     .catch((err) => next(err));
})
.put((req, res, next) => {
  Jobs.findByIdAndUpdate(req.params.jobId, {
         $set: req.body
     }, { new: true })
     .then((job) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
  Jobs.findByIdAndRemove(req.params.jobId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});
