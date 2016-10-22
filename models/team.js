// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// create a schema
var teamSchema = new Schema({
    image: {
        type: String,
        required: true,
        unique: true,
    },
	
	name: {
		type: String,
		required: true,
		
	},
	
	designation:{	
		type:String,
		required: true
		
			
	},
	abbr:{
		type:String,
		
	},
	
	
	
    
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Team = mongoose.model('Team', teamSchema);


// make this available to our Node applications
module.exports = Team;