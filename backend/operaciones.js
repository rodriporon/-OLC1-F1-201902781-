const TIPO_VALOR = {
  NUMERO: 'VAL_NUMERO',
  IDENTIFICADOR: 'VAL_IDENTIFICADOR',
  CADENA: 'VAL_CADENA',
  DOUBLE: 'VAL_DOUBLE',
  INT: 'VAL_INT',
  CHAR: 'VAL_CHAR',
  BOOLEAN: 'VAL_BOOLEAN'
}

const TIPO_OPERACION = {
  SUMA: 'OP_SUMA',
  RESTA: 'OP_RESTA',
  MULTIPLICACION: 'OP_MULTIPLICACION',
  DIVISION: 'OP_DIVISION',
  NEGATIVO: 'OP_NEGATIVO',
  POTENCIA: 'OP_POTENCIA',
  MODULO: 'OP_MODULO',

  PRE_INCREMENTO: 'OP_PREINCREMENTO',
  PRE_DECREMENTO: 'OP_PREDECREMENTO',
  POST_INCREMENTO: 'OP_POSTINCREMENTO',
  POST_DECREMENTO: 'OP_POSTDECREMENTO',

  MAYOR: 'OP_MAYOR',
  MENOR: 'OP_MENOR',

  MAYOR_IGUAL: 'OP_MAYOR_IGUAL',
  MENOR_IGUAL: 'OP_MENOR_IGUAL',
  DOBLE_IGUAL: 'OP_DOBLE_IGUAL',
  DIFERENTE: 'OP_DIFERENTE',

  AND: 'OP_AND',
  OR: 'OP_OR',
  NOT: 'OP_NOT',
  XOR: 'OP_XOR',

  TYPEOF: 'OP_TYPEOF',

  BOOLEAN: 'OP_BOOLEAN',

  TERNARIA_ASIGNACION: 'OP_TERNARIA_ASIGNACION',

  TOLOWER: 'OP_TOLOWER',
  TOUPPER: 'OP_TOUPPER',
  ROUND: 'OP_ROUND',
  LENGTH: 'OP_LENGTH'

}

const TIPO_INSTRUCCION = {
  PRINTLN: 'INSTR_PRINTLN',
  PRINTLN_LOGICO: 'INSTR_PRINTLN_LOGICO',

  PRINT: 'INSTR_PRINT',
  PRINT_LOGICO: 'INSTR_PRINT_LOGICO',

  WHILE: 'INSTR_WHILE',
  DO_WHILE: 'INSTR_DO_WHILE',
  DECLARACION_ASIGNACION: 'INSTR_DECLARACION',
  ASIGNACION: 'INSTR_ASIGANCION',
  IF: 'INSTR_IF',
  IF_ELSE: 'INSTR_IF_ELSE',
  IF_ELSE_IF: 'INSTR_IF_ELSE_IF',

  FOR_ASIGNACION_SIMBOLOS_MAS: 'INSTR_FOR_ASIGNACION_INCREMENTO_MAS',
  FOR_ASIGNACION_SIMBOLOS_MENOS: 'INSTR_FOR_ASIGNACION_INCREMENTO_MENOS',
  FOR_DECLARACION_OPERACION: 'INSTR_FOR_DECLARACION_OPERACION',
  FOR_ASIGNACION_OPERACION: 'INSTR_FOR_ASIGNACION_OPERACION',
  FOR_DECLARACION_SIMBOLOS_MAS: 'INSTR_FOR_DECLARACION_SIMBOLOS_MAS',
  FOR_DECLARACION_SIMBOLOS_MENOS: 'INSTR_FOR_DECLARACION_SIMBOLOS_MENOS',

  SWITCH: 'SWITCH',
  SWITCH_OP: 'SWITCH_OP',
  SWITCH_DEF: 'SWITCH_DEF',
  ASIGNACION_SIMPLIFICADA: 'ASIGNACION_SIMPLIFICADA',
  POST_INCREMENTO: 'POST_INCREMENTO',
  POST_DECREMENTO: 'POST_DECREMENTO',
  PRE_INCREMENTO: 'PRE_INCREMENTO',
  PRE_DECREMENTO: 'PRE_DECREMENTO',

  METODO_SIN_PARAMETROS: 'INSTR_METODO_SIN_PARAMETROS',
  METODO_CON_PARAMETROS: 'INSTR_METODO_CON_PARAMETROS',

  CALL_METODO_SIN_PARAMETROS: 'INSTR_CALL_METODO_SIN_PARAMETROS',

  BREAK: 'INSTR_BREAK',
  CONTINUE: 'INSTR_CONTINUE',
  BLOQUE: 'INSTR_BLOQUE',

  TERNARIA: 'INSTR_TERNARIA',
  TERNARIA_ASIGNACION: 'INSTR_TERNARIA_ASIGNACION',

  ARRAY: 'INSTR_ARRAY',
  ARRAY2D: 'INSTR_ARRAY2D',
  ARRAY_ASIGNACION: 'INSTR_ARRAY_ASIGNACION',
  ARRAY2D_ASIGNACION: 'INSTR_ARRAY2D_ASIGNACION',
  ARRAY_ACCESO: 'INSTR_ARRAY_ACCESO',
  ARRAY2D_ACCESO: 'INSTR_ARRAY2D_ACCESO',
  ARRAY_MODIFICACION: 'INSTR_ARRAY_MODIFICACION',
  ARRAY2D_MODIFICACION: 'INSTR_ARRAY2D_MODIFICACION',
  TO_CHAR_ARRAY: 'INSTR_TO_CHAR_ARRAY',
  INDEX_OF: 'INSTR_INDEX_OF',
  PUSH: 'INSTR_PUSH'
}

