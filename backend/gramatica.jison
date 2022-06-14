/* Analizador léxico */
%lex

%options case-insensitive

%%

[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // Multicomentario
"//".*                              // Comentario

"int"                               return 'INT';
"double"                            return 'DOUBLE';
"char"                              return 'CHAR';
"boolean"                           return 'BOOLEAN';
"String"                            return 'STRING';
"if"                                return 'IF';
"else"                              return 'ELSE';
"switch"                            return 'SWITCH';
"case"				                return 'CASE';
"default"			                return 'DEFAULT';
"break"                             return 'BREAK';
"for"                               return 'FOR';
"while"                             return 'WHILE';
"do"                                return 'DO';
"continue"                          return 'CONTINUE';
"void"                              return 'VOID';
"return"                            return 'RETURN';
"call"                              return 'CALL';
"return"                            return 'RETURN';
"println"                           return 'PRINTLN';
"typeof"                            return 'TYPEOF';
"true"                              return 'TRUE';
"false"                             return 'FALSE';
"import"                            return 'IMPORT';
"main"                              return 'MAIN';
"const"                             return 'CONST';

";"                                 return 'PUNTOCOMA';   
","                                 return 'COMA';      
":"                                 return 'DOSPUNTOS';  
"++"                                return 'INCREMENTO';
"--"                                return 'DECREMENTO'; 

">="                                return 'MAYORIGUAL';        
"<="                                return 'MENORIGUAL';
">"                                 return 'MAYOR';             
"<"                                 return 'MENOR'; 
"!="                                return 'DIFERENTE';   
"=="                                return 'DOBLEIGUAL';   
"!"                                 return 'NOT';
"="                                 return 'IGUAL';   
"||"                                return 'OR';           
"&&"                                return 'AND';
"^"                                 return 'XOR';

"+"                                 return 'MAS';
"-"                                 return 'MENOS';  
"/"                                 return 'DIVIDIDO';      
"*"                                 return 'MULTIPLICADO';
"**"                                return 'POTENCIA';
"%"                                 { return 'MODULO';}
"("                                 return 'PARENTESISABRE';
")"                                 return 'PARENTESISCIERRA'; 
"{"                                 return 'LLAVEABRE';     
"}"                                 return 'LLAVECIERRA';

[ \r\t]+                            {}
\n                                  {}





\"([^\\\"]|\\.)*\"                  { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+"."([0-9]+)?\b                {return 'DECIMAL'; }
[0-9]+\b                            { return 'ENTERO'; }
([a-zA-Z_])[a-zA-Z0-9_ñÑ]*            { return 'IDENTIFICADOR'; }
(\'(\\(["'\\bfnrt]|u[0-9A-Fa-f]{4})|[^\\'])\') { yytext = yytext.substr(1, yyleng-2); return 'CHAR'}

<<EOF>>                             return 'EOF';
.   { 
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);     
    }


/lex

/* ------------------ Analizador sintáctico --------------------- */

%{
        const TIPO_OPERACION = require('./operaciones').TIPO_OPERACION
        const TIPO_VALOR = require('./operaciones').TIPO_VALOR
        const TIPO_DATO = require('./tablaSimbolos').TIPO_DATO
        const instrucciones = require('./operaciones').instrucciones
%}

/* Precedencia */
%left 'OR'
%left 'AND'
%left 'XOR'
%left 'DOBLEIGUAL' 'DIFERENTE'
%left 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTIPLICADO' 'DIVIDIDO' 'POTENCIA' 'MODULO'
%right UMENOS
%left 'INCREMENTO' 'DECREMENTO'
%right 'NOT'


%start init

%% /* Definiendo la gramática */

init
        : instrucciones EOF     {
                return $1
        }
;

instrucciones
        : instrucciones instruccion         { $1.push($2); $$ = $1; }
        | instruccion                       { $$ = [$1] }
;

