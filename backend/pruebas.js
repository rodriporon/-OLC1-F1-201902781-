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

    const res = valor * -1
    return { valor: res, tipo: TIPO_DATO.NUMERO }
  } else if (expresion.tipo === TIPO_OPERACION.SUMA || expresion.tipo === TIPO_OPERACION.RESTA || expresion.tipo === TIPO_OPERACION.MULTIPLICACION || expresion.tipo === TIPO_OPERACION.DIVISION) {
    let valorIzq = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos)
    let valorDer = interpretarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos)
    /*     if (valorIzq.tipo !== TIPO_DATO.NUMERO || valorDer.tipo !== TIPO_DATO.NUMERO || valorIzq.tipo !== TIPO_DATO.DOUBLE || valorDer.tipo !== TIPO_DATO.DOUBLE) {
      throw new Error('ERROR: se esperaban <NUMERO/DOUBLE> para operar: ' + expresion.tipo)
    } else {
      valorIzq = valorIzq.valor
      valorDer = valorIzq.valor
    } */
    valorIzq = valorIzq.valor
    valorDer = valorDer.valor
    console.log(typeof (valorIzq))
    if (expresion.tipo === TIPO_OPERACION.SUMA) {
      const res = valorIzq + valorDer
      return { valor: res, tipo: TIPO_DATO.NUMERO }
    }
    if (expresion.tipo === TIPO_OPERACION.RESTA) {
      const res = valorIzq - valorDer
      return { valor: res, tipo: TIPO_DATO.NUMERO }
    }
    if (expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
      const res = valorIzq * valorDer
      return { valor: res, tipo: TIPO_DATO.NUMERO }
    }
    if (expresion.tipo === TIPO_OPERACION.DIVISION) {
      if (valorDer === 0) {
        throw new Error('ERROR: no se puede dividir entre cero')
      } else {
        const res = valorIzq / valorDer
        return { valor: res, tipo: TIPO_DATO.NUMERO }
      }
    }
  } else if (expresion.tipo === TIPO_VALOR.NUMERO) {
    return { valor: expresion.valor, tipo: TIPO_DATO.INT }
  } else if (expresion.tipo === TIPO_VALOR.DOUBLE) {
    return { valor: expresion.valor, tipo: TIPO_DATO.DOUBLE }
  } else if (expresion.tipo === TIPO_VALOR.INT) {
    return { valor: expresion.valor, tipo: TIPO_DATO.INT }
  } else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
    const sym = tablaDeSimbolos.getValue(expresion.valor)
    return { valor: sym.valor, tipo: sym.tipo }
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
