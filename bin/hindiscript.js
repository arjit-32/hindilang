#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {Lexer, TokenType} = require('../src/Lexer');
const Parser = require('../src/Parser');
const Emitter = require('../src/emitter'); 


if (process.argv.length < 3) {
  console.error('Usage: hindiscript <file.hs>');
  process.exit(1);
}

const filePath = path.resolve(process.argv[2]);
const sourceCode = fs.readFileSync(filePath, 'utf-8');

// Lexical analysis - Tokeninzation
const lexer = new Lexer(sourceCode);

// Lexer Testing
// let token = lexer.getToken();
// while (token.kind != TokenType.EOF) {
//   console.log(token);
//   token = lexer.getToken();
// }
// console.log("--------------")

// Parsing and Emitting Code
const emitter = new Emitter("out.js");
const parser = new Parser(lexer, emitter);
parser.program();
emitter.writeFile();
console.log("Compilation Completed");


