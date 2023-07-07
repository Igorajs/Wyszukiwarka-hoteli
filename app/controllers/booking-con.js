const Booking = require('../db/models/booking');

class BookingAction  {
    async addBooking(req,res){
//Aktualny czas
        let date_time = new Date();
        let date = ("0" + date_time.getDate()).slice(-2);
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
        let year = date_time.getFullYear();
        let hours = date_time.getHours();
        let minutes = date_time.getMinutes();
        let seconds = date_time.getSeconds();
        let time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
//
        const r = req.body;
        try{
            if(r.days === null || r.count === null){
                throw new Error("rr");
            }
            const booking = new Booking({
                slug: r.slug,
                days: r.days,
                count: r.count,
                price: r.days*r.count*r.price,
                user: req.session.user.login,
                comment: r.comment,
                nameI: req.session.user.name,
                nameH: r.name,
                mainImg: r.mainImg,
                lastname: req.session.user.lastname,
                time: time,
            });
            await booking.save();
            res.redirect('/hotel/'+r.slug);
        }catch(e){
            res.redirect('/hotel/'+r.slug+'?errorBooking=error');
        }
    }
    async showProfileBooking(req,res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else{
            const r = await Booking.find({user: req.session.user.login}).sort({ _id: -1}).limit(15);
            res.render('profil-rezerwacje',{
                r
            });
        }
    }
}

module.exports = new BookingAction();
