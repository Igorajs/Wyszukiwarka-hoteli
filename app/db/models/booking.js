const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    nameH: {
        type: String,
        required: [true,"Pole 'Nazwa' jest wymagane!"],
        trim: true,
        minLength: [3,"Pole 'Nazwa' musi zawierać więcej niż 3 litery!"]
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        tolowercase: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    count: {
        type: Number,
        required: true,
        min: 1
    },
    days: {
        type: Number,
        required: [true,"Pole 'Cena' jest wymagane!"],
        min: 1
    },
    time: {
        type: String,
        required: true,
    },
    user:{
        type: String,
        required: true,
    },
    nameI:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    mainImg:{
        type: String,
        required: true,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;