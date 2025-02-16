const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        },
        author : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true
        }
        
});

module.exports = mongoose.model('Post' , postSchema);