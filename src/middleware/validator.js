const {body} = require('express-validator');
const {addUserFromDB, getUserByEmailFromDB} = require('../models/users');
const {getProductBySkuFromDB} = require ('../models/model.js');

newRegister = [
    body('name').exists().notEmpty().escape().withMessage("El campo es obligatorio"),
    body('lastname').notEmpty().withMessage("El campo es obligatorio").isAlpha().withMessage("No se aceptan números."),
    body('email').notEmpty().withMessage('El campo es obligatorio').trim().isEmail()
                .custom( async (email, {req}) => {
                    if (await getUserByEmailFromDB(email) != undefined){
                        throw new Error('El correo ya está en uso');
                    }
      }),
    body('password').matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9])/).withMessage('La contraseña no cumple con los requisitos minimos').isLength({ min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body('rePassword').trim().custom( async (rePassword, {req}) => {
        const password = req.body.password
        if(password != rePassword){
          throw new Error('Las contraseñas deben ser iguales')
        }
        }),
    body('terms').isIn(['acepto']).withMessage('Acepta los términos y condiciones')
    ];

login = [
    body('email').notEmpty().withMessage('El campo es obligatorio').isEmail().withMessage("No valido")
              .custom( async (email, {req}) => {
                  if (await getUserByEmailFromDB(email) == undefined){
                      throw new Error('No hay ningun usuario con el correo ingresado.');
                  }
    }),
    body('password').notEmpty().withMessage("Debes introducir la contraseña").custom( async (email, {req}) => {
      const user = await getUserByEmailFromDB(req.body.email)
      if( user != undefined  && req.body.password != user.password){
        throw new Error('La contraseña es incorrecta')
      }
      })
    ];

createItem = [
  body('product_name').notEmpty().withMessage('El campo es obligatorio'),
  body('sku').notEmpty().withMessage('El campo es obligatorio')
            .custom ( async (value, {req}) => {
              const prod = await getProductBySkuFromDB(value);
              if (prod != undefined) {throw new Error ('El SKU ya pertenece a un producto')}
            }),
  body('price').notEmpty().withMessage('El campo es obligatorio').isNumeric().withMessage('Solo se aceptan numeros')
                .custom( async (value, {req}) => {
                  if(value <= 0)
                  throw new Error('Valor no permitido');
                }),
  body('stock').notEmpty().withMessage('El campo es obligatorio').isNumeric().withMessage('Solo se aceptan numeros')
                .custom( async (value, {req}) => {
                  if(value <= 0)
                  throw new Error('Valor no permitido');
                }),
  body('image_front').custom( (value, {req}) => {
      //Valida que se haya cargado algo, y en segunda instancia que sea de alguno de los tipos permitidos.
                  filetypes = ['image/jpg', 'image/png', 'image/bmp', 'image/jpeg']
                  if (req.files.image_front === undefined) { throw new Error ("Debes cargar una imagen del frente del producto")}
                  else {
                    if (!filetypes.includes(req.files.image_front[0].mimetype)) {throw new Error (`Formato no soportado. Solo se pueden cargar archivos .JPG, .JPEG, .BMP y .PNG`)}
                  else return true; }
                }),
  body('image_back').custom( (value, {req}) => {
                  filetypes = ['image/jpg', 'image/png', 'image/bmp', 'image/jpeg']
                  if (req.files.image_back === undefined) { throw new Error ("Debes cargar una imagen del dorso del producto")}
                  else {
                    if (!filetypes.includes(req.files.image_back[0].mimetype)) {throw new Error (`Formato no soportado. Solo se pueden cargar archivos .JPG, .JPEG, .BMP y .PNG`)}
                  else return true; }
                })
];


module.exports = {
    newRegister,
    login,
    createItem
}