const TIPO_OPCION_SWITCH = {
  CASO: 'CASO',
  DEFECTO: 'DEFECTO'
}

const nuevaOperacion = (operandoIzq, operandoDer, tipo, linea, columna) => {
  return {
    operandoIzq,
    operandoDer,
    tipo,
    linea,
    columna
  }
}

const instrucciones = {

  nuevoOperacionBinaria: (operandoIzq, operandoDer, tipo, linea, columna) => nuevaOperacion(operandoIzq, operandoDer, tipo, linea, columna),

  nuevoOperacionUnaria: (operando, tipo, linea, columna) => nuevaOperacion(operando, undefined, tipo, linea, columna),

  nuevoValor: (valor, tipo, linea, columna) => {
    return {
      tipo,
      valor,
      linea,
      columna
    }
  },

  nuevoPostIncremento: (identificador, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.POST_INCREMENTO,
      identificador,
      linea,
      columna
    }
  },

  nuevoPostDecremento: (identificador, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.POST_DECREMENTO,
      identificador,
      linea,
      columna
    }
  },

  nuevoPreIncremento: (identificador, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.PRE_INCREMENTO,
      identificador,
      linea,
      columna
    }
  },

  nuevoPreDecremento: (identificador, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.PRE_DECREMENTO,
      identificador,
      linea,
      columna
    }
  },

  nuevoPrintln: (expresionCadena, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.PRINTLN,
      expresionCadena,
      linea,
      columna
    }
  },

  nuevoPrintlnLogico: (expresionLogica, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.PRINTLN_LOGICO,
      expresionLogica,
      linea,
      columna
    }
  },

  nuevoPrint: (expresionCadena, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.PRINT,
      expresionCadena,
      linea,
      columna
    }
  },

  nuevoPrintLogico: (expresionLogica, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.PRINT_LOGICO,
      expresionLogica,
      linea,
      columna
    }
  },

  nuevoWhile: (expresionLogica, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.WHILE,
      expresionLogica,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoDoWhile: (instrucciones, expresionLogica, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.DO_WHILE,
      instrucciones,
      expresionLogica,
      linea,
      columna
    }
  },

  nuevoForAsignacionSimbolosMas: (variable, valorVariable, expresionLogica, aumento, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR_ASIGNACION_SIMBOLOS_MAS,
      expresionLogica,
      instrucciones,
      aumento,
      variable,
      valorVariable,
      linea,
      columna
    }
  },

  nuevoForAsignacionSimbolosMenos: (variable, valorVariable, expresionLogica, decremento, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR_ASIGNACION_SIMBOLOS_MENOS,
      expresionLogica,
      instrucciones,
      decremento,
      variable,
      valorVariable,
      linea,
      columna
    }
  },

  nuevoForAsignacionOperacion: (variable, valorVariable, expresionLogica, mismaVariable, nuevoValor, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR_ASIGNACION_OPERACION,
      expresionLogica,
      instrucciones,
      mismaVariable,
      nuevoValor,
      variable,
      valorVariable,
      linea,
      columna
    }
  },

  nuevoForDeclaracionOperacion: (tipoDato, variable1, valorVariable1, expresionLogica, variable2, valorVariable2, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR_DECLARACION_OPERACION,
      tipoDato,
      variable1,
      valorVariable1,
      expresionLogica,
      variable2,
      valorVariable2,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoForDeclaracionSimbolosMas: (tipoDato, variable1, valorVariable1, expresionLogica, variable2, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR_DECLARACION_SIMBOLOS_MAS,
      tipoDato,
      variable1,
      valorVariable1,
      expresionLogica,
      variable2,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoForDeclaracionSimbolosMenos: (tipoDato, variable1, valorVariable1, expresionLogica, variable2, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR_DECLARACION_SIMBOLOS_MENOS,
      tipoDato,
      variable1,
      valorVariable1,
      expresionLogica,
      variable2,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoDeclaracionAsignacion: (tipoDato, identificador, expresionNumerica, constante, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.DECLARACION_ASIGNACION,
      identificador,
      tipoDato,
      expresionNumerica,
      constante,
      linea,
      columna
    }
  },

  nuevoAsignacion: (identificador, expresionNumerica, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ASIGNACION,
      identificador,
      expresionNumerica,
      linea,
      columna
    }
  },

  nuevoArray: (tipoDato1, identificador, tipoDato2, expresionNumerica, constante, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ARRAY,
      tipoDato1,
      identificador,
      tipoDato2,
      expresionNumerica,
      constante,
      linea,
      columna
    }
  },

  nuevoArray2D: (tipoDato1, identificador, tipoDato2, expresionNumerica1, expresionNumerica2, constante, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ARRAY2D,
      tipoDato1,
      identificador,
      tipoDato2,
      expresionNumerica1,
      expresionNumerica2,
      constante,
      linea,
      columna
    }
  },

  nuevoArrayAsignacion: (tipoDato, identificador, listaExpresionNumerica, constante, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ARRAY_ASIGNACION,
      tipoDato,
      identificador,
      listaExpresionNumerica,
      constante,
      linea,
      columna
    }
  },

  nuevoArray2DAsignacion: (tipoDato, identificador, listaArrays, constante, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ARRAY2D_ASIGNACION,
      tipoDato,
      identificador,
      listaArrays,
      constante,
      linea,
      columna
    }
  },

  nuevoArrayAcceso: (identificador, expresionNumerica, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ARRAY_ACCESO,
      identificador,
      expresionNumerica,
      linea,
      columna
    }
  },

  nuevoArray2DAcceso: (identificador, expresionNumerica1, expresionNumerica2, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ARRAY2D_ACCESO,
      identificador,
      expresionNumerica1,
      expresionNumerica2,
      linea,
      columna
    }
  },

  nuevoArrayModificacion: (identificador, expresionNumerica1, expresionNumerica2, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ARRAY_MODIFICACION,
      identificador,
      expresionNumerica1,
      expresionNumerica2,
      linea,
      columna
    }
  },

  nuevoArray2DModificacion: (identificador, expresionNumerica1, expresionNumerica2, expresionNumerica3, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ARRAY2D_MODIFICACION,
      identificador,
      expresionNumerica1,
      expresionNumerica2,
      expresionNumerica3,
      linea,
      columna
    }
  },

  nuevoToCharArray: (tipoDato, identificador, expresionCadena, constante, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.TO_CHAR_ARRAY,
      tipoDato,
      identificador,
      expresionCadena,
      constante,
      linea,
      columna
    }
  },

  nuevoIf: (expresionLogica, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.IF,
      expresionLogica,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoTernaria: (expresionLogica, instruccionesVerdadero, instruccionesFalso, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.TERNARIA,
      expresionLogica,
      instruccionesVerdadero,
      instruccionesFalso,
      linea,
      columna
    }
  },

  nuevoTernariaAsignacion: (tipoDato, identificador, expresionLogica, instruccionesVerdadero, instruccionesFalso, constante, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.TERNARIA_ASIGNACION,
      tipoDato,
      identificador,
      expresionLogica,
      instruccionesVerdadero,
      instruccionesFalso,
      constante,
      linea,
      columna
    }
  },

  nuevoBloque: (instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.BLOQUE,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoIfElse: (expresionLogica, instruccionesIfVerdadero, instruccionesIfFalso, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.IF_ELSE,
      expresionLogica,
      instruccionesIfVerdadero,
      instruccionesIfFalso,
      linea,
      columna
    }
  },

  nuevoIfElseIf: (expresionLogica, instrucciones, nuevoIf, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.IF_ELSE_IF,
      expresionLogica,
      instrucciones,
      nuevoIf,
      linea,
      columna
    }
  },

  nuevoSwitch: (expresionNumerica, casos, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.SWITCH,
      expresionNumerica,
      casos,
      linea,
      columna
    }
  },

  nuevoListaCases: (caso) => {
    const casos = []
    casos.push(caso)
    return casos
  },

  nuevoListaExpresionesNumericas: (expresionNumerica) => {
    const expresionesNumericas = []
    expresionesNumericas.push(expresionNumerica)
    return expresionesNumericas
  },

  nuevoListaArrays: (array) => {
    const listaArrays = []
    listaArrays.push(array)
    return listaArrays
  },

  nuevoCase: (expresionNumerica, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_OPCION_SWITCH.CASO,
      expresionNumerica,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoCaseDefault: (instrucciones, linea, columna) => {
    return {
      tipo: TIPO_OPCION_SWITCH.DEFECTO,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoMetodoSinParametros: (identificador, instrucciones, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.METODO_SIN_PARAMETROS,
      identificador,
      instrucciones,
      linea,
      columna
    }
  },

  nuevoCallMetodoSinParametros: (identificador, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.CALL_METODO_SIN_PARAMETROS,
      identificador,
      linea,
      columna
    }
  },

  nuevoAsignacionSimplificada: (identificador, operador, expresionNumerica, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.ASIGNACION_SIMPLIFICADA,
      operador,
      expresionNumerica,
      identificador,
      linea,
      columna
    }
  },

  nuevoBreak: (linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.BREAK,
      linea,
      columna
    }
  },

  nuevoContinue: (linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.CONTINUE,
      linea,
      columna
    }
  },

  nuevoIndexOf: (identificador, expresionNumerica, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.INDEX_OF,
      identificador,
      expresionNumerica,
      linea,
      columna
    }
  },

  nuevoPush: (identificador, expresionNumerica, linea, columna) => {
    return {
      tipo: TIPO_INSTRUCCION.PUSH,
      identificador,
      expresionNumerica,
      linea,
      columna
    }
  }
}

module.exports.TIPO_OPERACION = TIPO_OPERACION
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION
module.exports.TIPO_VALOR = TIPO_VALOR
module.exports.instrucciones = instrucciones
module.exports.TIPO_OPCION_SWITCH = TIPO_OPCION_SWITCH
