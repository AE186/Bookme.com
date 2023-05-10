const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstname :{
        type: String,
        required:true,
    
    },
    lastname : {
        type:String,
        required:true
    },
    nic : {
        type:String,
        required:true
    } 

    
});

customer = mongoose.model("customerdata", customerSchema)
module.exports = customer