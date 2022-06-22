const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
// const fs = require('fs')
const parser = require('./gramatica')
const { TIPO_INSTRUCCION, TIPO_OPERACION, TIPO_VALOR, TIPO_OPCION_SWITCH } = require('./operaciones')
const { TablaSimbolos, TIPO_DATO, tablaErroresSimbolos } = require('./tablaSimbolos')
const { TIPO_ERROR, TablaErrores } = require('./tablaErrores')
const { tablaErroresLexSin } = require('./gramatica')

app.use(cors())
app.use(bodyParser.json())

let ast
let entradaEditor
let salidaConsola = ''
let _break = false
let _continue = false

const tablaErroresIndex = new TablaErrores([])
const tablaErroresGlobal = new TablaErrores([])

app.get('/', (req, res) => {
  res.send('<h1>Server running</>')
})

let TablaSimbolosGlobal = new TablaSimbolos([])

app.post('/compilar', (req, res) => {
  tablaErroresGlobal.clear()
  TablaSimbolosGlobal = new TablaSimbolos([])
  salidaConsola = ''
  const entradaJson = req.body
  entradaEditor = entradaJson.fileValue.toString()
  ast = parser.parse(entradaEditor)
  interpretarBloque(ast, TablaSimbolosGlobal)

  console.log('Lexicos-sintacticos: ', tablaErroresLexSin)
  console.log('Semanticos-index:', tablaErroresIndex)
  console.log('Erorres simbolos:', tablaErroresSimbolos)
  console.log('Errores Globales', tablaErroresGlobal.getErrores())
  console.log(TablaSimbolosGlobal)

  tablaErroresIndex.errores.forEach((error) => {
    tablaErroresGlobal.addObject(error)
  })

  tablaErroresLexSin.errores.forEach((error) => {
    tablaErroresGlobal.addObject(error)
  })

  tablaErroresSimbolos.errores.forEach((error) => {
    tablaErroresGlobal.addObject(error)
  })

  tablaErroresLexSin.clear()
  tablaErroresSimbolos.clear()
  tablaErroresIndex.clear()

  // console.log(salidaConsola)
  res.json({ salidaConsola })
})

// creando get para enviar los datos de tablaErroresGlobal
app.get('/reporte-errores', (req, res) => {
  res.json(tablaErroresGlobal.getErrores())
})

// getting for tabla simbolos
app.get('/tabla-simbolos', (req, res) => {
  res.json(TablaSimbolosGlobal.getSymbols())
})

