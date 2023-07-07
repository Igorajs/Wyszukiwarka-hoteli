const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: [true,"Pole 'Nazwa' jest wymagane!"],
        unique: [true,'Nie jest unikalny'],
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
    place: {
        type: String,
        required: [true,"Pole 'Miejscowość' jest wymagane!"],
        trim: true,
        minLength: [3,"Pole 'Miejscowość' musi zawierać więcej niż 3 litery!"]
    },
    price: {
        type: Number,
        required: [true,"Pole 'Cena' jest wymagane!"],
        min: [1,"Pole 'Cena' musi mieć wartość większą niż 1"]
    },
    desc: {
        type: String,
        required: [true,"Pole 'Opis' jest wymagane!"],
        minLength: [100,"Pole 'Opis' musi zawierać więcej niż 100 liter!"]
    },
    map: {
        type: String,
        required: [true,"Pole 'Link do mapy' jest wymagane!"],
        minLength: [10,"Pole 'Link do mapy' musi zawierać więcej niż 10 liter!"]
    },
    faci: {
        type: [String],
        required: [true,"Pole 'Najlepsze udogodnienia' jest wymagane!"],
        trim: true,
        minLength: [10,"Pole 'Najlepsze udogodnienia' musi zawierać więcej niż 10 liter!"]
    },
    rate: {
        type: Number,
        required: [true,"Pole 'Ocena' jest wymagane!"],
        max: [5,"Pole 'Ocena' może wynosić maksymalnie 5!"],
        min: [0,"Pole 'Ocena' może wynosić minimalnie!"]
    },
    mainImg:{
        type: String,
        required: [true,"Pole 'Zdjęcie główne' jest wymagane!"],
        minLength: [10,"Pole 'Zdjęcie główne' musi zawierać więcej niż 10 liter!"]
    },
    miniImg: {
        type: [String],
        trim: true
    },
    booking: {
        type: Number,
        required: [true,"Pole 'Max długość rezerwacji' jest wymagane!"],
    }
});

const Hotel = mongoose.model('Hotele', hotelSchema);
module.exports = Hotel;