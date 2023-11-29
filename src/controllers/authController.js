const authControllers = {
    login: (req, res) => {     
        res.render('default-template.ejs', 
        { 
            title: 'Iniciar Sesión | Funkoshop',
            content: 'Ruta para la vista de Login'
    })},
    login_post: (req, res) => { res.send("Ruta para login por post")},
    register: (req, res) => { res.send("Ruta para register")},
    register_post: (req, res) => { res.send("Ruta para register por post")},
    logout: (req, res) => { res.send("Ruta para logout")},
}

module.exports = authControllers;