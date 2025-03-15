# SudoLanguage 🚀

A Hindi-inspired scripting language that transpiles to JavaScript. It is done as a Academic exercise to understand working of compilers and programming languages. I was inspired by Austin Henley's Teeny Tiny Compiler. 

Features 🌟
✅ Print Statements – Display output using CHAPO. 
✅ Variables & Assignment – Declare variables with MANLO. 
✅ User Input – Take input using PUCHO. 
✅ Arithmetic Expressions – Perform calculations with +, -, *, /. 
✅ Conditional Statements – Use AGAR (if) with {} blocks. 
✅ Loops – Use JABTAK (while) for iterations. 
✅ Comments – Use # for comments. 

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
- Lexer 🏷️ – Reads the source code character by character and converts it into tokens.
- Parser 📖 – Processes the tokens, checks syntax validity, and structures them into a parse tree.
- Emitter 💡 – Converts SudoLanguage code into JavaScript for execution.

## Grammar (BNF-like)
```
<program> ::= <statement_list>

<statement_list> ::= <statement> <newline> <statement_list>
                   | <statement> <newline>
                   | ε   (* Empty Line Allowed *)

<statement> ::= <assignment>
              | <print_statement>
              | <input_statement>
              | <if_statement>
              | <while_loop>

<assignment> ::= "MANLO" <identifier> "=" <expression> ";"

<print_statement> ::= "CHAPO" <expression> ";"

<input_statement> ::= "PUCHO" <identifier> ";"

<if_statement> ::= "AGAR" "(" <condition> ")" "{" <statement_list> "}"

<while_loop> ::= "JABTAK" "(" <condition> ")" "{" <statement_list> "}"

<expression> ::= <term> ( ("+" | "-") <term> )*
<term> ::= <factor> ( ("*" | "/") <factor> )*
<factor> ::= <number> | <identifier> | "(" <expression> ")"

<condition> ::= <expression> <comparison_operator> <expression>
<comparison_operator> ::= "==" | "!=" | ">" | "<" ">=" | "<="

<identifier> ::= [a-zA-Z_][a-zA-Z0-9_]*
<number> ::= [0-9]+
```

## Parser Characteristics
✔️ Top-Down Parsing – Starts from the highest-level structure (program) and drills down into finer details like expressions and numbers.
✔️ Recursive Descent – The parser calls itself recursively to process different statements and expressions.
✔️ LL(1) Parsing – Uses one token lookahead to determine the next action without backtracking.


# Contributing 🤝
- Feel free to open issues or submit PRs.
- Future plans: A Playground for it to see it run in the browser.


🚀 Made with ❤️ by Arjit Sharma