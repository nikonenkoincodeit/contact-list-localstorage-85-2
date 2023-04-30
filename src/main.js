import { formEl, containerEl } from "./refs";
import { save, load, saveArrObj } from "./api";
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

function removeCard(e) {
  if (!e.target.classList.contains("btn-close")) return;
  const { parentEl, cardId } = getParent(e.target);
  const filteredArr = load(STORAGE_KEY).filter(
    ({ createdAt }) => Number(createdAt) !== Number(cardId)
  );
  save(STORAGE_KEY, filteredArr);
  parentEl.remove();
}

function updateTitle(e) {
  const title = e.target.textContent;
  const cards = load(STORAGE_KEY);
  const { cardId } = getParent(e.target);
  const cardObj = cards.find(
    ({ createdAt }) => Number(createdAt) === Number(cardId)
  );
  cardObj.name = title;
  save(STORAGE_KEY, cards);
}

function getParent(el) {
  const parentEl = el.closest(".js-wrap-card");
  const cardId = parentEl.dataset.cardid;
  return {
    parentEl,
    cardId,
  };
}

init();

formEl.addEventListener("submit", handlerSubmit);
containerEl.addEventListener("click", removeCard);
containerEl.addEventListener("input", updateTitle);
