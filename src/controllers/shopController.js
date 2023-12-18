const Utilities = require("../utilities/json-utilities.js");
const { getAllFunkosFromDB, getFunkoFromDB, getFunkosBy } = require("../models/model.js");

const shopControllers = {
    shop: async (req, res) => {
        try {
            let response;
            if (Object.keys(req.query).length === 0) { response = await getAllFunkosFromDB(); }
            else { response = await getFunkosBy(req.query); }
            
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
                title: `${response.product_name} | Funkoshop`,
                funko: response,
                funkos
            });
        } catch (error) { }
    },

    add_item: (req, res) => {
        res.send("Ruta para agregar el producto actual al carrito");
    },
    cart: async (req, res) => {
        try {
            const id1 = Math.floor(Math.random() * 14);
            const id2 = Math.floor(Math.random() * 14);
            console.log(id1, id2);
            const cantidad1 =  Math.floor(Math.random() * 10) + 1;
            const cantidad2 =  Math.floor(Math.random() * 10) + 1;
            const responseFunko1 = await getFunkoFromDB(id1);
            const responseFunko2 = await getFunkoFromDB(id2);
            res.render("./shop/cart.ejs", {
                title: "Carrito | Funkoshop",
                funko1: responseFunko1,
                funko2: responseFunko2,
                cantidad1: cantidad1,
                cantidad2: cantidad2,
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
        });
    }
};

module.exports = shopControllers;
