const History = require('../db/models/history');

class HistoryAction  {
    async showProfileHistory(req,res){
        if(!req.session.user){
            res.redirect('/logowanie');
        }
        else{
            const h = await History.find({user: req.session.user.login}).sort({ _id: -1}).limit(15);
            res.render('profil-historia',{
                h
            });
        }
    }
}

module.exports = new HistoryAction();
