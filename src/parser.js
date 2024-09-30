const {TokenType} = require('../src/Lexer');
class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.curtoken = null;
        this.peekToken = null;
        this.nextToken(); // curToken is null, peekToken at 1st token
        this.nextToken(); // curToken is 1st token, peekToken is 2nd token
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

    // Production Rules 
    program() {
        console.log("PROGRAM");

        while (!this.checkToken(TokenType.EOF)) {
            this.statement();
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
        }
        this.nl();
    }

    nl() {
        console.log("NEWLINE");

        this.match(TokenType.NEWLINE);  // Match the first newline

        // Consume additional newlines if any
        while (this.checkToken(TokenType.NEWLINE)) {
            this.nextToken();  // Move to the next token
        }
    }

    expression() {
        // Expression handling logic (not yet implemented)
    }
}

module.exports = Parser;
