const express = require ('express');
const color = require ('colors');

const app = express();
const port = 3000;

app.use(express.static('public'));


app.get("/home", (req,res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});

app.listen(port, () => {
    console.log(`[Servidor corriendo en el puerto ${port}]`.bgYellow.black.bold);
})

