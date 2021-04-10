const { readFileSync, writeFileSync } = require('fs')

log = console.log
print = ops['.'] = () => log(pop())
read = ops['<f'] = () => push(readFileSync(pop(), 'utf8'))
write = ops['f>'] = () => (swap(), push(writeFileSync(pop(), pop(), 'utf8')))