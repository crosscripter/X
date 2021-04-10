stack = []

mop('pop', 5)
pop = ops['!!'] = () => stack.pop()
push = (...xs) => stack.push(...xs)

mop('dup', 5)
dup = ops['%%'] = () => (x = pop(), push(x, x))
swp = swap = ops['<>'] = () => (l = pop(), r = pop(), push(l, r))

flip = () => stack.reverse()
clr = clear = () => stack.length = 0
empty = ops['empty?'] = () => push(stack.length === 0)

save = () => push([...stack])
load = () => (s = pop(), clear(), push(s))