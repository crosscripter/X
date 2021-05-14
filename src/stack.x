`stack=[]`
`pop=()=>stack.pop()`
`push=(...xs)=>stack.push(...xs)`
`pushr=f=>(swap(),push(f(pop(),pop())))`
`pusht=f=>push((c=pop(),b=pop(),a=pop(),f(a,b,c)))`

flip = `eval('stack.reverse()')`
clear = `eval('stack.length=0')`
swap = `push(pop(),pop())`
swap2 = `(c=pop(), b=pop(), a=pop(), push(b, c, a))`
dup = `(x=pop(),push(x,x))`
dups = `push(...stack)`

