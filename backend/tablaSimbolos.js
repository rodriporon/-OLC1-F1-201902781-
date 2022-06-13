const TIPO_DATO = {
  INT: 'INT',
  DOUBLE: 'DOUBLE',
  CHAR: 'CHAR',
  BOOLEAN: 'BOOLEAN',
  STRING: 'STRING',
  CONST: 'CONST',
  NUMERO: 'NUMERO'
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
    this._simbolos.push(crearSimbolo('_$_break', 'BOOLEAN', false, false))
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
        console.error('ERROR DE TIPOS -> variable: ' + id + ' tiene tipo: ' + simbolo.tipo + ' y el valor a asignar es de tipo: ' + valor.tipo)
      }
    } else {
      throw new Error('ERROR: variable: ' + id + ' no ha sido definida')
    }
  }

  getValue (id) {
    if (!this._simbolos) throw new Error('Ninguna variable declarada')
    const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0]

    if (simbolo) return simbolo
    else throw new Error('ERROR: variable: ' + id + ' no ha sido definida')
  }

  getSymbols () {
    return this._simbolos
  }
}

module.exports.TIPO_DATO = TIPO_DATO
module.exports.TablaSimbolos = TablaSimbolos
