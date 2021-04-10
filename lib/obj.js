syntax(`\\{(.*?)\\}`)

ops['null'] = () => push(null)

keys = ops[':k'] = () => push(Object.keys(pop()))
values = ops[':v'] = () => push(Object.values(pop()))
items = ops[':i'] = () => push(Object.entries(pop()))

get = () => (swap(), push(pop()[pop()]))
set = () => (v = pop(), k = pop(), o = pop(), o[k] = v, push(o))

json = ops['->json'] = () => push(JSON.stringify(pop()))

key = () => {
    let val = pop()
    let obj = pop()
    let item = Object.entries(obj).find(([k, v]) => v === val)
    push(item[0]) 
}