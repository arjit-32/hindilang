# hindilang: A Hindi-Inspired Programming Language 🚀

🔗 Full Blog: [Building my own Programming Language](https://www.csprimer.in/articles/built-a-compiler)

hindilang is a Hindi-inspired scripting language that transpiles to JavaScript, built as an academic exercise to understand compilers and programming languages.

### Features 🌟 <br>
✅ Print Statements – Display output using CHAPO. <br>
✅ Variables & Assignment – Declare variables with MANLO. <br>
✅ User Input – Take input using PUCHO. <br>
✅ Arithmetic Expressions – Perform calculations with +, -, *, /. <br>
✅ Conditional Statements – Use AGAR (if) with {} blocks. <br>
✅ Loops – Use JABTAK (while) for iterations. <br>
✅ Comments – Use # for comments. <br>

## A Quick Taste of hindilang

Here are some examples

1. **Variables and Printing**
```javascript
MANLO x = 5;
CHAPO x;

// Output
// 5
```

2. **Taking User Input**

```javascript
PUCHO y;
CHAPO y;

// (If user enters 10)
// Output is 10
```

3. **Conditional Statements (if)**

```javascript
MANLO x = 5;

AGAR (x > 3) {
    CHAPO "X bada hai!";
}

// Output
// X bada hai
```

4. **Loops (while)**

```javascript
MANLO x = 5;

JABTAK (x < 10) {
    CHAPO x;
    MANLO x = x + 1;
}

// Output
// 5
// 6
// 7
// 8
// 9
// 10
```


5. **Comments**

```javascript
# Yeh ek comment hai

//(Comments are ignored during execution)
```
---

# How to Install & Run

1. Install Globally 
Hindilang must be installed globally to work as a CLI tool:

```bash
npm install -g hindilang
```

2. Run your Script

```bash
hindic myscript.hindi
```
`Note: Ensure that your npm global bin directory is in your system's PATH if hindic is not recognized.`

---

**Troubleshooting: "hindic not recognized" Problem**

If after installing you see an error like:

```bash
'hindic' is not recognized as an internal or external command
```

follow these steps:

Check your global npm bin directory:
Run the following command to find where npm installs global executables:

```bash
npm prefix -g
```
Typically, on Windows, this will be something like:
```plaintext
C:\Users\<YourUsername>\AppData\Roaming\npm
```

Add the directory to your PATH (if it's missing):
- Temporary fix (only for the current terminal session):
    ```powershell
    $env:Path += ";C:\Users\<YourUsername>\AppData\Roaming\npm"
    ```
- Permanent fix (persists across restarts):
In PowerShell, run:
    ```powershell
    [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Users\<YourUsername>\AppData\Roaming\npm", "User")
    ```
Restart your terminal after making changes !

---

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

---

# Other Info 🤝
- Inspired by [TeenyTinyCompiler](https://austinhenley.com/blog/teenytinycompiler1.html)
- Feel free to open issues or submit PRs.
- Future plans: A Playground for it to see it run in the browser.


🚀 Made with ❤️ by Arjit Sharma
