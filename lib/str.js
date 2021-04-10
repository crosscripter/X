syntax(`\\'[^\\']*?\\'|\\"[^\\"]*?\\"`) 

str = () => push(String(pop()))

ltrim = ops['$|>'] = () => push(pop().trimStart())
rtrim = ops['$<|'] = () => push(pop().trimEnd())
trim = ops['$|'] = () => (ltrim(), rtrim())

upper = ops['$^'] = () => (str(), push(pop().toUpperCase()))
lower = ops['$v'] = () => (str(), push(pop().toLowerCase()))

cat = ops['++'] = () => (swap(), push(pop() + pop()))
chars = ops['$c'] = () => (push(''), split())
split = ops['$/'] = () => (swap(), str(), push(pop().split(pop())))

times = repeat = ops['$*'] = () => (swap(), push(pop().repeat(pop())))
rep = replace = ops['$#'] = () => (r = pop(), f = pop(), s = pop(), push(s.replace(new RegExp(f,'g'),r)))
