// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
	
	postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        donors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Donor'
        }]
    }, 
    {
        timestamps: true
    }
);
	});

// the schema is useless so far
// we need to create a model using it
var favorites = mongoose.model('donors', dornorSchema);

// make this available to our Node applications
module.exports = Favorites;