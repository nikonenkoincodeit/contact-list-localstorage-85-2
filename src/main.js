import { formEl, containerEl } from "./refs";
import { getData } from "./api";
import { createCard } from "./markup";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

formEl.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  //   const { name, number, email } = e.currentTarget.elements;
  //   const newObj = {
  //     name: name.value,
  //     number: number.value,
  //     email: email.value,
  //   };
  const newObj2 = Object.fromEntries(new FormData(e.target));
  e.target.reset();
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
