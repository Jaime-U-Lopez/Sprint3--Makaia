





export  const printCardHouse= (contenedor, houseArray )=>{



  contenedor.innerHTML = " ";

  houseArray.forEach(house => {
        const article = document.createElement("article");
        article.classList.add("Card");
        article.innerHTML = `

        <figure class="FigureCero">
        <img   id=" ${house.id}"    class="ImageCard card__img" src="${ house.imagenUrl }" alt="" srcset="" />
        <p class="p">${ house.TypeProperty }</p>
        <p class="typeHouse">${ house.statusHouse }</p>
        <p class="value">$ ${house.homeValue }</p>
        <p class="ciudad">${house.nameCity }</p>
        <h3 class="ciudad" >${house.nameHome }</h3>

        <button class="card__delete" name='${house.id}'>❌</button>
        <button class="card__edit" name='${house.id}'>✏</button>

        </figure>
        <figure class="FigureBig">
          <figure class="figureOne">
            <figure class="figureOneOne">
              <img src=" ${house.photoUrlSeller}" alt="" srcset="" />
              <p>${house.seller}</p>
            </figure>
            <p class="ajusteP">${house.AplicationData}</p>
          </figure>

          <figure class="FigureBig2">
            <figure class="figureTwo">
              <img src="./image/metrosCuadrados.png" alt="" srcset="" />
              <p> ${house.CountMeter} Sq Ft</p>
            </figure>
            <figure class="FigureBig3" >
              <img src="./image/parking.png" alt="" srcset="" />
              <p> ${house.countParking} </p>
              <img src="./image/cama.png" alt="" srcset="" />
              <p> ${house.countBed} </p>
              <img src="./image/bañera.png" alt="" srcset="" />
              <p> ${house.countBathroon} </p>
            </figure>
          </figure>
        </figure>
     
       
        `
        contenedor.appendChild(article);
    });
}

