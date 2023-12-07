const { getAllFunkosFromDB } = require('../models/model.js');
const mainControllers = {
    home: async (req, res) => {
        try {
            const funkos = await getAllFunkosFromDB();
            res.render('index.ejs',
                {
                    title: 'Home | Funkoshop',
                    funkos
                })
        } catch (error) {

        }
    },
    contact: (req, res) => {
        res.render('default-template.ejs',
            {
                title: 'Contacto | Funkoshop',
                content: 'Ruta para la vista de contacto'
            })
    },
    about: (req, res) => {
        res.render('default-template.ejs',
            {
                title: 'About | Funkoshop',
                content: 'Ruta para la vista de about'
            })
    },
    faqs: (req, res) => {
        res.render('default-template.ejs',
            {
                title: 'FAQS | Funkoshop',
                content: 'Ruta para la vista de preguntas frecuentes'
            })
    },
};

module.exports = mainControllers;