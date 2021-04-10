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

    let index = history.length - 1

    const canfwd = () => index < history.length - 1
    const canbwd = () => index > 0 
    const fwd = () => canfwd() ? index++ : index
    const bwd = () => canbwd() ? index-- : index

    const steps = { left: bwd, right: fwd }

    const hprop = (prop, offset=0) => {
        let hitem = history[index + offset]
        return hitem ? `${stringify(hitem[prop] || '')}` : ''
    }

    const hstack = (offset=0) => hprop('stack', offset)

    const state = () => `
=== X Debugger === 

--- FRAME ${index + 1} / ${history.length} ---
NAME:   ${hprop('name')}
ARGS:   ${hprop('args')}
OP:     ${hprop('id')} ${hprop('args')}
JSOP:   ${hprop('jsop')}
STACK:  ${hstack()}

--- IO ---
${eval(hprop('stdout'))}

--- STATE ---
HISTORY: 
${canbwd() ? '...' : ''} ${hstack(-1)} ${canbwd() ? '->' : ''} ${hprop('name')} => ${hstack()} ${canfwd() ? '->' : ''} ${hstack(+1)} ${canfwd() ? '...' : ''}

OPS:    
${hprop('ops')}

${canbwd() ? `BWD [LEFT]` : '         '}\t${canfwd() ? `FWD [RIGHT]` : '           '}\tEXIT [ESC]
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
            return
        } else {
            if (steps[name]) steps[name]()
        }
    })

}
