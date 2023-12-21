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
                    cart: req.session.cart
                })
        } catch (error) {

        }
    },
    contact: (req, res) => {
        res.render('default-template.ejs',
            {
                title: 'Contacto | Funkoshop',
                content: 'Ruta para la vista de contacto',
                cart: req.session.cart
            })
    },
    about: (req, res) => {
        res.render('default-template.ejs',
            {
                title: 'About | Funkoshop',
                content: 'Ruta para la vista de about',
                cart: req.session.cart
            })
    },
    faqs: (req, res) => {
        res.render('default-template.ejs',
            {
                title: 'FAQS | Funkoshop',
                content: 'Ruta para la vista de preguntas frecuentes',
                cart: req.session.cart
            })
    },
};

module.exports = mainControllers;