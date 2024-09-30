#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {Lexer, TokenType} = require('../src/Lexer');
const Parser = require('../src/Parser');

// Ensure TokenType is accessible
// const TokenType = {
//   EOF: -1,
//   NEWLINE: 0,
//   NUMBER: 1,
//   IDENT: 2,
//   STRING: 3,
//   // Keywords
//   LABEL: 101,
//   GOTO: 102,
//   PRINT: 103,
//   INPUT: 104,
//   LET: 105,
//   IF: 106,
//   THEN: 107,
//   ENDIF: 108,
//   WHILE: 109,
//   REPEAT: 110,
//   ENDWHILE: 111,
//   // Operators
//   EQ: 201,
//   PLUS: 202,
//   MINUS: 203,
//   ASTERISK: 204,
//   SLASH: 205,
//   EQEQ: 206,
//   NOTEQ: 207,
//   LT: 208,
//   LTEQ: 209,
//   GT: 210,
//   GTEQ: 211
// };

if (process.argv.length < 3) {
  console.error('Usage: hindiscript <file.hs>');
  process.exit(1);
}

const filePath = path.resolve(process.argv[2]);
const sourceCode = fs.readFileSync(filePath, 'utf-8');
// console.log("Source Code:");
// console.log(sourceCode); 
// console.log("-----------")

// Lexical analysis - Tokeninzation
const lexer = new Lexer(sourceCode);

// Lexer Testing
// let token = lexer.getToken();
// while (token.kind != TokenType.EOF) {
//   console.log(token);
//   token = lexer.getToken();
// }
// console.log("--------------")

// Syntax analysis - Generate Parse Tree
const parser = new Parser(lexer);
parser.program();
console.log("Parsing Completed");