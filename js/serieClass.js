export class Serie {
  constructor(codigo, titulo, descripcion, imagen, genero) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.genero = genero;
  }

  get get_codigo() {
    return this.codigo;
  }

  get get_titulo() {
    return this.titulo;
  }

  get get_descripcion() {
    return this.descripcion;
  }

  get get_imagen() {
    return this.imagen;
  }

  get get_genero() {
    return this.genero;
  }

  set set_codigo(codigoNuevo) {
    this.codigo = codigoNuevo;
  }

  set set_titulo(tituloNuevo) {
    this.titulo = tituloNuevo;
  }

  set set_descripcion(descripNueva) {
    this.descripcion = descripNueva;
  }

  set set_imagen(imagenNueva) {
    this.imagen = imagenNueva;
  }

  set set_genero(generoNuevo) {
    this.genero = generoNuevo;
  }
}
