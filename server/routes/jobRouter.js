const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Jobs = require('../models/job');

const jobRouter = express.Router();

jobRouter.use(bodyParser.json());

jobRouter.get('/',(req,res,next) => {
    Jobs.find({})
    .then((jobs) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(jobs)
    },(err) => next(err))
     .catch((err) => next(err));
});

jobRouter.post('/',(req, res, next) => {
    Jobs.create(req.body)
    .then((job)=>{
      console.log('Job Created ',job);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(job);
    },(err) => next(err))
      .catch((err) => next(err));
});

jobRouter.get('/:jobId',(req,res,next) => {
  Jobs.findById(req.params.jobId)
  .then((job) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job);
    },(err) => next(err))
     .catch((err) => next(err));
});

jobRouter.put('/:jobId',(req, res, next) => {
  Jobs.findByIdAndUpdate(req.params.jobId, {
         $set: req.body
     }, { new: true })
     .then((job) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job);
    }, (err) => next(err))
    .catch((err) => next(err));
});

jobRouter.delete('/:jobId',(req, res, next) => {
  Jobs.findByIdAndRemove(req.params.jobId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = jobRouter;