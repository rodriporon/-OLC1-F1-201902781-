%{  
        const TIPO_OPERACION = require('./operaciones').TIPO_OPERACION
        const TIPO_VALOR = require('./operaciones').TIPO_VALOR
        const TIPO_DATO = require('./tablaSimbolos').TIPO_DATO
        const instrucciones = require('./operaciones').instrucciones
        const {TIPO_ERROR, TablaErrores} = require('./tablaErrores')
        const tablaErroresLexSin = new TablaErrores([])
        module.exports.tablaErroresLexSin = tablaErroresLexSin
%}

/* Analizador léxico */
%lex

%options case-insensitive

%s caracter
%s cadena

%%



\s+                   /* skip whitespace */
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
"print"                             return 'PRINT';
"typeof"                            return 'TYPEOF';
"true"                              return 'TRUE';
"false"                             return 'FALSE';
"import"                            return 'IMPORT';
"main"                              return 'MAIN';
"const"                             return 'CONST';
"tolower"                           return 'TOLOWER';
"toupper"                           return 'TOUPPER';
"round"                             return 'ROUND';
"new"                               return 'NEW';
"length"                            return 'LENGTH';
"tochararray"                       return 'TOCHARARRAY';
"indexof"                           return 'INDEXOF';
"push"                              return 'PUSH';
"pop"                               return 'POP';
"splice"                            return 'SPLICE';

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
"["                                 return 'CORCHETEABRE';
"]"                                 return 'CORCHETECIERRA';

"?"                                 return 'INTERROGACIONCIERRA';
"."                                 return 'PUNTO';

[ \r\t]+                            {}
\n                                  {}





\"([^\\\"]|\\.)*\"                  { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+"."([0-9]+)?\b                {return 'DECIMAL'; }
[0-9]+\b                            { return 'ENTERO'; }
(\'(\\(["'\\bfnrt]|u[0-9A-Fa-f]{4})|[^\\'])\') { yytext = yytext.substr(1, yyleng-2); return 'CHAR'}
([a-zA-Z_])[a-zA-Z0-9_ñÑ]*            { return 'IDENTIFICADOR'; }

// regex for character




<<EOF>>                             return 'EOF';

.   { 
        tablaErroresLexSin.add(TIPO_ERROR.LEXICO, yytext, yylloc.first_line, yylloc.first_column, 'ERROR LEXICO')
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);

    }


/lex

