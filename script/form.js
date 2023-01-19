
import getDataFetch from "../fetch/getData.js"
import postDate from "../fetch/postData.js"
import putDate from "../fetch/putData.js"
import { submitForm } from "../modules/submitForm.js";

const urlHouse="http://localhost:3000/house"

const form = document.querySelector(".form");

// Capturamos todos los elementos hijos de este form

const valuesForm = Object.values(form);
console.log(valuesForm);

//FORMULARIO PARA  crear  Y EDITar 

const editFormStr = sessionStorage.getItem("editHouse")
  ? JSON.parse(sessionStorage.getItem("editHouse"))
  : "";

const editForm = editFormStr ? parseInt(editFormStr) : null;

//--- Para que nos actualice el título de acuerdo con la acción que vamos a realizar: Crear nuevo personaje o editar personaje

const title = document.querySelector(".title");

const submitButton = valuesForm[valuesForm.length - 2];
console.log(submitButton);

submitButton.innerHTML = editForm ? "Send update" : "Creater House";

//--Este evento permite rellenar los campos del formulario cuando el usuario vá a realizar la edición de un personaje
document.addEventListener("DOMContentLoaded", async () => {
  let editHouse = {};
  const url = editForm ? `${urlHouse}/${editForm}` : urlHouse;

  try {
    if (editForm) {
      editHouse = await getDataFetch(url);
      console.log(editHouse);

      title.innerText = editForm
        ? `UPDATE HOUSE OF ${editHouse.nameHome}`
        : "CREATER NEW HOUSE TO LIST";

      valuesForm.forEach((valueInput) => {
        if (valueInput.id) {
          valueInput.value = editHouse[valueInput.id];
          console.log(valueInput.value);
        }
      });
    }

    await submitForm(form, url, editForm);
  } catch (error) {
    console.log(error);
    alert(error);
  }
});