// graficar AST
app.get('/reporte-ast', (req, res) => {
  // graficarAST(ast)
  res.json(ast)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/* try {
  const entrada = fs.readFileSync('./entrada.txt')

  ast = parser.parse(entrada.toString())

  fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2))
} catch (error) {
  console.error(error)
} */

const interpretarBloque = (instruccion, tablaSimbolos) => {
  instruccion.forEach(instruccion => {
    console.log({ instruccion })
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
    } else if (instruccion.tipo === TIPO_INSTRUCCION.PRE_DECREMENTO) {
      interpretarPreDecremento(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
      interpretarIf(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
      interpretarIfElse(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE_IF) {
      interpretarIfElseIf(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
      interpretarWhile(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.DO_WHILE) {
      interpretarDoWhile(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_ASIGNACION_SIMBOLOS_MAS) {
      interpretarForAsignacionSimbolosMas(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_ASIGNACION_SIMBOLOS_MENOS) {
      interpretarForAsignacionSimbolosMenos(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_ASIGNACION_OPERACION) {
      interpretarForAsignacionOperacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_DECLARACION_OPERACION) {
      interpretarForDeclaracionOperacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_DECLARACION_SIMBOLOS_MAS) {
      interpretarForDeclaracionSimbolosMas(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR_DECLARACION_SIMBOLOS_MENOS) {
      interpretarForDeclaracionSimbolosMenos(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.BREAK) {
      interpretarBreak(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.SWITCH) {
      interpretarSwitch(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.BLOQUE) {
      interpretarNuevoBloque(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.CONTINUE) {
      interpretarContinue(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
      interpretarPrint(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.PRINT_LOGICO) {
      interpretarPrintLogico(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.METODO_SIN_PARAMETROS) {
      interpretarMetodoSinParametros(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.CALL_METODO_SIN_PARAMETROS) {
      interpretarCallMetodoSinParametros(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.TERNARIA) {
      interpretarTernaria(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.TERNARIA_ASIGNACION) {
      interpretarTernariaAsignacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ARRAY) {
      interpretarArray(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ARRAY_ASIGNACION) {
      interpretarArrayAsignacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ARRAY2D) {
      interpretarArray2D(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ARRAY2D_ASIGNACION) {
      interpretarArray2DAsignacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ARRAY_MODIFICACION) {
      interpretarArrayModificacion(instruccion, tablaSimbolos)
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ARRAY2D_MODIFICACION) {
      interpretarArray2DModificacion(instruccion, tablaSimbolos)
    } else {
      tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.id, instruccion.linea, instruccion.columna, 'TIPO DE OPERACION O INSTRUCCION NO ACEPTADO')
      console.error('ERROR SEMANTICO: tipo de operacion/instrucción no aceptado -> ' + instruccion)
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
  } else if (expresion.tipo === TIPO_OPERACION.TYPEOF) {
    const valorTipo = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).tipo
    return { valor: valorTipo, tipo: TIPO_DATO.STRING }
  } else if (expresion.tipo === TIPO_INSTRUCCION.ARRAY_ACCESO) {
    const valor = interpretarExpresionNumerica(expresion.expresionNumerica, tablaDeSimbolos)
    const simbolo = tablaDeSimbolos.getValue(expresion.identificador)
    return { valor: simbolo.valor[valor.valor], tipo: simbolo.tipo }
  } else if (expresion.tipo === TIPO_INSTRUCCION.ARRAY2D_ACCESO) {
    const valor1 = interpretarExpresionNumerica(expresion.expresionNumerica1, tablaDeSimbolos)
    const valor2 = interpretarExpresionNumerica(expresion.expresionNumerica2, tablaDeSimbolos)
    const simbolo = tablaDeSimbolos.getValue(expresion.identificador)
    return { valor: simbolo.valor[valor1.valor][valor2.valor], tipo: simbolo.tipo }
  } else if (expresion.tipo === TIPO_OPERACION.TOLOWER) {
    const valorToLower = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor.toLowerCase()
    return { valor: valorToLower, tipo: TIPO_DATO.STRING }
  } else if (expresion.tipo === TIPO_OPERACION.TOUPPER) {
    const valorToUpper = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor.toUpperCase()
    return { valor: valorToUpper, tipo: TIPO_DATO.STRING }
  } else if (expresion.tipo === TIPO_OPERACION.ROUND) {
    const valor = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor
    const valorRound = Math.round(valor)
    return { valor: valorRound, tipo: TIPO_DATO.INT }
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
      console.error('ERROR: se esperaban <NUMERO/DOUBLE> para operar: ' + expresion.tipo)
    } else {
      valorIzq = valorIzq.valor
      valorDer = valorIzq.valor
    } */
    /* valorIzq = valorIzq.valor
    valorDer = valorDer.valor */
    if (expresion.tipo === TIPO_OPERACION.SUMA) {
      /* VERIFICAR CADA TIPO_DATO */
      let res
      if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo !== TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) + valorDer.valor
      } else if (valorIzq.tipo !== TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor + valorDer.valor.charCodeAt(0)
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) + valorDer.valor.charCodeAt(0)
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
      if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo !== TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) - valorDer.valor
      } else if (valorIzq.tipo !== TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor - valorDer.valor.charCodeAt(0)
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) - valorDer.valor.charCodeAt(0)
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
      if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo !== TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) * valorDer.valor
      } else if (valorIzq.tipo !== TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor * valorDer.valor.charCodeAt(0)
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) * valorDer.valor.charCodeAt(0)
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
        console.error('ERROR: no se puede dividir entre cero')
        tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, 0, valorDer.fila, valorDer.columna, 'NO SE PUEDE DIVIDIR ENTRE CERO')
        return { valor: undefined, tipo: TIPO_DATO.INT }
      } else {
        let res
        if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo !== TIPO_DATO.CHAR) {
          res = valorIzq.valor.charCodeAt(0) / valorDer.valor
        } else if (valorIzq.tipo !== TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
          res = valorIzq.valor / valorDer.valor.charCodeAt(0)
        } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
          res = valorIzq.valor.charCodeAt(0) / valorDer.valor.charCodeAt(0)
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
      if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo !== TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) ** valorDer.valor
      } else if (valorIzq.tipo !== TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor ** valorDer.valor.charCodeAt(0)
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) ** valorDer.valor.charCodeAt(0)
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
      if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo !== TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) % valorDer.valor
      } else if (valorIzq.tipo !== TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor % valorDer.valor.charCodeAt(0)
      } else if (valorIzq.tipo === TIPO_DATO.CHAR && valorDer.tipo === TIPO_DATO.CHAR) {
        res = valorIzq.valor.charCodeAt(0) % valorDer.valor.charCodeAt(0)
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
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, expresion.tipo, expresion.linea, expresion.columna, 'EXPRESION NUMERICA NO VALIDA')
    console.error('ERROR: expresión numerica no válida: ' + expresion.tipo)
  }
}

const interpretarPrintln = (instruccion, tablaDeSimbolos) => {
  const cadenaAux = interpretarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos)
  if (cadenaAux === undefined) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, undefined, 0, 0, 'NO SE PUEDE ACCEDER A UNA VARIABLE QUE NO HA SIDO DEFINIDA')
    return console.log('ERROR: no se puede acceder a una variable que no ha sido definida')
  }
  const cadena = cadenaAux.valor
  salidaConsola += cadena
  salidaConsola += '\n'
  console.log('>> ' + cadena)
}

const interpretarPrintlnLogico = (expresion, tablaDeSimbolos) => {
  const cadena = interpretarExpresionLogica(expresion.expresionLogica, tablaDeSimbolos)
  salidaConsola += cadena
  salidaConsola += '\n'
  console.log('>> ' + cadena)
}

const interpretarPrint = (instruccion, tablaDeSimbolos) => {
  const cadenaAux = interpretarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos)
  if (cadenaAux === undefined) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, undefined, 0, 0, 'NO SE PUEDE ACCEDER A UNA VARIABLE QUE NO HA SIDO DEFINIDA')
    return console.log('ERROR: no se puede acceder a una variable que no ha sido definida')
  }
  const cadena = cadenaAux.valor
  salidaConsola += cadena
  console.log('>> ' + cadena)
}

const interpretarPrintLogico = (expresion, tablaDeSimbolos) => {
  const cadena = interpretarExpresionLogica(expresion.expresionLogica, tablaDeSimbolos)
  salidaConsola += cadena
  console.log('>> ' + cadena)
}

const interpretarDeclaracionAsignacion = (instruccion, tablaDeSimbolos) => {
  console.log('>> declaracion asignacion', instruccion)
  if (tablaDeSimbolos.exists(instruccion.identificador)) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'VARIABLE YA FUE DECLARADA')
    return
  }
  tablaDeSimbolos.add(instruccion.identificador, instruccion.tipoDato, instruccion.constante)
  const valor = interpretarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.identificador, valor)
}

const interpretarAsignacion = (instruccion, tablaDeSimbolos) => {
  const identificador = tablaDeSimbolos.getValue(instruccion.identificador)
  if (identificador.constante === true) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, identificador.id, 0, 0, 'VARIABLE ES DE TIPO CONSTANTE')
    console.error('ERROR: variable: ' + identificador.id + ' es de tipo constante')
    return
  }
  const valor = interpretarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.identificador, valor)
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
  console.log({ expresion })
  let valorIzq
  let valorDer
  if (expresion.operandoDer === undefined) {
    valorIzq = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos)
    valorIzq = valorIzq.valor
    if (valorIzq === 'true') {
      return true
    }
    return false
  } else {
    valorIzq = interpretarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos)
    valorDer = interpretarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos)
    valorIzq = valorIzq.valor
    valorDer = valorDer.valor
  }

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
  if (expresion.tipo === TIPO_OPERACION.XOR) {
    const valorIzq = interpretarExpresionRelacional(expresion.operandoIzq, tablaDeSimbolos)
    const valorDer = interpretarExpresionRelacional(expresion.operandoDer, tablaDeSimbolos)
    let result
    if (valorIzq === true && valorDer === true) {
      result = false
    } else if (valorIzq === true && valorDer === false) {
      result = true
    } else if (valorIzq === false && valorDer === true) {
      result = true
    } else if (valorIzq === false && valorDer === false) {
      result = false
    }
    return result
  }
  if (expresion.tipo === TIPO_OPERACION.NOT) {
    console.log('ENTRO A NOT:', expresion)
    const valor = interpretarExpresionRelacional(expresion, tablaDeSimbolos)
    console.log('VALOR:', valor)
    return !valor
  }
  if (expresion.tipo === TIPO_VALOR.BOOLEAN) {
    if (expresion.valor === 'true') return true
    if (expresion.valor === 'false') return false
  }
  return interpretarExpresionRelacional(expresion, tablaDeSimbolos)
}

