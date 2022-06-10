/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[1,6],$V2=[1,7],$V3=[1,8],$V4=[1,9],$V5=[1,10],$V6=[1,11],$V7=[5,7,13,16,17,18,19,20],$V8=[1,19],$V9=[1,24],$Va=[1,23],$Vb=[1,25],$Vc=[1,20],$Vd=[1,21],$Ve=[1,22],$Vf=[1,30],$Vg=[1,31],$Vh=[1,32],$Vi=[1,33],$Vj=[1,34],$Vk=[1,35],$Vl=[10,11,23,24,25,26,27,28],$Vm=[10,11,23,24];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"init":3,"instrucciones":4,"EOF":5,"instruccion":6,"PRINTLN":7,"PARENTESISABRE":8,"operacionNumerica":9,"PARENTESISCIERRA":10,"PUNTOCOMA":11,"tipo_dato":12,"IDENTIFICADOR":13,"IGUAL":14,"INCREMENTO":15,"INT":16,"DOUBLE":17,"CHAR":18,"BOOLEAN":19,"STRING":20,"asignacionOperacion":21,"CADENA":22,"MAS":23,"MENOS":24,"MODULO":25,"MULTIPLICADO":26,"POTENCIA":27,"DIVIDIDO":28,"ENTERO":29,"DECIMAL":30,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PRINTLN",8:"PARENTESISABRE",10:"PARENTESISCIERRA",11:"PUNTOCOMA",13:"IDENTIFICADOR",14:"IGUAL",15:"INCREMENTO",16:"INT",17:"DOUBLE",18:"CHAR",19:"BOOLEAN",20:"STRING",22:"CADENA",23:"MAS",24:"MENOS",25:"MODULO",26:"MULTIPLICADO",27:"POTENCIA",28:"DIVIDIDO",29:"ENTERO",30:"DECIMAL"},
productions_: [0,[3,2],[4,2],[4,1],[6,5],[6,5],[6,4],[6,3],[12,1],[12,1],[12,1],[12,1],[12,1],[21,1],[21,1],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,2],[9,1],[9,1],[9,1],[9,1],[9,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

                return $$[$0-1]
        
break;
case 2:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 3:
 this.$ = [$$[$0]] 
break;
case 4:
 this.$ = instruccionesAPI.nuevoPrintln($$[$0-2]) 
break;
case 5:
 this.$ = instruccionesAPI.nuevoDeclaracionAsignacion($$[$0-4].toUpperCase(), $$[$0-3], $$[$0-1])
break;
case 6:
 this.$ = instruccionesAPI.nuevoAsignacion($$[$0-3], $$[$0-1])
break;
case 7:
 this.$ = instruccionesAPI.nuevoPostIncremento($$[$0-2]) 
break;
case 8: case 9: case 10: case 11: case 12:
this.$ = $$[$0]
break;
case 13:
 this.$ = instruccionesAPI.nuevoValor($$[$0], TIPO_VALOR.CADENA) 
break;
case 14:
 this.$ = $$[$0]; 
break;
case 15:
 this.$ = instruccionesAPI.nuevoOperacionBinaria($$[$0-2], $$[$0], TIPO_OPERACION.SUMA) 
break;
case 16:
 this.$ = instruccionesAPI.nuevoOperacionBinaria($$[$0-2], $$[$0], TIPO_OPERACION.RESTA) 
break;
case 17:
 this.$ = instruccionesAPI.nuevoOperacionBinaria($$[$0-2], $$[$0], TIPO_OPERACION.MODULO) 
break;
case 18:
 this.$ = instruccionesAPI.nuevoOperacionBinaria($$[$0-2], $$[$0], TIPO_OPERACION.MULTIPLICACION) 
break;
case 19:
 this.$ = instruccionesAPI.nuevoOperacionBinaria($$[$0-2], $$[$01], TIPO_OPERACION.POTENCIA) 
break;
case 20:
 this.$ = instruccionesAPI.nuevoOperacionBinaria($$[$0-2], $$[$0], TIPO_OPERACION.DIVISION) 
break;
case 21:
 this.$ = $$[$0-1] 
break;
case 22:
 this.$ = instruccionesAPI.nuevoOperacionUnaria($$[$0], TIPO_OPERACION.NEGATIVO) 
break;
case 23:
 this.$ = instruccionesAPI.nuevoValor(Number($$[$0]), TIPO_VALOR.INT) 
break;
case 24:
 this.$ = instruccionesAPI.nuevoValor(parseFloat($$[$0]), TIPO_VALOR.DOUBLE)
break;
case 25:
 this.$ = instruccionesAPI.nuevoValor($$[$0].charAt(0), TIPO_VALOR.CHAR)
break;
case 26:
 this.$ = instruccionesAPI.nuevoValor($$[$0], TIPO_VALOR.IDENTIFICADOR)
break;
case 27:
 this.$ = instruccionesAPI.nuevoValor($$[$0], TIPO_VALOR.CADENA)
break;
}
},
table: [{3:1,4:2,6:3,7:$V0,12:5,13:$V1,16:$V2,17:$V3,18:$V4,19:$V5,20:$V6},{1:[3]},{5:[1,12],6:13,7:$V0,12:5,13:$V1,16:$V2,17:$V3,18:$V4,19:$V5,20:$V6},o($V7,[2,3]),{8:[1,14]},{13:[1,15]},{14:[1,16],15:[1,17]},{13:[2,8]},{13:[2,9]},{13:[2,10]},{13:[2,11]},{13:[2,12]},{1:[2,1]},o($V7,[2,2]),{8:$V8,9:18,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{14:[1,26]},{8:$V8,9:27,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{11:[1,28]},{10:[1,29],23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj,28:$Vk},{8:$V8,9:36,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{8:$V8,9:37,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},o($Vl,[2,23]),o($Vl,[2,24]),o($Vl,[2,25]),o($Vl,[2,26]),o($Vl,[2,27]),{8:$V8,9:38,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{11:[1,39],23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj,28:$Vk},o($V7,[2,7]),{11:[1,40]},{8:$V8,9:41,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{8:$V8,9:42,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{8:$V8,9:43,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{8:$V8,9:44,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{8:$V8,9:45,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{8:$V8,9:46,13:$V9,18:$Va,22:$Vb,24:$Vc,29:$Vd,30:$Ve},{10:[1,47],23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj,28:$Vk},o($Vl,[2,22]),{11:[1,48],23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj,28:$Vk},o($V7,[2,6]),o($V7,[2,4]),o($Vm,[2,15],{25:$Vh,26:$Vi,27:$Vj,28:$Vk}),o($Vm,[2,16],{25:$Vh,26:$Vi,27:$Vj,28:$Vk}),o($Vl,[2,17]),o($Vl,[2,18]),o($Vl,[2,19]),o($Vl,[2,20]),o($Vl,[2,21]),o($V7,[2,5])],
defaultActions: {7:[2,8],8:[2,9],9:[2,10],10:[2,11],11:[2,12],12:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

        const TIPO_OPERACION = require('./operaciones').TIPO_OPERACION
        const TIPO_VALOR = require('./operaciones').TIPO_VALOR
        const TIPO_DATO = require('./tablaSimbolos').TIPO_DATO
        const instruccionesAPI = require('./operaciones').instruccionesAPI
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 16;
break;
case 1:return 17;
break;
case 2:return 18;
break;
case 3:return 19;
break;
case 4:return 20;
break;
case 5:return 'IF';
break;
case 6:return 'ELSE';
break;
case 7:return 'SWITCH';
break;
case 8:return 'CASE';
break;
case 9:return 'DEFAULT';
break;
case 10:return 'BREAK';
break;
case 11:return 'FOR';
break;
case 12:return 'WHILE';
break;
case 13:return 'DO';
break;
case 14:return 'CONTINUE';
break;
case 15:return 'VOID';
break;
case 16:return 'RETURN';
break;
case 17:return 'CALL';
break;
case 18:return 'RETURN';
break;
case 19:return 7;
break;
case 20:return 'TYPEOF';
break;
case 21:return 'TRUE';
break;
case 22:return 'FALSE';
break;
case 23:return 'IMPORT';
break;
case 24:return 'MAIN';
break;
case 25:return 'CONST';
break;
case 26:return 11;   
break;
case 27:return 'COMA';      
break;
case 28:return 'DOSPUNTOS';  
break;
case 29:return 15;
break;
case 30:return 'DECREMENTO'; 
break;
case 31:return 'MAYORIGUAL';        
break;
case 32:return 'MENORIGUAL';
break;
case 33:return 'MAYOR';             
break;
case 34:return 'MENOR'; 
break;
case 35:return 'DIFERENTEA';   
break;
case 36:return 'DOBLEIGUAL';   
break;
case 37:return 'NOT';
break;
case 38:return 14;   
break;
case 39:return 'OR';           
break;
case 40:return 'AND';
break;
case 41:return 23;
break;
case 42:return 24;  
break;
case 43:return 28;      
break;
case 44:return 26;
break;
case 45:return 27;
break;
case 46: return 25;
break;
case 47:return 8;
break;
case 48:return 10; 
break;
case 49:return 'LLAVEABRE';     
break;
case 50:return 'LLAVECIERRA';
break;
case 51:
break;
case 52:
break;
case 53:// Multicomentario
break;
case 54:// Comentario
break;
case 55: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 22; 
break;
case 56:return 30; 
break;
case 57: return 29; 
break;
case 58: return 13; 
break;
case 59: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 18
break;
case 60:return 5;
break;
case 61: 
        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);     
    
break;
}
},
rules: [/^(?:int\b)/i,/^(?:double\b)/i,/^(?:char\b)/i,/^(?:boolean\b)/i,/^(?:String\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:break\b)/i,/^(?:for\b)/i,/^(?:while\b)/i,/^(?:do\b)/i,/^(?:continue\b)/i,/^(?:void\b)/i,/^(?:return\b)/i,/^(?:call\b)/i,/^(?:return\b)/i,/^(?:println\b)/i,/^(?:typeof\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:import\b)/i,/^(?:main\b)/i,/^(?:const\b)/i,/^(?:;)/i,/^(?:,)/i,/^(?::)/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:<)/i,/^(?:!=)/i,/^(?:==)/i,/^(?:!)/i,/^(?:=)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\/)/i,/^(?:\*)/i,/^(?:\*\*)/i,/^(?:%)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:\/\/.*)/i,/^(?:"([^\\\"]|\\.)*")/i,/^(?:[0-9]+\.([0-9]+)?\b)/i,/^(?:[0-9]+\b)/i,/^(?:([a-zA-Z_])[a-zA-Z0-9_ñÑ]*)/i,/^(?:('(\\(["'\\bfnrt]|u[0-9A-Fa-f]{4})|[^\\'])'))/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}