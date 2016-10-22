var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var needSchema = new Schema({
    name:  {
        type:String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
   help: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    }
}, 
                               {
    timestamps: true
});


var Needs = mongoose.model('Needs', needSchema);

// make this available to our Node applications
module.exports = Needs;