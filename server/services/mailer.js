var nodemailer = require('nodemailer');
var config = require('../config');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: config.mailUser,
        pass: config.mailPass
    }
});

exports.sendActivationMail = function(to,name,link) {
    const mailOptions = {
        from: '"Letalent" <letalent.mail@gmail.com>', // sender address
        to: to, // list of receivers
        subject: 'Welcome to Letalent', // Subject line
        text: 'Hey ' +name+ ',\n\nWelcome to Letalent.' + '\n\nPlease activate your account by clicking the link:\n'+link+'.\n\n'+
        'Please complete your profile and start looking for jobs.'
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
};


exports.sendActivation2Mail = function(to,name,link) {
    const mailOptions = {
        from: '"Letalent" <letalent.mail@gmail.com>', // sender address
        to: to, // list of receivers
        subject: 'Welcome to Letalent', // Subject line
        text: 'Hey ' +name+ ',\n\nWelcome to Letalent.' + '\n\nPlease activate your account by clicking the link:\n'+link+'.\n\n'+
        'You can start posting jobs.'
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
};


exports.sendAcceptMail = function(proposal) {
    const mailOptions = {
        from: '"Letalent" <letalent.mail@gmail.com>', // sender address
        to: proposal.proposalUser.email, // list of receivers
        subject: 'Congratulations, your proposal is accepted.', // Subject line
        text: 'Hey congrats,\n\n' +proposal.proposalUser.name+ ' your proposal is accepted by '+proposal.job.postedBy.name+'.'
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
};

exports.sendProposalMail = function(job) {
    const mailOptions = {
        from: '"Letalent" <letalent.mail@gmail.com>', // sender address
        to: job.postedBy.email, // list of receivers
        subject: 'Congratulations, you have received a proposal.', // Subject line
        text: 'Hey congrats,\n\n' +job.postedBy.name+ ' your job has received a proposal .'
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
};


exports.sendForgotPasswordMail = function(to,link) {
    const mailOptions = {
        from: '"Letalent" <letalent.mail@gmail.com>', // sender address
        to: to, // list of receivers
        subject: 'Reset password link', // Subject line
        text: 'Hey,\n\n you can reset your password using this link,\n\n'+link+'.' 
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
};
