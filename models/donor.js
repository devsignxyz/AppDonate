// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name:  {
        type:String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    bloodtype: {
        type: String,
        required:true
    },
    
    comments: {
        type: String,
        required:false
    }

      }, {
    timestamps: true
});     

var donorSchema = new Schema({
    
    image:{
        
        type:String,
        required:true
    },
    
    name:  {
        type:String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    bloodtype: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
     comments:[commentSchema]
}, {
    timestamps: true
    
});



// the schema is useless so far
// we need to create a model using it
var Donors = mongoose.model('Donors', donorSchema);

// make this available to our Node applications
module.exports = Donors;