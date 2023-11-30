const authControllers = {
    login: (req, res) => {     
        res.render('admin/login.ejs', 
        { 
            title: 'Iniciar Sesión | Funkoshop',
    })},
    login_post: (req, res) => { res.send("Ruta para login por post")},
    register: (req, res) => { 
        res.render('admin/register.ejs', {
            title: "Registro | FunkoShop"
        })
    },
    register_post: (req, res) => { res.send("Ruta para register por post")},
    logout: (req, res) => { res.send("Ruta para logout")},
}

module.exports = authControllers;