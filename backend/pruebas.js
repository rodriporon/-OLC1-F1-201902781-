const fs = require('fs')
const parser = require('./gramatica')
const { TIPO_INSTRUCCION, TIPO_OPERACION, TIPO_VALOR } = require('./operaciones')
const { TablaSimbolos, TIPO_DATO } = require('./tablaSimbolos')

let ast

try {
  const entrada = fs.readFileSync('./entrada.txt')

  ast = parser.parse(entrada.toString())

  fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2))
} catch (error) {
  console.error(error)
}

const TablaSimbolosGlobal = new TablaSimbolos([])

const interpretarAst = (instruccion, tablaSimbolos) => {
  instruccion.forEach(instruccion => {
    if (instruccion.tipo === TIPO_INSTRUCCION.PRINTLN) {
      interpretarPrintln(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_ASIGNACION) {
      interpretarDeclaracionAsignacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
      interpretarAsignacion(instruccion, tablaSimbolos)
    } else {
      throw new Error('ERROR SEMANTICO: tipo de operacion/instrucción no aceptado -> ' + instruccion)
    }
  })
}

const interpretarExpresionCadena = (expresion, tablaDeSimbolos) => {
  if (expresion.tipo === TIPO_VALOR.CADENA) {
    return { valor: expresion.valor, tipo: TIPO_DATO.STRING }
  } else {
    return interpretarExpresionNumerica(expresion, tablaDeSimbolos)
  }
}

const interpretarExpresionNumerica = (expresion, tablaDeSimbolos) => {
  if (expresion.tipo === TIPO_OPERACION.NEGATIVO) {
    const valor = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor
    const valorTipo = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).tipo
    const res = valor * -1

    if (valorTipo === TIPO_DATO.INT) {
      return { valor: res, tipo: TIPO_DATO.INT }
    } else if (valorTipo === TIPO_DATO.DOUBLE) {
      return { valor: res, tipo: TIPO_DATO.DOUBLE }
    } else {
      return { valor: res, tipo: TIPO_DATO.NUMERO }
    }
  } else if (expresion.tipo === TIPO_OPERACION.SUMA ||
     expresion.tipo === TIPO_OPERACION.RESTA ||
      expresion.tipo === TIPO_OPERACION.MULTIPLICACION ||
       expresion.tipo === TIPO_OPERACION.DIVISION ||
        expresion.tipo === TIPO_OPERACION.POTENCIA ||
        expresion.tipo === TIPO_OPERACION.MODULO) {
    const valorIzq = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos)
    const valorDer = interpretarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos)
    /*     if (valorIzq.tipo !== TIPO_DATO.NUMERO || valorDer.tipo !== TIPO_DATO.NUMERO || valorIzq.tipo !== TIPO_DATO.DOUBLE || valorDer.tipo !== TIPO_DATO.DOUBLE) {
      throw new Error('ERROR: se esperaban <NUMERO/DOUBLE> para operar: ' + expresion.tipo)
    } else {
      valorIzq = valorIzq.valor
      valorDer = valorIzq.valor
    } */
    /* valorIzq = valorIzq.valor
    valorDer = valorDer.valor */
    if (expresion.tipo === TIPO_OPERACION.SUMA) {
      /* VERIFICAR CADA TIPO_DATO */
      let res
      if (valorIzq.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) + valorDer.valor
      } else if (valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor + valorDer.valor.charCodeAt(0)
      } else {
        res = valorIzq.valor + valorDer.valor
      }

      if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.STRING) {
        return { valor: res, tipo: TIPO_DATO.STRING }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.STRING) {
        return { valor: res, tipo: TIPO_DATO.STRING }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.STRING) {
        return { valor: res, tipo: TIPO_DATO.STRING }
      } else if (valorIzq.tipo === TIPO_DATO.STRING && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.STRING }
      } else if (valorIzq.tipo === TIPO_DATO.STRING && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.STRING }
      } else if (valorIzq.tipo === TIPO_DATO.STRING && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.STRING }
      } else if (valorIzq.tipo === TIPO_DATO.STRING && valorDer.tipo === TIPO_DATO.STRING) {
        return { valor: res, tipo: TIPO_DATO.STRING }
      } else if (valorIzq.tipo === TIPO_DATO.STRING && valorDer.tipo === TIPO_DATO.BOOLEAN) {
        return { valor: res, tipo: TIPO_DATO.STRING }
      }
    }
    if (expresion.tipo === TIPO_OPERACION.RESTA) {
      let res
      if (valorIzq.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) - valorDer.valor
      } else if (valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor - valorDer.valor.charCodeAt(0)
      } else {
        res = valorIzq.valor - valorDer.valor
      }

      if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.INT }
      }
    }
    if (expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
      let res
      if (valorIzq.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) * valorDer.valor
      } else if (valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor * valorDer.valor.charCodeAt(0)
      } else {
        res = valorIzq.valor * valorDer.valor
      }
      if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.INT }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.INT }
      }
    }
    if (expresion.tipo === TIPO_OPERACION.DIVISION) {
      if (valorDer.valor === 0) {
        throw new Error('ERROR: no se puede dividir entre cero')
      } else {
        let res
        if (valorIzq.tipo === TIPO_DATO.CHAR) {
          res = valorIzq.valor.charCodeAt(0) / valorDer.valor
        } else if (valorDer.tipo === TIPO_DATO.CHAR) {
          res = valorIzq.valor / valorDer.valor.charCodeAt(0)
        } else {
          res = valorIzq.valor / valorDer.valor
        }

        if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.INT) {
          return { valor: res, tipo: TIPO_DATO.INT }
        } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.DOUBLE) {
          return { valor: res, tipo: TIPO_DATO.DOUBLE }
        } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.CHAR) {
          return { valor: res, tipo: TIPO_DATO.INT }
        } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.INT) {
          return { valor: res, tipo: TIPO_DATO.DOUBLE }
        } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.DOUBLE) {
          return { valor: res, tipo: TIPO_DATO.DOUBLE }
        } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.CHAR) {
          return { valor: res, tipo: TIPO_DATO.DOUBLE }
        } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.INT) {
          return { valor: res, tipo: TIPO_DATO.INT }
        } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.DOUBLE) {
          return { valor: res, tipo: TIPO_DATO.DOUBLE }
        } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
          return { valor: res, tipo: TIPO_DATO.INT }
        }
      }
    }
    if (expresion.tipo === TIPO_OPERACION.POTENCIA) {
      let res
      if (valorIzq.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) ** valorDer.valor
      } else if (valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor ** valorDer.valor.charCodeAt(0)
      } else {
        res = valorIzq.valor ** valorDer.valor
      }
      parseFloat(res)
      if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      }
    }

    if (expresion.tipo === TIPO_OPERACION.MODULO) {
      let res
      if (valorIzq.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) % valorDer.valor
      } else if (valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor % valorDer.valor.charCodeAt(0)
      } else {
        res = valorIzq.valor % valorDer.valor
      }
      parseFloat(res)
      if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.INT && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.DOUBLE && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.INT) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.DOUBLE) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        return { valor: res, tipo: TIPO_DATO.DOUBLE }
      }
    }
  } else if (expresion.tipo === TIPO_VALOR.NUMERO) {
    return { valor: expresion.valor, tipo: TIPO_DATO.NUMERO }
  } else if (expresion.tipo === TIPO_VALOR.DOUBLE) {
    return { valor: expresion.valor, tipo: TIPO_DATO.DOUBLE }
  } else if (expresion.tipo === TIPO_VALOR.INT) {
    return { valor: expresion.valor, tipo: TIPO_DATO.INT }
  } else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
    const sym = tablaDeSimbolos.getValue(expresion.valor)
    return { valor: sym.valor, tipo: sym.tipo }
  } else if (expresion.tipo === TIPO_VALOR.CHAR) {
    return { valor: expresion.valor, tipo: TIPO_DATO.CHAR }
  } else {
    throw new Error('ERROR: expresión numerica no válida: ' + expresion.tipo)
  }
}

const interpretarPrintln = (instruccion, tablaDeSimbolos) => {
  const cadena = interpretarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos).valor
  console.log('>> ' + cadena)
}

const interpretarDeclaracionAsignacion = (instruccion, tablaDeSimbolos) => {
  tablaDeSimbolos.add(instruccion.identificador, instruccion.tipoDato)
  const valor = interpretarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.identificador, valor)
}

const interpretarAsignacion = (instruccion, tablaDeSimbolos) => {
  const valor = interpretarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.identificador, valor)
}

interpretarAst(ast, TablaSimbolosGlobal)
