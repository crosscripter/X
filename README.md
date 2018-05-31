# Stax

## About
Stax is a new minimalist concatenative programming language.  Concatenative programming
is all about implicit function composition.  The entire program is one application of a 
function which takes in all state of the program and returns a new state of the program.  
Each function, which is called a word, operates from this state which is implemented as a
stack. The stack is conceptually passed from function to function, but is actually 
implemented as a static global stack. Each word can push or pop values on and off the stack
and leaves the stack arranged for the next word to operate on.  This is akin to passing 
arguments and returning return values from functions.  There are some built-in words like 
debug, pop, swap etc.  that manipulate the stack, these are defined in the core module and
available for any program to use. There are also core modules which are not automatically 
imported such as string for example. You define a Stax module by a text file ending a .x 
extension. You can then import or execute it using the Stax virtual machine (VM)

The basic usage looks like this:

`$ stax <module>[.x] [<flags...>]`

If you don't pass a main module to Stax it will start an interactive shell

```
$ Stax
> 1
1
> 2
1 2
> +
3
```
