# X 

## About
X is a new minimalist concatenative programming language.  Concatenative programming
is all about implicit function composition.  The entire program is one application of a 
function which takes in all state of the program and returns a new state of the program.  
Each function, which is called an op, operates from this state which is implemented as a
stack. The stack is conceptually passed from function to function, but is actually 
implemented as a static global stack. Each op can push or pop values on and off the stack
and leaves the stack arranged for the next op to operate on.  This is akin to passing 
arguments and returning return values from functions.  There are some built-in ops like 
debug, pop, swap etc. that manipulate the stack, these are defined in the core module and
available for any program to use. There are also core modules which are not automatically 
imported such as string for example. You define a X module by a text file ending a .x 
extension. You can then import or execute it using the X virtual machine (XVM)

The different usages looks like this:

Run a module
    
```rb
$  x test
```

Run a single command 

```rb
$  x -c "1 2 + ."
```
Launch interactive repl in debug mode

```rb
$  x -i -d
```
If you don't pass a main module to X it will start an interactive mode 
This is an interactive editor which answers back with the stack state
after ops are ran:

```rb
$ x

1 2
[1, 2]

+
[3]
```

# Tutorial 
Now let's learn the language, X is all about simplicity and minimalism.

## Comments

```rb
# Comments start with hash sign and end and the end of the line.
```

```rb
# Comments can
# span multiple
# lines too!
```
```rb
# Comments CAN # be # nested
```

## Core Ops

### `DEBUG`
Let's use the `DEBUG` op to show the stack as we progress. This op toggles the X debugger and debug mode on and off, the VM will show us the stack state after each op is ran that way we can see where our stack state went wrong if there are any issues. 

```rb
# Turn debug mode on
DEBUG
1 2 +

# push 1 => [ 1 ]
# push 2 => [1, 2]
# + => [3]
```

```rb
# Toggle debug mode off again
DEBUG
```

### `dump`
To see the current stack, without using debug mode, you can use the built-in op `dump`.
```rb
1 2 3 dump
# [1, 2, 3]
```

### `push`
To push stuff onto the stack, we just simply give X a value!
```rb
# 1 implicitly pushes the num literal 1
1
# [ 1 ]
```
You can push multiple values onto the stack in one line. In X each op is seperated by a space, it's like the semicolon of other languages. Line endings for the most part do not matter, nor does whitespace except that normal operator symbols must be separated by it 

#### Whitespace in Syntax
```rb
# single line
2 3 +

# or multiine 
2
3
+
```

### `clear`
Let's use another built-in op to clear the stack
```rb
# Clears the stack
clear
# []
```

#### Reverse Polish Notation for Expressions
Another thing that is different compared to most programming languages is the fact that X expressions are written in reverse Polish notation (RPN), that is in the exact order they will be evaluated. 

This is probably way different than the infix notation you're used to, but it does have some amazing advantages, and it is actually simpler once you get used to it! 

For example to add `1` and `2` together we write the `1`, then the `2`, then the `+` op all separated by spaces. 

The `+` op pops off `2` then `1` and adds them and pushes the result back onto the stack leaving just the result, `3`:
```rb
clear 1 2 +
# [3]
```

#### Multiple Ops
You can do multiple operations together just like in infix, in RPN though these flow in the order they are actually operated on, all the data then the op. Also note that no parenthesis are EVER necessary! Note, the infix notation for this would be: (2 * 2) * (3 - 1)
```rb
clear 2 2 * 3 1 - *

# push 2 => [ 2 ]
# push 2 => [2, 2]
# * => [ 4 ]
# push 3 => [4, 3]
# push 1 => [4, 3, 1]
# - => [4, 2]
# * => [8]
```

### `clear`
Did you catch that we used the `clear` op before doing our arithmetic? You can use that to clear the stack, but for this tutorial we'll use it a lot because we'll need a clean stack each time for clarity. Note you can run as many ops as you want per line, or one per line like this!

```rb
clear
2 2 *
3 1 -
*
print

# 8
```

### `print` (`.`)
oh and did you see that new op `print`? Yeah, that does exactly what you think it does, namely print stuff out. It pops the value off the stack when printing however. A shortcut alias word is `.`  Yep, really.  No `System.out.prinln` or `Console.WriteLine` just `.`. Beat that! In fact, everything is an op in X including **ALL** the usual math operators!
```rb
clear 1 2 + .

# 3
```

