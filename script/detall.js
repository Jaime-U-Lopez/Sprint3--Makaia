// Import Fetch
import getDateFetch from "../fetch/getData.js";
import deleteData from "../fetch/deleteData.js";
import postDate from "../fetch/postData.js";
import putDate from "../fetch/putData.js";

//import Url

const urlHouse = "http://localhost:3000/house";

//import function

import { printCardHouse } from "../modules/printCard.js";

//import id SeccionStorage

//const idDetall= sessionStorage.getItem("HouseDetails")

let idDetall = sessionStorage.getItem("HouseDetails")
  ? JSON.parse(sessionStorage.getItem("HouseDetails"))
  : [];

console.log(idDetall);
const idDetallParseint = parseInt(idDetall);

//array
let detallhouse = [];

const contenedorCard = document.getElementById("ContenedorCard2");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let houses = await getDateFetch(urlHouse);

    detallhouse = houses.filter(
      (detallHous) => detallHous.id === idDetallParseint
    );
    console.log(detallhouse);
    printCardHouse(contenedorCard, detallhouse,2);
  } catch (error) {
    console.log(error);
    alert(error);
  }
});
