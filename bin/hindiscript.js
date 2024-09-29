#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Lexer = require('../src/Lexer');

// Ensure TokenType is accessible
const TokenType = {
  EOF: -1,
  NEWLINE: 0,
  NUMBER: 1,
  IDENT: 2,
  STRING: 3,
  // Keywords
  LABEL: 101,
  GOTO: 102,
  PRINT: 103,
  INPUT: 104,
  LET: 105,
  IF: 106,
  THEN: 107,
  ENDIF: 108,
  WHILE: 109,
  REPEAT: 110,
  ENDWHILE: 111,
  // Operators
  EQ: 201,
  PLUS: 202,
  MINUS: 203,
  ASTERISK: 204,
  SLASH: 205,
  EQEQ: 206,
  NOTEQ: 207,
  LT: 208,
  LTEQ: 209,
  GT: 210,
  GTEQ: 211
};

if (process.argv.length < 3) {
  console.error('Usage: hindiscript <file.hs>');
  process.exit(1);
}

// Get the file path
const filePath = path.resolve(process.argv[2]);

// Read the source code
const sourceCode = fs.readFileSync(filePath, 'utf-8');


// Lexical analysis
const lexInstance = new Lexer("IF+-123 foo*THEN/");
let token = lexInstance.getToken();
while (token.kind != TokenType.EOF) {
  console.log(token.kind);
  token = lexInstance.getToken();
}


// Syntax analysis
// const ast = parser.parse(tokens);

// Semantic analysis (optional, for more complex language features)
// semantic.analyze(ast);

// Code generation
// const output = codegen.generate(ast);

// For now, simply log the output (can be improved to execute or compile)
// console.log(output);
