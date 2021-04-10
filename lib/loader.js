const { parse } = require('path')
const { existsSync, readFileSync } = require('fs')
const PATH = ['./', './lib/', '/x/lib/']

const resolve = file => (PATH.find(p => existsSync(`${p}/${file}`)) || '') + file

prep = code => code.split('\n')
    .filter(x =>  x && /^#/.test(x) ? false
                : x && /^\s*[^\= ]+\s*\=\s*/.test(x) ? bind(x) 
                : x && /^use\s+(.+)/.test(x) ? use(x)
                : x).filter(Boolean).join('\n')

use = line => {
    const file = line.replace(/use /, '').replace(/\.x$/, '').trim()
    const name = parse(file).base 

    let path = resolve(name + '.x')
    if (existsSync(path)) {
        let code = readFileSync(path, 'utf8')
        if (debug) log(`use: "${name}.x"`)
        run(code)
    } else {
        let path = resolve(name + '.js')
        if (!existsSync(path)) throw 'Module not found: ' + name
        eval(readFileSync(path, 'utf8'))
        if (debug) log(`require: "${name}.js"`)
    }
}