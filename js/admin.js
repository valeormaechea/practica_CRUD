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

// Variable para manejar el create y el update
let serieExistente = false; // si serieExiste es false la serie es Nueva, si es true ya existe deberia modificar

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

formulario.addEventListener("submit", guardarSerie);
btnCrearSerie.addEventListener("click", () => {
  // limpiarFormulario();
  serieExistente = false;
  modalAdminSerie.show();
});

cargaInicial();

function guardarSerie(e) {
  e.preventDefault();
  // if(true)
  if (serieExistente) {
    //aqui quiero modificar una serie existente
    console.log("aqui quiero modificar");
    //validar los datos
    //guardar la actualizacion
    guardarEdicionSerie();
  } else {
    //aqui quiero crear una nueva serie
    crearSerie();
  }
}

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
    <button class="btn btn-warning btn-sm" onclick='preparEdicionSerie("${itemSerie.codigo}")'>
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="btn btn-danger btn-sm" onclick="borrarProducto('${itemSerie.codigo}')">
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

window.borrarProducto = function (codigo) {
  console.log("desde borrar" + codigo);
  // Preguntar al usuario si estoy segura de borrar
  Swal.fire({
    title: "Estas seguro de borrar la serie?",
    text: "No se puede revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Borrar la serie listaSeries y tambien del localStorage
      let listaSeriesNueva = listaSeries.filter((serie) => {
        return serie.codigo != codigo;
      });
      let listaCodigosNueva = codigos.filter((listaCodigo) => {
        return listaCodigo != codigo;
      });
      console.log(listaCodigosNueva);
      listaSeries = listaSeriesNueva;
      guardarListaSeries();
      codigos = listaCodigosNueva;
      guardarListaCodigos();

      // Actualizar la tabla
      borrarTabla();
      cargaInicial();

      // Mostrar cartel de operacion exitosa
      Swal.fire("Serie eliminada", "La serie fue eliminada.", "success");
    }
  });
};

function borrarTabla() {
  let tbodySeries = document.querySelector("#listaSeries");
  tbodySeries.innerHTML = "";
}

window.preparEdicionSerie = function (codigoP) {
  console.log(codigoP);
  //cargar los datos de la serie a editar
  let serieBuscada = listaSeries.find((serie) => {
    return serie.codigo == codigoP;
  });
  console.log(serieBuscada.codigo);
  //asignar los valores a cada input
  codigo.value = serieBuscada.codigo;
  titulo.value = serieBuscada.titulo;
  descripcion.value = serieBuscada.descripcion;
  imagen.value = serieBuscada.imagen;
  genero.value = serieBuscada.genero;
  //mostrar formulario de la ventana modal
  modalAdminSerie.show();
  // aqui modifico la variable existeSerie para poder editar
  serieExistente = true;
  console.log(serieExistente);
};

function guardarEdicionSerie() {
  //necesitamos la posicion de la serie dentro del arreglo
  let posicionSerie = listaSeries.findIndex((serie) => {
    return serie.codigo == codigo.value;
  });
  //modificamos los valores de la serie encontrada
  listaSeries[posicionSerie].titulo = titulo.value;
  listaSeries[posicionSerie].descripcion = descripcion.value;
  listaSeries[posicionSerie].imagen = imagen.value;
  listaSeries[posicionSerie].genero = genero.value;
  //actualizar el localstorage
  guardarListaSeries();
  //actualizar la tabla
  borrarTabla();
  cargasInicial();
  //indicar al usuario si se pudo realizar la accion
  Swal.fire(
    "Serie actualizada",
    "La serie seleccionada fue correctamente actualizada",
    "success"
  );
  //cerrar la ventana modal
  modalAdminSerie.hide();
}
