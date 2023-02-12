import { saveData, getData, deleteData, updateData } from './api';
import { formRef, jsContainerRef } from './refs';
import { createCard } from './markup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

// let formData = {};

formRef.addEventListener('submit', handleFormValue);

async function handleFormValue(event) {
  event.preventDefault();

  // Вариант 1 *******************************************

  // const form = event.currentTarget.elements;
  // const name = form.name.value.trim();
  // const number = form.number.value.trim();
  // const email = form.email.value.trim();

  // formData = {
  //   name,
  //   number,
  //   email,
  // };

  // console.log(formData);

  // вариант 2 ******************************************

  // const formData = new FormData(event.currentTarget);
  // let formData2 = {};

  // formData.forEach((value, key) => {
  //   formData2[key] = value;
  // });

  // console.log(formData2);

  // вариант 3 ******************************************
  try {
    const formData3 = Object.fromEntries(new FormData(event.currentTarget));
    formData3.createdAt = Date.now();

    const response = await saveData(formData3);
    const markup = createCard([response]);
    addMarkup(markup);
  } catch (error) {
    console.log(error.message);
  }
}

async function init() {
  try {
    const response = await getData();
    const markup = createCard(response);

    addMarkup(markup);
  } catch (error) {
    console.log(error.message);
  }
}
init();

function addMarkup(markup) {
  jsContainerRef.insertAdjacentHTML('beforeend', markup);
}

jsContainerRef.addEventListener('click', deleteCard);
jsContainerRef.addEventListener('input', jsContainerInput);

async function deleteCard(evt) {
  try {
    if (evt.target.nodeName !== 'BUTTON') {
      return;
    }

    const cardWrapRef = evt.target.closest('.js-wrap-card');
    const id = cardWrapRef.dataset.cardid;

    const response = await deleteData(id);

    cardWrapRef.remove();
  } catch (err) {
    console.log(err.message);
  }
}

async function jsContainerInput(evt) {
  try {
    const value = evt.target.textContent;

    const cardWrapRef = evt.target.closest('.js-wrap-card');
    const id = cardWrapRef.dataset.cardid;

    const response = await updateData(id, { name: value });
  } catch (error) {
    console.log(error.message);
  }
}
