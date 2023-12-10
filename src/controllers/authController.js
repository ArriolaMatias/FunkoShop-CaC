const dotenv = require('dotenv');
dotenv.config();
const {addUserFromDB, getUserByEmailFromDB} = require('../models/users');
const authControllers = {
    login: (req, res) => {     
        res.render('admin/login.ejs', 
        { 
            title: 'Iniciar Sesión | Funkoshop',
    })},
    login_post: async(req, res) => { 
        try {
            const {email, password} = req.body;
            const user = await getUserByEmailFromDB(email);
            const passwordAdmin = process.env.PASSWORD_ADMIN;

            if(user && Object.keys(user).length > 1 && user.password == password && user.password == passwordAdmin){

                req.session.esAdmin = true;
                res.redirect('/admin');
            }else if(user && Object.keys(user).length > 1 && user.password == password){
                req.session.esAdmin = false;
                res.redirect('/');
            }else{
                res.redirect('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    },
    register: (req, res) => { 
        res.render('admin/register.ejs', {
            title: "Registro | FunkoShop"
        })
    },
    register_post: async(req, res) => { 
        try {
            const userData = req.body;
            const {email} = req.body;
            await addUserFromDB(userData,email);
            res.redirect('/auth/login')
        } catch (error) {
            
        }
    },
    logout: (req, res) => { res.send("Ruta para logout")},
}

module.exports = authControllers;