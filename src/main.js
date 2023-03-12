import { formEl, containerEl } from "./refs";
import { getData, addData } from "./api";
import { createCard } from "./markup";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

formEl.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  //   const { name, number, email } = e.currentTarget.elements;
  //   const newObj = {
  //     name: name.value,
  //     number: number.value,
  //     email: email.value,
  //   };
  try {
    const newObj2 = Object.fromEntries(new FormData(e.target));
    newObj2.createdAt = Date.now();
    const response = await addData(newObj2);
    const markup = createCard([response]);
    appendMarkup(markup);
    e.target.reset();
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  try {
    const dataResponse = await getData();
    if (!dataResponse.length) {
      return;
    }
    const markup = createCard(dataResponse);
    appendMarkup(markup);
  } catch (error) {
    console.error(error);
  }
}

function appendMarkup(markup) {
  containerEl.insertAdjacentHTML("beforeend", markup);
}

init();
