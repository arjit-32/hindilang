const {TokenType} = require('../src/Lexer');
class Parser {
    constructor(lexer, emitter) {
        this.lexer = lexer;
        this.emitter = emitter;
        
        this.symbols = new Set();

        this.curtoken = null;
        this.peekToken = null;
        this.nextToken(); 
        this.nextToken(); 
    }

    checkToken(kind) {
        return this.curtoken.kind == kind;
    }

    checkPeek(kind) {
        return this.peekToken.kind == kind;
    }

    match(kind) {
        if (!this.checkToken(kind)) {
            this.abort("Expected " + kind + ", got " + this.curtoken.kind);
        }
        this.nextToken();
    }

    nextToken() {
        this.curtoken = this.peekToken;
        this.peekToken = this.lexer.getToken();
    }

    abort(message) {
        console.error("Error: " + message);
        process.exit(1);
    }

    program() {

        while(this.checkToken(TokenType.NEWLINE)){
            this.nextToken();
        }

        while (!this.checkToken(TokenType.EOF)) {
            this.statement();
        }

    }

    statement() {
        if (this.checkToken(TokenType.CHAPO)) {
            this.nextToken();

            if (this.checkToken(TokenType.STRING)) {
                this.emitter.emitLine(`console.log("${this.curtoken.text}");`);
                this.nextToken();
            } else {
                this.emitter.emit("console.log(");
                this.expression();
                this.emitter.emitLine(");");
            }
            this.match(TokenType.SEMICOLON);
        } else if(this.checkToken(TokenType.AGAR)){
            this.nextToken();

            this.match(TokenType.LPAREN);
            this.emitter.emit("if(");
            this.comparison();

            this.match(TokenType.RPAREN);
         
            this.match(TokenType.LBRACE); 
            this.nl();
            this.emitter.emitLine("){");

            while(!this.checkToken(TokenType.RBRACE)){ // Jab tak EndIf nahi milta tb tk baaki statements padte jao
                this.statement(); 
            }
            this.match(TokenType.RBRACE);
            this.emitter.emitLine("}");
        } else if(this.checkToken(TokenType.JABTAK)){

            this.nextToken();
            this.match(TokenType.LPAREN);
            this.emitter.emit("while(");
            
            this.comparison();

            this.match(TokenType.RPAREN);

            this.match(TokenType.LBRACE);
            this.nl();
            this.emitter.emitLine("){");

            while(!this.checkToken(TokenType.RBRACE)){
                this.statement();
            }
            this.match(TokenType.RBRACE);
            this.emitter.emitLine("}"); 
        } else if(this.checkToken(TokenType.MANLO)){
            this.nextToken();

            const varName = this.curtoken.text;
            if(!this.symbols.has(varName)){
                this.symbols.add(varName);
                this.emitter.emit(`let ${varName} = `);
            } else {
                this.emitter.emit(`${varName} = `);
            }
            this.match(TokenType.IDENT);
            this.match(TokenType.EQ);

            this.expression();
            this.emitter.emitLine(";");
            this.match(TokenType.SEMICOLON);
        } else if(this.checkToken(TokenType.PUCHO)){
            this.nextToken();

            const inputVar = this.curtoken.text;
            this.match(TokenType.IDENT);
            this.match(TokenType.SEMICOLON);

            this.emitter.emitLine(`const readline = require('readline-sync');`);

            if(!this.symbols.has(inputVar)){
                this.symbols.add(inputVar);
                this.emitter.emitLine(`let ${inputVar} = readline.question("Enter value for ${inputVar}: ");`);
            }else{
                this.emitter.emitLine(`${inputVar} = readline.question("Enter value for ${inputVar}: ");`);
            }

            this.emitter.emitLine(`if (!isNaN(${inputVar})) { ${inputVar} = Number(${inputVar}); }`);
        } else {
            this.abort("Invalid Statement at " + this.curtoken.text);
        }
        this.nl();
    }

    nl() {
        
        if (this.checkToken(TokenType.EOF)) {
            return;  // End of file, no need to match a newline
        }
        this.match(TokenType.NEWLINE);  // Match the first newline

        // Consume additional newlines if any
        while (this.checkToken(TokenType.NEWLINE)) {
            this.nextToken();  // Move to the next token
        }
    }

    isComparisonOperator(){
        return this.checkToken(TokenType.GT) || this.checkToken(TokenType.GTEQ) || this.checkToken(TokenType.LT) || this.checkToken(TokenType.LTEQ) || this.checkToken(TokenType.EQEQ) || this.checkToken(TokenType.NOTEQ)
    }
    comparison(){

        this.expression();

        if(this.isComparisonOperator()){
            const comparisonOperator = this.curtoken.text;
            this.emitter.emit(` ${comparisonOperator} `);
            this.nextToken();
            this.expression();
        } else{
            this.abort("Expected comparison operator at: " + this.curtoken.text)
        }

        while(this.isComparisonOperator()){
            this.nextToken();
            this.expression();
        }
    }

    expression(){

        this.term();
        while(this.checkToken(TokenType.PLUS) || this.checkToken(TokenType.MINUS)){
            const operator = this.curtoken.text;
            this.emitter.emit(` ${operator} `);
            this.nextToken();
            this.term();
        }
    }

    term(){

        this.unary();
        while(this.checkToken(TokenType.ASTERISK) || this.checkToken(TokenType.SLASH)){
            const operator = this.curtoken.text;
            this.emitter.emit(` ${operator} `);
            this.nextToken();
            this.unary();
        }
    }

    unary(){

        if(this.checkToken(TokenType.PLUS) || this.checkToken(TokenType.MINUS)){
            this.emitter.emit(this.curtoken.text); // Emit unary operator
            this.nextToken();
        }
        this.primary();
    }

    primary(){

        if(this.checkToken(TokenType.NUMBER)){
            this.emitter.emit(this.curtoken.text); // Emit number
            this.nextToken();
        } else if(this.checkToken(TokenType.IDENT)){
            if(!this.symbols.has(this.curtoken.text)){
                this.abort("Referrencing variable before assignment: " + this.curtoken.text)
            }
            this.emitter.emit(this.curtoken.text); // Emit variable
            this.nextToken();
        } else if (this.checkToken(TokenType.LPAREN)) {
            this.nextToken(); 
            this.emitter.emit("(");  
            this.expression();  // Evaluate the expression inside parentheses
            this.match(TokenType.RPAREN);  
            this.emitter.emit(")");  
        } else{
            this.abort("Unexpected token at " + this.curtoken.text);
        }
    }
}

module.exports = Parser;
