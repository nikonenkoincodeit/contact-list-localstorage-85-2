import { uid } from 'uid';
import { formEl, contactsContainerEl } from "./refs";
import { setItem, getItem } from './api';
import { createCard } from './markup';

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

formEl.addEventListener('submit', onSubmit)
window.addEventListener('load', onLoad)


function onSubmit(evt) {
    evt.preventDefault();
    const data = Object.fromEntries(new FormData(evt.target))
    const obj = makeObj(data)
    console.log(obj);
    evt.target.reset()
    setItem(obj);
    const markup = createCard([obj]);
    addMarkup(markup);
}
function onLoad() {
    const data = getItem();
    if (!data.length) return; 
    const markup = createCard(data);
    addMarkup(markup);
}

function addMarkup(markup) {
    contactsContainerEl.insertAdjacentHTML('beforeend', markup);
}
// // const {name, number, email} = evt.target.elements
//     // console.log(name);
//     // console.log(number);
//     // console.log(email);
//     console.log(evt.target.elements);
//     const nameV = name.value.trim();
//     const numberV = number.value.trim();
//     const emailV = email.value.trim()
//     const obj = makeObj(nameV, numberV, emailV)
//     console.log(obj);
// }

function makeObj(obj) {
    return { ...obj, id: uid(), createdAt: Date.now() }
}





