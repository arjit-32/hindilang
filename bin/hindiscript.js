#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {Lexer, TokenType} = require('../src/Lexer');
const Parser = require('../src/Parser');

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