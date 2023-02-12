import { saveData } from "./api";
import { formRef } from "./refs";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

// let formData = {};

formRef.addEventListener("submit", handleFormValue);

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
  const formData3 = Object.fromEntries(new FormData(event.currentTarget));
  formData3.createdAt = Date.now();

  const response = await saveData(formData3);

  console.log(response);
}
