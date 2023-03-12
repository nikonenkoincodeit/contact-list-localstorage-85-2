import { formEl, containerEl } from "./refs";
import { getData, addData, deleteById } from "./api";
import { createCard } from "./markup";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

formEl.addEventListener("submit", onSubmit);
containerEl.addEventListener("click", onDelete);

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

async function onDelete(e) {
  try {
    e.preventDefault();
    if (!e.target.classList.contains("btn-close")) return;
    const cardEl = e.target.closest(".js-wrap-card");
    const cardId = cardEl.dataset.cardid;
    await deleteById(cardId);
    cardEl.remove();
  } catch (error) {
    console.log(error.message);
  }
}
