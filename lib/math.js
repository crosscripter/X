add = ops['+'] = () => push(pop() + pop())
mul = ops['*'] = () => push(pop() * pop())
sub = ops['-'] = () => (swap(), push(pop() - pop()))
mod = ops['%'] = () => (swap(), push(pop() % pop()))
div = ops['/'] = () => (swap(), push(pop() / pop()))
pow = ops['**'] = () => (swap(), push(pop() ** pop()))