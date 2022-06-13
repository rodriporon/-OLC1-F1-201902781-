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

  BOOLEAN: 'OP_BOOLEAN'
}

const TIPO_INSTRUCCION = {
  PRINTLN: 'INSTR_PRINTLN',
  PRINTLN_LOGICO: 'INSTR_PRINTLN_LOGICO',
  WHILE: 'INSTR_WHILE',
  DECLARACION_ASIGNACION: 'INSTR_DECLARACION',
  ASIGNACION: 'INSTR_ASIGANCION',
  IF: 'INSTR_IF',
  IF_ELSE: 'INSTR_IF_ELSE',
  IF_ELSE_IF: 'INSTR_IF_ELSE_IF',
  FOR_ASIGNACION_SIMBOLOS_MAS: 'INSTR_FOR_ASIGNACION_INCREMENTO_MAS',
  FOR_ASIGNACION_SIMBOLOS_MENOS: 'INSTR_FOR_ASIGNACION_INCREMENTO_MENOS',
  FOR_DECLARACION_OPERACION_MAS: 'INSTR_FOR_DECLARACION_OPERACION_MAS',
  FOR_DECLARACION_OPERACION_MENOS: 'INSTR_FOR_DECLARACION_OPERACION_MENOS',
  FOR_ASIGNACION_OPERACION_MENOS: 'INSTR_FOR_ASIGNACION_OPERACION_MENOS',
  FOR_ASIGNACION_OPERACION_MAS: 'INSTR_FOR_ASIGNACION_OPERACION_MAS',
  FOR_DECLARACION_SIMBOLOS_MAS: 'INSTR_FOR_DECLARACION_SIMBOLOS_MAS',
  FOR_DECLARACION_SIMBOLOS_MENOS: 'INSTR_FOR_DECLARACION_SIMBOLOS_MENOS',
  SWITCH: 'SWITCH',
  SWITCH_OP: 'SWITCH_OP',
  SWITCH_DEF: 'SWITCH_DEF',
  ASIGNACION_SIMPLIFICADA: 'ASIGNACION_SIMPLIFICADA',
  POST_INCREMENTO: 'POST_INCREMENTO'
}

const TIPO_OPCION_SWITCH = {
  CASO: 'CASO',
  DEFECTO: 'DEFECTO'
}

const nuevaOperacion = (operandoIzq, operandoDer, tipo) => {
  return {
    operandoIzq,
    operandoDer,
    tipo
  }
}

const instrucciones = {

  nuevoOperacionBinaria: (operandoIzq, operandoDer, tipo) => nuevaOperacion(operandoIzq, operandoDer, tipo),

  nuevoOperacionUnaria: (operando, tipo) => nuevaOperacion(operando, undefined, tipo),

  nuevoValor: (valor, tipo) => {
    return {
      tipo,
      valor
    }
  },

  nuevoPostIncremento: (identificador) => {
    return {
      tipo: TIPO_INSTRUCCION.POST_INCREMENTO,
      identificador
    }
  },

  nuevoPostDecremento: (identificador) => {
    return {
      tipo: TIPO_INSTRUCCION.POST_DECREMENTO,
      identificador
    }
  },

  nuevoPreIncremento: (identificador) => {
    return {
      tipo: TIPO_INSTRUCCION.PRE_INCREMENTO,
      identificador
    }
  },

  nuevoPreDecremento: (identificador) => {
    return {
      tipo: TIPO_INSTRUCCION.PRE_DECREMENTO,
      identificador
    }
  },

  nuevoPrintln: (expresionCadena) => {
    return {
      tipo: TIPO_INSTRUCCION.PRINTLN,
      expresionCadena
    }
  },

  nuevoPrintlnLogico: (expresionLogica) => {
    return {
      tipo: TIPO_INSTRUCCION.PRINTLN_LOGICO,
      expresionLogica
    }
  },

  nuevoWhile: (expresionLogica, instrucciones) => {
    return {
      tipo: TIPO_INSTRUCCION.WHILE,
      expresionLogica,
      instrucciones
    }
  },

  nuevoForAsignacionSimbolosMas: (variable, valorVariable, expresionLogica, aumento, instrucciones) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR_ASIGNACION_SIMBOLOS_MAS,
      expresionLogica,
      instrucciones,
      aumento,
      variable,
      valorVariable
    }
  },

  nuevoForAsignacionSimbolosMenos: (variable, valorVariable, expresionLogica, aumento, instrucciones) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR_ASIGNACION_SIMBOLOS_MENOS,
      expresionLogica,
      instrucciones,
      aumento,
      variable,
      valorVariable
    }
  },

  nuevoDeclaracionAsignacion: (tipoDato, identificador, expresionNumerica, constante) => {
    return {
      tipo: TIPO_INSTRUCCION.DECLARACION_ASIGNACION,
      identificador,
      tipoDato,
      expresionNumerica,
      constante
    }
  },

  nuevoAsignacion: (identificador, expresionNumerica) => {
    return {
      tipo: TIPO_INSTRUCCION.ASIGNACION,
      identificador,
      expresionNumerica
    }
  },

  nuevoIf: (expresionLogica, instrucciones) => {
    return {
      tipo: TIPO_INSTRUCCION.IF,
      expresionLogica,
      instrucciones
    }
  },

  nuevoIfElse: (expresionLogica, instruccionesIfVerdadero, instruccionesIfFalso) => {
    return {
      tipo: TIPO_INSTRUCCION.IF_ELSE,
      expresionLogica,
      instruccionesIfVerdadero,
      instruccionesIfFalso
    }
  },

  nuevoIfElseIf: (expresionLogica, instrucciones, nuevoIf) => {
    return {
      tipo: TIPO_INSTRUCCION.IF_ELSE_IF,
      expresionLogica,
      instrucciones,
      nuevoIf
    }
  },

  nuevoSwitch: (expresionNumerica, casos) => {
    return {
      tipo: TIPO_INSTRUCCION.SWITCH,
      expresionNumerica,
      casos
    }
  },

  nuevoListaCasos: (caso) => {
    const casos = []
    casos.push(caso)
    return casos
  },

  nuevoCaso: (expresionNumerica, instrucciones) => {
    return {
      tipo: TIPO_OPCION_SWITCH.CASO,
      expresionNumerica,
      instrucciones
    }
  },

  nuevoCasoDef: (instrucciones) => {
    return {
      tipo: TIPO_OPCION_SWITCH.DEFECTO,
      instrucciones
    }
  },

  nuevoOperador: (operador) => {
    return operador
  },

  nuevoAsignacionSimplificada: (identificador, operador, expresionNumerica) => {
    return {
      tipo: TIPO_INSTRUCCION.ASIGNACION_SIMPLIFICADA,
      operador,
      expresionNumerica,
      identificador
    }
  }
}

module.exports.TIPO_OPERACION = TIPO_OPERACION
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION
module.exports.TIPO_VALOR = TIPO_VALOR
module.exports.instrucciones = instrucciones
module.exports.TIPO_OPCION_SWITCH = TIPO_OPCION_SWITCH
