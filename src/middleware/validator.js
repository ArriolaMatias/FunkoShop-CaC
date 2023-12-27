const {body} = require('express-validator');
const {addUserFromDB, getUserByEmailFromDB} = require('../models/users');

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
  })
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
]


module.exports = {
    newRegister,
    login
}
