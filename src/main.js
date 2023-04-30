import { formEl } from "./refs";
import { saveArrObj } from "./api";
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
  newObj.id = Date.now();
  saveArrObj(newObj, STORAGE_KEY);
  e.target.reset();
  console.log(newObj);
}

formEl.addEventListener("submit", handlerSubmit);