const interpretarIf = (instruccion, tablaDeSimbolos) => {
  console.log(instruccion.expresionLogica)
  const valorCondicion = interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)
  if (valorCondicion) {
    const tablaSimbolosIf = new TablaSimbolos(tablaDeSimbolos._simbolos)
    interpretarBloque(instruccion.instrucciones, tablaSimbolosIf)
  }
}

const interpretarIfElse = (instruccion, tablaDeSimbolos) => {
  const valorCondicion = interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)

  if (valorCondicion) {
    const tablaSimbolosIf = new TablaSimbolos(tablaDeSimbolos._simbolos)
    interpretarBloque(instruccion.instruccionesIfVerdadero, tablaSimbolosIf)
  } else {
    const tablaSimbolosElse = new TablaSimbolos(tablaDeSimbolos._simbolos)
    interpretarBloque(instruccion.instruccionesIfFalso, tablaSimbolosElse)
  }
}

const interpretarIfElseIf = (instruccion, tablaDeSimbolos) => {
  // console.log(instruccion.nuevoIf.nuevoIf)
  const valorCondicion = interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)
  const valorCondicionNuevoIf = interpretarExpresionLogica(instruccion.nuevoIf.expresionLogica, tablaDeSimbolos)

  if (valorCondicion) {
    const tablaSimbolosIf = new TablaSimbolos(tablaDeSimbolos._simbolos)
    interpretarBloque(instruccion.instrucciones, tablaSimbolosIf)
  } else if (valorCondicionNuevoIf) {
    const tablaSimbolosNuevoIf = new TablaSimbolos(tablaDeSimbolos._simbolos)
    interpretarBloque(instruccion.nuevoIf.instrucciones, tablaSimbolosNuevoIf)
  }
}

