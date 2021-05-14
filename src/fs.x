`ENCODING='utf8'`
`fs=require('fs')`

read = `push(fs.readFileSync(pop(), ENCODING))`
write = `pushr((file, content) => fs.writeFileSync(file, content, ENCODING))`
