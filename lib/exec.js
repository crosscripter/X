const { execSync } = require('child_process')

ops = {}
debug = false

cmd = text => op.apply(this, splitd(text))
ops['eval'] = ops['=>'] = () => (push(run(pop())), pop())
run = code => splitd(prep(code)).filter(Boolean).map(cmd)

js = () => push(eval(pop()))
sh = shell = ops['$'] = () => push(execSync(pop()).toString())
py = () => push(execSync(`python -c "${pop()}"`).toString())

bind = line => {
    const [id, expr] = line.split('=').map(x => x.trim())
    if (debug) log('op:', id, '=', expr)
    ops[id] = () => run(expr)
}

op = (id, ...args) => { 
    let name = id
    if (ops[id]) id = `ops["${id}"]`
    else if (_syntax.test(id)) { args.push(id); name = id = 'push' } 
    if (debug && (['.','print','map'].includes(name) || ops[name]) && /[\w]+/.test(name)) log(name, '->')
    let jsop = `${id}(${args.join(',')})`
    // if (debug) log('eval:', jsop)
    eval(jsop) 
    if (debug && id !== 'DEBUG') log(`${name} ${args.join(' ')}`.trim(), '=>', stack)
}

mop = (name, n) => {
    for(let i = 1; i <= n; i++) 
        ops[name + i] = () => eval(`(${`${name}(),`.repeat(i).split(',').filter(Boolean)})`)
}