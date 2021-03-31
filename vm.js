const fs = require('fs')

let stack = []
let debug = false
let log = console.log
let pop = () => stack.pop()
let push = x => { stack.push(x); return; }

const EXT = '.x'
const DELIMTER = / = /g
const OBJECT = /^\{.*?\}$/
const QUOTE = /^\((.*)\)$/g
const USE = /^use (.*)\s*$/g
const NEWLINES = '\\r\\n|\\r|\\n'
const SYNTAX = /^syntax \/(.*?)\/$/

let syntax = ['(syntax \\/.*?\\/)',' ']
let parse = () => new RegExp(syntax.join('|'), 'g')

let trim = (_, x) => x.trim()
let isQuote = x => QUOTE.test(x)
let getQuote = x => x.replace(QUOTE, trim)
let isImport = x => USE.test(x.trim())
let getImport = x => x.replace(USE, trim)
let isSyntax = x => SYNTAX.test(x)
let getSyntax = x => x.replace(SYNTAX, trim)
let addSyntax = x => syntax.unshift(x)
let isObject = x => OBJECT.test(x)

let padding = 15
let spaces = len => Array.from({length:len}).fill(' ').join('')
let pad = (x, len) => spaces(len).replace(new RegExp(`^(\\s{${x.length}})(\\s+)$`), `${x}$2`)
let trace = cmd => {
    padding = cmd.length > padding ? cmd.length : padding
    log(`>> ${pad(cmd,padding)}=> ${JSON.stringify(stack.join(' '))}`)
}

let cmd = (cmd, word) => {    
    if (isQuote(cmd)) cmd = `(()=>"${getQuote(cmd)}")`    
    if (isSyntax(cmd)) addSyntax(getSyntax(cmd))
    else if (isImport(cmd)) use(getImport(cmd))
    else if (this[cmd]) this[cmd]()
    else {
        try {
            if (isObject(cmd)) cmd = `(${cmd})`
            let result = eval(cmd); 
            if (result !== undefined && result !== null) push(result);
        } 
        catch (e) { throw `Error: ${cmd}` }
    }
    if (debug && !word) trace(cmd)
}

let uncomment = text => text.replace(/^#(.|(\r\n|\r|\n))*?$/gm, '').trim()
let join = text => text.replace(new RegExp(`(?:${NEWLINES})+[ \\t]+(.*)`,'g'), ' $1')
let lines = text => join(uncomment(text)).split(new RegExp(NEWLINES,'g'))
let all = items => items.filter(item => item).map(item => item.trim())
let lex = code => all(lines(code).join(' ').split(parse()))
let exec = (code, word) => lex(code).forEach(line => cmd(line, word))

let word = (name, code) => { 
    this[name] = () => exec(code, name)
    if (debug) log("-- " + name + " defined")
}

let run = code => all(lines(code)).forEach(line => {
    let [left, ...right] = all(line.split(DELIMTER))
    let expr = right.join('').trim()
    if (isImport(left)) use(getImport(left))
    else if (isSyntax(left)) addSyntax(getSyntax(left))
    else if (line.includes(' = ')) word(left, expr)
    else exec(line)
})

let extend = name => name.replace(new RegExp(`\\${EXT}$`,'gi'),'') + EXT
let read = module => fs.readFileSync(extend(module), 'utf8')
let use = this['use'] = module => { 
    run(read(module))
    if (debug) log("--" + module + " loaded --")
}

let args = process.argv.splice(2)
let [main, ...flags] = args

if (main) {
    use('core')
    return run(read(main))
}

const { createInterface } = require('readline')

with (createInterface(process.stdin, process.stdout)) {
    use('core')
    setPrompt('> ')
    
    on('line', line => { 
        try { run(line + ' dump') } catch (e) { log('!', e) }
        prompt() 
    })

    prompt()
}