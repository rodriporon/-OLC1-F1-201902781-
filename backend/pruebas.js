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

const interpretarBloque = (instruccion, tablaSimbolos) => {
  instruccion.forEach(instruccion => {
    if (instruccion.tipo === TIPO_INSTRUCCION.PRINTLN) {
      interpretarPrintln(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.PRINTLN_LOGICO) {
      interpretarPrintlnLogico(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_ASIGNACION) {
      interpretarDeclaracionAsignacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
      interpretarAsignacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.POST_INCREMENTO) {
      interpretarPostIncremento(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.POST_DECREMENTO) {
      interpretarPostDecremento(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.PRE_INCREMENTO) {
      interpretarPreIncremento(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.PRE_INCREMENTO) {
      interpretarPreDecremento(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
      interpretarIf(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
      interpretarIfElse(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE_IF) {
      interpretarIfElseIf(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
      interpretarWhile(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_ASIGNACION_SIMBOLOS_MAS) {
      interpretarForAsignacionSimbolosMas(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_ASIGNACION_SIMBOLOS_MENOS) {
      interpretarForAsignacionSimbolosMenos(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_ASIGNACION_OPERACION) {
      interpretarForAsignacionOperacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_DECLARACION_OPERACION) {
      interpretarForDeclaracionOperacion(instruccion, tablaSimbolos)
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
  } else if (expresion.tipo === TIPO_OPERACION.POST_INCREMENTO) {
    const valor = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor
    const valorTipo = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).tipo
    const res = valor + 1

    tablaDeSimbolos.update(expresion.operandoIzq.valor, { valor: res, tipo: valorTipo })
    return { valor: res - 1, tipo: valorTipo }
  } else if (expresion.tipo === TIPO_OPERACION.POST_DECREMENTO) {
    const valor = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor
    const valorTipo = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).tipo
    const res = valor - 1

    tablaDeSimbolos.update(expresion.operandoIzq.valor, { valor: res, tipo: valorTipo })
    return { valor: res + 1, tipo: valorTipo }
  } else if (expresion.tipo === TIPO_OPERACION.PRE_INCREMENTO) {
    const valor = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor
    const valorTipo = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).tipo
    const res = valor + 1

    tablaDeSimbolos.update(expresion.operandoIzq.valor, { valor: res, tipo: valorTipo })
    return { valor: res, tipo: valorTipo }
  } else if (expresion.tipo === TIPO_OPERACION.PRE_DECREMENTO) {
    const valor = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor
    const valorTipo = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).tipo
    const res = valor - 1

    tablaDeSimbolos.update(expresion.operandoIzq.valor, { valor: res, tipo: valorTipo })
    return { valor: res, tipo: valorTipo }
  } else if (expresion.tipo === TIPO_INSTRUCCION.POST_INCREMENTO) {
    const valor = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor
    const valorTipo = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).tipo
    const res = valor + 1
    return { valor: res, tipo: valorTipo }
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
  } else if (expresion.tipo === TIPO_VALOR.BOOLEAN) {
    return { valor: expresion.valor, tipo: TIPO_DATO.BOOLEAN }
  } else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
    const sym = tablaDeSimbolos.getValue(expresion.valor)
    return { valor: sym.valor, tipo: sym.tipo }
  } else if (expresion.tipo === TIPO_VALOR.CHAR) {
    return { valor: expresion.valor, tipo: TIPO_DATO.CHAR }
  } else if (expresion.tipo === TIPO_VALOR.CADENA) {
    return { valor: expresion.valor, tipo: TIPO_DATO.STRING }
  } else if (expresion.tipo === TIPO_OPERACION.MENOR) {
    return { valor: expresion.valor, tipo: expresion.tipo }
  } else if (expresion.tipo === TIPO_OPERACION.MAYOR) {
    return { valor: expresion.valor, tipo: expresion.tipo }
  } else if (expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
    return { valor: expresion.valor, tipo: expresion.tipo }
  } else if (expresion.tipo === TIPO_OPERACION.MENOR_IGUAL) {
    return { valor: expresion.valor, tipo: expresion.tipo }
  } else {
    throw new Error('ERROR: expresión numerica no válida: ' + expresion.tipo)
  }
}

const interpretarPrintln = (instruccion, tablaDeSimbolos) => {
  const cadena = interpretarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos).valor
  console.log('>> ' + cadena)
}

const interpretarPrintlnLogico = (expresion, tablaDeSimbolos) => {
  const cadena = interpretarExpresionLogica(expresion.expresionLogica, tablaDeSimbolos)
  console.log('>> ' + cadena)
}

const interpretarDeclaracionAsignacion = (instruccion, tablaDeSimbolos) => {
  tablaDeSimbolos.add(instruccion.identificador, instruccion.tipoDato, instruccion.constante)
  const valor = interpretarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.identificador, valor)
}

const interpretarAsignacion = (instruccion, tablaDeSimbolos) => {
  const identificador = tablaDeSimbolos.getValue(instruccion.identificador)
  if (!identificador.constante) {
    const valor = interpretarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos)
    tablaDeSimbolos.update(instruccion.identificador, valor)
  } else {
    throw new Error('ERROR: variable: ' + identificador.id + ' es de tipo constante')
  }
}

const interpretarPostIncremento = (instruccion, tablaDeSimbolos) => {
  const valor = tablaDeSimbolos.getValue(instruccion.identificador)
  valor.valor = valor.valor + 1
  tablaDeSimbolos.update(instruccion.identificador, valor)
}

const interpretarPostDecremento = (instruccion, tablaDeSimbolos) => {
  const valor = tablaDeSimbolos.getValue(instruccion.identificador)
  valor.valor = valor.valor - 1
  tablaDeSimbolos.update(instruccion.identificador, valor)
}

const interpretarPreIncremento = (instruccion, tablaDeSimbolos) => {
  const valor = tablaDeSimbolos.getValue(instruccion.identificador)
  valor.valor = valor.valor + 1
  tablaDeSimbolos.update(instruccion.identificador, valor)
}

const interpretarPreDecremento = (instruccion, tablaDeSimbolos) => {
  const valor = tablaDeSimbolos.getValue(instruccion.identificador)
  valor.valor = valor.valor - 1
  tablaDeSimbolos.update(instruccion.identificador, valor)
}

const interpretarExpresionRelacional = (expresion, tablaDeSimbolos) => {
  let valorIzq = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos)
  let valorDer = interpretarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos)

  valorIzq = valorIzq.valor
  valorDer = valorDer.valor

  if (expresion.tipo === TIPO_OPERACION.MAYOR) return valorIzq > valorDer
  if (expresion.tipo === TIPO_OPERACION.MENOR) return valorIzq < valorDer
  if (expresion.tipo === TIPO_OPERACION.MAYOR_IGUAL) return valorIzq >= valorDer
  if (expresion.tipo === TIPO_OPERACION.MENOR_IGUAL) return valorIzq <= valorDer
  if (expresion.tipo === TIPO_OPERACION.DOBLE_IGUAL) return valorIzq === valorDer
  if (expresion.tipo === TIPO_OPERACION.DIFERENTE) return valorIzq !== valorDer
}

const interpretarExpresionLogica = (expresion, tablaDeSimbolos) => {
  if (expresion.tipo === TIPO_OPERACION.AND) {
    const valorIzq = interpretarExpresionRelacional(expresion.operandoIzq, tablaDeSimbolos)
    const valorDer = interpretarExpresionRelacional(expresion.operandoDer, tablaDeSimbolos)
    return valorIzq && valorDer
  }
  if (expresion.tipo === TIPO_OPERACION.OR) {
    const valorIzq = interpretarExpresionRelacional(expresion.operandoIzq, tablaDeSimbolos)
    const valorDer = interpretarExpresionRelacional(expresion.operandoDer, tablaDeSimbolos)
    return valorIzq || valorDer
  }
  if (expresion.tipo === TIPO_OPERACION.NOT) {
    const valor = interpretarExpresionRelacional(expresion.operandoIzq, tablaDeSimbolos)
    return !valor
  }
  if (expresion.tipo === TIPO_OPERACION.BOOLEAN) {
    // console.log(expresion.valor, typeof (expresion.valor))
  }
  return interpretarExpresionRelacional(expresion, tablaDeSimbolos)
}

const interpretarIf = (instruccion, tablaDeSimbolos) => {
  const valorCondicion = interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)
  if (valorCondicion) {
    // const tablaSimbolosIf = new TablaSimbolos(tablaDeSimbolos.simbolos)
    interpretarBloque(instruccion.instrucciones, tablaDeSimbolos)
  }
}

const interpretarIfElse = (instruccion, tablaDeSimbolos) => {
  const valorCondicion = interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)

  if (valorCondicion) {
    // const tablaSimbolosIf = new TablaSimbolos(tablaDeSimbolos.simbolos)
    interpretarBloque(instruccion.instruccionesIfVerdadero, tablaDeSimbolos)
  } else {
    // const tablaSimbolosElse = new TablaSimbolos(tablaDeSimbolos.simbolos)
    interpretarBloque(instruccion.instruccionesIfFalso, tablaDeSimbolos)
  }
}

const interpretarIfElseIf = (instruccion, tablaDeSimbolos) => {
  // console.log(instruccion.nuevoIf.nuevoIf)
  const valorCondicion = interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)
  const valorCondicionNuevoIf = interpretarExpresionLogica(instruccion.nuevoIf.expresionLogica, tablaDeSimbolos)

  if (valorCondicion) {
    // const tablaSimbolosIf = new TablaSimbolos(tablaDeSimbolos.simbolos)
    interpretarBloque(instruccion.instrucciones, tablaDeSimbolos)
  } else if (valorCondicionNuevoIf) {
    // const tablaSimbolosNuevoIf = new TablaSimbolos(tablaDeSimbolos.simbolos)
    interpretarBloque(instruccion.nuevoIf.instrucciones, tablaDeSimbolos)
  }
}

