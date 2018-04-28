const express = require('express');
const mongoose = require('mongoose');
const Jobs = require('../models/job');
const Submissions = require('../models/jobsubmissions');
const Proposals = require('../models/proposal');
const JobProgress = require('../models/jobprogress');
const authentication = require('../services/authentication');
const mailer = require('../services/mailer');
const jobRouter = express.Router();

jobRouter.get('/',(req,res,next) => {
    Jobs.find(req.query).sort({$natural:-1}).populate('workingUser','name username').populate('postedBy','name username email')
    .then((jobs) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(jobs);
    },(err) => next(err))
     .catch((err) => next(err));
});

jobRouter.post('/', authentication.requireAuth, (req, res, next) => {
    req.body.postedBy = req.user._id;
    Jobs.create(req.body)
    .then((job) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(job);
    },(err) => next(err))
    .catch((err) => next(err));
});

jobRouter.route('/:jobId')
.get((req,res,next)  => {
  Jobs.findById(req.params.jobId).populate('workingUser','name username').populate('postedBy','name username email')
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

jobRouter.route('/:jobId/incv')
.post((req, res, next) => {
    Jobs.findById(req.params.jobId)
    .then(job => {
        job.incrementViews();
        res.sendStatus(200);
    });
})

jobRouter.route('/:jobId/submit')
.post(authentication.requireAuth, (req, res, next) => {
    Jobs.findById(req.params.jobId)
    .then(job => {
        if(job !== null) {
            Submissions.create({job: req.params.jobId, submittedBy: req.user._id, sourceUrl: req.body.sourceUrl, reviewUrl: req.body.reviewUrl, message: req.body.message})
            .then(submission => {
                job.status = 'submitted';
                job.save()
                .then(job => {
                    res.status(200).json({success:true, submissionId: submission._id});
                })
            })
            .catch(err => { return next(err)});
        }
    })
});

jobRouter.route('/:jobId/submissions')
.get((req, res, next) => {
    Submissions.find({job: req.params.jobId}).sort({$natural:-1})
    .then(submissions => {
        res.status(200).json(submissions);
    })
    .catch(err=> { return next(err)})
})

jobRouter.route('/:jobId/progress')
.get((req, res, next) => {
    JobProgress.find({job: req.params.jobId}).sort({$natural: -1})
    .then(progress => {
        res.status(200).json(progress);
    })
    .catch(err => {return next(err)})
})
.post(authentication.requireAuth, (req, res, next) => {
    Jobs.findById(req.params.jobId)
    .then(job => {
        if(job !== null) {
            JobProgress.create({job: req.params.job, submittedBy: req.user._id, message})
            .then(progress => {
                res.status(200).json(progress);
            })
            .catch(err => { return next(err)})
        }
    })
})

jobRouter.route('/:jobId/proposals')
.get((req,res,next) => {
    Proposals.find({job: req.params.jobId}).populate('proposalUser', 'name username')
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
             Jobs.findById(req.params.jobId).populate('postedBy','name email username')
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
            //console.log(proposal.job.postedBy._id);
            //console.log(req.user._id);
            //console.log(proposal.job.postedBy._id.equals(req.user._id));
            if(!proposal.job.postedBy._id.equals(req.user._id)) {
                return res.status(401).send('Unauthorized');
            }
            if(proposal.status === 'accepted') {
                return res.status(400).send('AlreadyAccepted');
            }
            proposal.status = 'accepted';
            proposal.save()
            .then((proposal) => {
                Jobs.findById(req.params.jobId)
                .then(job => {
                    job.status = 'started';
                    job.workingUser = proposal.proposalUser;
                    job.finalAmount = proposal.proposedPrice;
                    job.save()
                    .then(job => {
                        res.json(proposal);
                        mailer.sendAcceptMail(proposal);
                    })
                })
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