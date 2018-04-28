const secretKey = require('../config').stripePrivateKey;
const stripe = require('stripe')(secretKey);
const Wallet = require('../models/wallet');
const Transaction = require('../models/transactions');
const Jobs = require('../models/job');
const authentication = require('../services/authentication');

var express = require('express');
var apiRouter = express.Router();

apiRouter.route('/stripe')
.post(authentication.requireAuth, (req, res, next) => {
    stripe.charges.create({
        amount: req.body.amount,
        currency: 'inr',
        description: req.body.description,
        source: req.body.token.id
    })
    .then(charge => {
        Transaction.create({amount: charge.amount/100, paidBy: req.user._id, paidTo: req.body.forUser, stripeTransactionId: charge.id})
        .then(transaction =>{
            Wallet.findOne({user: req.body.forUser})
            .then(wallet => {
                if (wallet!==null) {
                    wallet.balance = wallet.balance + transaction.amount;
                    wallet.transactions.push(transaction._id);
                    wallet.save()
                    .then(() => {
                        Wallet.findOne({user: req.user._id})
                        .then(wallet => {
                            if(wallet!==null) {
                                wallet.transactions.push(transaction._id);
                                wallet.save()
                                .then(() => {
                                    Jobs.findById(req.body.forJob)
                                    .then(job => {
                                        job.status = 'paid';
                                        job.transaction = transaction._id;
                                        job.save()
                                        .then(job => {
                                            res.status(200).json({success:true});
                                        })
                                        .catch((err) => { return next(err) });
                                    })
                                    .catch((err) => { return next(err) });
                                })
                                .catch((err) => { return next(err) });
                            }
                            else {
                                Wallet.create({user: req.user._id, transactions: [transaction._id]})
                                .then(() => {
                                    Jobs.findById(req.body.forJob)
                                    .then(job => {
                                        job.status = 'paid';
                                        job.transaction = transaction._id;
                                        job.save()
                                        .then(job => {
                                            res.status(200).json({success:true});
                                        })
                                        .catch((err) => { return next(err) });
                                    })
                                    .catch((err) => { return next(err) });
                                })
                                .catch((err) => { return next(err) });
                            }
                        })
                    })
                }
                else {
                    Wallet.create({ user: req.body.forUser, balance: transaction.amount, transactions: [transaction._id]})
                    .then(() => {
                        Wallet.findOne({user: req.user._id})
                        .then(wallet => {
                            if(wallet!==null) {
                                wallet.transactions.push(transaction._id);
                                wallet.save()
                                .then(() => {
                                    Jobs.findById(req.body.forJob)
                                    .then(job => {
                                        job.status = 'paid';
                                        job.transaction = transaction._id;
                                        job.save()
                                        .then(job => {
                                            res.status(200).json({success:true});
                                        })
                                        .catch((err) => { return next(err) });
                                    })
                                    .catch((err) => { return next(err) });
                                })
                                .catch((err) => { return next(err) });
                            }
                            else {
                                Wallet.create({user: req.user._id, transactions: [transaction._id]})
                                .then(() => {
                                    Jobs.findById(req.body.forJob)
                                    .then(job => {
                                        job.status = 'paid';
                                        job.transaction = transaction._id;
                                        job.save()
                                        .then(job => {
                                            res.status(200).json({success:true});
                                        })
                                        .catch((err) => { return next(err) });
                                    })
                                    .catch((err) => { return next(err) });
                                })
                                .catch((err) => { return next(err) });
                            }
                        })
                    })
                }
            })
        })
    })
});

module.exports = apiRouter;