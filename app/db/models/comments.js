const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    slug: {
        type: String,
        required: [true,"Pole 'Slug' jest wymagane!"],
        trim: true,
    },
    time:{
        type: String,
        required: true,
        trim: true,
        tolowercase: true
    },
    comment: {
        type: String,
        required: [true,"Pole 'Komentarz' jest wymagane!"],
        trim: true,
        minLength: [10,"Pole 'Komentarz' musi zawierać więcej niż 10 liter!"]
    },
    user: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;