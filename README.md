# SudoLang: A Hindi-Inspired Programming Language 🚀

🔗 Full Blog: [Building SudoLang](https://www.csprimer.in/blog/built-a-compiler)

SudoLang is a Hindi-inspired scripting language that transpiles to JavaScript, built as an academic exercise to understand compilers and programming languages.

### Features 🌟 <br>
✅ Print Statements – Display output using CHAPO. <br>
✅ Variables & Assignment – Declare variables with MANLO. <br>
✅ User Input – Take input using PUCHO. <br>
✅ Arithmetic Expressions – Perform calculations with +, -, *, /. <br>
✅ Conditional Statements – Use AGAR (if) with {} blocks. <br>
✅ Loops – Use JABTAK (while) for iterations. <br>
✅ Comments – Use # for comments. <br>

# Example Code

```
MANLO x = 5;
CHAPO x;

PUCHO y;
CHAPO y;

AGAR (x > 3) {
    CHAPO "X bada hai!";
}

JABTAK (x < 10) {
    CHAPO x;
    MANLO x = x + 1;
}

# This is a comment
```

### Output 
```bash
5
10 ---> Entered by user
X bada hai
5
6
7
8
9
10

```

# How to Install & Run

1. Install Globally 

```bash
npm install -g sudolang
```

2. Run your Script

```bash
hindic myscript.hindi
```

# How It Works 🔧

### Code Flow 🚀
📌 package.json – Defines the project and dependencies. <br>
📌 bin/hindic – Reads .hindi files, compiles, and executes them. <br>
📌 Lexer – Converts source code into tokens. <br>
📌 Emitter – Stores and writes transpiled JavaScript. <br>
📌 Parser – Matches tokens to grammar and generates JavaScript output. <br>

### Parser Characteristics
✔️ Top-Down Parsing – Starts from the highest-level structure (program) and drills down into finer details like expressions and numbers. <br>
✔️ Recursive Descent – The parser calls itself recursively to process different statements and expressions. <br>
✔️ LL(1) Parsing – Uses one token lookahead to determine the next action without backtracking. <br>

### Beyond Transpiling
🛣️ Use LLVM to generate optimized machine code. <br>
🛣️ Emit x86 assembly and compile using an assembler (nasm). <br>
🛣️ Convert code to WebAssembly (WASM) for execution in browsers. <br>

# Other Info 🤝
- Inspired by [TeenyTinyCompiler](https://austinhenley.com/blog/teenytinycompiler1.html)
- Feel free to open issues or submit PRs.
- Future plans: A Playground for it to see it run in the browser.


🚀 Made with ❤️ by Arjit Sharma
