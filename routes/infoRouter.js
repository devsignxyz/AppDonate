var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Infos = require('../models/info')
var Verify = require('./verify');
var infoRouter = express.Router();
infoRouter.use(bodyParser.json());

infoRouter.route('/')
.get(function (req, res, next) {
    Infos.find(req.query) .populate('comments.postedBy')
        .exec(function (err, info) {
        if (err) next (err);
        res.json(info);
    });
})

.post(function(req, res, next){
     Infos.create(req.body, function (err, info) {
        if (err) throw err;
        console.log('informa created!');
        var id = info._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the info with id: ' + id);
    });
})
.delete( Verify.verifyAdmin,function(req, res, next){
        Infos.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

infoRouter.route('/:infoId')

.get(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function (req, res, next) {
    Infos.findById(req.params.infoId, function (err, info) {
        if (err) next (err);
        res.json(info);
    });
})

.put( Verify.verifyAdmin, function(req, res, next){
        Infos.findByIdAndUpdate(req.params.infoId, {
        $set: req.body
    }, {
        new: true
    }, function (err, info) {
        if (err) throw err;
        res.json(info);
    });
})

.delete( Verify.verifyAdmin, function(req, res, next){
        Infos.findByIdAndRemove(req.params.infoId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});
module.exports = infoRouter;