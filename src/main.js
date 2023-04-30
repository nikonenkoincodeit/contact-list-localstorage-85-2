import { formEl, containerEl } from "./refs";
import { load, saveArrObj } from "./api";
import { createCard } from "./markup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

const STORAGE_KEY = "formStorageKey";
function handlerSubmit(e) {
  e.preventDefault();
  // let newObj = {};
  //   formEl.elements.__proto__.forEach = [].forEach;
  //   formEl.elements.forEach((el) => {
  //     if (el.nodeName === "INPUT") {
  //       const { name, value } = el;
  //       newObj = {
  //         ...newObj,
  //         [name]: value,
  //       };
  //     }
  //   });
  const newObj = Object.fromEntries(new FormData(e.target));
  newObj.createdAt = Date.now();
  saveArrObj(newObj, STORAGE_KEY);
  e.target.reset();
  console.log(newObj);
  const markup = createCard([newObj]);
  pushMarkup(markup);
}

function init() {
  const cards = load(STORAGE_KEY);
  if (!cards.length) return;
  const markup = createCard(cards);
  pushMarkup(markup);
}

function pushMarkup(markup) {
  containerEl.insertAdjacentHTML("beforeend", markup);
}

init();

formEl.addEventListener("submit", handlerSubmit);
