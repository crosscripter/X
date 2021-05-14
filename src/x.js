debug = false
require('./xsm')
log = console.log

// lexer
SYNTAX = new RegExp(/ |[a-z0-9_$]+/)

lines = x => splitd(x).filter(Boolean)
restr = re => re.toString().replace(/\/(.*?)\//g, '$1')
pre = x => x.split('\n').filter(x => !/^#/.test(x)).map(x => / = /.test(x) ? def(x) : x).join('\n')
splitd = x => x.match(/(?:[^\s\'\"\`\[\]\{\}]+|\`[^\`]*\`|\'[^\']*\'|\"[^\"]*\"|\[.*?\]|\{.*?\})+/g) || []
syntax = re => { SYNTAX = new RegExp([SYNTAX, re].map(restr).join('|')); if (debug) log('syntax:', SYNTAX) }

// interop
syntax(/`(.*?)`/gm)
const { execSync: shell } = require('child_process')

NODE = 'node'
PY = 'python'
CS = '"c:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/MSBuild/15.0/bin/Roslyn/csi.exe"'

js = () => eval(`(${pop()})`)
py = () => push(shell(`${PY} "${pop()}.py"`).toString())
cs = () => push(shell(`${CS} "${pop()}.csx"`).toString())
node = () => push(shell(`${NODE} "${pop()}.js"`).toString())

interop = { 
    py: x => (push(x), py()),
    csx: x => (push(x), cs()),
    js: x => (push(x), node())
}

// loader
fs = require('fs')

LOADERS = { 
    interop, 
    js: require, 
    xsm: x => { 
	let bytecode = fs.readFileSync(x, 'utf8')
	let xsm = XSM(bytecode)
	if (debug) log('xsm:', bytecode, '=>', xsm)
	return run(xsm)
    },
    x: x => run(fs.readFileSync(x, 'utf8'))
}

load = id => {
    if (/\.[a-wyz][a-z]+$/.test(id)) {
        const [name, ext] = id.split('.')
        if (debug) log(`load: ${id}.${ext}`)
        return LOADERS.interop[ext](name)
    }

    id = id.split('.')[0].trim()
    let ext = Object.keys(LOADERS).find(ext => fs.existsSync(`./${id}.${ext}`))
    if (!ext) return false
    let path = `./${id}.${ext}`
    if (debug) log('load:', path)
    LOADERS[ext](path)
    return true
}

// VM
def = x => {
    const [id, expr] = x.split(/ = /)
    global[id.trim()] = () => run(expr.trim())
    if (debug) log('op:', id.trim(), '=', expr.trim())
}

op = id => { 
    if (/`(.*?)`/.test(id)) return eval(id.slice(1, -1).trim())
    try { global[id]() }
    catch (e) { 
        if (/^[a-z\.]+$/gi.test(id) && load(id)) return 
        if (!e.message.includes('global[id] is not a function')) throw e
        if (!SYNTAX.test(id)) throw `Invalid syntax: ${id}`
        push(eval(`(${id})`)) 
    } 
    if (debug) log(id, '=>', stack) 
}

run = x => { try { lines(pre(x.trim())).map(op) } catch (e) { log(`ERROR ${e}`) } }

// cli
let [main, ...flags] = process.argv.slice(2)
debug = [main, ...flags].includes('-d')
if (main?.startsWith('-')) main = ''
run(`lib ${main || 'repl'}`)
