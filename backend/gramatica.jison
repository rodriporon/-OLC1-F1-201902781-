/* analizador léxico */
%lex

%options case-insensitive

%%

*/ primitivos */
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

*/ operadores logicos y de comparacion */
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

*/ operadores aritméticos */
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

*/ palabras reservadas */
"true"                              return 'TRUE';
"false"                             return 'FALSE';
"import"                            return 'IMPORT';
"main"                              return 'MAIN';

*/ palabras de control */
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

*/ blancos */
[ \r\t]+                            {}
\n                                  {}

*/ comentarios multi y solo linea */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]
[/][/].*                            

*/ cadenas numeros e identifiacores */
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

/*

        Nota: la primera pasada que reconozca los metodos y la segunda pasada linea a linea

*/



//Start

init
	: instructions EOF              {   return $1;  } // return AST
;

instructions
	: instructions instruction      {   $1.push($2); $$ = $1;   }
	| instruction					{   $$ = [$1];  }
;


/*  Metodos  */



/*  Control Statements */
If 
    :IF PARENTESIS_APERTURA Expresion PARENTESIS_CIERRE BLOQUE_INS 
        {

        } 
    |IF PARENTESIS_APERTURA Expresion PARENTESIS_CIERRE BLOQUE_INS
        { 

         } 
    |IF PARENTESIS_APERTURA Expresion PARENTESIS_CIERRE BLOQUE_INS ListELSEIF
        { 

         }
    |IF PARENTESIS_APERTURA Expresion PARENTESIS_CIERRE BLOQUE_INS ListELSEIF Else 
        {

        } 
;
Else
    : ELSE BLOQUE_INS { 

    }
;
ListELSEIF 
    : ListELSEIF  Elseif {  }
    | Elseif  {  }
;
Elseif
    : ELSE IF PARENTESIS_APERTURA Expresion PARENTESIS_CIERRE BLOQUE_INS 
        {  }
;
Switch
    : SWITCH PARENTESIS_APERTURA Expresion PARENTESIS_CIERRE LLAVE_APERTURA Lista_Case LLAVE_CIERRE
        {  }
;
Lista_Case
    : Lista_Case Case {   }
    | Case { }
;
Case
    : CASE Expresion DOS_PUNTOS BloqueCASES { }
    | DEFAULT DOS_PUNTOS BloqueCASES { }
;
Do
    : DO BLOQUE_INS WHILE PARENTESIS_APERTURA Expresion PARENTESIS_CIERRE PUNTO_COMA  
        { }
;
While
    :WHILE PARENTESIS_APERTURA Expresion PARENTESIS_CIERRE BLOQUE_INS 
        { 
           
        }
;


// Nota: Secuencia en notas Aux del Desktop