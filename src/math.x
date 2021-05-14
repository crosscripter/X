E = `push(Math.E)`
PI = `push(Math.PI)`
neg = `push(-pop())`
sqr = `push(pop()*2)`
cube = `push(pop()**3)`
abs = `push(Math.abs(pop()))`

+ = add
add = `push(pop() + pop())`

- = sub 
sub = `pushr((l, r) => l - r)`

* = mul
mul = `push(pop() * pop())`

/ = div
div = `pushr((l, r) => l / r)`

% = mod 
mod = `pushr((l, r) => l % r)`

** = pow 
pow = `pushr((l, r) => l ** r)`
