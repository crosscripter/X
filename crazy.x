
# Crazy illegal op names!
&<>< = ' AND FISH!' ++
'I love chicken' &<>< .

# Fun with XMl!
use xml
'xml' <tag> 
'this is xml' ++ 
'xml' </tag> . 

# Shell interop
'ls -al' $ .

# Python interop
"print([x ** 2 for x in [1, 2, 3]])" py .

# Super shorthand programming using aliases 
stars = '*' <> $* 
4 stars print

# Metaprogramming with eval
'4 10 * 2 + .' eval 
40 '2 +' => .


# NodeJS Interop!
use node
os = 'os' require
os 'arch' call
console.log

# File IO
file = 'test.txt'
content = 'This is a test!' 

# Write content to file
file content write

# Read content from file and print
file read print 

# BONUS: Open file in default txt editor
open-in-notepad = shell
# file open-in-notepad 

# Flow control
x = 4 
x true '2 +' '3 *' if eval print

# Shorthand syntax using ?
true 1 0 ? .

# Switch case/matching
cases = {true: '2 +', false: '3 *'} 
x cases true case eval print

# Using shorthand syntax
x cases false -> => .

# Iteration
[1,2,3,4,5] '2 **' map print
['abc','def',"ghi"] 'upper "!" cat' map print 