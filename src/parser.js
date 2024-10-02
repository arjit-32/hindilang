const {TokenType} = require('../src/Lexer');
class Parser {
    constructor(lexer) {
        this.lexer = lexer;

        this.symbols = new Set();
        this.labelsDeclared = new Set();
        this.labelsGotoed = new Set();

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
        console.log("PROGRAM");

        while(this.checkToken(TokenType.NEWLINE)){
            this.nextToken();
        }

        while (!this.checkToken(TokenType.EOF)) {
            this.statement();
        }

        for (const label of this.labelsGotoed) {
            if(!this.labelsDeclared.has(label)){
                this.abort("Attempting to GOTO undeclared label: " + label);
            }
          }
    }

    statement() {
        if (this.checkToken(TokenType.PRINT)) {
            console.log("STATEMENT-PRINT");
            this.nextToken();

            if (this.checkToken(TokenType.STRING)) {
                this.nextToken();
            } else {
                this.expression();
            }
        } else if(this.checkToken(TokenType.IF)){
            console.log("STATEMENT-IF");
            this.nextToken();
            this.comparison();

            this.match(TokenType.THEN); // If milgya to Then kha hai bhyi
            this.nl();

            while(!this.checkToken(TokenType.ENDIF)){ // Jab tak EndIf nahi milta tb tk baaki statements padte jao
                this.statement(); 
            }

            this.match(TokenType.ENDIF);
        } else if(this.checkToken(TokenType.WHILE)){
            console.log("STATEMENT-WHILE");
            this.nextToken();
            this.comparison();

            this.match(TokenType.REPEAT);
            this.nl();

            while(!this.checkToken(TokenType.ENDWHILE)){
                this.statement();
            }
            this.match(TokenType.ENDWHILE);
        } else if(this.checkToken(TokenType.LABEL)){
            console.log("STATEMENT-LABEL");
            this.nextToken();

            // Making sure Label doesnt already exist
            if(labelsDeclared.has(this.curtoken.text))
                this.abort("Label already exists");
            this.labelsDeclared.add(this.curtoken.text);

            this.match(TokenType.IDENT);
        } else if(this.checkToken(TokenType.GOTO)){
            console.log("STATEMENT-GOTO");
            this.nextToken();
            this.labelsGotoed.add(this.curtoken.text);
            this.match(TokenType.IDENT);
        } else if(this.checkToken(TokenType.LET)){
            console.log("STATEMENT-LET");
            this.nextToken();

            if(!this.symbols.has(this.curtoken.text)){
                this.symbols.add(this.curtoken.text);
            }
            this.match(TokenType.IDENT);
            this.match(TokenType.EQ);
            this.expression();
        } else if(this.checkToken(TokenType.INPUT)){
            console.log("STATEMENT-INPUT");
            this.nextToken();

            if(!this.symbols.has(this.curtoken.text)){
                this.symbols.add(this.curtoken.text);
            }
            this.match(TokenType.IDENT);
        } else {
            this.abort("Invalid Statement at " + this.curtoken.text);
        }
        this.nl();
    }

    nl() {
        console.log("NEWLINE");
        
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
        console.log("COMPARISON");

        this.expression();

        if(this.isComparisonOperator()){
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
        console.log("EXPRESSION");

        this.term();
        while(this.checkToken(TokenType.PLUS) || this.checkToken(TokenType.MINUS)){
            this.nextToken();
            this.term();
        }
    }

    term(){
        console.log("TERM");

        this.unary();
        while(this.checkToken(TokenType.ASTERISK) || this.checkToken(TokenType.SLASH)){
            this.nextToken();
            this.unary();
        }
    }

    unary(){
        console.log("UNARY");

        if(this.checkToken(TokenType.PLUS) || this.checkToken(TokenType.MINUS)){
            this.nextToken();
        }
        this.primary();
    }

    primary(){
        console.log("PRIMARY (" + this.curtoken.text + ")");

        if(this.checkToken(TokenType.NUMBER)){
            this.nextToken();
        }else if(this.checkToken(TokenType.IDENT)){
            if(!this.symbols.has(this.curtoken.text)){
                this.abort("Referncing variable before assignment: " + this.curtoken.text)
            }
            this.nextToken();
        }else{
            this.abort("Unexpected token at " + this.curtoken.text);
        }
    }
}

module.exports = Parser;
