const Utilities = require("../utilities/json-utilities.js");
const { getAllFunkosFromDB, getFunkosByLicence, getFunkoFromDB, getFunkosBy } = require("../models/model.js");
const { getAllLicencesFromDB } = require("../models/licence.js");
const {agregarItem, deleteItem, popItem} = require("../models/cart.js");

const shopControllers = {
    shop: async (req, res) => {
        if (req.session.cart === undefined) {req.session.cart = []; } //inicializo la variable de sesion para el carrito
        const responseLicence = await getAllLicencesFromDB();
        try {
            let response;
            if (Object.keys(req.query).length === 0) { response = await getAllFunkosFromDB(); }
            else { console.log(req.query); response = await getFunkosBy(req.query); }
            
            res.render("./shop/shop.ejs", {
                title: "Shop | Funkoshop",
                listaFunkos: response,
                cart: req.session.cart,
                licences: responseLicence
            });
        } catch (error) {
            //!VISTA SI OCURRE UN ERROR
        }
    },
    item: async (req, res) => {
        if (req.session.cart === undefined) {req.session.cart = []; } //inicializo la variable de sesion para el carrito
        try {
            const product_id = req.params.id;
            const response = await getFunkoFromDB(product_id);
            const relatedFunkos = await getFunkosByLicence(response.licence_id);
            console.log(relatedFunkos);
            res.render("./shop/item.ejs", {
                title: `${response.product_name} | Funkoshop`,
                funko: response,
                relatedFunkos: relatedFunkos,
                cart: req.session.cart
            });
        } catch (error) { }
    },

    add_item: async (req, res) => {
        await agregarItem(req, res);
        res.send("/shop"); //Se envía la ruta y ajax maneja la redireccion
    },

    delete_item: async (req, res) => {
        await popItem(req, res);
        res.send("/shop/cart"); //Se envía la ruta y ajax maneja la redireccion
    },

    cart: async (req, res) => {
        try {
            res.render("./shop/cart.ejs", {
                title: "Carrito | Funkoshop",
                cart: req.session.cart
            });
        } catch (error) { }
    },
    cart_to_checkout: (req, res) => {
        res.render("default-template.ejs", {
            title: "Checkout | Funkoshop",
            content: "Ruta para la vista de pagos",
            cart: req.session.cart
        });
    },
    shop_search: (req, res) => {
        console.log(req.query);
        res.render("./shop/shop.ejs", {
            title: "Shop | Funkoshop",
            listaFunkos: response,
            cart: req.session.cart
        });
    }
};

module.exports = shopControllers;
