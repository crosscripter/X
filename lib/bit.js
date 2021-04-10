
band = ops['&'] = () => (swap(), push(pop() & pop()))
bor = ops['|'] = () => (swap(), push(pop() | pop()))
xor = ops['^'] = () => (swap(), push(pop() ^ pop()))
bnot = ops['~'] = () => push(~ pop())
