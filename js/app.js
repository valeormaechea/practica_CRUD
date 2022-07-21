// Verificar si hay datos en el localStorage
let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];
cargaCards();
// Si hay datos dibujar las cards

function cargaCards() {
  listaSeries.forEach((serie) => {
    crearColumna(serie);
  });
}

function crearColumna(serie) {
  let grillaSeries = document.getElementById("grillaSeries");
  grillaSeries.innerHTML += `
  <article class="col-12 col-md-4 col-lg-3 mb-3">
    <div class="card">
      <img src="${serie.imagen}" class="card-img-top" alt="${serie.titulo}" />
      <div class="card-body">
        <h5 class="card-title">${serie.titulo}</h5>
        <button class="btn btn-primary" onclick="verDetalle(${serie.codigo})">Ver detalle</button>
      </div>
    </div>
  </article>`;
}

window.verDetalle = (codigo) => {
    console.log(codigo);
    console.log(window.location.origin+`/pages/detalle.html`);
    window.location.href = window.location.origin+`/pages/detalle.html`;
};