## Data Types
But it's not all about math, X has many other data types too! like `str`ings, `bool`s, `list`s, and yes even `obj`ects!

### `num`bers
```rb
clear "num (Numbers)" . 1 2 3.4 50293 5234.99 0.0000000001 130934E+4 dump
```

### `bool`eans
```rb
clear "bool (Booleans)" . true false true ! false not true dump
```

### `str`ings
```rb
clear "str (Strings)" . "a" "abc" "abc def" 'def ghi' 'jkl "mno" prs' dump
```

### `list`s
```rb
clear "list (Lists)" . 
[1,2,3] 
[1, 2, 3] 
dump
```

### `obj`ects
```rb
clear "obj (Maps/Hashes/Dictionaries)" . 
{x: 1} 
{x: 1, y: 2} dump
```

### `quotes` (Lambdas)
```rb
clear "quote (closures/lambdas)" .
'1 2 +' eval 
'2 3 **' => dump
```

### Ops (Operations) 

#### Built-in Ops
You can also call ops from other modules
Here we call the `len` op from the `list` module
```rb
clear [1,2,3,4,5] len print
```

#### User-Defined Ops
AND you can define your very own!
```rb
# Remember ops can contain dashes and pretty much any other character!
double-it = dup *
clear 4 double-it dump

# clear => []
# push 4 => [ 4 ]
# double-it ->
# dup => [4, 4]
# * => [16]
# double-it => [16]
# dump => [16]
# [16]
```

#### Op Names
No like seriously, you can use almost ANY character in op names
Check out this crazy usually-would-be-illegal op name!!
```rb
&<>< = ' AND FISH!' ++
'I love chicken' &<>< .

# I love chicken AND FISH!
```

#### DSLs (Domain Specific Languages)
Modules define unique ops to build up a DSL (domain specific language)
```rb
# Fun with XMl!
use xml
'xml' <tag> 
'this is xml' ++ 
'xml' </tag> . 

# <xml>this is xml</xml>
```

## Interop

### Javascript 
BTW, you can call directly into Javascript using the `js` op!
```rb
clear "log('hello, from JS!')" js

# hello, from JS!
```

#### NodeJS Modules 
All NodeJS modules are supported to!
```rb
use node
os = 'os' require
os 'arch' call 
console.log

# x64 (on my machine)
```

### OS / Native Shell 
We can also interop with multiple outside systems.
For example, like with the native OS shell! 
```rb
'dir' $ .

# (output of dir)
```

#### Python 
Or how about use Python list comprehensions in X? 
```rb
"print([x ** 2 for x in [1, 2, 3]])" py .

# [1, 4, 9]
```

## Shorthand Syntax
Or we can go all pascal like and use super shorthand programming using aliases 
```rb
stars = '*' <> $* 
4 stars print
# ****
```

## Metaprogramming
X also allows some metaprogramming with eval
```rb
'4 10 * 2 + .' eval 
40 '2 +' => .

# 42
```

## File IO
How about some real world stuff, like file IO?
```rb
file = 'test.txt'
content = 'This is a test!' 

# Write content to file
file content write
# []

# Read content from file and print
file read print 
# This is a test!

# BONUS: Open file in default txt editor
# file shell 
```

## Flow Control
What langugage would be complete without flow control?

### Branching

#### If
```rb
x = 4 
x true '2 +' '3 *' if eval print

# Shorthand syntax using ?
true 1 0 ? .
```

#### Switch / Case / Match 
```rb
# Switch case/matching
cases = {true: '2 +', false: '3 *'} 
x cases true case eval print

# Using shorthand syntax
x cases false -> => .
```

### Iteration

#### Map
```rb
[1,2,3,4,5] '2 **' map print
['abc','def',"ghi"] 'upper "!" cat' map print 
```

## Much More to Come!
there are many more features to be added to the standard
library and many useful built-in ops and alises planned.
Stay tuned!

### Be sure to checkout `tut.x` for executable version of this tutorial!
#### Questions, comments, bugs or suggestions?  [Email me](mailto:crosscripter@gmail.com)!
