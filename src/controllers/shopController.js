const { getAllFunkosFromDB, getAllFunkosPaginatedFromDB, getFunkosByLicence, getFunkoFromDB, getFunkosBy } = require("../models/model.js");
const { getAllLicencesFromDB } = require("../models/licence.js");
const {agregarItem, deleteItem, popItem} = require("../models/cart.js");

const LIMIT_OF_PRODUCTS_PER_PAGE = 9

const shopControllers = {
    shop: async (req, res) => {
        if (req.session.cart === undefined) {req.session.cart = []; } //inicializo la variable de sesion para el carrito
        const responseLicence = await getAllLicencesFromDB();

        if (req.query.paginaActual === undefined) { req.query.paginaActual = 1 };
        if (req.query.size === undefined) { req.query.size = LIMIT_OF_PRODUCTS_PER_PAGE };

        const page = parseInt(req.query.paginaActual)
        const size = parseInt(req.query.size)
        try {
            let response;
            // if (Object.keys(req.query).length === 0) { response = await getAllFunkosPaginatedFromDB(req.query); }
            // else { console.log(req.query); response = await getFunkosBy(req.query); }

            response = await getFunkosBy(req.query);

            console.log("cant items es: "+ response.total)
            const totalPages = Math.ceil(response.total / size);
            
            console.log("VALUES SERIA: \n" + JSON.stringify(req.query))
            res.render("./shop/shop.ejs", {
                title: "Shop | Funkoshop",
                listaFunkos: response.datos,
                cart: req.session.cart,
                loginAs: req.session.loginAs,
                values: req.query,
                licences: responseLicence,
                paginaActual: page,
                size: size,
                totalPages: totalPages
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
                cart: req.session.cart,
                loginAs: req.session.loginAs,
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
                cart: req.session.cart,
                loginAs: req.session.loginAs,
            });
        } catch (error) { }
    },
    cart_to_checkout: (req, res) => {
        res.render("default-template.ejs", {
            title: "Checkout | Funkoshop",
            content: "¡Gracias por su compra!",
            cart: req.session.cart,
            loginAs: req.session.loginAs,
        });
    },
    shop_search: (req, res) => {
        console.log(req.query);
        res.render("./shop/shop.ejs", {
            title: "Shop | Funkoshop",
            listaFunkos: response,
            cart: req.session.cart,
            loginAs: req.session.loginAs,
        });
    }
};

module.exports = shopControllers;