const interpretarWhile = (instruccion, tablaDeSimbolos) => {
  while (interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)) {
    if (_break) {
      break
    } else {
      const tablaSimbolosWhile = new TablaSimbolos(tablaDeSimbolos._simbolos)
      interpretarBloque(instruccion.instrucciones, tablaSimbolosWhile)
    }
  }
  _break = false
}

const interpretarDoWhile = (instruccion, tablaDeSimbolos) => {
  do {
    if (_break) {
      break
    } else {
      const tablaSimbolosDoWhile = new TablaSimbolos(tablaDeSimbolos._simbolos)
      interpretarBloque(instruccion.instrucciones, tablaSimbolosDoWhile)
    }
  } while (interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos))
  _break = false
}

const interpretarForAsignacionSimbolosMas = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable !== instruccion.aumento) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.variable, instruccion.linea, instruccion.columna, 'ERROR FOR: diferente variable asignada a la declaracion')
    console.error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable + ' ' + instruccion.aumento)
  }
  const valor = interpretarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.variable, valor)
  for (tablaDeSimbolos.getValue(instruccion.variable); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.variable, { valor: tablaDeSimbolos.getValue(instruccion.variable).valor + 1, tipo: tablaDeSimbolos.getValue(instruccion.variable).tipo })) {
    if (_break) {
      tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, 'break', instruccion.linea, instruccion.columna, 'sentencia BREAK no puede ser accesible en ciclos for')
      console.error('ERROR SEMANTICO: sentencia BREAK no puede ser accesible en ciclos for')
      break
    } else {
      const tablaSimbolosFor = new TablaSimbolos(tablaDeSimbolos._simbolos)
      interpretarBloque(instruccion.instrucciones, tablaSimbolosFor)
    }
  }
  _break = false
}

