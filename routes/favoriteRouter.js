var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites')
var Verify = require('./verify');
var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  
    .get(function(req, res, next){
        Favorites.findOne(req.query)
            .populate('postedBy')
            .populate('donors')
            .exec(function (err, favorite) {
            if (err) next (err);
            //convert into a json string
            res.json(favorite);
        });
    })
    .post(function (req, res, next) {
        Favorites.findOneAndUpdate(
          { postedBy: req.decoded._doc._id },
          { $addToSet: { donors: req.body._id } },
          { upsert: true, new: true },
          function (err, favorite) {
            if (err) return next(err)
            res.json(favorite)
          })
    })
    .delete(function(req, res, next){
        Favorites.remove({postedBy: req.decoded._doc._id}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

favoriteRouter.route('/:donorObjectId')
    .all(Verify.verifyOrdinaryUser)
    .delete(function(req, res, next){
        Favorites.findOneAndUpdate(
          { postedBy: req.decoded._doc._id },
          { $pullAll: { donors: [req.params.donorObjectId] } },
          { new: true },
          function (err, favorite) {
            if (err) return next(err)
            res.json(favorite)
          })
    });
module.exports = favoriteRouter; 