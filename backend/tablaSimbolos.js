const { TIPO_ERROR, TablaErrores } = require('./tablaErrores')

const tablaErroresSimbolos = new TablaErrores([])

const TIPO_DATO = {
  INT: 'INT',
  DOUBLE: 'DOUBLE',
  CHAR: 'CHAR',
  BOOLEAN: 'BOOLEAN',
  STRING: 'STRING',
  CONST: 'CONST',
  NUMERO: 'NUMERO',
  UNDEFINED: 'undefined'
}

const crearSimbolo = (id, tipo, valor, constante) => {
  return {
    id,
    tipo,
    valor,
    constante
  }
}

class TablaSimbolos {
  constructor (simbolos) {
    this._simbolos = simbolos
  }

  add (id, tipo, constante) {
    const nuevoSimbolo = crearSimbolo(id, tipo, undefined, constante)
    this._simbolos.push(nuevoSimbolo)
  }

  update (id, valor) {
    const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0]
    if (simbolo) {
      if (simbolo.tipo === valor.tipo || simbolo.tipo === 'CONST') {
        if (simbolo.tipo === TIPO_DATO.NUMERO || simbolo.tipo === TIPO_DATO.INT) {
          if (valor.valor instanceof String) {
            simbolo.valor = parseInt(valor.valor, 10)
          } else {
            simbolo.valor = valor.valor
          }
        } else if (simbolo.tipo === TIPO_DATO.DOUBLE) {
          if (valor.valor instanceof Float64Array || valor.valor instanceof Float32Array) {
            simbolo.valor = parseFloat(valor.valor)
          } else {
            simbolo.valor = valor.valor
          }
        } else {
          if (valor.valor instanceof Number) {
            simbolo.valor = valor.valor.toString()
          } else {
            simbolo.valor = valor.valor
          }
        }
      } else {
        tablaErroresSimbolos.add(TIPO_ERROR.SEMANTICO, id, valor.linea, valor.columna, 'ERROR DE ASIGNACION, LOS TIPOS NO COINCIDEN')
        console.error('ERROR DE TIPOS -> variable: ' + id + ' tiene tipo: ' + simbolo.tipo + ' y el valor a asignar es de tipo: ' + valor.tipo)
      }
    } else {
      tablaErroresSimbolos.add(TIPO_ERROR.SEMANTICO, id, 0, 0, 'VARIABLE NO HA SIDO DEFINIDA')
      console.error('ERROR: variable: ' + id + ' no ha sido definida')
    }
  }

  exists (id) {
    if (this._simbolos.filter(simbolo => simbolo.id === id)[0]) {
      return true
    }
    return false
  }

  getValue (id) {
    if (!this._simbolos) {
      tablaErroresSimbolos.add(TIPO_ERROR.SEMANTICO, id, 0, 0, 'NINGUNA VARIABLE DECLARADA')
      console.error('Ninguna variable declarada')
    }
    const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0]

    if (simbolo) {
      return simbolo
    } else {
      tablaErroresSimbolos.add(TIPO_ERROR.SEMANTICO, id, 0, 0, 'VARIABLE NO HA SIDO DEFINIDA')
      console.error('ERROR: variable: ' + id + ' no ha sido definida')
      return crearSimbolo(id, TIPO_DATO.UNDEFINED, TIPO_DATO.UNDEFINED, false)
    }
  }

  getSymbols () {
    return this._simbolos
  }
}

module.exports.TIPO_DATO = TIPO_DATO
module.exports.TablaSimbolos = TablaSimbolos
module.exports.tablaErroresSimbolos = tablaErroresSimbolos
