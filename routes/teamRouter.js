var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Team = require('../models/team')
var teamRouter = express.Router();
teamRouter.use(bodyParser.json());

teamRouter.route('/')
.get(function(req,res,next){
       Team.find(req.query) .populate('comments.postedBy')
        .exec(function (err, team) {
        if (err) next (err);
        res.json(team);
    });
})

.post(function(req, res, next){
    Team.create(req.body, function (err, team) {
		if (err) throw err;
		console.log('team created');
		var id = team._id;
		
		res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the team with id: ' + id);
	}); 
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
        Team.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

teamRouter.route('/:teamId')

.get(function (req, res, next) {
    Team.findById(req.params.teamId, function (err, team) {
        if (err) next (err);
        res.json(team);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
        Team.findByIdAndUpdate(req.params.teamId, {
        $set: req.body
    }, {
        new: true
    }, function (err, team) {
        if (err) throw err;
        res.json(team);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
        TeamfindByIdAndRemove(req.params.teamId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = teamRouter;