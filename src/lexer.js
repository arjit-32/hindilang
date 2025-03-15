class Lexer {
    constructor(source) {
      this.source = source;
      this.curPos = -1;
      this.curChar = '';
      this.nextChar();
    }
  
    nextChar() {
      this.curPos +=1;
      if(this.curPos >= this.source.length){
        this.curChar='\0';
      }else{
        this.curChar=this.source[this.curPos];
      }
    }
  
    peek(){
        if(this.curPos+1>=this.source.length)
            return '\0'
        return this.source[this.curPos+1];
    }

    abort(message){
      console.error("Lexer Error: " + message + " at position " + this.curPos);
      process.exit(1); 
    }

    skipWhitespace() {
      while(this.curChar == ' ' || this.curChar == '\t' || this.curChar == '\s' || this.curChar == '\r')
        this.nextChar();
    }

    skipComment(){
      if(this.curChar == '#'){
        while(this.curChar != '\n')
          this.nextChar()
      }
    }

    isDigit(char){
      if(char>='0' && char<='9')
        return true;
      return false;
    }

    isAlpha(char){
      if(char>='a' && char<='z' || char>='A' && char<='Z')
        return true;
      return false;
    }
  
    getToken() {
      let token=null;
      this.skipWhitespace();
      this.skipComment();

      if (this.curChar == '(') {
        token = new Token(this.curChar, TokenType.LPAREN);
      } else if (this.curChar == ')') {
        token = new Token(this.curChar, TokenType.RPAREN);
      } else if(this.curChar == '+'){
        token = new Token(this.curChar, TokenType.PLUS)
      } else if(this.curChar == '-'){
        token = new Token(this.curChar, TokenType.MINUS)
      } else if(this.curChar == '*'){
        token = new Token(this.curChar, TokenType.ASTERISK)
      } else if(this.curChar == '/'){
        token = new Token(this.curChar, TokenType.SLASH)
      } else if(this.curChar == '\n'){
        token = new Token(this.curChar, TokenType.NEWLINE)
      } else if(this.curChar == '\0'){
        token = new Token(this.curChar, TokenType.EOF)
      } else if(this.curChar == '='){
          if(this.peek() == '='){
            let lastChar = this.curChar;
            this.nextChar();
            token = new Token(lastChar+this.curChar, TokenType.EQEQ)
          }else
            token = new Token(this.curChar, TokenType.EQ);
      } else if(this.curChar == '>'){
        if(this.peek() == '='){
          let lastChar = this.curChar;
          this.nextChar();
          token = new Token(lastChar+this.curChar, TokenType.GTEQ)
        }else
          token = new Token(this.curChar, TokenType.GT);
      } else if(this.curChar == '<'){
        if(this.peek() == '='){
          let lastChar = this.curChar;
          this.nextChar();
          token = new Token(lastChar+this.curChar, TokenType.LTEQ)
        }else
          token = new Token(this.curChar, TokenType.LT);
      } else if(this.curChar == '!'){
        if(this.peek()== '='){
          this.nextChar();
          token = new Token(this.curChar, TokenType.NOTEQ)
        } else
          this.abort("Expected !=, got !" + this.peek())
      } else if(this.curChar == '\"') {
        this.nextChar();
        let startPos = this.curPos;
        while(this.curChar != '\"'){
          if(this.curChar=='\r' || this.curChar=='\n' || this.curChar=='\t' || this.curChar=='\\' || this.curChar== '%'){
            this.abort("Illegal character within a string.")
          }
          this.nextChar();
        }
        let tokenText = this.source.substring(startPos,this.curPos);
        token = new Token(tokenText, TokenType.STRING)
      } else if (this.curChar == '{') {
          token = new Token(this.curChar, TokenType.LBRACE);
      } else if (this.curChar == '}') {
          token = new Token(this.curChar, TokenType.RBRACE);
      } else if (this.curChar == ';') {
        token = new Token(this.curChar, TokenType.SEMICOLON);
      } else if(this.isDigit(this.curChar)){
          let startPos = this.curPos;
          while(this.isDigit(this.peek())){
            this.nextChar();
          }
          if(this.peek() == '.'){
            this.nextChar()
            if(!this.isDigit(this.peek()))
              this.abort("Illegal character in number: expected digit after decimal point.");
            while(this.isDigit(this.peek())){
              this.nextChar()
            }
          }
          let tokenText = this.source.substring(startPos, this.curPos+1)
          token = new Token(tokenText, TokenType.NUMBER)
      } else if(this.isAlpha(this.curChar)){
          let startPos = this.curPos;
          while (this.isAlpha(this.peek())){
            this.nextChar();
          }
          let tokenText = this.source.substring(startPos, this.curPos+1 );
          let keyword = Token.checkIfKeyword(tokenText);
          if(keyword == null)
            token = new Token(tokenText, TokenType.IDENT);
          else 
            token = new Token(tokenText, keyword);
      } else{
          this.abort("Unknown Token: " + this.curChar)
      }

      this.nextChar();
      return token;
    }
  }

  class Token{
    constructor(tokenText, tokenKind){
        this.text=tokenText;
        this.kind=tokenKind;
    }
    static checkIfKeyword(tokenText) {
      const upperToken = tokenText.toUpperCase(); // Ensure case insensitivity
      return TokenType[upperToken] || null;  // lookup in TokenType
    }
  }

  const TokenType = {
    EOF: -1,
    NEWLINE: 0,
    NUMBER: 1,
    IDENT: 2,
    STRING: 3,
    
    // Keywords
    CHAPO: 103, // Print
    PUCHO: 104,
    MANLO: 105, // Let
    AGAR: 106, // If
    JABTAK: 109,// While
    
    // Operators
    EQ: 201, // =
    PLUS: 202, // +
    MINUS: 203, // -
    ASTERISK: 204, // *
    SLASH: 205, // /
    EQEQ: 206,// ==
    NOTEQ: 207, // !=
    LT: 208, // <
    LTEQ: 209, // <=
    GT: 210, // >
    GTEQ: 211, // >=

    // Symbols
    LPAREN: 212, // (
    RPAREN: 213, // )
    LBRACE: 214, // {
    RBRACE: 215,  // }
    SEMICOLON: 216, // ;
};


  module.exports = {Lexer, TokenType};
  