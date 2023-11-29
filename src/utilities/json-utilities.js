const fs = require('fs');

let getFunkoById = function(id){
    const listaFunkos = fs.readFileSync(`./src/json-files/funkos.json`, 'utf8');
    const funko = JSON.parse(listaFunkos).find((element) => element.product_id == id) ;
    return funko;
}

let getFunkos = function(){
    const listaFunkos = fs.readFileSync(`./src/json-files/funkos.json`, 'utf8');
    return JSON.parse(listaFunkos);
}

module.exports = {
    getFunkoById,
    getFunkos
};