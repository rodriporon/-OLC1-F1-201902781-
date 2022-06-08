const fs = require('fs')
const parser = require('./gramatica')

// const { TablaSimbolos } = require('./tablaSimbolos')

/* const TIPO_INSTRUCCION = require('./operaciones').TIPO_INSTRUCCION
const TIPO_OPERACION = require('./operaciones').TIPO_OPERACION
const TIPO_VALOR = require('./operaciones').TIPO_VALOR
const operaciones = require('./operaciones').instruccionesAPI
const TIPO_OPCION_SWITCH = require('./operaciones').TIPO_OPCION_SWITCH

const TIPO_DATO = require('./tablaSimbolos').TIPO_DATO
const TablaSimbolos = require('./tablaSimbolos').TablaSimbolos */

let ast

try {
  const entrada = fs.readFileSync('./entrada.txt')

  ast = parser.parse(entrada.toString())

  fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2))
} catch (error) {
  console.error(error)
}
