const Utilities = require("../utilities/json-utilities.js");
const { getAllFunkosFromDB, getFunkoFromDB, getFunkosBy } = require("../models/model.js");
const {agregarItem, deleteItem, popItem} = require("../models/cart.js");

const shopControllers = {
    shop: async (req, res) => {
        try {
            let response;
            if (Object.keys(req.query).length === 0) { response = await getAllFunkosFromDB(); }
            else { response = await getFunkosBy(req.query); }
            
            res.render("./shop/shop.ejs", {
                title: "Shop | Funkoshop",
                listaFunkos: response,
                cart: req.session.cart
            });
        } catch (error) {
            //!VISTA SI OCURRE UN ERROR
        }
    },
    item: async (req, res) => {
        try {
            const product_id = req.params.id;
            const response = await getFunkoFromDB(product_id);
            const funkos = await getAllFunkosFromDB();
            res.render("./shop/item.ejs", {
                title: `${response.product_name} | Funkoshop`,
                funko: response,
                funkos,
                cart: req.session.cart
            });
        } catch (error) { }
    },

    add_item: async (req, res) => {
        await agregarItem(req, res);
        res.send("Ruta para agregar el producto actual al carrito");
    },

    delete_item: async (req, res) => {
        await popItem(req, res);
        res.send("Ruta para borrar el producto actual al carrito");
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
