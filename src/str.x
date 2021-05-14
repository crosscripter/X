`syntax(/"[^"]*?"|'[^']*?'/)`

chars = `(push(''), split())`
str = `push(pop().toString())`

trim = `push(pop().trim())`
rtrim = `push(pop().trimEnd())`
ltrim = `push(pop().trimStart())`

upper = `push(pop().toUpperCase())`
lower = `push(pop().toLowerCase())`
split = `pushr((s, d) => s.split(d))`

ends = `pushr((s, c) => s.endsWith(c))`
starts = `pushr((s, c) => s.startsWith(c))`

repeat = `pushr((l, r) => l.repeat(r))`
replace = `pusht((s, f, r) => s.replace(new RegExp(f, 'g'), r))`

+ = addcat
addcat = `pushr((r, l) => r + l)`
