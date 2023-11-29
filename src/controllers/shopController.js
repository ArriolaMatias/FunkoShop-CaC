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
    cart: (req, res) => {     
        res.render('default-template.ejs', 
        { 
            title: 'Carrito | Funkoshop',
            content: 'Ruta para la vista de Carrito'
    })},
    cart_to_checkout: (req, res) => {     
        res.render('default-template.ejs', 
        { 
            title: 'Checkout | Funkoshop',
            content: 'Ruta para la vista de pagos'
    })},
}

module.exports = shopControllers;