/* ------------------ Analizador sintáctico --------------------- */



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
        : LLAVEABRE instrucciones LLAVECIERRA                                { $$ = instrucciones.nuevoBloque($2, @1.first_line, @1.first_column) }
        | PRINTLN PARENTESISABRE operacionNumerica PARENTESISCIERRA PUNTOCOMA          { $$ = instrucciones.nuevoPrintln($3, @1.first_line, @1.first_column) }

        | PRINT PARENTESISABRE operacionNumerica PARENTESISCIERRA PUNTOCOMA          { $$ = instrucciones.nuevoPrint($3, @1.first_line, @1.first_column) }

        | PARENTESISABRE expresionLogica PARENTESISCIERRA INTERROGACIONCIERRA instruccionTernaria DOSPUNTOS instruccionTernaria PUNTOCOMA        { $$ = instrucciones.nuevoTernaria($2, [$5], [$7], @1.first_line, @1.first_column)}

        | WHILE PARENTESISABRE expresionLogica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA { $$ = instrucciones.nuevoWhile($3, $6, @1.first_line, @1.first_column)}


        | SWITCH PARENTESISABRE operacionNumerica PARENTESISCIERRA LLAVEABRE cases LLAVECIERRA  { $$ = instrucciones.nuevoSwitch($3, $6, @1.first_line, @1.first_column) }


        | DO LLAVEABRE instrucciones LLAVECIERRA WHILE PARENTESISABRE expresionLogica PARENTESISCIERRA PUNTOCOMA        { $$ = instrucciones.nuevoDoWhile($3, $7, @1.first_line, @1.first_column)}


        | FOR PARENTESISABRE IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR INCREMENTO PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForAsignacionSimbolosMas($3, $5, $7, $9, $13, @1.first_line, @1.first_column) }
        | FOR PARENTESISABRE IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR DECREMENTO PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForAsignacionSimbolosMenos($3, $5, $7, $9, $13, @1.first_line, @1.first_column) }
        | FOR PARENTESISABRE IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR IGUAL operacionNumerica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForAsignacionOperacion($3, $5, $7, $9, $11, $14, @1.first_line, @1.first_column) }
        | FOR PARENTESISABRE tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR IGUAL operacionNumerica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForDeclaracionOperacion($3.toUpperCase(), $4, $6, $8, $10, $12, $15, @1.first_line, @1.first_column) }
        | FOR PARENTESISABRE tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR INCREMENTO PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForDeclaracionSimbolosMas($3.toUpperCase(), $4, $6, $8, $10, $14, @1.first_line, @1.first_column) }
        | FOR PARENTESISABRE tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA expresionLogica PUNTOCOMA IDENTIFICADOR DECREMENTO PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoForDeclaracionSimbolosMenos($3.toUpperCase(), $4, $6, $8, $10, $14, @1.first_line, @1.first_column) }

        | VOID IDENTIFICADOR PARENTESISABRE PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA             { $$ = instrucciones.nuevoMetodoSinParametros($2, $6, @1.first_line, @1.first_column) }

        | CALL IDENTIFICADOR PARENTESISABRE PARENTESISCIERRA PUNTOCOMA                                       { $$ = instrucciones.nuevoCallMetodoSinParametros($2, @1.first_line, @1.first_column) }
        
        | tipo_dato IDENTIFICADOR IGUAL expresionLogica  INTERROGACIONCIERRA operacionNumerica DOSPUNTOS operacionNumerica PUNTOCOMA        { $$ = instrucciones.nuevoTernariaAsignacion($1.toUpperCase(), $2, $4, [$6], [$8], false, @1.first_line, @1.first_column)}
        | CONST tipo_dato IDENTIFICADOR IGUAL  expresionLogica  INTERROGACIONCIERRA operacionNumerica DOSPUNTOS operacionNumerica PUNTOCOMA        { $$ = instrucciones.nuevoTernariaAsignacion($2.toUpperCase(), $3, $5, [$7], [$9], true, @1.first_line, @1.first_column)}

        | tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA          { $$ = instrucciones.nuevoDeclaracionAsignacion($1.toUpperCase(), $2, $4, false, @1.first_line, @1.first_column)}
        | CONST tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA          { $$ = instrucciones.nuevoDeclaracionAsignacion($2.toUpperCase(), $3, $5, true, @1.first_line, @1.first_column)}

        | tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA IGUAL NEW tipo_dato CORCHETEABRE operacionNumerica CORCHETECIERRA PUNTOCOMA    { $$ = instrucciones.nuevoArray($1.toUpperCase(), $2, $7.toUpperCase(), $9, false, @1.first_line, @1.first_column) }
        | CONST tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA IGUAL NEW tipo_dato CORCHETEABRE operacionNumerica CORCHETECIERRA PUNTOCOMA    { $$ = instrucciones.nuevoArray($2.toUpperCase(), $3, $8.toUpperCase(), $10, true, @1.first_line, @1.first_column) }

        | tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA CORCHETEABRE CORCHETECIERRA IGUAL NEW tipo_dato CORCHETEABRE operacionNumerica CORCHETECIERRA CORCHETEABRE operacionNumerica CORCHETECIERRA PUNTOCOMA    { $$ = instrucciones.nuevoArray2D($1.toUpperCase(), $2, $9.toUpperCase(), $11, $14, false, @1.first_line, @1.first_column) }
        | CONST tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA CORCHETEABRE CORCHETECIERRA IGUAL NEW tipo_dato CORCHETEABRE operacionNumerica CORCHETECIERRA CORCHETEABRE operacionNumerica CORCHETECIERRA PUNTOCOMA    { $$ = instrucciones.nuevoArray2D($2.toUpperCase(), $3, $10.toUpperCase(), $12, $15, true, @1.first_line, @1.first_column) }
        
        | tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA CORCHETEABRE CORCHETECIERRA IGUAL CORCHETEABRE listaArrays CORCHETECIERRA PUNTOCOMA   { $$ = instrucciones.nuevoArray2DAsignacion($1.toUpperCase(), $2, $9, false, @1.first_line, @1.first_column) }
        | CONST tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA CORCHETEABRE CORCHETECIERRA IGUAL CORCHETEABRE listaArrays CORCHETECIERRA PUNTOCOMA   { $$ = instrucciones.nuevoArray2DAsignacion($2.toUpperCase(), $3, $10, true, @1.first_line, @1.first_column) }

        | tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA IGUAL CORCHETEABRE listaOperacionNumerica CORCHETECIERRA PUNTOCOMA    { $$ = instrucciones.nuevoArrayAsignacion($1.toUpperCase(), $2, $7, false, @1.first_line, @1.first_column) }
        | CONST tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA IGUAL CORCHETEABRE listaOperacionNumerica CORCHETECIERRA PUNTOCOMA    { $$ = instrucciones.nuevoArrayAsignacion($2.toUpperCase(), $3, $8, true, @1.first_line, @1.first_column) }

        | tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA IGUAL TOCHARARRAY PARENTESISABRE operacionNumerica PARENTESISCIERRA PUNTOCOMA  { $$ = instrucciones.nuevoToCharArray($1.toUpperCase(), $2, $8, false, @1.first_line, @1.first_column) }
        | CONST tipo_dato IDENTIFICADOR CORCHETEABRE CORCHETECIERRA IGUAL TOCHARARRAY PARENTESISABRE operacionNumerica PARENTESISCIERRA PUNTOCOMA  { $$ = instrucciones.nuevoToCharArray($2.toUpperCase(), $3, $9, true, @1.first_line, @1.first_column) }

        | IDENTIFICADOR CORCHETEABRE operacionNumerica CORCHETECIERRA IGUAL operacionNumerica PUNTOCOMA    { $$ = instrucciones.nuevoArrayModificacion($1, $3, $6, @1.first_line, @1.first_column) }
        | IDENTIFICADOR CORCHETEABRE operacionNumerica CORCHETECIERRA CORCHETEABRE operacionNumerica CORCHETECIERRA IGUAL operacionNumerica PUNTOCOMA    { $$ = instrucciones.nuevoArray2DModificacion($1, $3, $6, $9, @1.first_line, @1.first_column) }

        | IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA                    { $$ = instrucciones.nuevoAsignacion($1, $3, @1.first_line, @1.first_column)}                     
        | IDENTIFICADOR INCREMENTO PUNTOCOMA                                   { $$ = instrucciones.nuevoPostIncremento($1, @1.first_line, @1.first_column) }
        | IDENTIFICADOR DECREMENTO PUNTOCOMA                                   { $$ = instrucciones.nuevoPostDecremento($1, @1.first_line, @1.first_column) }
        | INCREMENTO IDENTIFICADOR PUNTOCOMA                                   { $$ = instrucciones.nuevoPreIncremento($2, @1.first_line, @1.first_column) }
        | DECREMENTO IDENTIFICADOR PUNTOCOMA                                   { $$ = instrucciones.nuevoPreDecremento($2, @1.first_line, @1.first_column) }
        | BREAK PUNTOCOMA                                                      { $$ = instrucciones.nuevoBreak(@1.first_line, @1.first_column) }
        | CONTINUE PUNTOCOMA                                                   { $$ = instrucciones.nuevoContinue(@1.first_line, @1.first_column) }         
        | IDENTIFICADOR PUNTO PUSH PARENTESISABRE operacionNumerica PARENTESISCIERRA PUNTOCOMA  { $$ = instrucciones.nuevoPush($1, $5, @1.first_line, @1.first_column) }
        | instruccionIf                                                        { $$ = $1 }
        | LLAVEABRE LLAVECIERRA                                                { }
        | error PUNTOCOMA                                                      { console.log("ERROR SINTACTICO EN LINEA: " + (yylineno+1)); tablaErroresLexSin.add(TIPO_ERROR.SINTACTICO, $1, @1.first_line+1, @1.first_column+1, 'ERROR SINTACTICO')}
        
        
