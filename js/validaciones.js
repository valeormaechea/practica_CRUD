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
