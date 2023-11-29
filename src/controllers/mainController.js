const mainControllers = {
    home: (req, res) => {     
        res.render('index.ejs', 
        { 
            title: 'Home | Funkoshop'
    })},
    contact: (req, res) => { res.send("Ruta para la vista de Contacto")},
    about: (req, res) => { res.send("Ruta para la vista de About")},
    faqs: (req, res) => { res.send("Ruta para la vista de Preguntas Frecuentes")}
};

module.exports = mainControllers;