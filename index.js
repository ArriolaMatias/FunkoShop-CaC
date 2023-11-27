const express = require ('express');
const color = require ('colors');

const mainRoutes = require ('./src/main.Routes.js');
const shopRoutes = require ('./src/shop.Routes.js');
const adminRoutes = require ('./src/admin.Routes.js');
const authRoutes = require('./src/auth.Routes.js');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);


app.get("/home", (req,res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});

app.listen(port, () => {
    console.log(`[Servidor corriendo en el puerto ${port}]`.bgYellow.black.bold);
})

