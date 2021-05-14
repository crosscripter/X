`apply=(x, f) => (push(x), run(f), r=pop(), r)`

-> = case
case = `pushr((c, cs) => cs[c] || pop())`

? = if
if = `pushr((c, bs) => c ? (bs[0] || c) : (bs[1] || pop()))`

map = `pushr((l, f) => l.map(x => apply(x, f)))`
filter = `pushr((l, f) => l.filter(x => apply(x, f) ? x : null).filter(Boolean))`