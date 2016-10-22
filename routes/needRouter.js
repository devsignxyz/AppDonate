var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Needs = require('../models/need');
var Verify = require('./verify');

var needRouter = express.Router();
needRouter.use(bodyParser.json());

needRouter.route('/')
.get( function (req, res, next) {
    Needs.find(req.query)
        .populate('comments.postedBy')
        .exec(function (err, need) {
        if (err) next (err);
        res.json(need);
    });
})

.post( function (req, res, next) {
    Needs.create(req.body, function (err, need) {
        if (err) throw err;
        console.log('Need created!');
        var id = need._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the need with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
   Needs.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

needRouter.route('/:needId')
.get( function (req, res, next) {
   Needs.findById(req.params.needId)
        .populate('comments.postedBy')
        .exec(function (err, need) {
        if (err) next (err);
        res.json(need);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Needs.findByIdAndUpdate(req.params.needId, {
        $set: req.body
    }, {
        new: true
    }, function (err, need) {
        if (err) throw err;
        res.json(need);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Needs.findByIdAndRemove(req.params.needId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

needRouter.route('/:needId/comments')

.get(function (req, res, next) {
   Needs.findById(req.params.needId)
        .populate('comments.postedBy')
        .exec(function (err, need) {
        if (err) next (err);
        res.json(need.comments);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    Needs.findById(req.params.needId, function (err, need) {
        if (err) next (err);
        req.body.postedBy = req.decoded._id;
        need.comments.push(req.body
						  );
        need.save(function (err, need) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(need);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function (req, res, next) {
    Needs.findById(req.params.needId, function (err, need) {
        if (err) throw err;
        for (var i = (need.comments.length - 1); i >= 0; i--) {
            need.comments.id(need.comments[i]._id).remove();
        }
        need.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

needRouter.route('/:needId/comments/:commentId')


.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    Needs.findById(req.params.needId)
        .populate('comments.postedBy')
        .exec(function (err, need) {
        if (err) next (err);
        res.json(nedd.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser,function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
   Needs.findById(req.params.needId, function (err, need) {
        if (err) next (err);
        need.comments.id(req.params.commentId).remove();
                req.body.postedBy = req.decoded._id;
        need.comments.push(req.body);
        need.save(function (err, need) {
            if (err) next (err);
            console.log('Updated Comments!');
            res.json(need);
        });
    });
})

.delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Needs.findById(req.params.needId, function (err, need) {
        if (need.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        need.comments.id(req.params.commentId).remove();
       need.save(function (err, resp) {
            if (err) next (err);
            res.json(resp);
        });
    });
});
module.exports = needRouter;
