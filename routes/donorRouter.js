var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Donors = require('../models/donor');
var Verify = require('./verify');


var donorRouter = express.Router();
donorRouter.use(bodyParser.json());

donorRouter.route('/')
.get( function (req, res, next) {
    Donors.find(req.query)
        .populate('newdonors.postedBy')
        .exec(function (err, donor) {
        if (err) next (err);
        res.json(donor);
    });
})



.post( function (req, res, next) {
    Donors.create(req.body, function (err, donor) {
        if (err) throw err;
        console.log('Donor created!');
        var id = donor._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the donor with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Donors.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

donorRouter.route('/:donorId')
.get( function (req, res, next) {
    Donors.findById(req.params.donorId)
        .populate('comments.postedBy')
        .exec(function (err, donor) {
        if (err) next (err);
        res.json(donor);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Donors.findByIdAndUpdate(req.params.donorId, {
        $set: req.body
    }, {
        new: true
    }, function (err, donor) {
        if (err) throw err;
        res.json(donor);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Donors.findByIdAndRemove(req.params.donorId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

donorRouter.route('/:donorId/comments')

.get(function (req, res, next) {
    Donors.findById(req.params.donorId)
        .populate('comments.postedBy')
        .exec(function (err, donor) {
        if (err) next (err);
        res.json(donor.comments);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    Donors.findById(req.params.donorId, function (err, donor) {
        if (err) next (err);
        req.body.postedBy = req.decoded._id;
        donor.comments.push(req.body
						  );
        donor.save(function (err, donor) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(donor);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function (req, res, next) {
    Donors.findById(req.params.donorId, function (err, donor) {
        if (err) throw err;
        for (var i = (donor.comments.length - 1); i >= 0; i--) {
            donor.comments.id(donor.comments[i]._id).remove();
        }
        donor.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

donorRouter.route('/:donorId/comments/:commentId')


.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    Donors.findById(req.params.donorId)
        .populate('comments.postedBy')
        .exec(function (err, donor) {
        if (err) next (err);
        res.json(donor.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser,function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Donors.findById(req.params.donorId, function (err, donor) {
        if (err) next (err);
        donor.comments.id(req.params.commentId).remove();
                req.body.postedBy = req.decoded._id;
        donor.comments.push(req.body);
        donor.save(function (err, donor) {
            if (err) next (err);
            console.log('Updated Comments!');
            res.json(donor);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Donors.findById(req.params.donorId, function (err, donor) {
        if (donor.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        donor.comments.id(req.params.commentId).remove();
        donor.save(function (err, resp) {
            if (err) next (err);
            res.json(resp);
        });
    });
});
module.exports = donorRouter;