const interpretarForAsignacionSimbolosMenos = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable !== instruccion.decremento) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.variable, instruccion.linea, instruccion.columna, 'ERROR FOR: diferente variable asignada a la declaracion')
    console.error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable + ' ' + instruccion.decremento)
  }
  const valor = interpretarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.variable, valor)
  for (tablaDeSimbolos.getValue(instruccion.variable); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.variable, { valor: tablaDeSimbolos.getValue(instruccion.variable).valor - 1, tipo: tablaDeSimbolos.getValue(instruccion.variable).tipo })) {
    if (_break) {
      tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, 'break', instruccion.linea, instruccion.columna, 'sentencia BREAK no puede ser accesible en ciclos for')
      console.error('ERROR SEMANTICO: sentencia BREAK no puede ser accesible en ciclos for')
      break
    } else {
      const tablaSimbolosFor = new TablaSimbolos(tablaDeSimbolos._simbolos)
      interpretarBloque(instruccion.instrucciones, tablaSimbolosFor)
    }
  }
  _break = false
}

const interpretarForAsignacionOperacion = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable !== instruccion.mismaVariable) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.variable, instruccion.linea, instruccion.columna, 'ERROR FOR: diferente variable asignada a la declaracion')
    console.error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable + ' ' + instruccion.mismaVariable)
  }
  const valor = interpretarExpresionCadena(instruccion.valorVariable, tablaDeSimbolos)
  tablaDeSimbolos.update(instruccion.variable, valor)
  for (tablaDeSimbolos.getValue(instruccion.variable); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.mismaVariable, interpretarExpresionCadena(instruccion.nuevoValor, tablaDeSimbolos))) {
    if (_break) {
      tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, 'break', instruccion.linea, instruccion.columna, 'sentencia BREAK no puede ser accesible en ciclos for')
      console.error('ERROR SEMANTICO: sentencia BREAK no puede ser accesible en ciclos for')
      break
    } else {
      const tablaSimbolosFor = new TablaSimbolos(tablaDeSimbolos._simbolos)
      interpretarBloque(instruccion.instrucciones, tablaSimbolosFor)
    }
  }
  _break = false
}

const interpretarForDeclaracionOperacion = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable1 !== instruccion.variable2) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.variable1, instruccion.linea, instruccion.columna, 'ERROR FOR: diferente variable asignada a la declaracion')
    console.error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable1 + ' ' + instruccion.variable2)
  }
  interpretarDeclaracionAsignacion({
    identificador: instruccion.variable1,
    tipoDato: instruccion.tipoDato,
    constante: false,
    expresionNumerica: instruccion.valorVariable1
  }, tablaDeSimbolos)
  for (tablaDeSimbolos.getValue(instruccion.variable1); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.variable1, interpretarExpresionCadena(instruccion.valorVariable2, tablaDeSimbolos))) {
    if (_break) {
      tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, 'break', instruccion.linea, instruccion.columna, 'sentencia BREAK no puede ser accesible en ciclos for')
      console.error('ERROR SEMANTICO: sentencia BREAK no puede ser accesible en ciclos for')
      break
    } else {
      const tablaSimbolosFor = new TablaSimbolos(tablaDeSimbolos._simbolos)
      interpretarBloque(instruccion.instrucciones, tablaSimbolosFor)
    }
  }
  _break = false
}