;

instruccionTernaria
        : PRINTLN PARENTESISABRE operacionNumerica PARENTESISCIERRA        { $$ = instrucciones.nuevoPrintln($3, @1.first_line, @1.first_column) }
        | PRINT PARENTESISABRE operacionNumerica PARENTESISCIERRA          { $$ = instrucciones.nuevoPrint($3, @1.first_line, @1.first_column) }

        | IDENTIFICADOR IGUAL operacionNumerica                    { $$ = instrucciones.nuevoAsignacion($1, $3, @1.first_line, @1.first_column)}                     

        | IDENTIFICADOR INCREMENTO                                 { $$ = instrucciones.nuevoPostIncremento($1, @1.first_line, @1.first_column) }
        | IDENTIFICADOR DECREMENTO                                 { $$ = instrucciones.nuevoPostDecremento($1, @1.first_line, @1.first_column) }
        | INCREMENTO IDENTIFICADOR                                 { $$ = instrucciones.nuevoPreIncremento($2, @1.first_line, @1.first_column) }
        | DECREMENTO IDENTIFICADOR                                 { $$ = instrucciones.nuevoPreDecremento($2, @1.first_line, @1.first_column) }

        | CALL IDENTIFICADOR PARENTESISABRE PARENTESISCIERRA PUNTOCOMA          { $$ = instrucciones.nuevoCallMetodoSinParametros($2, @1.first_line, @1.first_column) }
