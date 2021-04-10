require('./lib/syntax')
require('./lib/exec')
require('./lib')

const [ main, ...flags ] = process.argv.slice(2)

if (flags.includes('-d')) DEBUG()
if (main === '-c') return run(`${flags.join(' ')}`)
if (main === '-i') return repl()
if (main) return use(main)

repl()
