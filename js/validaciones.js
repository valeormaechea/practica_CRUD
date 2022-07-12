export function campoRequerido(input) {
  if (input.value.trim().length > 0) {
    console.log("el dato esta correcto");
    input.className = "form-control is-valid";
  } else {
    console.log("error! no cargo valores");
    input.className += " is-invalid";
  }
}

export function cantidadCaracteres(min, max, input) {
  if (input.value.trim().length >= min && input.value.trim().length <= max) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className += " is-invalid";
    return false;
  }
}

export function validarUrl(url, obligatory, ftp) {
  // Si no se especifica el paramatro "obligatory", interpretamos
  // que no es obligatorio
  if (obligatory == undefined) obligatory = 0;
  // Si no se especifica el parametro "ftp", interpretamos que la
  // direccion no puede ser una direccion a un servidor ftp
  if (ftp == undefined) ftp = 0;

  if (url == "" && obligatory == 0) return true;

  if (ftp) var pattern = /^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;
  else var pattern = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;

  if (url.match(pattern)) {
    url.className = "form-control is-valid";
    return true;
  } else {
    url.className += " is-invalid";
    return false;
  }
}
