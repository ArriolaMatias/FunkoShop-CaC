const { getFunkoFromDB } = require('../models/model.js');

const agregarItem =  async(req, res)=> {
    let cart = req.session.cart; // Traigo el carrito de la sesion
    let indice = validar(cart, req.params.id); //Me fijo si el item a agregar está en el carrito
    let funko = await getFunkoFromDB(req.params.id)

    if(indice != -1){ //Si está, le sumo la cantidad que haya ingresado
        cart[indice].quantity = parseInt(cart[indice].quantity) + parseInt(req.params.quantity);
    }else{ //Si no, lo agrego
        let item = {
            id: req.params.id,
            funko: funko,
            quantity: req.params.quantity,
            price: parseFloat(funko.price) * parseInt(req.params.quantity)
        }
        cart.push(item);
    }
}

const popItem = async (req,res) => {
    let cart = req.session.cart; // Traigo el carrito de la sesion
    let indice = validar(cart, req.params.id); //Me fijo si el item a eliminar está en el carrito
    cart.splice(indice,1);
}

const deleteItem = async (req,res) => {
    let cart = req.session.cart; // Traigo el carrito de la sesion
    let indice = validar(cart, req.params.id); //Me fijo si el item a eliminar está en el carrito

    if (indice != -1) 
    {
        // Si lo borro toda la cantidad del mismo producto, lo elimino directamente
        if ( req.params.quantity === cart[indice].quantity) {cart.splice(indice, 1);}
        else { //Sino, solo elimino la cantidad de unidades que desconto
            cart[indice].quantity = parseInt(cart[indice].quantity) - parseInt(req.params.quantity);
        } // 
    }
}

const incrementar = (req,res) => {
    let cart = req.session.cart; // Traigo el carrito de la sesion
    let indice = validar(cart, req.params.id); //Me fijo si el item a eliminar está en el carrito

    cart[indice] = parseInt(cart[indice]) + 1; 
    cart[indice].price = parseInt(cart[indice].price) + parseFloat(cart[indice].funko.price); 
}
const decrementar = (req,res) => {
    let cart = req.session.cart; // Traigo el carrito de la sesion
    let indice = validar(cart, req.params.id); //Me fijo si el item a eliminar está en el carrito

    cart[indice].quantity = parseInt(cart[indice].quantity) - 1;
    cart[indice].price = parseInt(cart[indice].price) - parseFloat(cart[indice].funko.price); 
}

    //Funcion que dado un carrito, y un ID, me devuelve su indice en el carrito. (Si no está, devuelve -1)
    function validar(cart, id){
        return cart.findIndex(function(funko){
            return funko.id === id;
        });
    }

module.exports = {
    agregarItem,
    deleteItem,
    popItem
}