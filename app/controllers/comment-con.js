const Comment = require('../db/models/comments');

class CommentAction  {
    async addComment(req,res){
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
            const comment = new Comment({
                slug: r.slug,
                user: req.session.user.login,
                comment: r.comment,
                name: req.session.user.name,
                lastname: req.session.user.lastname,
                time: time,
            });

            await comment.save();
            res.redirect('/hotel/'+r.slug);
        }catch(e){
            res.redirect('/hotel/'+r.slug+'?errorComent=error');
        }
    }
}

module.exports = new CommentAction();
