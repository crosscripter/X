
head = `push(pop()[0])`
len = `push(pop().length)`
last = `push(pop().slice(-1)[0])`
at = `pushr((l, r) => l[r])`
reverse = `push(pop().reverse())`
drop = `push(pop().slice(0, -1))`
empty = `push(pop().length === 0)`
index = `pushr((l, r) => l.indexOf(r))`
in = `pushr((l, r) => l.includes(r))`

: = cons
cons = `pushr((l, r) => [...l, r])`

++ = concat
concat = `pushr((l, r) => l.concat(r))`

