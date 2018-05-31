+  : `push(pop() + pop())`
-  : swap `push(pop() - pop())`
*  : `push(pop() * pop())`
/  : swap `push(pop() / pop())`
%  : swap `push(pop() % pop())`
** : swap `push(pop() ** pop())`

add: +
sub: -
mul: *
div: /
mod: %
pow: **
sqr: 2 **
dbl: 2 mul

pi: 3.1415926

sum: `pop().reduce((a,b)=>a+b,0)`
avg: dup sum swap len /
