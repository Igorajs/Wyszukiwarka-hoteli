const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    time:{
        type: String,
        required: true,
        trim: true,
        tolowercase: true
    },
    user: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mainImg: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const History = mongoose.model('History', historySchema);
module.exports = History;