const authControllers = {
    login: (req, res) => { res.send("Ruta para login")},
    login_post: (req, res) => { res.send("Ruta para login por post")},
    register: (req, res) => { res.send("Ruta para register")},
    register_post: (req, res) => { res.send("Ruta para register por post")},
    logout: (req, res) => { res.send("Ruta para logout")},
}

module.exports = authControllers;