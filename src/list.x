`syntax(/\[(.*?)\]/)`

join = `pushr((s,d)=>s.join(d))`
list = `push(pop().toString().split(''))`
nlist = `(c=pop(),xs=stack.slice(-c),stack=stack.slice(0,-c),stack.push(xs))`

