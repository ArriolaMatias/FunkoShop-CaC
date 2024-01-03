const { getAllFunkosFromDB } = require('../models/model.js');
const mainControllers = {
    home: async (req, res) => {
        if (req.session.cart === undefined) {req.session.cart = []; } //inicializo la variable de sesion para el carrito
        try {
            const funkos = await getAllFunkosFromDB();
            res.render('index.ejs',
                {
                    title: 'Home | Funkoshop',
                    funkos, 
                    cart: req.session.cart,
                    loginAs: req.session.loginAs,
                })
        } catch (error) {

        }
    },
    contact: (req, res) => {
        res.render('contact.ejs',
            {
                title: 'Contacto | Funkoshop',
                cart: req.session.cart,
                loginAs: req.session.loginAs,
            })
    },
    about: (req, res) => {
        res.render('about.ejs',
            {
                title: 'About | Funkoshop',
                cart: req.session.cart,
                loginAs: req.session.loginAs,
            })
    },
    faqs: (req, res) => {
        res.render('faqs.ejs',
            {
                title: 'Preguntas Frecuentes | Funkoshop',
                cart: req.session.cart,
                loginAs: req.session.loginAs,
            })
    },
};

module.exports = mainControllers;