instruccion
        : PRINTLN PARENTESISABRE operacionNumerica PARENTESISCIERRA PUNTOCOMA          { $$ = instrucciones.nuevoPrintln($3) }
        | PRINTLN PARENTESISABRE expresionLogica PARENTESISCIERRA PUNTOCOMA          { $$ = instrucciones.nuevoPrintlnLogico($3) }


        | WHILE PARENTESISABRE expresionLogica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA { $$ = instrucciones.nuevoWhile($3, $6)}
        | WHILE PARENTESISABRE TRUE PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA { $$ = instrucciones.nuevoWhile(instrucciones.nuevoValor($3, TIPO_VALOR.BOOLEAN), $6)}
        | WHILE PARENTESISABRE FALSE PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA { $$ = instrucciones.nuevoWhile(instrucciones.nuevoValor($3, TIPO_VALOR.BOOLEAN), $6)}


        | SWITCH PARENTESISABRE operacionNumerica PARENTESISCIERRA LLAVEABRE cases LLAVECIERRA  { $$ = instrucciones.nuevoSwitch($3, $6) }


        | DO LLAVEABRE instrucciones LLAVECIERRA WHILE PARENTESISABRE expresionLogica PARENTESISCIERRA PUNTOCOMA        { $$ = instrucciones.nuevoDoWhile($3, $7)}
        | DO LLAVEABRE instrucciones LLAVECIERRA WHILE PARENTESISABRE TRUE PARENTESISCIERRA PUNTOCOMA        { $$ = instrucciones.nuevoDoWhile($3, instrucciones.nuevoValor($7, TIPO_VALOR.BOOLEAN))}
        | DO LLAVEABRE instrucciones LLAVECIERRA WHILE PARENTESISABRE FALSE PARENTESISCIERRA PUNTOCOMA        { $$ = instrucciones.nuevoDoWhile($3, instrucciones.nuevoValor($7, TIPO_VALOR.BOOLEAN))}


        | FOR PARENTESISABRE IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR INCREMENTO PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForAsignacionSimbolosMas($3, $5, $7, $9, $13) }
        | FOR PARENTESISABRE IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR DECREMENTO PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForAsignacionSimbolosMenos($3, $5, $7, $9, $13) }
        | FOR PARENTESISABRE IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR IGUAL operacionNumerica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForAsignacionOperacion($3, $5, $7, $9, $11, $14) }
        | FOR PARENTESISABRE tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR IGUAL operacionNumerica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForDeclaracionOperacion($3.toUpperCase(), $4, $6, $8, $10, $12, $15) }
        | FOR PARENTESISABRE tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR INCREMENTO PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForDeclaracionSimbolosMas($3.toUpperCase(), $4, $6, $8, $10, $14) }
        | FOR PARENTESISABRE tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR DECREMENTO PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForDeclaracionSimbolosMenos($3.toUpperCase(), $4, $6, $8, $10, $14) }


        | tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA          { $$ = instrucciones.nuevoDeclaracionAsignacion($1.toUpperCase(), $2, $4, false)}
        | CONST tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA          { $$ = instrucciones.nuevoDeclaracionAsignacion($2.toUpperCase(), $3, $5, true)}
        | IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA                    { $$ = instrucciones.nuevoAsignacion($1, $3)}                     
        | IDENTIFICADOR INCREMENTO PUNTOCOMA                                   { $$ = instrucciones.nuevoPostIncremento($1) }
        | IDENTIFICADOR DECREMENTO PUNTOCOMA                                   { $$ = instrucciones.nuevoPostDecremento($1) }
        | INCREMENTO IDENTIFICADOR PUNTOCOMA                                   { $$ = instrucciones.nuevoPreIncremento($2) }
        | DECREMENTO IDENTIFICADOR PUNTOCOMA                                   { $$ = instrucciones.nuevoPreDecremento($2) }
        | BREAK PUNTOCOMA                                                      { $$ = instrucciones.nuevoBreak() }
        | instruccionIf                                                        { $$ = $1 }
        
;

