const mongoose = require('mongoose')
const { Schema } = mongoose;
const NotesSchema = new Schema({
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'admin'
    },
    title : {
        type:String,
        required:true
    },
    description : {
        type : String,
        required : true,
        
    },
    tag : {
        type : String,
        required : true,

    }

})

module.exports = mongoose.model('note',NotesSchema)