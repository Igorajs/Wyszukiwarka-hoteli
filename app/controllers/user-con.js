const User = require('../db/models/users');

class UserAction  {
    showRegister(req, res){
        if(req.session.user){
            res.redirect('/');
        }
        else{
            res.render('rejestracja');
        }
    }
    async register(req, res){
        const r = req.body;
        if(r.password !== r.reppassword){
            return res.render('rejestracja',{
                errors: { password: { message: "Hasła się nie zgadzają!"}},
                form : r
            });
        }
        const user = new User({
            login: r.login,
            password: r.password,
            name: r.name,
            lastname: r.lastname,
            rights: 1
        });
        try{
           await user.save();
           res.redirect('/logowanie');
        }catch(e){
            console.log(e.errors);
            res.render('rejestracja',{
                errors: e.errors,
                form: r
            })
        }
    }
    showSignin(req, res){
        if(req.session.user){
            res.redirect('/');
        }
        else{
            res.render('logowanie',{
                error: false
            });
        }
    }
    async signin(req, res){
        try{
            const user = await User.findOne({login: req.body.login});
            if (!user) {
                throw new Error('Użytkownik nieznaleziony');
            }

            const isValidPassword = user.comparePassword(req.body.password);
            if (!isValidPassword) {
                throw new Error('Hasło niepoprawne');
            }

            req.session.user ={
                _id: user._id,
                login: user.login,
                rights: user.rights,
                name: user.name,
                lastname: user.lastname
            };
            res.redirect('/')
        }catch(e){
            console.log(e);
            res.render('logowanie',{
                form: req.body,
                error: true
            });
        }
    }
    logout(req, res){
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new UserAction();
