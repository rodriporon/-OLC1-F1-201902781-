const TIPO_DATO = {
  NUMERO: 'NUMERO',
  STRING: 'STRING'
}

const crearSimbolo = (id, tipo, valor) => {
  return {
    id,
    tipo,
    valor
  }
}

class TablaSimbolos {
  constructor (simbolos) {
    this._simbolos = simbolos
  }

  add (id, tipo) {
    const nuevoSimbolo = crearSimbolo(id, tipo)
    this._simbolos.push(nuevoSimbolo)
  }

  update (id, valor) {
    const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0]
    if (simbolo) {
      if (simbolo.tipo === valor.tipo) {
        if (simbolo.tipo === TIPO_DATO.NUMERO) {
          if (valor.valor instanceof String) {
            simbolo.valor = parseInt(valor.valor, 10)
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
        throw new Error('ERROR DE TIPOS -> variable: ' + id + ' tiene tipo: ' + simbolo.tipo + ' y el valor a asignar es de tipo: ' + valor.tipo)
      }
    } else {
      throw new Error('ERROR: variable: ' + id + ' no ha sido definida')
    }
  }

  getValue (id) {
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