const interpretarWhile = (instruccion, tablaDeSimbolos) => {
  while (interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)) {
    // const tablaSimbolosWhile = new TablaSimbolos(tablaDeSimbolos.simbolos)
    interpretarBloque(instruccion.instrucciones, tablaDeSimbolos)
  }
}

const interpretarForAsignacionSimbolosMas = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable !== instruccion.aumento) throw new Error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable + ' ' + instruccion.aumento)
  const valor = interpretarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.variable, valor)
  for (tablaDeSimbolos.getValue(instruccion.variable); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.variable, { valor: tablaDeSimbolos.getValue(instruccion.variable).valor + 1, tipo: tablaDeSimbolos.getValue(instruccion.variable).tipo })) {
    interpretarBloque(instruccion.instrucciones, tablaDeSimbolos)
  }
}

const interpretarForAsignacionSimbolosMenos = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable !== instruccion.decremento) throw new Error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable + ' ' + instruccion.decremento)
  const valor = interpretarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.variable, valor)
  for (tablaDeSimbolos.getValue(instruccion.variable); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.variable, { valor: tablaDeSimbolos.getValue(instruccion.variable).valor - 1, tipo: tablaDeSimbolos.getValue(instruccion.variable).tipo })) {
    interpretarBloque(instruccion.instrucciones, tablaDeSimbolos)
  }
}

const interpretarForAsignacionOperacion = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable !== instruccion.mismaVariable) throw new Error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable + ' ' + instruccion.mismaVariable)
  const valor = interpretarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.variable, valor)
  for (tablaDeSimbolos.getValue(instruccion.variable); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.mismaVariable, interpretarExpresionCadena(instruccion.nuevoValor, tablaDeSimbolos))) {
    interpretarBloque(instruccion.instrucciones, tablaDeSimbolos)
  }
}

const interpretarForDeclaracionOperacion = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable1 !== instruccion.variable2) throw new Error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable1 + ' ' + instruccion.variable2)
  interpretarDeclaracionAsignacion({
    identificador: instruccion.variable1,
    tipoDato: instruccion.tipoDato,
    constante: false,
    expresionNumerica: instruccion.valorVariable1
  }, tablaDeSimbolos)
  for (tablaDeSimbolos.getValue(instruccion.variable1); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.variable1, interpretarExpresionCadena(instruccion.valorVariable2, tablaDeSimbolos))) {
    interpretarBloque(instruccion.instrucciones, tablaDeSimbolos)
  }
}
interpretarBloque(ast, TablaSimbolosGlobal)
