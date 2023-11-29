const Utilities = require('../utilities/json-utilities.js');
const shopControllers = {
    shop: (req, res) => { res.render('./shop/shop.ejs', {
        title: 'Shop | Funkoshop',
        listaFunkos: Utilities.getFunkos()
    })}, 

    item: (req, res) => {
        let ObjFunko = Utilities.getFunkoById(req.params.id);
        res.render('./shop/item.ejs', {
        title: 'Item cargado dinámicamente | Funkoshop',
        funko: ObjFunko
    })},
    
    add_item: (req, res) => { res.send("Ruta para agregar el producto actual al carrito")},
    cart: (req, res) => { res.send("Ruta para ver el carrito")},
    cart_to_checkout: (req, res) => { res.send("Ruta para ir a la pagina de pagos")},
}

module.exports = shopControllers;