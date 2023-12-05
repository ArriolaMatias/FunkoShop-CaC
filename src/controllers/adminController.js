const Utilities = require('../utilities/json-utilities.js');
const adminControllers = {
    admin: (req, res) => { 
        res.render("admin/admin",{
            title: "Panel de administración | FunkoShop",
            listaFunkos: Utilities.getFunkos()
        })
    },
    create: (req, res) => { 
        let ObjFunko = Utilities.getFunkoById(req.params.id);
        res.render("admin/create", {
            title: "Agregar producto | FunkoShop",
            funko: ObjFunko
        })
    },
    create_post: (req, res) => { res.send("Ruta para la vista de admin por post")},
    edit: (req, res) => { 
        let ObjFunko = Utilities.getFunkoById(req.params.id);
        res.render("admin/edit", {
            title: `Editar producto: ${ObjFunko.product_name} | FunkoShop`,
            funko: ObjFunko
        })
    },
    edit_post: (req, res) => { res.send("Ruta para la vista de edit por post")},
    delete: (req, res) => { res.send("Ruta para la vista de eliminar")},
};

module.exports = adminControllers;