const mongoose = require('mongoose');
const Hotel = require('../db/models/hotels');
const Comment = require('../db/models/comments');
const History = require('../db/models/history');
const User = require('../db/models/users');
const Booking = require('../db/models/booking');

class AdminAction  {
    showAdmin(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            res.render('admin');
        }
    }

    //WYLISTOWANIE

    async showAdminHotels(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const hotels = await Hotel.find({});  
                res.render('admin-hotele', {
                hotels
            });
        }
    }
    async showAdminUsers(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const users = await User.find({});  
                res.render('admin-uzytkownicy', {
                users
            });
        }
    }
    async showAdminComments(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const comments = await Comment.find({}).sort({_id: -1}).limit(100); 
                res.render('admin-komentarze', {
                comments
            });
        }
    }
    async showAdminHistory(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const history = await History.find({}).sort({_id: -1}).limit(100);  
                res.render('admin-historia', {
                history
            });
        }
    }
    async showAdminBooking(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const booking = await Booking.find({}).sort({_id: -1}).limit(100); 
                res.render('admin-rezerwacje', {
                booking
            });
        }
    }

    //USUWANIE

    async deleteAdminBooking(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const {id} = req.params;
            const booking = await Booking.find({_id:new mongoose.Types.ObjectId(id)});
            if(booking === null){
                res.redirect('/error');
            }else{
               await Booking.deleteOne({_id:new mongoose.Types.ObjectId(id)});
               res.redirect('/admin/rezerwacje');
            }
        }
    }
    async deleteAdminComment(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const {id} = req.params;
            const comment = await Comment.find({_id:new mongoose.Types.ObjectId(id)});
            if(comment === null){
                res.redirect('/error');
            }else{
               await Comment.deleteOne({_id:new mongoose.Types.ObjectId(id)});
               res.redirect('/admin/komentarze');
            }
        }
    }
    async deleteAdminHistory(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const {id} = req.params;
            const history = await History.find({_id:new mongoose.Types.ObjectId(id)});
            if(history === null){
                res.redirect('/error');
            }else{
               await History.deleteOne({_id:new mongoose.Types.ObjectId(id)});
               res.redirect('/admin/historia');
            }
        }
    }
    async deleteAdminUser(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const {login} = req.params;
            const user = await User.find({login:login});
            if(user === null){
                res.redirect('/error');
            }else{
               await User.deleteOne({login:login});
               res.redirect('/admin/uzytkownicy');
            }
        }
    }
    async deleteAdminHotel(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const {slug} = req.params;
            const hotel = await Hotel.find({slug:slug});
            if(hotel === null){
                res.redirect('/error');
            }else{
               await Hotel.deleteOne({slug:slug});
               res.redirect('/admin/hotele');
            }
        }
    }

    //DODAWANIE

    showAddHotel(req,res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            res.render('admin-dodaj-hotel');
        }
    }
    async addHotel(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            let faci = req.body.faci.split(",");
            let tabF = faci.map(element => {
                return element.trim();
            });
            tabF = tabF.filter(item => item);
        
            const r = req.body;
            const hotel = new Hotel({
                name: r.name,
                slug: r.name.replaceAll(" ","-").toLowerCase(),
                desc: r.desc,
                price: r.price,
                place: r.place,
                faci: tabF,
                rate: r.rate,
                map: r.map,
                mainImg: r.mainImg,
                miniImg: r.subImg.filter(item => item),
                booking: r.booking
            });
            try{
                await hotel.save().then(()=>{
                    res.render('admin-dodaj-hotel');
                }).catch((err) => {
                    res.render('admin-dodaj-hotel',{
                        errors:  err.errors,
                        duplicate: err.code,
                        ans: r
                    });
                });
            }catch (e) {
                res.render('admin-dodaj-hotel',{
                    errors: e.errors
                });
            }
        }
    }
    showAddUser(req,res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            res.render('admin-dodaj-uzytkownika');
        }
    }

    async addUser(req, res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const r = req.body;
            if(r.password !== r.reppassword){
                return res.render('admin-dodaj-uzytkownika',{
                    errors: { password: { message: "Hasła się nie zgadzają!"}},
                    form : r
                });
            }
            const user = new User({
                login: r.login,
                password: r.password,
                name: r.name,
                lastname: r.lastname,
                rights: r.rights
            });
            try{
               await user.save();
               res.redirect('/admin/uzytkownicy');
            }catch(e){
                res.render('admin-dodaj-uzytkownika',{
                    errors: e.errors,
                    form: r
                })
            }
        }
    }

    //EDYCJA

    async showEditHotel(req,res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const {slug} = req.params;
            const hotel = await Hotel.findOne({slug:slug});
            if(hotel === null){
                res.redirect('/error');
            }else{
                res.render('admin-edytuj-hotel',{
                    ans: hotel
                });
            }
        }
    }
    async editHotel(req, res){
        if(!req.session.user){           
            res.redirect('/logowanie');
        }
        else if(!(req.session.user.rights === 2)){
                res.redirect('/brak-uprawnien');
        }else{
            const mslug = req.params.slug;
            let faci = req.body.faci.split(",");
            let tabF = faci.map(element => {
                return element.trim();
            });
            tabF = tabF.filter(item => item);
            const r = req.body;
            const hotel = new Hotel({
                name: r.name,
                slug: r.name.replaceAll(" ","-").toLowerCase(),
                desc: r.desc,
                price: r.price,
                place: r.place,
                faci: tabF,
                rate: r.rate,
                map: r.map,
                mainImg: r.mainImg,
                miniImg: r.subImg.filter(item => item),
                booking: r.booking
            });
            let err = '?';
            let t1 = [];
            let t2 = [];
            try{
                const er = hotel.validateSync();
                if (er) {
                    t2 = Object.keys(er.errors);
                    for (const key in er.errors) {
                        t1.push(er.errors[key].message);
                    };
                    t1.forEach((e, i) => {
                        err+= t2[i]+'='+e+'&';
                    });
                    throw new Error(er);
                } else {
                    const Update = Hotel;
                    await Update.updateOne({ slug: mslug }, {
                        name: r.name,
                        slug: r.name.replaceAll(" ","-").toLowerCase(),
                        desc: r.desc,
                        price: r.price,
                        place: r.place,
                        faci: tabF,
                        rate: r.rate,
                        map: r.map,
                        mainImg: r.mainImg,
                        miniImg: r.subImg.filter(item => item),
                        booking: r.booking
                    });
                    res.redirect('/admin/hotele');
                }
            }catch (e) {
                if (typeof e.code !== 'undefined'){
                    err += 'duplicate='+e.code;
                }
                res.redirect('/admin/hotele/'+mslug+'/edytuj'+ err);
            }
        }
    }
    showPermissionError(req,res){
        res.render('brak-uprawnien')
    }


}
module.exports = new AdminAction();
