# [MJT Games](https://github.com/mjt-games) GameLang 2025

A declarative language for game development.

Inspired by [Paradox Interactive](https://www.paradoxinteractive.com)'s [Clausewitz Engine](https://ck2.paradoxwikis.com/Scripting)

# Objectives
- Open: Creativity wants to be free.
- Stable: Content wants to last the test of time.
- Modular: Parts so that we can take the good parts, and leave the rest.
- Simple


# Non-Objectives
- Difficult: The easiest way to do something is the right way.

# Abandoned In Place
I realized that the thing I wanted was really close to LISP + LISP image for state, but wanting a cleaner more 'modern' syntax. 

When struggling with the runtime/eval of the language, and in particular how state interop wanted to work between the runtime and the host I found myself fantasizing about WASM. 

WASM lead me to evaluation of WASM-friendly languages and in particular AssemblyScript. 

So the goal remains the same but the means have changed. I no longer in this moment desire to create an entire language since WASM/AS and using the memory buffer as state does exactly what I want, and indeed much better. 

I'm leaving the project here in a state where the parser works but the state/runtime/eval is TBD. There are some good parts I'll likely steal like the ChunkManager and StringInterner. This project also serves as a nice example of how to write a language using parser-combinators, which remains my ideal for parsing.

## Documentation

For detailed documentation, please visit the [project documentation](https://mjt-games.github.io/gamelang-2025/).

