'use strict'

// DOM
const inp = document.querySelector('#ingredient');
const inpQuantity = document.querySelector('#Quantity');
const btn = document.querySelector('#btn');
const cont = document.querySelector('#container');
const clearContainer = document.querySelector('.container-clear');
const btnClear = document.querySelector('#clear');
const btnClearDef = document.querySelector('#def-clear');
const btnExit = document.querySelector('#exit');

// Class 
class List {
    constructor(ingredient, quantity) {
        this.ingredient = ingredient;
        this.quantity = quantity;
    }
}

// Line through
function take() {
    let ingredient = JSON.parse(localStorage.getItem('ingredients')) || [];

    // search the element from localStorage e upgrated
    ingredient.forEach(item => {
        if (item.ingredient === this.dataset.ingredient && item.quantity === this.dataset.quantity) {
            item.taken = !item.taken;
            this.classList.toggle('takeit');
        }
    });

    // save the upgrated array to localStorage
    localStorage.setItem('ingredients', JSON.stringify(ingredient));
}

// add new ingredient to the list and to localStorage
function logP() {
    if (inp.value.length < 1 || inpQuantity.value.length < 1) {
        alert('Missing Something');
    } else {
        let listIng = new List(inp.value, inpQuantity.value);
        let elem = document.createElement('p');
        elem.innerHTML = `${listIng.ingredient}:${listIng.quantity}`;
        elem.dataset.ingredient = listIng.ingredient;
        elem.dataset.quantity = listIng.quantity;
        cont.appendChild(elem);
        elem.classList.add('ingredient');
        elem.addEventListener('click', take);

        // take the elemnts by the localStorage
        let ingredient = JSON.parse(localStorage.getItem('ingredients')) || [];
        ingredient.push(listIng);

        // save the elements in the localStorage
        localStorage.setItem('ingredients', JSON.stringify(ingredient));
        inp.value = '';
        inpQuantity.value = '';
    }
}

// load the elements by the localStorage and add to the DOM
function addToDom() {
    cont.innerHTML = '';
    let ingredient = JSON.parse(localStorage.getItem('ingredients')) || [];
    ingredient.forEach(ing => {
        let elem = document.createElement('p');
        elem.innerHTML = `${ing.ingredient}:${ing.quantity}`;
        elem.dataset.ingredient = ing.ingredient;
        elem.dataset.quantity = ing.quantity;
        cont.appendChild(elem);
        elem.classList.add('ingredient');
        if (ing.taken) {
            elem.classList.add('takeit');
        }
        elem.addEventListener('click', take);
    });
}

// popOut to clear the storage
const clearStorageContainer = () => clearContainer.classList.remove('hidden');


// delete the data from the storage
const defClear = () => {
    localStorage.removeItem('ingredients');
    clearContainer.classList.add('hidden');
    cont.innerHTML = '';
}

// hidden the popOut
const exit = () => clearContainer.classList.add('hidden');


// Events
document.addEventListener('DOMContentLoaded', addToDom);
btn.addEventListener('click', logP);
btnClear.addEventListener('click', clearStorageContainer);
btnClearDef.addEventListener('click', defClear);
btnExit.addEventListener('click', exit);

