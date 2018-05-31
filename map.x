syntax /(\{.*?\})/
get: swap `push(pop()[pop()])`
set: `let a = pop(); let b = pop(); let c = pop(); c[b] = a; c;`
has: swap `pop()[pop()] !== undefined`
len: `Object.keys(pop()).length`
