const TIPO_VALOR = {
  NUMERO: 'VAL_NUMERO',
  IDENTIFICADOR: 'VAL_IDENTIFICADOR',
  CADENA: 'VAL_CADENA',
  DOUBLE: 'VAL_DOUBLE',
  INT: 'VAL_INT',
  CHAR: 'VAL_CHAR'
}

const TIPO_OPERACION = {
  SUMA: 'OP_SUMA',
  RESTA: 'OP_RESTA',
  MULTIPLICACION: 'OP_MULTIPLICACION',
  DIVISION: 'OP_DIVISION',
  NEGATIVO: 'OP_NEGATIVO',
  MAYOR_QUE: 'OP_MAYOR_QUE',
  MENOR_QUE: 'OP_MENOR_QUE',

  MAYOR_IGUAL: 'OP_MAYOR_IGUAL',
  MENOR_IGUAL: 'OP_MENOR_IGUAL',
  DOBLE_IGUAL: 'OP_DOBLE_IGUAL',
  NO_IGUAL: 'OP_NO_IGUAL',

  AND: 'OP_AND',
  OR: 'OP_OR',
  NOT: 'OP_NOT'
}

const TIPO_INSTRUCCION = {
  PRINTLN: 'INSTR_PRINTLN',
  WHILE: 'INSTR_WHILE',
  DECLARACION_ASIGNACION: 'INSTR_DECLARACION',
  ASIGNACION: 'INSTR_ASIGANCION',
  IF: 'INSTR_IF',
  IF_ELSE: 'INSTR_ELSE',
  FOR: 'INST_FOR',
  SWITCH: 'SWITCH',
  SWITCH_OP: 'SWITCH_OP',
  SWITCH_DEF: 'SWITCH_DEF',
  ASIGNACION_SIMPLIFICADA: 'ASIGNACION_SIMPLIFICADA'
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

const instruccionesAPI = {

  nuevoOperacionBinaria: (operandoIzq, operandoDer, tipo) => nuevaOperacion(operandoIzq, operandoDer, tipo),

  nuevoOperacionUnaria: (operando, tipo) => nuevaOperacion(operando, undefined, tipo),

  nuevoValor: (valor, tipo) => {
    return {
      tipo,
      valor
    }
  },

  nuevoPrintln: (expresionCadena) => {
    return {
      tipo: TIPO_INSTRUCCION.PRINTLN,
      expresionCadena
    }
  },

  nuevoWhile: (expresionLogica, instrucciones) => {
    return {
      tipo: TIPO_INSTRUCCION.WHILE,
      expresionLogica,
      instrucciones
    }
  },

  nuevoFor: (variable, valorVariable, expresionLogica, aumento, instrucciones) => {
    return {
      tipo: TIPO_INSTRUCCION.FOR,
      expresionLogica,
      instrucciones,
      aumento,
      variable,
      valorVariable
    }
  },

  nuevoDeclaracionAsignacion: (tipoDato, identificador, expresionNumerica) => {
    return {
      tipo: TIPO_INSTRUCCION.DECLARACION_ASIGNACION,
      identificador,
      tipoDato,
      expresionNumerica
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
module.exports.instruccionesAPI = instruccionesAPI
module.exports.TIPO_OPCION_SWITCH = TIPO_OPCION_SWITCH