const interpretarForDeclaracionSimbolosMas = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable1 !== instruccion.variable2) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.variable1, instruccion.linea, instruccion.columna, 'ERROR FOR: diferente variable asignada a la declaracion')
    console.error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable1 + ' ' + instruccion.variable2)
  }
  interpretarDeclaracionAsignacion({
    identificador: instruccion.variable1,
    tipoDato: instruccion.tipoDato,
    constante: false,
    expresionNumerica: instruccion.valorVariable1
  }, tablaDeSimbolos)
  for (tablaDeSimbolos.getValue(instruccion.variable1); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.variable1, { valor: tablaDeSimbolos.getValue(instruccion.variable1).valor + 1, tipo: tablaDeSimbolos.getValue(instruccion.variable1).tipo })) {
    if (_break) {
      tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, 'break', instruccion.linea, instruccion.columna, 'sentencia BREAK no puede ser accesible en ciclos for')
      console.error('ERROR SEMANTICO: sentencia BREAK no puede ser accesible en ciclos for')
      break
    } else {
      const tablaSimbolosFor = new TablaSimbolos(tablaDeSimbolos._simbolos)
      interpretarBloque(instruccion.instrucciones, tablaSimbolosFor)
    }
  }
  _break = false
}

const interpretarForDeclaracionSimbolosMenos = (instruccion, tablaDeSimbolos) => {
  if (instruccion.variable1 !== instruccion.variable2) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.variable1, instruccion.linea, instruccion.columna, 'ERROR FOR: diferente variable asignada a la declaracion')
    console.error('ERROR FOR: diferente variable asignada a la declaracion: ' + instruccion.variable1 + ' ' + instruccion.variable2)
  }
  interpretarDeclaracionAsignacion({
    identificador: instruccion.variable1,
    tipoDato: instruccion.tipoDato,
    constante: false,
    expresionNumerica: instruccion.valorVariable1
  }, tablaDeSimbolos)
  for (tablaDeSimbolos.getValue(instruccion.variable1); interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); tablaDeSimbolos.update(instruccion.variable1, { valor: tablaDeSimbolos.getValue(instruccion.variable1).valor - 1, tipo: tablaDeSimbolos.getValue(instruccion.variable1).tipo })) {
    if (_break) {
      tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, 'break', instruccion.linea, instruccion.columna, 'sentencia BREAK no puede ser accesible en ciclos for')
      console.error('ERROR SEMANTICO: sentencia BREAK no puede ser accesible en ciclos for')
      break
    } else {
      const tablaSimbolosFor = new TablaSimbolos(tablaDeSimbolos._simbolos)
      interpretarBloque(instruccion.instrucciones, tablaSimbolosFor)
    }
  }
  _break = false
}

const interpretarBreak = (instruccion, tablaDeSimbolos) => {
  _break = true
}

const interpretarContinue = (instruccion, tablaDeSimbolos) => {
  _continue = true
  console.log(_continue)
}

const interpretarSwitch = (instruccion, tablaDeSimbolos) => {
  let evaluar = true
  const valorExpresion = interpretarExpresionNumerica(instruccion.expresionNumerica, tablaDeSimbolos)
  const tablaSimbolosSwitch = new TablaSimbolos(tablaDeSimbolos._simbolos)
  instruccion.casos.forEach(caso => {
    if (caso.tipo === TIPO_OPCION_SWITCH.CASO) {
      const valorExpresionCase = interpretarExpresionNumerica(caso.expresionNumerica, tablaSimbolosSwitch)
      if (valorExpresionCase.valor === valorExpresion.valor && valorExpresionCase.tipo === valorExpresion.tipo) {
        interpretarBloque(caso.instrucciones, tablaSimbolosSwitch)
        evaluar = false
      }
    } else {
      if (evaluar) interpretarBloque(caso.instrucciones, tablaSimbolosSwitch)
    }
  })
  _break = false
}

const interpretarNuevoBloque = (instruccion, tablaDeSimbolos) => {
  console.log(tablaDeSimbolos)
  const tablaSimbolosNuevoBloque = new TablaSimbolos(tablaDeSimbolos._simbolos)
  interpretarBloque(instruccion.instrucciones, tablaSimbolosNuevoBloque)
}

const interpretarMetodoSinParametros = (instruccion, tablaDeSimbolos) => {
  tablaDeSimbolos.addMetodo(instruccion.identificador, TIPO_DATO.METODO_SIN_PARAMETROS, instruccion.instrucciones)
}

