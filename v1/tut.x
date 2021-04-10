# test.x
# A simple test file/tutorial 
# for learning the X programming language!

# ========================== CONCATENATIVE PROGRAMMING ===================================
# X is a new minimalist concatenative programming language.  Concatenative programming
# is all about implicit function composition.  The entire program is one application of a 
# function which takes in all state of the program and returns a new state of the program.  
# Each function, which in X is called an op, operates from this state which is implemented as a
# stack. The stack is conceptually passed from function to function, but is actually 
# implemented as a static global stack. Each op can push or pop values on and off the stack
# and leaves the stack arranged for the next op to operate on.  This is akin to passing 
# arguments and returning return values from functions.  There are some built-in ops like 
# debug, pop, swap etc.  that manipulate the stack, these are defined in the core module and
# available for any program to use. There are also core modules which are not automatically
# imported such as string for example. You define an X module by a text file ending a .x 
# extension. You can then import or execute it using the X virtual machine (XVM)

# The basic usage looks like this:

# $ x <module>[.x] [<flags...>]

# If you don't pass a main module to X it will start an interactive shell

# $ x
# > 1
# [1]
# > 2
# [1, 2]
# > +
# [3]
#


# Now let's learn the language, X is all about simplicity and minimalism.

# ============================= COMMENTS =====================================

# Comments start with hash sign and end and the end of the line.

# Comments can
# span multiple
# lines too!

# Comments CAN # be # nested


# ============================ CORE OPS ====================================
# Let's use the debug op to show the stack as we progress. This op toggles an internal
# flag in the VM that will show us the stack state after each command is executed that way we can
# see where our stack state went wrong if there are issues. It's the X debugger! 

debug

# To see the current stack, without using debug mode, you can use the built-in op dump.
dump

# To push stuff onto the stack, just define a value!
1

# You can push multiple values onto the stack in one line 
# In X each op is seperated by a space, it's like the semicolon of other languages
# line endings for the most part do not matter, nor does whitespace except that normal operator
# symbols must be separated by whitespace
2 3 

# Let's use another built-in op to clear the stack
clear

# The other different thing compared to most programming languages is the fact that X expressions
# are written in reverse Polish notation (RPN) that is in the order they will be evaluated, this is probably
# way different than the infix notation you're used to but it has amazing advantages, and it actually simpler
# once you get used to it! For example to add 1 and 2 together we write the 1, then the 2, then the + word. The
# + word pops of 2 and 1 and adds them and pushes the result back onto the stack leaving just the result, 3:
clear 1 2 +

# You can do multiple operations together just like in infix, in RPN though these flow 
# in the order they are actually operated on, all the data then the op. Also note that no parenthesis 
are EVER necessary! The infix notation for this would be: (2 * 2) * (3 - 1)
clear 2 2 * 3 1 - *

# Did you catch that we used the clear op before doing our arithmetic? You can use that to clear
# the stack, but for this tutorial we'll use it a lot because we'll need a clean stack each time for
# clarity. Note you can run as many ops as you want per line, or one per line like this!
clear
2 2 *
3 1 -
*
print

# oh and did you see that new op "print"? Yeah, that does exactly what you think it does, namely print stuff out
# it pops the value off the stack when printing however. A shortcut alias word is .  which is from programming 
# language FORTH (The father of all stack based programming). In X ops can and usually do have symbols for names.
# In fact, everything is an op in X including all the math operators!
clear 1 2 + .

# But it's not all about math, X has many other data types too! like 
# strings, bools, lists, maps and yes even objects!

clear "====== DATA TYPES =======" print
clear "num (Numbers)" 1 2 3.4 50293 5234.99 0.0000000001 130934E+4
clear "bool (Booleans)" true false true ! false not true false & true false |
clear "str (Strings)" "a" "abc" "abc def" 'def ghi' 'jkl "mno" prs'
clear "list (Lists)" [] [1] [1,2,3] [1, 2, 3]
clear "map (Maps/Hashes/Dictionaries)" {} {x:1} {x: 1} {x: 1, y: 2}
clear "quote (closures/lambdas)" (1 2 +) (2 3 **) call !!

# FYI you can call directly into Javascript using the `` tick quoted commands!
clear `log('hello, from JS!');`

# All NodeJS modules are supported!
clear `require('os').arch()` .

# You can also call ops from other modules
# Here we call the avg op from the math module
clear [1,2,3,4,5] avg print

# or define your own!
double-it = dup *
clear 4 double-it dump
