const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    login: {
        type: String,
        required: [true,"Pole 'Login' jest wymagane!"],
        unique: [true,'Nie jest unikalny'],
        trim: true,
        lowercase: true,
        minLength: [3,"Pole 'Login' musi zawierać więcej niż 3 litery!"],
        maxLength: [16,"Pole 'Login' nie może być dłuższe niż 16 znaków!"]
    },
    password:{
        type: String,
        required: [true, "Pole 'Hasło' jest wymagane!"],
        minLength: [4,"Pole 'Hasło' musi zawierać więcej niż 4 litery!"]
    },
    name: {
        type: String,
        required: [true,"Pole 'Imie' jest wymagane!"],
        trim: true,
        minLength: [3,"Pole 'Imie' musi zawierać więcej niż 3 litery!"],
        maxLength: [16,"Pole 'Imie' nie może być dłuższe niż 16 znaków!"]
    },
    lastname: {
        type: String,
        required: [true,"Pole 'Nazwisko' jest wymagane!"],
        trim: true,
        minLength: [3,"Pole 'Nazwisko' musi zawierać więcej niż 3 litery!"],
        maxLength: [20,"Pole 'Nazwisko' nie może być dłuższe niż 20 znaków!"]
    },
    rights:{
        type: Number,
        minLength: 1,
        maxLength: 1,
        required: [true, "Pole 'Przyznaj prawa' nie może być puste"],
        min: [1, "Pole 'Przyznaj prawa' musi być w przedziale 1 - 2"],
        max: [2, "Pole 'Przyznaj prawa' musi być w przedziale 1 - 2"],
    }
});
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    } else {
        const salt = bcrypt.genSaltSync(10); 
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        next();
    }
});

userSchema.post('save', function(error, doc, next){
    if (error.code === 11000){
        error.errors = { login: {message: 'Taki użytkownik już istnieje!'}};
    }
    next(error);
})

userSchema.methods = {
    comparePassword(password){
        return bcrypt.compareSync(password, this.password);
    }
}
const User = mongoose.model('User', userSchema);
module.exports = User;