const interpretarCallMetodoSinParametros = (instrucciones, tablaDeSimbolos) => {
  const metodo = tablaDeSimbolos.getValue(instrucciones.identificador)
  if (metodo.tipo !== TIPO_DATO.METODO_SIN_PARAMETROS) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instrucciones.identificador, instrucciones.linea, instrucciones.columna, 'El identificador indicado no es un metodo')
  } else {
    const tablaSimbolosNuevoBloque = new TablaSimbolos(tablaDeSimbolos._simbolos)
    interpretarBloque(metodo.valor, tablaSimbolosNuevoBloque)
  }
}

const interpretarTernaria = (instruccion, tablaDeSimbolos) => {
  const valorExpresion = interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)
  if (valorExpresion) {
    interpretarBloque(instruccion.instruccionesVerdadero, tablaDeSimbolos)
  } else {
    interpretarBloque(instruccion.instruccionesFalso, tablaDeSimbolos)
  }
}

const interpretarTernariaAsignacion = (instruccion, tablaDeSimbolos) => {
  const valorExpresion = interpretarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos)
  const objetoAsignacion = {
    identificador: instruccion.identificador,
    tipoDato: instruccion.tipoDato,
    expresionNumerica: undefined,
    constante: instruccion.constante,
    linea: instruccion.linea,
    columna: instruccion.columna
  }
  if (valorExpresion) {
    objetoAsignacion.expresionNumerica = instruccion.instruccionesVerdadero[0]
    interpretarDeclaracionAsignacion(objetoAsignacion, tablaDeSimbolos)
  } else {
    objetoAsignacion.expresionNumerica = instruccion.instruccionesFalso[0]
    interpretarDeclaracionAsignacion(objetoAsignacion, tablaDeSimbolos)
  }
}

const interpretarArray = (instruccion, tablaDeSimbolos) => {
  if (instruccion.tipoDato1 !== instruccion.tipoDato2) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'Los tipos de datos no coinciden')
    return
  }
  if (tablaDeSimbolos.exists(instruccion.identificador)) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'VARIABLE YA FUE DECLARADA')
    return
  }
  tablaDeSimbolos.add(instruccion.identificador, instruccion.tipoDato1, instruccion.constante)
  const array = []
  const tamañoArray = interpretarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos).valor
  for (let i = 0; i < tamañoArray; i++) {
    if (instruccion.tipoDato1 === TIPO_DATO.INT) {
      array.push(0)
    } else if (instruccion.tipoDato1 === TIPO_DATO.DOUBLE) {
      array.push(0.0)
    } else if (instruccion.tipoDato1 === TIPO_DATO.CHAR) {
      array.push('')
    } else if (instruccion.tipoDato1 === TIPO_DATO.BOOLEAN) {
      array.push(false)
    } else if (instruccion.tipoDato1 === TIPO_DATO.STRING) {
      array.push('')
    }
  }
  tablaDeSimbolos.update(instruccion.identificador, { valor: array, tipo: instruccion.tipoDato1 })
}

const interpretarArray2D = (instruccion, tablaDeSimbolos) => {
  if (instruccion.tipoDato1 !== instruccion.tipoDato2) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'Los tipos de datos no coinciden')
    return
  }
  if (tablaDeSimbolos.exists(instruccion.identificador)) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'VARIABLE YA FUE DECLARADA')
    return
  }
  tablaDeSimbolos.add(instruccion.identificador, instruccion.tipoDato1, instruccion.constante)
  const array = []
  const tamañoArray1 = interpretarExpresionCadena(instruccion.expresionNumerica1, tablaDeSimbolos).valor
  const tamañoArray2 = interpretarExpresionCadena(instruccion.expresionNumerica2, tablaDeSimbolos).valor
  for (let i = 0; i < tamañoArray1; i++) {
    const array2 = []
    for (let j = 0; j < tamañoArray2; j++) {
      if (instruccion.tipoDato1 === TIPO_DATO.INT) {
        array2.push(0)
      } else if (instruccion.tipoDato1 === TIPO_DATO.DOUBLE) {
        array2.push(0.0)
      } else if (instruccion.tipoDato1 === TIPO_DATO.CHAR) {
        array2.push('')
      } else if (instruccion.tipoDato1 === TIPO_DATO.BOOLEAN) {
        array2.push(false)
      } else if (instruccion.tipoDato1 === TIPO_DATO.STRING) {
        array2.push('')
      }
    }
    array.push(array2)
  }
  tablaDeSimbolos.update(instruccion.identificador, { valor: array, tipo: instruccion.tipoDato1 })
}

