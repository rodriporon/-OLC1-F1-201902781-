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
"!="                                return 'DIFERENTEA';   
"=="                                return 'DOBLEIGUAL';   
"!"                                 return 'NOT';
"="                                 return 'IGUAL';   
"||"                                return 'OR';           
"&&"                                return 'AND';

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
        const instruccionesAPI = require('./operaciones').instruccionesAPI
%}

/* Precedencia */
%left 'MAS' 'MENOS'
%left 'MULTIPLICADO' 'DIVIDIDO' 'POTENCIA' 'MODULO'
%left 'INCREMENTO' 'DECREMENTO'
%left UMENOS

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
        : PRINTLN PARENTESISABRE operacionNumerica PARENTESISCIERRA PUNTOCOMA          { $$ = instruccionesAPI.nuevoPrintln($3) }
        | tipo_dato IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA          { $$ = instruccionesAPI.nuevoDeclaracionAsignacion($1.toUpperCase(), $2, $4)}        
        | IDENTIFICADOR IGUAL operacionNumerica PUNTOCOMA                    { $$ = instruccionesAPI.nuevoAsignacion($1, $3)}                     
        | IDENTIFICADOR INCREMENTO PUNTOCOMA                                   { $$ = instruccionesAPI.nuevoPostIncremento($1) }
        | IDENTIFICADOR DECREMENTO PUNTOCOMA                                   { $$ = instruccionesAPI.nuevoPostDecremento($1) }
        | INCREMENTO IDENTIFICADOR PUNTOCOMA                                   { $$ = instruccionesAPI.nuevoPreIncremento($2) }
        | DECREMENTO IDENTIFICADOR PUNTOCOMA                                   { $$ = instruccionesAPI.nuevoPreDecremento($2) }
        
;

tipo_dato
        : INT           {$$ = $1}
        | DOUBLE        {$$ = $1}
        | CHAR          {$$ = $1}
        | BOOLEAN       {$$ = $1}
        | STRING        {$$ = $1}
;

asignacionOperacion
        : CADENA                                                    { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CADENA) }
        | operacionNumerica                                         { $$ = $1; }
;

operacionNumerica
        : operacionNumerica MAS operacionNumerica                   { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.SUMA) }
        | operacionNumerica MENOS operacionNumerica                 { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.RESTA) }
        | operacionNumerica MODULO operacionNumerica                 { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MODULO) }
        | operacionNumerica MULTIPLICADO operacionNumerica          { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION) }
        | operacionNumerica POTENCIA operacionNumerica               { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $4, TIPO_OPERACION.POTENCIA) }
        | operacionNumerica DIVIDIDO operacionNumerica              { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION) }
        | operacionNumerica INCREMENTO                              { $$ = instruccionesAPI.nuevoOperacionUnaria($1, TIPO_OPERACION.POST_INCREMENTO) }
        | operacionNumerica DECREMENTO                              { $$ = instruccionesAPI.nuevoOperacionUnaria($1, TIPO_OPERACION.POST_DECREMENTO) }
        | INCREMENTO operacionNumerica                              { $$ = instruccionesAPI.nuevoOperacionUnaria($2, TIPO_OPERACION.PRE_INCREMENTO) }
        | DECREMENTO operacionNumerica                              { $$ = instruccionesAPI.nuevoOperacionUnaria($2, TIPO_OPERACION.PRE_DECREMENTO) }
        | PARENTESISABRE operacionNumerica PARENTESISCIERRA         { $$ = $2 }
        | MENOS operacionNumerica %prec UMENOS                      { $$ = instruccionesAPI.nuevoOperacionUnaria($2, TIPO_OPERACION.NEGATIVO) }
        | ENTERO                                                    { $$ = instruccionesAPI.nuevoValor(Number($1), TIPO_VALOR.INT) } 
        | DECIMAL                                                   { $$ = instruccionesAPI.nuevoValor(parseFloat($1), TIPO_VALOR.DOUBLE)}
        | CHAR                                                      { $$ = instruccionesAPI.nuevoValor($1.charAt(0), TIPO_VALOR.CHAR)}
        | IDENTIFICADOR                                             { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR)}
        | CADENA                                                    { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CADENA)}
;

