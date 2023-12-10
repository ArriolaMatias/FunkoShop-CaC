const add1 = document.querySelector("#add1");
const substract1 = document.querySelector("#substract1");

const add2 = document.querySelector("#add2");
const substract2 = document.querySelector("#substract2");

const quantity1 = document.querySelector("#quantity1");
const quantity2 = document.querySelector("#quantity2");

console.log(quantity1);
console.log(quantity2);

add1.addEventListener('click' , () => quantity1.value = Number(quantity1.value) +1);
substract1.addEventListener('click' , () => {
    if (Number(quantity1.value) > 0)
   quantity1.value = Number(quantity1.value) -1;
});

add2.addEventListener('click' , () => quantity2.value = Number(quantity2.value) +1);
substract2.addEventListener('click' , () => {
    if (Number(quantity2.value) > 0)
   quantity2.value = Number(quantity2.value) -1;
});