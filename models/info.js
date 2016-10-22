// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


// create a schema
var infoSchema = new Schema({
    titulo: {
        type: String,
        required: true,
       
    },
	image:{
		type:String,
	},
	
	conte: {
		
		type:String,
		default:""
	},
	
}, {
    timestamps: true
});
// the schema is useless so far
// we need to create a model using it
var Infos = mongoose.model('Infos', infoSchema);

// make this available to our Node applications
module.exports = Infos;