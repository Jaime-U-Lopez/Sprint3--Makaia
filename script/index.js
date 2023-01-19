

// Import Fetch
import getDateFetch from "../fetch/getData.js"
import deleteData from "../fetch/deleteData.js"
import postDate from "../fetch/postData.js"
import putDate from "../fetch/putData.js"

//import Url

const urlHouse="http://localhost:3000/house"
const urlFavoritosHouse="http://localhost:3000/favoritos"


//import function

import {printCardHouse} from "../modules/printCard.js"

//array
let house =[]

//Solicitando a la Api informatión

const contenedorCard = document.getElementById("ContenedorCard");



document.addEventListener("DOMContentLoaded", async () => {
 // sessionStorage.removeItem("editPersonaje");
  //sessionStorage.removeItem("personajeDetails");
  try {
    house = await getDateFetch(urlHouse);

   printCardHouse(contenedorCard,house) 

  } catch (error) {
    console.log(error);
    alert(error);
  }
});


document.addEventListener("click", async ({ target }) => {
  //Funcionalidad de ir a detalles del personaje
  if (target.classList.contains("card__img")) {
    console.log(target.id);
       
    sessionStorage.setItem("HouseDetails", JSON.stringify(target.id));
    location.href = "./detalleHouse.html";
  
  }
  //Funcionalidad de eliminar un personaje
  if (target.classList.contains("card__delete")) {

    Swal.fire({
      title: "¿Está usted seguro de eliminar?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const idHouseDelete = parseInt(target.name);
        const urlDelete = `${urlHouse}/${idHouseDelete}`;

        try {
          await deleteData(urlDelete);
          house = await getDateFetch(urlHouse);
          printCardHouse(contenedorCard, house);
        } catch (error) {
          console.log("No se pudo eliminar hay un error" + error);
        }
      }
    });
  }

  //Inicio de la funcionalidad de edición

  if (target.classList.contains("card__edit")) {
    console.log(target.name);
    sessionStorage.setItem("editHouse", JSON.stringify(target.name));
    location.href = "../pages/formCreateORUpdate.html";
  }

  //Para agregar a favoritos
  if (target.classList.contains("card__favorite")) {
    const idFavorito = target.name;
    const urlPersonajeFavorito = `${urlFavoritos}?id=${idFavorito}`;

    const favorito = await getDateFetch(urlPersonajeFavorito);
    //Obtenemos el objeto
    const favoritePersonaje = await getDataFetch(
      `${urlPersonajes}/${idFavorito}`
    );
    if (favorito.length === 0 && Object.entries(favoritePersonaje).length) {
      await postDataFetch(urlFavoritos, favoritePersonaje);
      const data = await getDataFetch(urlFavoritos);
      console.log(data);
    }
  }
});



