const crearTablaSimbolos = (tablaSimbolos, linea, columna) => {
  return {
    tablaSimbolos,
    linea,
    columna
  }
}

class ListaTablaSimbolos {
  constructor (tablaSimbolos) {
    this.tablasSimbolos = tablaSimbolos
  }

  add (tablaSimbolos, linea, columna) {
    this.tablasSimbolos.push(crearTablaSimbolos(tablaSimbolos, linea, columna))
  }

  getList () {
    return this.tablasSimbolos
  }

  clear () {
    this.tablasSimbolos = []
  }
}

module.exports = ListaTablaSimbolos
