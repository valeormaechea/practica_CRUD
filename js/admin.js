import { Serie } from "./serieClass.js";
import { campoRequerido } from "./validaciones.js";

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

// Agregar validaciones
codigo.addEventListener("onload", () => {});

formulario.addEventListener("submit", crearSerie);
btnCrearSerie.addEventListener("click", () => {
  limpiarFormulario();
  modalAdminSerie.show();
});

function crearSerie(e) {
  e.preventDefault();
  // Volver a validar todos los campos y si son correctos, crear la serie
  let nuevaSerie = new Serie(
    codigo.value,
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
  // Agregamos la serie al final del arreglo
  listaSeries.push(nuevaSerie);
  console.log(listaSeries);
  // Limpiar el formulario
  limpiarFormulario();
  // Guardar la lista de series
  guardarListaSeries();
  // Cerrar modal que administra series
  modalAdminSerie.hide();
  // Mostrar cartel al usuario
  Swal.fire(
    "Serie creada", // Titulo
    "La serie cargada se creó correctamente",
    "success" // Icono. Podria poner una imagen tambien
  );
}

function limpiarFormulario() {
  formulario.reset();
}

function guardarListaSeries() {
  localStorage.setItem("listaSeriesKey", JSON.stringify(listaSeries));
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
