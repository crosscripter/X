// debug = false
const { stringify } = JSON
DEBUG = () => debug = !debug
dump = () => log(stack.length && stack || '')

DEBUGGER = () => {
    const { clear } = console
    const { exit, stdin, stdout } = process
    const { emitKeypressEvents } = require('readline')

    stdin.terminal = true
    stdin.setRawMode(true)
    emitKeypressEvents(stdin)
    const start = +new Date()

    let index = history.length - 1

    const canfwd = () => index < history.length - 1
    const canbwd = () => index > 0 
    const fwd = () => canfwd() ? index++ : index
    const bwd = () => canbwd() ? index-- : index

    const steps = { 
        left: bwd, 
        up: bwd, 
        down: fwd, 
        right: fwd, 
        enter: fwd, 
        backspace: bwd, 
        end: () => index = history.length - 1, 
        home: () => index = 0 
    }

    const hprop = (prop, offset=0) => {
        let hitem = history[index + offset]
        return eval(hitem ? `${stringify(hitem[prop] || '')}` : '')
    }

    const hstack = (offset=0) => stringify(hprop('stack', offset) || '?')
    const hop = (offset=0) => `${hprop('name', offset)} ${hprop('args', offset)}`

    const state = () => `
==========================================
X Debugger 
------------------ OP --------------------
ADDR:   0x${(start + index).toString(16)} 
INDEX:  ${index + 1} / ${history.length}
NAME:   ${hprop('name')}
ARGS:   ${hprop('args')}
OP:     ${hprop('id')} ${hprop('args').join(' ')} 
JSOP:   ${hprop('jsop')}
------------------ STACK -----------------
PREV:   ${hstack(-1)}
CURR:   ${hstack()}
NEXT:   ${hstack(+1)}
------------------ I/O -------------------
STDIN:  ${hop().replace('push', '').trim()}
STDOUT: ${hprop('stdout')}
STDERR: ${hprop('stderr')}
------------------ STATE -----------------
OPS:    ${hprop('ops')}
HIST:   
${hstack(-1)} => ${hstack()} => ${hstack(+1)} 
==========================================
${canbwd() ? `BWD [LEFT]` : '         '}\t${canfwd() ? `FWD [RIGHT]` : '           '}\tEXIT [ESC]
==========================================
`

    log('Starting debugger...')
    setTimeout(() => { clear(); log(state()) }, 800)

    stdin.on('keypress', (_, { ctrl, name }) => {
        clear()
        log(state())

        if (name === 'escape' || (ctrl && name === 'c')) {
            log('Stopping debugger...')
            setTimeout(() => { clear(); }, 800)
            stdin.setRawMode(false)
            stdin.on('keypress', () => { })
            return
        } else {
            if (steps[name]) steps[name]()
        }
    })

}