;


instruccionIf
        : IF PARENTESISABRE expresionLogica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA        { $$ = instrucciones.nuevoIf($3, $6) }
        | IF PARENTESISABRE expresionLogica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA ELSE LLAVEABRE instrucciones LLAVECIERRA       { $$ = instrucciones.nuevoIfElse($3, $6, $10, @1.first_line, @1.first_column) }
        | IF PARENTESISABRE expresionLogica PARENTESISCIERRA LLAVEABRE instrucciones LLAVECIERRA ELSE instruccionIf                             { $$ = instrucciones.nuevoIfElseIf($3, $6, $9, @1.first_line, @1.first_column)}
;


tipo_dato
        : INT           {$$ = $1}
        | DOUBLE        {$$ = $1}
        | CHAR          {$$ = $1}
        | BOOLEAN       {$$ = $1}
        | STRING        {$$ = $1}
;

asignacionOperacion
        : CADENA                                                    { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.CADENA, @1.first_line, @1.first_column) }
        | operacionNumerica                                         { $$ = $1; }
;

listaArrays
        : CORCHETEABRE listaOperacionNumerica CORCHETECIERRA COMA listaArrays        { $$ = $5.push($2); $$ = $5 }
        | CORCHETEABRE listaOperacionNumerica CORCHETECIERRA                         {console.log($2); $$ = instrucciones.nuevoListaArrays($2) }
;

listaOperacionNumerica
        : listaOperacionNumerica COMA operacionNumerica { $1.push($3); $$ = $1 }
        | operacionNumerica     { $$ = instrucciones.nuevoListaExpresionesNumericas($1)}
;

