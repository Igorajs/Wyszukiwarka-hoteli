const { isNull } = require('util');
const Hotel = require('../db/models/hotels');
const Comment = require('../db/models/comments');
const History = require('../db/models/history');

class HotelAction  {
    async showHotels(req, res){
        const hotels = await Hotel.find({});  
        res.render('lista', {
            hotels
        });
    }
    async showHotel(req, res){
        const { name } = req.params;
        const hotel = await Hotel.findOne({slug: name});
        const com = await Comment.find({slug: name}).limit(10);
        if (hotel === null)
            res.render('error');
        else{
            if(typeof req.session.user !== 'undefined'){
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
                const history = new History({
                    name: hotel.name,
                    slug: hotel.slug,
                    user: req.session.user.login,
                    price: hotel.price,
                    time: time,
                    mainImg: hotel.mainImg,
                });
                try{
                    await history.save();
                    res.render('wpis',{
                        hotel,
                        com
                    }); 
                }catch(e){
                    res.render('wpis',{
                        hotel,
                        com
                    }); 
                    console.log(e)
                }
            }else{
                res.render('wpis',{
                    hotel,
                    com
                }); 
            }
            
        }
    }
}

module.exports = new HotelAction();
