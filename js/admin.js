import { Serie } from "./serieClass.js";
import {
  campoRequerido,
  cantidadCaracteres,
  validarUrl,
} from "./validaciones.js";

// Traemos los elementos del formulario
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let imagen = document.getElementById("imagen");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formSerie");
const modalAdminSerie = new bootstrap.Modal(
  document.getElementById("modalSerie")
);
let btnCrearSerie = document.getElementById("btnCrearSerie");

// Si hay algo en LocalStorage, traer esos datos. Si no hay nada, listaSeries tiene que ser una []
let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];
let codigos = JSON.parse(localStorage.getItem("listaCodigos")) || [];

// Agregar validaciones
btnCrearSerie.addEventListener("click", () => {
  codigo.placeholder = codigoAleatorio();
});

titulo.addEventListener("blur", () => {
  campoRequerido(titulo);
});

titulo.addEventListener("change", () => {
  cantidadCaracteres(2, 20, titulo);
});

descripcion.addEventListener("blur", () => {
  cantidadCaracteres(10, 200, descripcion);
});

imagen.addEventListener("blur", () => {
  validarUrl(imagen);
});

genero.addEventListener("blur", () => {
  campoRequerido(genero);
});

formulario.addEventListener("submit", crearSerie);
btnCrearSerie.addEventListener("click", () => {
  // limpiarFormulario();
  modalAdminSerie.show();
});

cargaInicial();

function crearSerie(e) {
  e.preventDefault();
  // Volver a validar todos los campos y si son correctos, crear la serie
  let nuevaSerie = new Serie(
    (codigo.value = codigo.placeholder),
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
  console.log(`codigo ${codigo.value}`);
  codigos.push(codigo.value);
  // Agregamos la serie al final del arreglo
  listaSeries.push(nuevaSerie);
  console.log(listaSeries);
  // Limpiar el formulario
  // limpiarFormulario();
  // Guardar la lista de series
  guardarListaSeries();
  // Guardar la lista de codigos
  guardarListaCodigos();
  // Cerrar modal que administra series
  modalAdminSerie.hide();
  // Mostrar cartel al usuario
  Swal.fire(
    "Serie creada", // Titulo
    "La serie cargada se creó correctamente",
    "success" // Icono. Podria poner una imagen tambien
  );

  crearFila(nuevaSerie);
}

// function limpiarFormulario() {
//   console.log(formulario);
//   formulario.reset();
//   // Quitar la clase validate a los input
//   for (let input = 0; input <= 6; input++)
//     formulario.children[input].children[1].className = "form-control";
// }

function guardarListaSeries() {
  localStorage.setItem("listaSeriesKey", JSON.stringify(listaSeries));
}

function guardarListaCodigos() {
  localStorage.setItem("listaCodigos", JSON.stringify(codigos));
}

function cargaInicial() {
  // Se encarga de ver si el arreglo tiene datos para dibujar la tabla
  if (listaSeries.length > 0) {
    // Dibujar la tabla
    listaSeries.forEach((itemSerie) => {
      crearFila(itemSerie);
    }); // La palabra inventada del parametro representa cada uno de los elementos del array
  }
}

function crearFila(itemSerie) {
  let tablaSeries = document.querySelector("#listaSeries");
  tablaSeries.innerHTML += `<tr>
  <th scope="row">${itemSerie.codigo}</th>
  <td>${itemSerie.titulo}</td>
  <td>
    <p>
      ${itemSerie.descripcion}
    </p>
  </td>
  <td>
    <p>
      ${itemSerie.imagen}
    </p>
  </td>
  <td>${itemSerie.genero}</td>
  <td>
    <button class="btn btn-warning btn-sm">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="btn btn-danger btn-sm">
      <i class="bi bi-trash3-fill"></i>
    </button>
  </td>
</tr>`;
}

/*
// Notacion literal de objetos
let nombre = {
  nombre: "asdasd",
  apellido: "asdasdad",
};

// Notacion Json
persona = {
  nombre: "asdasd",
  apellido: "asdadasd",
};
*/

function codigoAleatorio() {
  //let numero = Math.round(Math.random() * (99999999 - 10000000) + 10000000);
  let numero = Math.round(Math.random() * (9999 - 1000) + 1000);
  console.log(`Numero ${numero}`);
  //Con numeros mas pequeños: mas chances para probar el else y la no repetición
  //let numero = Math.round(Math.random() * (1000 - 100) + 100);

  if (codigos.indexOf(numero) === -1) {
    return numero;
  } else {
    codigoAleatorio();
  }
}
