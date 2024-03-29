// const add = document.querySelector("#add-item-");
const addButtons = document.querySelectorAll(`[id^="add-item-"]`);
const substractButtons = document.querySelectorAll(`[id^="substract-item-"]`);

const cantItems = document.getElementById('cantItems');
const subtotal = document.getElementById('subtotal');
const precioTotal = document.getElementById('precioTotal');
const envio = document.getElementById('precioEnvio');

addButtons.forEach(function (incrementator) {
    incrementator.addEventListener('click' , () =>{
        let quantityId = incrementator.id.replace("add-", "quantity-");
        let quantityAsociado = document.getElementById(`${quantityId}`);

        let priceId = incrementator.id.replace("add-", "totalPrice-");
        let priceAsociado = document.getElementById(`${priceId}`);

        let itemPriceId = incrementator.id.replace("add-", "price-");
        let itemPrice = document.getElementById(`${itemPriceId}`);

        quantityAsociado.value = Number(quantityAsociado.value) + 1;
        priceAsociado.innerText = +((Number(quantityAsociado.value) * parseFloat(itemPrice.innerText)).toFixed(2));

        cantItems.innerText = Number(cantItems.innerText) + 1;
        subtotal.innerText = +((Number(subtotal.innerText) + parseFloat(itemPrice.innerText)).toFixed(2));
        precioTotal.innerText = +((Number(subtotal.innerText) + Number(envio.innerText)).toFixed(2));
    }); 
})

substractButtons.forEach(function (decrementator) {
    decrementator.addEventListener('click' , () =>{
        let quantityId = decrementator.id.replace("substract-", "quantity-");
        let quantityAsociado = document.getElementById(`${quantityId}`);

        let priceId = decrementator.id.replace("substract-", "totalPrice-");
        let priceAsociado = document.getElementById(`${priceId}`);

        let itemPriceId = decrementator.id.replace("substract-", "price-");
        let itemPrice = document.getElementById(`${itemPriceId}`);

        if(quantityAsociado.value != 0) { //Para que no reste infinitamente
            quantityAsociado.value = Number(quantityAsociado.value) - 1;
            priceAsociado.innerText = +((Number(quantityAsociado.value) * parseFloat(itemPrice.innerText)).toFixed(2));
            
            cantItems.innerText = Number(cantItems.innerText) - 1;
            subtotal.innerText = +((Number(subtotal.innerText) - parseFloat(itemPrice.innerText)).toFixed(2));
            precioTotal.innerText = +((Number(subtotal.innerText) + Number(envio.innerText)).toFixed(2));
        }
    }); 
})


// substract.addEventListener('click' , () => {
//     if (Number(quantity.value) > 0){
//         quantity.value = Number(quantity.value) - 1;
//         totalPrice.innerText = quantity.value * parseFloat(itemPrice.textContent);

//         let cart = req.session.cart; // Traigo el carrito de la sesion
//         let indice = validar(cart, req.params.id); //Me fijo si el item a eliminar está en el carrito
    
//         cart[indice].quantity = parseInt(cart[indice].quantity) - 1;
//         cart[indice].price = parseInt(cart[indice].price) - parseFloat(cart[indice].funko.price); 
//     }

// });

// add2.addEventListener('click' , () => quantity2.value = Number(quantity2.value) +1);
// substract2.addEventListener('click' , () => {
//     if (Number(quantity2.value) > 0)
//    quantity2.value = Number(quantity2.value) -1;
// });