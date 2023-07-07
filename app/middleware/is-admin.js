module.exports = function(req,res,next){
    if(!req.session.user){
        res.redirect('/logowanie');
    }
    else if(!(req.session.user.rights === 2)){
            res.redirect('/brak-uprawnien');
    }
    next()
}