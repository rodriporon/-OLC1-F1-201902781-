/* analizador léxico */
%lex

%options case-insensitive

%%

//Tipo de dato
"int"                               return 'INT';
"double"                            return 'DOUBLE';
"char"                              return 'CHAR';
"boolean"                           return 'BOOLEAN';
"String"                            return 'STRING';

";"                                 return 'PUNTO_COMA';   
","                                 return 'COMA';      
":"                                 return 'DOS_PUNTOS';  

"++"                                return 'INCREMENTO';
"--"                                return 'DECREMENTO'; 

// Logics
">="                                return 'MAYOR_IGUAL';        
"<="                                return 'MENOR_IGUAL';
">"                                 return 'MAYOR';             
"<"                                 return 'MENOR'; 
"!="                                return 'DIFERENTEA';   
"=="                                return 'DOBLE_IGUAL';   
"!"                                 return 'NOT';
"="                                 return 'IGUAL';   
"||"                                return 'OR';           
"&&"                                return 'AND';

// Operation
"+"                                 return 'SUMA';
"-"                                 return 'RESTA';  
"/"                                 return 'DIVISION';      
"*"                                 return 'MULTIPLICACION';
"^"                                 return 'POTENCIA';
"%"                                 return 'MODULO';
"("                                 return 'PARENTESIS_APERTURA';
")"                                 return 'PARENTESIS_CIERRE'; 
"{"                                 return 'LLAVE_APERTURA';     
"}"                                 return 'LLAVE_CIERRE';

//RESERVADAs
"true"                              return 'TRUE';
"false"                             return 'FALSE';
"import"                            return 'IMPORT';
"main"                              return 'MAIN';

//Control Statements
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

//Methods and functions
"void"                              return 'VOID';
"return"                            return 'RETURN';
"call"                              return 'CALL';
"return"                            return 'RETURN';
"println"                           return 'PRINTLN';
"typeof"                            return 'TYPEOF';

// Blanks 
[ \r\t]+                            {}
\n                                  {}

//Comments
[/][][^][]+([^/][^][]+)*[/] //multiline comments
[/][/].*                            //comment

//literals
\"([^\\\"]|\\.)*\"                  { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'                          { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }

[0-9]+("."[0-9]+)?\b                return 'DECIMAL';
[0-9]+\b                            return 'ENTERO';
([a-zA-Z_])[a-zA-Z0-9_]*            return 'IDENTIFICADOR';

<<EOF>>                             return 'EOF';
.   { 
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);     
    }

/lex

/* ------------------------ Parcer ------------------------ */

/* Precedence */
%left   'OR'                                                    //  ||
%left   'AND'                                                   //  &&
%left   'POTENCIA'                                              //  ^
%left   'MAYOR_IGUAL' 'MENOR_IGUAL' 'MAYOR' 'MENOR' 'DIFERENTEA'
%left   'DOBLE_IGUAL'                                  // wathh ?
%left   'SUMA' 'RESTA'                                          //  + -
%left   'MULTIPLICACION' 'DIVISION' 'MODULO'                    //  " * / % "
%right  'NOT'                                                   //  " !

%start init

%% 
/* 
productions  */

//Start
init
	: instructions EOF
;