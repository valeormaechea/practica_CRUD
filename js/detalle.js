// Extraer de la URL el parametro
const parametro = window.location.search;
const urlParam = new URLSearchParams(parametro);
console.log(urlParam.get("codigo"));

// Buscar con ese parametro la serie en cuestion
let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];
let serieBuscada = listaSeries.find((serie) => {
  return serie.codigo == urlParam.get("codigo");
});
console.log(serieBuscada);

// Cargar los datos de la serie en la card horizontal

let seccionDetalle = document.getElementById("detalleSeries");
seccionDetalle.innerHTML = `<div class="card mb-3">
<div class="row g-0">
  <div class="col-md-4">
    <img src="${serieBuscada.imagen}" class="img-fluid rounded-start" alt="${serieBuscada.titulo}" />
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">{${serieBuscada.titulo}</h5>
      <p class="card-text">
        ${serieBuscada.descripcion}
      </p>
      <p class="card-text">
        Genero:
        <span class="badge rounded-pill bg-warning">${serieBuscada.genero}</span>
      </p>
      <p class="card-text">
        <small class="text-muted">Last updated 3 mins ago</small>
      </p>
    </div>
  </div>
</div>
</div>`;
