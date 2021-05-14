const { log } = console
const fs = require('fs')

XSM = xsm => unescape(xsm.replace(/ /g, '%'))

toXSM = str => {
    let xsm = ''
    for (let c in str) {
        c = str.charAt(c)
        for (let i = 0; i < 256; ++i) {
            let h = i.toString(16)
            if (h.length == 1) h = "0" + h
            h = "%" + h
            if (unescape(h) == c) { xsm += h; break }
        }
    }
    return xsm.replace(/%/g, ' ')
}

if (module !== require.main) return
log('XSM: Compiling to XSM...')

fs.readdirSync('.')
	.filter(x => x.endsWith('.x'))
	.map(file => fs.writeFileSync( file.split('.')[0].trim() + '.xsm', 
		toXSM(fs.readFileSync(file, 'utf8')), 'utf8'))
