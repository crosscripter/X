~ = bnot
bnot = `push(~pop())`

| = bor
bor = `pushr((l, r) => l | r)`

^ = xor 
xor = `pushr((l, r) => l ^ r)`

& = band 
band = `pushr((l, r) => l & r)`

<< = shl 
shl = `pushr((l, r) => l << r)`

>> = shr 
shr = `pushr((l, r) => l >> r)`

>>> = rotr 
rotr = `pushr((l, r) => l >>> r)`