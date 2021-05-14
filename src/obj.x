`syntax(/\{(.*?)\}/)`

null = `push(null)`

keys = `push(Object.keys(pop()))`
values = `push(Object.values(pop()))`
items = `push(Object.entries(pop()))`

json = `push(JSON.stringify(pop()))`

get = `(swap(), push(pop()[pop()]))`
set = `(v=pop(), k=pop(), o=pop(), o[k]=v, push(o))`
key = `val=pop(); obj=pop(); item=Object.entries(obj).find(([k, v]) => v === val); push(item[0])`