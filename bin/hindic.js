#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Lexer } = require('../src/Lexer');
const Parser = require('../src/Parser'); // Or Parser2 if you're using WebAssembly
const Emitter = require('../src/Emitter');
const { execSync } = require('child_process');

if (process.argv.includes("--version")) {
  console.log(`SudoLanguage version ${packageJson.version}`);
  process.exit(0);
}


if (process.argv.length < 3) {
  console.error('Usage: hindic <file.hindi>');
  process.exit(1);
}

const filePath = path.resolve(process.argv[2]);
const sourceCode = fs.readFileSync(filePath, 'utf-8');

// Compile HindiScript → JavaScript
const emitter = new Emitter("temp.js");
const lexer = new Lexer(sourceCode);
const parser = new Parser(lexer, emitter);

parser.program();
emitter.writeFile();

console.log("✅ Compilation Successful! Running program...\n");

// Execute JavaScript immediately
try {
  execSync('node temp.js', { stdio: 'inherit' });
} catch (err) {
  console.error("❌ Error running compiled script:", err);
  process.exit(1);
}

// Cleanup temp file (optional)
fs.unlinkSync("temp.js");
