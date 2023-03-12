import { formEl } from "./refs";

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
