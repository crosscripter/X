# The FizzBuzz problem is a classic test given in coding interviews. 
# The task is simple: Print integers 1 to N, but print “Fizz” if an integer is divisible by 3, 
# “Buzz” if an integer is divisible by 5, 
# and “FizzBuzz” if an integer is divisible by both 3 and 5.

# Generates a list from...to ie. 1 3 range => [1,2,3]
# Implemented using JS interop 
range = `pushr((from, to) => Array.from({ length: to - from + 1 }).map((_, i) => i + from))`

# Divisible by 3  ie. x % 3 == 0 
div3 = 3 % 0 ==

# Divisible by 5  ie. x % 5 == 0 
div5 = 5 % 0 ==

# Divisible by 3 and 5  ie. x % 3 == 0 && x % 5 == 0
div35 = dup div3 swap div5 && 

# fizz returns 'fizz' if divisible by 3
fizz = dup div3 ["'fizz'", "dup"] ? =>

# buzz returns 'buzz' if divisible by 5
buzz = dup div5 ["'buzz'", "dup"] ? =>

# fizzbuzz returns 'fizzbuzz' if divisible by 3 and 5
fizzbuzz = dup div35 ["'fizzbuzz'", "dup"] ? =>

# Create a list from 1 to 15 mapping fizz,buzz and fizzbuzz across it
# Join items with newlines and print it out!
1 15 range dup 'fizzbuzz fizz buzz' map '\n' join .

# $ x fizzbuzz
# 1
# 2
# fizz
# 4
# buzz
# fizz
# 7
# 8
# fizz
# buzz
# 11
# fizz
# 13
# 14
# fizzbuzz