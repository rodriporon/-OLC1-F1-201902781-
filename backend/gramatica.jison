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
        | PRINTLN PARENTESISABRE expresionLogica PARENTESISCIERRA PUNTOCOMA          { console.log("ENTRO EN expresionLogica"); $$ = instrucciones.nuevoPrintlnLogico($3) }
        | tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA          { $$ = instrucciones.nuevoDeclaracionAsignacion($1.toUpperCase(), $2, $4, false)}
        | CONST tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA          { $$ = instrucciones.nuevoDeclaracionAsignacion($2.toUpperCase(), $3, $5, true)}
        | IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA                    { $$ = instrucciones.nuevoAsignacion($1, $3)}                     
        | IDENTIFICADOR INCREMENTO PUNTOCOMA                                   { $$ = instrucciones.nuevoPostIncremento($1) }
        | IDENTIFICADOR DECREMENTO PUNTOCOMA                                   { $$ = instrucciones.nuevoPostDecremento($1) }
        | INCREMENTO IDENTIFICADOR PUNTOCOMA                                   { $$ = instrucciones.nuevoPreIncremento($2) }
        | DECREMENTO IDENTIFICADOR PUNTOCOMA                                   { $$ = instrucciones.nuevoPreDecremento($2) }
        
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