const interpretarArrayAsignacion = (instruccion, tablaDeSimbolos) => {
  if (tablaDeSimbolos.exists(instruccion.identificador)) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'VARIABLE YA FUE DECLARADA')
    return
  }
  tablaDeSimbolos.add(instruccion.identificador, instruccion.tipoDato, instruccion.constante)
  const array = []
  instruccion.listaExpresionNumerica.forEach(expresion => {
    const valorLista = interpretarExpresionNumerica(expresion, tablaDeSimbolos)
    if (valorLista.tipo !== instruccion.tipoDato) {
      tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'Los tipos de datos no coinciden')
      return
    }
    array.push(valorLista.valor)
  })
  tablaDeSimbolos.update(instruccion.identificador, { valor: array, tipo: instruccion.tipoDato })
}

const interpretarArray2DAsignacion = (instruccion, tablaDeSimbolos) => {
  if (tablaDeSimbolos.exists(instruccion.identificador)) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'VARIABLE YA FUE DECLARADA')
    return
  }
  tablaDeSimbolos.add(instruccion.identificador, instruccion.tipoDato, instruccion.constante)
  const array1 = []
  instruccion.listaArrays.forEach(array => {
    const array2 = []
    array.forEach(expresion => {
      const valorLista = interpretarExpresionNumerica(expresion, tablaDeSimbolos)
      if (valorLista.tipo !== instruccion.tipoDato) {
        tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'Los tipos de datos no coinciden')
        return
      }
      array2.push(valorLista.valor)
    })
    array1.unshift(array2)
  })
  tablaDeSimbolos.update(instruccion.identificador, { valor: array1, tipo: instruccion.tipoDato })
}

const interpretarArrayModificacion = (instruccion, tablaDeSimbolos) => {
  if (!tablaDeSimbolos.exists(instruccion.identificador)) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'VARIABLE NO FUE DECLARADA')
    return
  }
  const array = tablaDeSimbolos.getValue(instruccion.identificador).valor
  const posicion = interpretarExpresionNumerica(instruccion.expresionNumerica1, tablaDeSimbolos)
  if (posicion.tipo !== TIPO_DATO.INT) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'No puede acceder a una posición utilizando un valor !== int')
    return
  }
  const valor = interpretarExpresionNumerica(instruccion.expresionNumerica2, tablaDeSimbolos)
  if (valor.tipo !== tablaDeSimbolos.getValue(instruccion.identificador).tipo) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'Los tipos de datos no coinciden')
    return
  }
  array[posicion.valor] = valor.valor
  tablaDeSimbolos.update(instruccion.identificador, { valor: array, tipo: tablaDeSimbolos.getValue(instruccion.identificador).tipo })
}

const interpretarArray2DModificacion = (instruccion, tablaDeSimbolos) => {
  if (!tablaDeSimbolos.exists(instruccion.identificador)) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'VARIABLE NO FUE DECLARADA')
    return
  }
  const array = tablaDeSimbolos.getValue(instruccion.identificador).valor
  const posicion1 = interpretarExpresionNumerica(instruccion.expresionNumerica1, tablaDeSimbolos)
  const posicion2 = interpretarExpresionNumerica(instruccion.expresionNumerica2, tablaDeSimbolos)
  if (posicion1.tipo !== TIPO_DATO.INT || posicion2.tipo !== TIPO_DATO.INT) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'No puede acceder a una posición utilizando un valor !== int')
    return
  }
  const valor = interpretarExpresionNumerica(instruccion.expresionNumerica3, tablaDeSimbolos)
  if (valor.tipo !== tablaDeSimbolos.getValue(instruccion.identificador).tipo) {
    tablaErroresIndex.add(TIPO_ERROR.SEMANTICO, instruccion.identificador, instruccion.linea, instruccion.columna, 'Los tipos de datos no coinciden')
    return
  }
  array[posicion1.valor][posicion2.valor] = valor.valor
  tablaDeSimbolos.update(instruccion.identificador, { valor: array, tipo: tablaDeSimbolos.getValue(instruccion.identificador).tipo })
}
