// Import Fetch
import getDateFetch from "../fetch/getData.js";
import deleteData from "../fetch/deleteData.js";
import postDate from "../fetch/postData.js";
import putDate from "../fetch/putData.js";

//import Url

const urlHouse = "http://localhost:3000/house";
const urlFavoritosHouse = "http://localhost:3000/favoritos";

//import function

import { printCardHouse } from "../modules/printCard.js";

//array
let house = [];

//Solicitando a la Api informatión

const contenedorCard = document.getElementById("ContenedorCard");
const contenedorCardFavorite = document.getElementById("containerCardFavorite");

document.addEventListener("DOMContentLoaded", async () => {
  // sessionStorage.removeItem("editPersonaje");
  //sessionStorage.removeItem("personajeDetails");
  try {
    house = await getDateFetch(urlHouse);
    const allFavorite = await getDateFetch(urlFavoritosHouse);
    printCardHouse(contenedorCard, house ,1);
    printCardHouse(contenedorCardFavorite, allFavorite ,1);
  } catch (error) {
    console.log(error);
    alert(error);
  }
});

const removeCard2 = (Url, target, contenedorCard) => {
  if (target.classList.contains("card__delete")) {
    Swal.fire({
      title: "¿Do you like remove Card ?",
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
        const urlDelete = `${Url}/${idHouseDelete}`;

        console.log(urlDelete);
        try {
          await deleteData(urlDelete);
          house = await getDateFetch(Url);
          printCardHouse(contenedorCard, Url);
        } catch (error) {
          console.log("No se pudo eliminar hay un error" + error);
        }
      }
    });
  }
};

const containerCardFavorite = document.getElementById("containerCardFavorite");

containerCardFavorite.addEventListener("click", async ({ target }) => {
  removeCard2(urlFavoritosHouse, target, containerCardFavorite);
});

contenedorCard.addEventListener("click", async ({ target }) => {
  //Funcionalidad de ir a detalles del personaje
  if (target.classList.contains("card__img")) {
    console.log(target.id);
    sessionStorage.setItem("HouseDetails", JSON.stringify(target.id));
    location.href = "./detalleHouse.html";
  }
  //Funcionalidad de eliminar un personaje

  removeCard2(urlHouse, target, contenedorCard);

  //Inicio de la funcionalidad de edición

  if (target.classList.contains("card__edit")) {
    console.log(target.name);
    sessionStorage.setItem("editHouse", JSON.stringify(target.name));
    location.href = "../pages/formCreateORUpdate.html";
  }

  //Para agregar a favoritos
  if (target.classList.contains("card__favorite")) {
    const idFavorito = target.name;
    const urlHousejeFavorito = `${urlFavoritosHouse}?id=${idFavorito}`;
    const favorito = await getDateFetch(urlHousejeFavorito);
    //Obtenemos el objeto
    const favoriteHouse = await getDateFetch(`${urlHouse}/${idFavorito}`);
    await postDate(urlFavoritosHouse, favoriteHouse);
    if (favorito.length === 0 && Object.entries(favoriteHouse).length) {
      await postDataFetch(urlFavoritosHouse, favoriteHouse);
      const data = await getDateFetch(urlFavoritosHouse);
    }
  }
});

const formSearch = document.querySelector(".formSearch");
const buttonSearch = document.getElementById("category");

formSearch.addEventListener("input", async ({ target }) => {
  let valor = target.value;
  console.log(valor);

  const datosHouse = await getDateFetch(urlHouse);

  const resultadoBusqueda = datosHouse.filter(
    (house) =>
      house.TypeProperty === valor[0].toUpperCase() + valor.substring(1) ||
      house.statusHouse === valor[0].toUpperCase() + valor.substring(1) ||
      house.nameHome === valor[0].toUpperCase() + valor.substring(1) ||
      house.nameCity === valor[0].toUpperCase() + valor.substring(1)
  );

  if (resultadoBusqueda) {
    printCardHouse(contenedorCard, resultadoBusqueda);
  }
});

