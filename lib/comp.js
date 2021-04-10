eq = ops['=='] = () => push(pop() === pop())
neq = ops['!='] = () => push(pop() !== pop())

lt = ops['<'] = () => (swap(), push(pop() < pop()))
lte = ops['<='] = () => (swap(), push(pop() <= pop()))

gt = ops['>'] = () => (swap(), push(pop() > pop()))
gte = ops['>='] = () => (swap(), push(pop() >= pop()))