instruccionIf
        : IF PARENTESISABRE expresionLogica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA        { $$ = instrucciones.nuevoIf($3, $6) }
        | IF PARENTESISABRE expresionLogica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA ELSE LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoIfElse($3, $6, $10) }
        | IF PARENTESISABRE expresionLogica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA ELSE instruccionIf                             { $$ = instrucciones.nuevoIfElseIf($3, $6, $9)}
;

tipo_dato
        : INT           {$$ = $1}
        | DOUBLE        {$$ = $1}
        | CHAR          {$$ = $1}
        | BOOLEAN       {$$ = $1}
        | STRING        {$$ = $1}
;

asignacionOperacion
        : CADENA                                                    { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.CADENA) }
        | operacionNumerica                                         { $$ = $1; }
;

operacionNumerica
        : operacionNumerica MAS operacionNumerica                   { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.SUMA) }
        | operacionNumerica MENOS operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.RESTA) }
        | operacionNumerica MODULO operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MODULO) }
        | operacionNumerica MULTIPLICADO operacionNumerica          { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION) }
        | operacionNumerica POTENCIA operacionNumerica               { $$ = instrucciones.nuevoOperacionBinaria($1, $4, TIPO_OPERACION.POTENCIA) }
        | operacionNumerica DIVIDIDO operacionNumerica              { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION) }
        | operacionNumerica INCREMENTO                              { $$ = instrucciones.nuevoOperacionUnaria($1, TIPO_OPERACION.POST_INCREMENTO) }
        | operacionNumerica DECREMENTO                              { $$ = instrucciones.nuevoOperacionUnaria($1, TIPO_OPERACION.POST_DECREMENTO) }
        | INCREMENTO operacionNumerica                              { $$ = instrucciones.nuevoOperacionUnaria($2, TIPO_OPERACION.PRE_INCREMENTO) }
        | DECREMENTO operacionNumerica                              { $$ = instrucciones.nuevoOperacionUnaria($2, TIPO_OPERACION.PRE_DECREMENTO) }
        | PARENTESISABRE operacionNumerica PARENTESISCIERRA         { $$ = $2 }
        
        | MENOS operacionNumerica %prec UMENOS                      { $$ = instrucciones.nuevoOperacionUnaria($2, TIPO_OPERACION.NEGATIVO) }
        | ENTERO                                                    { $$ = instrucciones.nuevoValor(Number($1), TIPO_VALOR.INT) } 
        | DECIMAL                                                   { $$ = instrucciones.nuevoValor(parseFloat($1), TIPO_VALOR.DOUBLE)}
        | CHAR                                                      { $$ = instrucciones.nuevoValor($1.charAt(0), TIPO_VALOR.CHAR)}
        | TRUE                                                      { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.BOOLEAN)}
        | FALSE                                                      { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.BOOLEAN)}
        | IDENTIFICADOR                                             { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR)}
        | CADENA                                                    { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.CADENA)}
;

expresionLogica
        : expresionRelacional AND expresionRelacional               { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.AND)}
        | expresionRelacional OR expresionRelacional                { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.OR)}
        | NOT expresionRelacional                                   { $$ = instrucciones.nuevoOperacionUnaria($2, TIPO_OPERACION.NOT)}
        | expresionRelacional                                       { $$ = $1 } 
;

expresionRelacional
        : operacionNumerica MAYOR operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR) }
        | operacionNumerica MENOR operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENOR) }
        | operacionNumerica MAYORIGUAL operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR_IGUAL) }
        | operacionNumerica MENORIGUAL operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENOR_IGUAL) }
        | operacionNumerica DOBLEIGUAL operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DOBLE_IGUAL) }
        | operacionNumerica DIFERENTE operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIFERENTE) }
;

cases 
        : cases case                                            { $1.push($2); $$ = $1; }
        | case                                                  { $$ = instrucciones.nuevoListaCases($1)}
;

case    : CASE operacionNumerica DOSPUNTOS instrucciones BREAK PUNTOCOMA       { $$ = instrucciones.nuevoCase($2, $4) }
        | DEFAULT DOSPUNTOS instrucciones                BREAK PUNTOCOMA       { $$ = instrucciones.nuevoCaseDefault($3)}
;