const Utilities = require("../utilities/json-utilities.js");
const { getAllFunkosFromDB, getFunkoFromDB } = require("../models/model.js");

const shopControllers = {
    shop: async (req, res) => {
        try {
            const response = await getAllFunkosFromDB();
            res.render("./shop/shop.ejs", {
                title: "Shop | Funkoshop",
                listaFunkos: response,
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
                title: "Item cargado dinámicamente | Funkoshop",
                funko: response,
                funkos
            });
        } catch (error) { }
    },

    add_item: (req, res) => {
        res.send("Ruta para agregar el producto actual al carrito");
    },
    cart: (req, res) => {
        res.render("default-template.ejs", {
            title: "Carrito | Funkoshop",
            content: "Ruta para la vista de Carrito",
        });
    },
    cart_to_checkout: (req, res) => {
        res.render("default-template.ejs", {
            title: "Checkout | Funkoshop",
            content: "Ruta para la vista de pagos",
        });
    },
};

module.exports = shopControllers;
