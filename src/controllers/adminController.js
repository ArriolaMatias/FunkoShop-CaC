const Utilities = require("../utilities/json-utilities.js");
const {
    getAllFunkosFromDB,
    getFunkoFromDB,
    addFunkoFromDB,
    deleteFunkoFromDB,
    updateFunkoFromDB
} = require("../models/model.js");
const { getAllLicencesFromDB } = require("../models/licence.js");
const { getAllCategoriesFromDB } = require("../models/category.js");
const adminControllers = {
    admin: async (req, res) => {
        try {
            const response = await getAllFunkosFromDB();
            res.render("admin/admin", {
                title: "Panel de administración | FunkoShop",
                listaFunkos: response,
            });
        } catch (error) {
            //! CODIGO SI HAY ERROR
        }
    },
    create: async (req, res) => {
        try {
            const responseLicence = await getAllLicencesFromDB();
            const responseCategory = await getAllCategoriesFromDB();
            res.render("admin/create", {
                title: "Agregar producto | FunkoShop",
                licences: responseLicence,
                categories: responseCategory,
            });
        } catch (error) { 
            //!CODIGO DE ERROR
        }
    },
    create_post: async (req, res) => {
        try {
            const funkoData = req.body;
            await addFunkoFromDB(funkoData);
            res.redirect("/admin");
        } catch (error) { }
    },
    edit: async (req, res) => {
        try {
            const id = req.params.id;
            const responseFunko = await getFunkoFromDB(id);
            const responseLicence = await getAllLicencesFromDB();
            const responseCategory = await getAllCategoriesFromDB();
            res.render("admin/edit", {
                title: `Editar producto: ${responseFunko.product_name} | FunkoShop`,
                funko: responseFunko,
                licences: responseLicence,
                categories: responseCategory,
            });
        } catch (error) {
            //! CODIGO DE ERROR
        }
    },
    edit_post: async (req, res) => {
        try {
            const id = req.params.id;
            const funkoData = req.body;
            await updateFunkoFromDB(funkoData, id);
            res.redirect("/admin");
        } catch (error) {
            //!CODIGO DE ERROR
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await getFunkoFromDB(id);
            res.render("admin/delete", {
                title: `Eliminar producto: ${response.product_name} | FunkoShop`,
                funko: response,
            });
        } catch (error) {
            //!CODIGO DE ERROR
        }
    },
    delete_confirm: async (req, res) => {
        try {
            const id = req.params.id;
            await deleteFunkoFromDB(id);
            res.redirect("/admin");
        } catch (error) { 
            //!ERROR CODIGO
        }
    },
};

module.exports = adminControllers;
