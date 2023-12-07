const express = require ('express');
const color = require ('colors');
const dotenv = require('dotenv');
//Descargue la dependencia dotenv para por utilizarlas
dotenv.config()
// const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;

const mainRoutes = require ('./src/routes/main.Routes.js');
const shopRoutes = require ('./src/routes/shop.Routes.js');
const adminRoutes = require ('./src/routes/admin.Routes.js');
const authRoutes = require('./src/routes/auth.Routes.js');

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

//Motor de plantilla
app.set('views', './src/views');
app.set('view engine', 'ejs')


app.listen(port, () => {
    console.log(`[Servidor corriendo en el puerto ${port}]`.bgYellow.black.bold);
})

