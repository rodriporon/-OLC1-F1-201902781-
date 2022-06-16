const TIPO_ERROR = {
  LEXICO: 'ERROR_LEXICO',
  SINTACTICO: 'ERROR_SINTACTICO',
  SEMANTICO: 'ERROR_SEMANTICO'
}

const crearError = (tipo, token, fila, columna, descripcion) => {
  return {
    tipo,
    token,
    fila,
    columna,
    descripcion
  }
}

class TablaErrores {
  constructor (errores) {
    this.errores = errores
  }

  clear () {
    this.errores = []
  }

  addObject (objeto) {
    this.errores.push(objeto)
  }

  add (tipo, token, fila, columna, descripcion) {
    const nuevoError = crearError(tipo, token, fila, columna, descripcion)
    this.errores.push(nuevoError)
  }

  getErrores () {
    return this.errores
  }
}

module.exports.TIPO_ERROR = TIPO_ERROR
module.exports.TablaErrores = TablaErrores
