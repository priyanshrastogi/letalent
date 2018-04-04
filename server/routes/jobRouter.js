const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Jobs = require('../models/job');
const Proposals = require('../models/proposal');
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
    req.body.postedBy = req.user._id;//user's ID matches the id of the comment's author
    Jobs.create(req.body)
    .then((job) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(job)
    },(err) => next(err))
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

jobRouter.route('/:jobId/proposals')
.get((req,res,next) => {
    Proposals.find(req.params.jobId)
    .then((proposals) => {
        if (proposals!= null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(proposals);
        }
        else {
            err = new Error('Proposal not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    req.body.proposalUser = req.user._id;
    Proposals.create(req.body)
    .then((proposal) => {
        if (proposal != null) {
             Jobs.findById(req.params.jobId)
             .then((job) => {
                job.proposals.push(proposal);
                job.save()
                .then((job) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(job);
            },(err) => next(err));
        },(err) => next(err));
      }
        else {
            err = new Error('Proposal not created');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

jobRouter.get('/:jobId/proposals/:proposalId',(req,res,next) => {
    Proposals.find(req.params.jobId)
    .then((proposals) => {
        if (proposals!= null) {
          for (var i = (proposals.length -1); i >= 0; i--) {
              if(proposals[i]._id==req.params.proposalId)
              {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(proposals[i]);
                break;
              }
              else if(i==0){
                err = new Error('Proposal not found');
                err.status = 404;
                return next(err);
              }
          }
        }
        else {
            err = new Error('Proposal not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

jobRouter.post('/:jobId/proposals/:proposalId/accept',authenticate.verifyUser,(req,res,next) => {
    req.body.proposalUser = req.user._id
    Proposal.findById(req.params.proposalId)
    .then((proposal) => {
      if(proposal!=null){
      proposal.status = "accepted";
      proposal.save()
      .then((proposal) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(proposal);
  },(err) => next(err));
}
else{
  err = new Error('Proposal not found');
  err.status = 404;
  return next(err);
}

},(err) => next(err))
.catch((err) => next(err));
});

module.exports = jobRouter;
