const { unlink, unlinkSync } = require("fs");
const { validationResult } = require('express-validator');
const {
    getAllFunkosFromDB,
    getFunkoFromDB,
    addFunkoFromDB,
    deleteFunkoFromDB,
    updateFunkoFromDB,
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
                loginAs: req.session.loginAs,
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
                errores: [],
                values: req.body,
                loginAs: req.session.loginAs,
            });
        } catch (error) {
            //!CODIGO DE ERROR
        }
    },
    create_post: async (req, res) => {
        const errors = validationResult(req);
        console.log(req.files);

        if (!errors.isEmpty()){ 
            console.log(errors.array());

            //Si hay errores, las imagenes se suben igual, con lo cual las debo eliminar.
            if(req.files['image_front']) { unlinkSync(req.files.image_front[0].path) }
            if(req.files['image_back']) { unlinkSync(req.files.image_back[0].path) }

            const responseLicence = await getAllLicencesFromDB();
            const responseCategory = await getAllCategoriesFromDB();
            res.render('admin/create.ejs', {
                title: 'Agregar producto | FunkoShop',
                licences: responseLicence,
                categories: responseCategory,
                errores: errors.array(),
                values: req.body,
                msg: req.query.msg,
                loginAs: req.session.loginAs,
            })
        }else{
            try {
                const funkoData = req.body;
                let destination = req.files["image_front"][0].destination.replace('public/img','');
                funkoData.image_front = `${destination}/${req.files["image_front"][0].filename}`;
                funkoData.image_back = `${destination}/${req.files["image_back"][0].filename}`;
                console.log('llega')
                // funkoData.image_front = `/${req.file.filename}`
                // funkoData.imagen_back =
                await addFunkoFromDB(funkoData);
                res.redirect("/admin");
            } catch (error) { }
        }
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
                cuotas: [3,6,9,10,12],
                loginAs: req.session.loginAs,
            });
        } catch (error) {
            //! CODIGO DE ERROR
        }
    },
    edit_post: async (req, res) => {
        try {

            const id = req.params.id;
            const imgAntFunko = await getFunkoFromDB(id);
            const funkoData = req.body;
            if (req.files && Object.keys(req.files).length > 0) {

                if (req.files.image_front !== undefined) {
                    console.log(req.files);
                    let destination = req.files["image_front"][0].destination.replace('public/img/','');
                    funkoData.image_front = `${destination}/${req.files.image_front[0].filename}`;
                    unlink(`public${imgAntFunko.image_front}`, (err) => {
                        if (err) {
                            console.log(imgAntFunko.image_front)
                            console.log("Ocurrio un error al eliminar la imagen front");
                            return;
                        }
                    });
                }
                if (req.files.image_back !== undefined) {
                    let destination = req.files["image_back"][0].destination.replace('public/img/','');
                    funkoData.image_back = `${destination}/${req.files.image_back[0].filename}`;
                    unlink(`public${imgAntFunko.image_back}`, (err) => {
                        if (err) {
                            console.log("Ocurrio un error al eliminar la imagen back");
                            return;
                        }
                    });
                }

            } else {
                funkoData.image_front = imgAntFunko.image_front;
                funkoData.image_back = imgAntFunko.image_back;
            }
            await updateFunkoFromDB(funkoData, id);
            res.redirect("/admin");
        } catch (error) {
            //!CODIGO DE ERROR
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const response = await getFunkoFromDB(id);
            res.render("admin/delete", {
                title: `Eliminar producto: ${response.product_name} | FunkoShop`,
                funko: response,
                loginAs: req.session.loginAs,
            });
        } catch (error) {
            //!CODIGO DE ERROR
        }
    },
    delete_confirm: async (req, res) => {
        try {
            const id = req.params.id;
            const funko = await deleteFunkoFromDB(id);
            if (funko) {
                unlink(`public/img/${funko.image_front}`, (err) => {
                    if (err) {
                        console.log("Ocurrio un error al eliminar la imagen front");
                        return;
                    }
                });
                unlink(`public/img/${funko.image_back}`, (err) => {
                    if (err) {
                        console.log("Ocurrio un error al eliminar la imagen back");
                        return;
                    }
                });
            }
            res.redirect("/admin");
        } catch (error) {
            //!ERROR CODIGO
        }
    },
};

module.exports = adminControllers;
