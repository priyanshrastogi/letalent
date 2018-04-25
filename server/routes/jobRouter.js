const express = require('express');
const mongoose = require('mongoose');
const Jobs = require('../models/job');
const Proposals = require('../models/proposal');
const authentication = require('../services/authentication');
const mailer = require('../services/mailer');
const jobRouter = express.Router();

jobRouter.get('/',(req,res,next) => {
    Jobs.find({}).sort({$natural:-1})
    .then((jobs) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(jobs)
    },(err) => next(err))
     .catch((err) => next(err));
});

jobRouter.post('/', authentication.requireAuth, (req, res, next) => {
    req.body.postedBy = req.user._id;
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
      res.json("Deletion Successful");
  }, (err) => next(err))
  .catch((err) => next(err));
});

jobRouter.route('/:jobId/proposals')
.get((req,res,next) => {
    Proposals.find({job: req.params.jobId})
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
.post(authentication.requireAuth, (req, res, next) => {
    req.body.proposalUser = req.user._id;
    req.body.job = req.params.jobId;
    Proposals.create(req.body)
    .then((proposal) => {
        if (proposal != null) {
             Jobs.findById(req.params.jobId).populate('postedBy','name email')
             .then((job) => {
                job.proposals.push(proposal);
                job.save()
                .then((job) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(job);
                mailer.sendProposalMail(job);
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

jobRouter.get('/:jobId/proposals/:proposalId', (req,res,next) => {
    Proposals.find({job:req.params.jobId})
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

jobRouter.post('/:jobId/proposals/:proposalId/accept', authentication.requireAuth, (req,res,next) => {
    Proposals.findById(req.params.proposalId).populate('proposalUser','email name').populate({
      path: 'job', model: 'Job', select:'postedBy', populate : {
        path: 'postedBy', model: 'User', select: 'name'
      }
    })
    .then((proposal) => {
        if(proposal!=null){
            console.log(proposal.job.postedBy._id);
            console.log(req.user._id);
            console.log(proposal.job.postedBy._id.equals(req.user._id));
            if(!proposal.job.postedBy._id.equals(req.user._id)) {
                return res.status(401).send('Unauthorized');
            }
            proposal.status = "accepted";
            proposal.save()
            .then((proposal) => {
                res.json(proposal);
                mailer.sendAcceptMail(proposal);
            },(err) => next(err));
        }
    else {
        err = new Error('Proposal not found');
        err.status = 404;
        return next(err);
}

},(err) => next(err))
.catch((err) => next(err));
});

module.exports = jobRouter;
