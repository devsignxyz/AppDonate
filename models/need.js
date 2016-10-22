// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({
    name:  {
        type: String,
        
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    email:{ 
    type:String,
    required:true
},
    
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


// create a schema
var needSchema = new Schema({
    
	
	image:{
		type:String,
	},
	
    name: {
        type: String,
        required: true,
        unique: true
    },
	
	
	description: {
		
		type:String,
			
	},
	
    comments:[commentSchema]
}, {
    timestamps: true
});







// the schema is useless so far
// we need to create a model using it
var Needs = mongoose.model('Needs', needSchema);

// make this available to our Node applications
module.exports = Needs;