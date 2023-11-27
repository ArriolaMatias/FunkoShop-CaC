const shopControllers = {
    shop: (req, res) => { res.send("Ruta para la vista de Shop")}, 
    item: (req, res) => {res.send("Ruta para encontrar un producto a partir de un id")},
    add_item: (req, res) => { res.send("Ruta para agregar el producto actual al carrito")},
    cart: (req, res) => { res.send("Ruta para ver el carrito")},
    cart_to_checkout: (req, res) => { res.send("Ruta para ir a la pagina de pagos")},
}

module.exports = shopControllers;