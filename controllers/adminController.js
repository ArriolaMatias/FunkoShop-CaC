const adminControllers = {
    admin: (req, res) => { res.send("Ruta para la vista de admin")},
    create: (req, res) => { res.send("Ruta para la vista de create")},
    create_post: (req, res) => { res.send("Ruta para la vista de admin por post")},
    edit: (req, res) => { res.send("Ruta para la vista de edit")},
    edit_post: (req, res) => { res.send("Ruta para la vista de edit por post")},
    delete: (req, res) => { res.send("Ruta para la vista de delete")}
};

module.exports = adminControllers;