operacionNumerica
        : operacionNumerica MAS operacionNumerica                   { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.SUMA, @1.first_line, @1.first_column) }
        | operacionNumerica MENOS operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.RESTA, @1.first_line, @1.first_column) }
        | operacionNumerica MODULO operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MODULO, @1.first_line, @1.first_column) }
        | operacionNumerica MULTIPLICADO operacionNumerica          { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION, @1.first_line, @1.first_column) }
        | operacionNumerica MULTIPLICADO MULTIPLICADO operacionNumerica               { $$ = instrucciones.nuevoOperacionBinaria($1, $4, TIPO_OPERACION.POTENCIA, @1.first_line, @1.first_column) }
        | operacionNumerica DIVIDIDO operacionNumerica              { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION, @1.first_line, @1.first_column) }
        | operacionNumerica INCREMENTO                              { $$ = instrucciones.nuevoOperacionUnaria($1, TIPO_OPERACION.POST_INCREMENTO, @1.first_line, @1.first_column) }
        | operacionNumerica DECREMENTO                              { $$ = instrucciones.nuevoOperacionUnaria($1, TIPO_OPERACION.POST_DECREMENTO, @1.first_line, @1.first_column) }
        | INCREMENTO operacionNumerica                              { $$ = instrucciones.nuevoOperacionUnaria($2, TIPO_OPERACION.PRE_INCREMENTO, @1.first_line, @1.first_column) }
        | DECREMENTO operacionNumerica                              { $$ = instrucciones.nuevoOperacionUnaria($2, TIPO_OPERACION.PRE_DECREMENTO, @1.first_line, @1.first_column) }
        | PARENTESISABRE operacionNumerica PARENTESISCIERRA         { $$ = $2 }
        | TYPEOF PARENTESISABRE operacionNumerica PARENTESISCIERRA  { $$ = instrucciones.nuevoOperacionUnaria($3, TIPO_OPERACION.TYPEOF, @1.first_line, @1.first_column) }

        | TOLOWER PARENTESISABRE operacionNumerica PARENTESISCIERRA     { $$ = instrucciones.nuevoOperacionUnaria($3, TIPO_OPERACION.TOLOWER, @1.first_line, @1.first_column) }
        | TOUPPER PARENTESISABRE operacionNumerica PARENTESISCIERRA     { $$ = instrucciones.nuevoOperacionUnaria($3, TIPO_OPERACION.TOUPPER, @1.first_line, @1.first_column) }
        | LENGTH PARENTESISABRE operacionNumerica PARENTESISCIERRA     { $$ = instrucciones.nuevoOperacionUnaria($3, TIPO_OPERACION.LENGTH, @1.first_line, @1.first_column) }
        
        | ROUND PARENTESISABRE operacionNumerica PARENTESISCIERRA     { $$ = instrucciones.nuevoOperacionUnaria($3, TIPO_OPERACION.ROUND, @1.first_line, @1.first_column) }
        | IDENTIFICADOR CORCHETEABRE operacionNumerica CORCHETECIERRA CORCHETEABRE operacionNumerica CORCHETECIERRA { $$ = instrucciones.nuevoArray2DAcceso($1, $3, $6, @1.first_line, @1.first_column) }
        | IDENTIFICADOR CORCHETEABRE operacionNumerica CORCHETECIERRA { $$ = instrucciones.nuevoArrayAcceso($1, $3, @1.first_line, @1.first_column ) }
        | IDENTIFICADOR PUNTO INDEXOF PARENTESISABRE operacionNumerica PARENTESISCIERRA { $$ = instrucciones.nuevoIndexOf($1, $5, @1.first_line, @1.first_column) }
        | IDENTIFICADOR PUNTO PUSH PARENTESISABRE operacionNumerica PARENTESISCIERRA { $$ = instrucciones.nuevoPush($1, $5, @1.first_line, @1.first_column) }

        | MENOS operacionNumerica %prec UMENOS                      { $$ = instrucciones.nuevoOperacionUnaria($2, TIPO_OPERACION.NEGATIVO, @1.first_line, @1.first_column) }
        | ENTERO                                                    { $$ = instrucciones.nuevoValor(Number($1), TIPO_VALOR.INT, @1.first_line, @1.first_column) } 
        | DECIMAL                                                   { $$ = instrucciones.nuevoValor(parseFloat($1), TIPO_VALOR.DOUBLE, @1.first_line, @1.first_column)}
        | CHAR                                                      { $$ = instrucciones.nuevoValor($1.charAt(0), TIPO_VALOR.CHAR, @1.first_line, @1.first_column)}
        | TRUE                                                      { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.BOOLEAN, @1.first_line, @1.first_column)}
        | FALSE                                                      { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.BOOLEAN, @1.first_line, @1.first_column)}
        | IDENTIFICADOR                                             { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, @1.first_line, @1.first_column)}
        | CADENA                                                    { $$ = instrucciones.nuevoValor($1, TIPO_VALOR.CADENA, @1.first_line, @1.first_column)}
;

expresionLogica
        : expresionRelacional AND expresionRelacional               { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.AND, @1.first_line, @1.first_column)}
        | expresionRelacional OR expresionRelacional                { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.OR, @1.first_line, @1.first_column)}
        | expresionRelacional XOR expresionRelacional                { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.XOR, @1.first_line, @1.first_column)}
        | NOT expresionRelacional                                   { $$ = instrucciones.nuevoOperacionUnaria($2, TIPO_OPERACION.NOT, @1.first_line, @1.first_column)}
        | expresionRelacional                                       { $$ = $1 } 
;

expresionRelacional
        : operacionNumerica                                         { $$ = $1 }                   
        | operacionNumerica MAYOR operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR, @1.first_line, @1.first_column) }
        | operacionNumerica MENOR operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENOR, @1.first_line, @1.first_column) }
        | operacionNumerica MAYORIGUAL operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR_IGUAL, @1.first_line, @1.first_column) }
        | operacionNumerica MENORIGUAL operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENOR_IGUAL, @1.first_line, @1.first_column) }
        | operacionNumerica DOBLEIGUAL operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DOBLE_IGUAL, @1.first_line, @1.first_column) }
        | operacionNumerica DIFERENTE operacionNumerica                 { $$ = instrucciones.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIFERENTE, @1.first_line, @1.first_column) }                                               
;

cases 
        : cases case                                            { $1.push($2); $$ = $1; }
        | case                                                  { $$ = instrucciones.nuevoListaCases($1)}
;

case    : CASE operacionNumerica DOSPUNTOS instrucciones BREAK PUNTOCOMA       { $$ = instrucciones.nuevoCase($2, $4, @1.first_line, @1.first_column) }
        | DEFAULT DOSPUNTOS instrucciones                BREAK PUNTOCOMA       { $$ = instrucciones.nuevoCaseDefault($3, @1.first_line, @1.first_column)}
;

