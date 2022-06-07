/* Analizador léxico */
%lex

%options case-insensitive

%%

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
"^"                                 return 'POTENCIA';
"%"                                 return 'MODULO';
"("                                 return 'PARENTESISABRE';
")"                                 return 'PARENTESISCIERRA'; 
"{"                                 return 'LLAVEABRE';     
"}"                                 return 'LLAVECIERRA';

[ \r\t]+                            {}
\n                                  {}


[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // Multicomentario
"//".*                              // Comentario


\"([^\\\"]|\\.)*\"                  { yytext = yytext.substr(1,yyleng-2); console.log("Se reconoció una cadena: " + yytext); return 'CADENA'; }
\'[^\']*\'                          { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
[0-9]+("."[0-9]+)?\b                return 'DECIMAL';
[0-9]+\b                            return 'ENTERO';
([a-zA-Z_])[a-zA-Z0-9_]*            return 'IDENTIFICADOR';

<<EOF>>                             return 'EOF';
.   { 
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);     
    }


/lex

/* ------------------ Analizador sintáctico --------------------- */


/* Precedencia */
%left 'MAS' 'MENOS'
%left 'MULTIPLICADO' 'DIVIDIDO'
%left UMENOS

%start init

%% /* Definiendo la gramática */

init
        : instrucciones EOF
;

instrucciones
        : instrucciones instruccion         { }
        | instruccion                       { }
;

instruccion
        : PRINTLN PARENTESISABRE CADENA PARENTESISCIERRA PUNTOCOMA          { console.log($3) }
        | tipo_dato IDENTIFICADOR IGUAL asignacionOperacion PUNTOCOMA          { console.log("El valor de la variable es: " + $4)}
        
;

tipo_dato
        : INT
        | DOUBLE
        | CHAR
        | BOOLEAN
        | STRING
;

asignacionOperacion
        : CADENA                                                    { $$ = $1; }
        | operacionNumerica                                         { $$ = $1; }
;

operacionNumerica
        : operacionNumerica MAS operacionNumerica                   { $$ = $1 + $3; }
        | operacionNumerica MENOS operacionNumerica                 { $$ = $1 - $3; }
        | operacionNumerica MULTIPLICADO operacionNumerica          { $$ = $1 * $3; }
        | operacionNumerica DIVIDIDO operacionNumerica              { $$ = $1 / $3; }
        | PARENTESISABRE operacionNumerica PARENTESISCIERRA         { $$ = $2; }
        | MENOS operacionNumerica %prec UMENOS                      { $$ = $2 * -1; }
        | ENTERO                                                    { $$ = Number($1); }  
        | DECIMAL                                                   { $$ = Number($1); }
        | IDENTIFICADOR                                             { $$ = $1; }
;

