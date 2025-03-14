#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {Lexer, TokenType} = require('../src/Lexer');
const Parser = require('../src/Parser');
const Emitter = require('../src/emitter'); 

if (process.argv.length < 3) {
  console.error('Usage: hindiscript <file.hindi>');
  process.exit(1);
}

const filePath = path.resolve(process.argv[2]);
const sourceCode = fs.readFileSync(filePath, 'utf-8');

const lexer = new Lexer(sourceCode);
const emitter = new Emitter("out.js");
const parser = new Parser(lexer, emitter);

parser.program();
emitter.writeFile();
console.log("Compilation Completed");


