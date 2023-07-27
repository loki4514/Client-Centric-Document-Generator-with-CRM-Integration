const mongoose = require('mongoose')
const {Schema} = mongoose
const RfpSchema = new Schema({
    rfp : {
        type : String,
        unique : true,
        required : true
    },
    call_sign : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    customer_name : {
        type : String,
        required : true
    },
    spoc : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true

    },
    status : {
        type : String,
        default : "Pending"
    },
    remarks : {
        type : String
    }
})

module.exports = mongoose.model('rfp',RfpSchema)