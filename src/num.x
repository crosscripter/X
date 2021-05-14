`syntax(/\d+(?:\.\d+)?/)`

neg = `push(-pop())`

inc = `push(pop() + 1)`
dec = `push(pop() - 1)`

num = `push(Number(pop()))`

odd = `push(pop() % 2 != 0)`
even = `push(pop() % 2 == 0)`

pbase = `pushr((n,b) => parseInt(n,b))`
nbase = `pushr((n,b) => n.toString(b))`
bin = 2 nbase 
oct = 8 nbase
hex = 16 nbase

